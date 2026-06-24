use tauri::{Manager, Emitter};
use tauri::tray::TrayIconBuilder;
use tauri::menu::{Menu, MenuItem};
#[cfg(target_os = "macos")]
use window_vibrancy::{apply_vibrancy, NSVisualEffectMaterial};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }

      let open_i = MenuItem::with_id(app, "open", "Open", true, None::<&str>)?;
      let voice_i = MenuItem::with_id(app, "voice", "Voice Assist", true, None::<&str>)?;
      let settings_i = MenuItem::with_id(app, "settings", "Settings", true, None::<&str>)?;
      let reload_i = MenuItem::with_id(app, "reload", "Reload", true, None::<&str>)?;
      let quit_i = MenuItem::with_id(app, "quit", "Quit", true, None::<&str>)?;
      let menu = Menu::with_items(app, &[&open_i, &voice_i, &settings_i, &reload_i, &quit_i])?;

      let _tray = TrayIconBuilder::new()
        .icon(app.default_window_icon().unwrap().clone())
        .menu(&menu)
        .show_menu_on_left_click(true)
        .on_menu_event(|app, event| match event.id.as_ref() {
            "quit" => {
                app.exit(0);
            }
            "open" => {
                if let Some(window) = app.get_webview_window("main") {
                    let _ = window.show();
                    let _ = window.set_focus();
                }
            }
            "settings" => {
                if let Some(window) = app.get_webview_window("main") {
                    let _ = window.show();
                    let _ = window.set_focus();
                    let _ = window.emit("open-settings", ());
                }
            }
            "voice" => {
                if let Some(window) = app.get_webview_window("main") {
                    let _ = window.show();
                    let _ = window.set_focus();
                    let _ = window.emit("open-voice", ());
                }
            }
            "reload" => {
                if let Some(window) = app.get_webview_window("main") {
                    let _ = window.eval("window.location.reload()");
                }
            }
            _ => {}
        })
        .build(app)?;

      let window = app.get_webview_window("main").unwrap();

      #[cfg(target_os = "macos")]
      apply_vibrancy(&window, NSVisualEffectMaterial::Sidebar, None, None)
        .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");

      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
