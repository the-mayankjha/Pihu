use tauri::Manager;
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

      let window = app.get_webview_window("main").unwrap();

      // #[cfg(target_os = "macos")]
      // apply_vibrancy(&window, NSVisualEffectMaterial::Sidebar, None, None)
      //   .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");

      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
