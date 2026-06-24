import * as React from 'react';
import { useThemeStore, wallpapers } from '@pihu/theme';
import { FrostedCard, GlassCard, Slider, Switch, ThemeCard, ColorPickerCircle, Chip, Button, Input, Badge, Tabs, Avatar, AvatarGroup, ProgressBar, ProgressRing, Card, Select, Checkbox } from '../components';
import { useSettingsUIStore } from './SettingsUIStore';
import { Settings, Palette, Layout, Home, Monitor, LayoutDashboard, Bell, Volume2, Moon, Shield, Keyboard, Info, Search, Sun, MoonStar, MonitorDot, Image as ImageIcon, Component } from 'lucide-react';

const SIDEBAR_ITEMS = [
  { id: 'general', label: 'General', icon: Settings },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'dock', label: 'Dock & Panel', icon: Layout },
  { id: 'workspace', label: 'Workspace', icon: Home },
  { id: 'sidebar', label: 'Sidebar', icon: Monitor },
  { id: 'widgets', label: 'Widgets', icon: LayoutDashboard },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'sounds', label: 'Sounds', icon: Volume2 },
  { id: 'focus', label: 'Focus Mode', icon: Moon },
  { id: 'privacy', label: 'Privacy & Security', icon: Shield },
  { id: 'shortcuts', label: 'Shortcuts', icon: Keyboard },
  { id: 'components', label: 'UI Components', icon: Component },
  { id: 'about', label: 'About Pihu OS', icon: Info },
];

const ACCENT_COLORS = [
  '#FF5E7E', // Pink
  '#8B5CF6', // Purple
  '#3B82F6', // Blue
  '#06B6D4', // Cyan
  '#10B981', // Green
  '#F59E0B', // Yellow
  '#F97316', // Orange
  '#EF4444', // Red
];

export function SettingsPanel() {
  const { activeTab, setActiveTab, setSettingsOpen, userName, setUserName } = useSettingsUIStore();
  const [keybindings, setKeybindings] = React.useState<Record<string, string>>({});
  const { themes, activeThemeId, setTheme, updateThemeProperties } = useThemeStore();
  const currentTheme = themes[activeThemeId];

  React.useEffect(() => {
    setSettingsOpen(true);
    return () => setSettingsOpen(false);
  }, [setSettingsOpen]);

  React.useEffect(() => {
    // Hardcoded defaults for now
    setKeybindings({
      'ctrl+s h': 'layout:split:horizontal',
      'ctrl+s v': 'layout:split:vertical',
      'ctrl+m': 'layout:maximize',
      'ctrl+,': 'layout:open-settings',
      'ctrl+w': 'layout:close-tab',
    });
  }, []);

  if (!currentTheme) return null;

  return (
    <div style={{ display: 'flex', height: '100%', width: '100%', background: 'transparent', color: 'var(--pihu-text)', boxSizing: 'border-box' }}>
      
      {/* Sidebar */}
      <FrostedCard style={{ width: '240px', padding: '16px', flexDirection: 'column', gap: '8px', overflowY: 'auto', margin: 0, height: '100%', zIndex: 10, borderRadius: 0, borderTop: 'none', borderBottom: 'none', borderLeft: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 16px', marginBottom: '16px' }}>
          <div style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="/icons/logo.png" alt="Pihu OS Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '14px' }}>PIHU OS</div>
            <div style={{ fontSize: '11px', color: 'color-mix(in srgb, var(--pihu-text) 60%, transparent)' }}>Your AI Powered Workspace</div>
          </div>
        </div>
        
        {SIDEBAR_ITEMS.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <div 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '8px 16px',
                borderRadius: 'var(--pihu-radius-sm)',
                background: isActive ? 'color-mix(in srgb, var(--pihu-surface) 60%, transparent)' : 'transparent',
                color: isActive ? 'var(--pihu-primary)' : 'var(--pihu-text)',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                fontSize: '14px'
              }}
            >
              <Icon size={16} color={isActive ? 'var(--pihu-primary)' : 'color-mix(in srgb, var(--pihu-text) 60%, transparent)'} />
              <span style={{ fontWeight: isActive ? '600' : '400' }}>{item.label}</span>
            </div>
          );
        })}
      </FrostedCard>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
        
        {activeTab === 'general' && (
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
              <div>
                <h1 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: 'bold' }}>General</h1>
                <p style={{ margin: 0, color: 'color-mix(in srgb, var(--pihu-text) 60%, transparent)', fontSize: '14px' }}>Basic settings and user profile.</p>
              </div>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <div style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.05em', color: 'color-mix(in srgb, var(--pihu-text) 50%, transparent)', marginBottom: '12px' }}>PROFILE</div>
              <FrostedCard style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '4px' }}>Your Name</div>
                    <div style={{ fontSize: '12px', color: 'color-mix(in srgb, var(--pihu-text) 60%, transparent)' }}>Used for personalized greetings and widgets.</div>
                  </div>
                  <div style={{ width: '200px' }}>
                    <Input 
                      placeholder="Enter your name" 
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                </div>
              </FrostedCard>
            </div>
          </div>
        )}

        {activeTab === 'appearance' && (
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
              <div>
                <h1 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: 'bold' }}>Appearance</h1>
                <p style={{ margin: 0, color: 'color-mix(in srgb, var(--pihu-text) 60%, transparent)', fontSize: '14px' }}>Customize how Pihu OS looks and feels.</p>
              </div>
                <Input 
                  placeholder="Search settings..." 
                  leftIcon={<Search size={16} />}
                  style={{ width: '200px' }}
                />
            </div>

            {/* THEME Section */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.05em', color: 'color-mix(in srgb, var(--pihu-text) 50%, transparent)', marginBottom: '12px' }}>THEME</div>
              <FrostedCard style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '4px' }}>Theme Mode</div>
                    <div style={{ fontSize: '12px', color: 'color-mix(in srgb, var(--pihu-text) 60%, transparent)' }}>Choose your preferred theme for Pihu OS.</div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <ThemeCard label="Pihu Light" icon={Sun} selected={activeThemeId === 'pihu-light'} onClick={() => setTheme('pihu-light')} />
                    <ThemeCard label="Pihu Dark" icon={MoonStar} selected={activeThemeId === 'pihu-dark'} onClick={() => setTheme('pihu-dark')} />
                    <ThemeCard label="Auto" icon={MonitorDot} selected={false} onClick={() => {}} />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--pihu-border)', paddingTop: '24px' }}>
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '4px' }}>Accent Color</div>
                    <div style={{ fontSize: '12px', color: 'color-mix(in srgb, var(--pihu-text) 60%, transparent)' }}>Pick a color that represents you.</div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    {ACCENT_COLORS.map(color => (
                      <ColorPickerCircle 
                        key={color} 
                        color={color} 
                        selected={currentTheme.colors.primary === color || (color === '#FF5E7E' && currentTheme.colors.primary === '#ff5e7e')} 
                        onClick={() => updateThemeProperties(t => ({ ...t, colors: { ...t.colors, primary: color } }))} 
                      />
                    ))}
                  </div>
                </div>

              </FrostedCard>
            </div>

            {/* APPEARANCE SETTINGS Section */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.05em', color: 'color-mix(in srgb, var(--pihu-text) 50%, transparent)', marginBottom: '12px' }}>APPEARANCE SETTINGS</div>
              <FrostedCard style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '4px' }}>Glass Style</div>
                    <div style={{ fontSize: '12px', color: 'color-mix(in srgb, var(--pihu-text) 60%, transparent)' }}>Choose between standard Frost or distorted Liquid glass effects.</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Select 
                      options={[
                        { label: 'Frost', value: 'frost' }
                      ]}
                      value={currentTheme.glass.style || 'frost'}
                      onChange={(value) => updateThemeProperties(t => ({ ...t, glass: { ...t.glass, style: value as 'frost' | 'liquid' } }))}
                      style={{ width: '160px' }}
                    />
                  </div>
                </div>

                <div style={{ height: '1px', background: 'var(--pihu-border)' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '4px' }}>Glass Opacity (Tint)</div>
                    <div style={{ fontSize: '12px', color: 'color-mix(in srgb, var(--pihu-text) 60%, transparent)' }}>Adjust the transparency of panels and surfaces.</div>
                  </div>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <Slider 
                      min="0" max="1" step="0.05"
                      value={currentTheme.glass[currentTheme.glass.style || 'frost']?.opacity ?? 0.3}
                      onChange={(e) => updateThemeProperties(t => {
                        const style = t.glass.style || 'frost';
                        const currentStyleConfig = t.glass[style] || { opacity: 0.3, blur: 24 };
                        return { ...t, glass: { ...t.glass, [style]: { ...currentStyleConfig, opacity: parseFloat(e.target.value) } } };
                      })}
                    />
                    <span style={{ fontSize: '13px', minWidth: '32px', textAlign: 'right' }}>{Math.round((currentTheme.glass[currentTheme.glass.style || 'frost']?.opacity ?? 0.3) * 100)}%</span>
                  </div>
                </div>

                <div style={{ height: '1px', background: 'var(--pihu-border)' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '4px' }}>Glass Blur</div>
                    <div style={{ fontSize: '12px', color: 'color-mix(in srgb, var(--pihu-text) 60%, transparent)' }}>Adjust the blur intensity of the glass effect.</div>
                  </div>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <Slider 
                      min="0" max="64" step="1"
                      value={currentTheme.glass[currentTheme.glass.style || 'frost']?.blur ?? 24}
                      onChange={(e) => updateThemeProperties(t => {
                        const style = t.glass.style || 'frost';
                        const currentStyleConfig = t.glass[style] || { opacity: 0.3, blur: 24 };
                        return { ...t, glass: { ...t.glass, [style]: { ...currentStyleConfig, blur: parseInt(e.target.value) } } };
                      })}
                    />
                    <span style={{ fontSize: '13px', minWidth: '32px', textAlign: 'right' }}>{currentTheme.glass[currentTheme.glass.style || 'frost']?.blur ?? 24}px</span>
                  </div>
                </div>

                <div style={{ height: '1px', background: 'var(--pihu-border)' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '4px' }}>Active Tab Border</div>
                    <div style={{ fontSize: '12px', color: 'color-mix(in srgb, var(--pihu-text) 60%, transparent)' }}>Show bright borders around active windows and panels.</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Switch 
                      checked={currentTheme.glass.activePanelBorder ?? true}
                      onChange={(e) => updateThemeProperties(t => ({ ...t, glass: { ...t.glass, activePanelBorder: e.target.checked } }))}
                    />
                  </div>
                </div>

                <div style={{ height: '1px', background: 'var(--pihu-border)' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '4px' }}>Animations</div>
                    <div style={{ fontSize: '12px', color: 'color-mix(in srgb, var(--pihu-text) 60%, transparent)' }}>Enable smooth animations across the system.</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Switch 
                      checked={currentTheme.animation.enabled ?? true}
                      onChange={(e) => updateThemeProperties(t => ({ ...t, animation: { ...t.animation, enabled: e.target.checked } }))}
                    />
                  </div>
                </div>

                <div style={{ height: '1px', background: 'var(--pihu-border)' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '4px' }}>Rounded Corners</div>
                    <div style={{ fontSize: '12px', color: 'color-mix(in srgb, var(--pihu-text) 60%, transparent)' }}>Adjust the radius of windows and panels.</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Select 
                      options={[
                        { label: 'Small (8px)', value: 'small' },
                        { label: 'Medium (16px)', value: 'medium' },
                        { label: 'Large (24px)', value: 'large' }
                      ]}
                      value={currentTheme.radius.md === '16px' ? 'medium' : currentTheme.radius.md === '8px' ? 'small' : 'large'}
                      onChange={(value) => {
                        const radius = value === 'small' ? '8px' : value === 'medium' ? '16px' : '24px';
                        updateThemeProperties(t => ({ ...t, radius: { ...t.radius, md: radius, lg: value === 'small' ? '12px' : value === 'medium' ? '24px' : '32px' } }));
                      }}
                      style={{ width: '160px' }}
                    />
                  </div>
                </div>

              </FrostedCard>
            </div>

            {/* WALLPAPER Section */}
            <div>
              <div style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.05em', color: 'color-mix(in srgb, var(--pihu-text) 50%, transparent)', marginBottom: '12px' }}>WALLPAPER</div>
              <FrostedCard style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '80px', height: '50px', borderRadius: 'var(--pihu-radius-sm)', background: currentTheme.wallpaper?.source === 'transparent' ? 'var(--pihu-bg)' : `url(${currentTheme.wallpaper?.source}) center/cover`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--pihu-border)', overflow: 'hidden' }}>
                      {currentTheme.wallpaper?.source === 'transparent' && <ImageIcon size={24} color="color-mix(in srgb, var(--pihu-text) 30%, transparent)" />}
                    </div>
                    <div>
                      <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '4px' }}>{currentTheme.wallpaper?.source === 'transparent' ? 'Transparent OS Default' : 'Custom Wallpaper'}</div>
                      <div style={{ fontSize: '12px', color: 'color-mix(in srgb, var(--pihu-text) 60%, transparent)' }}>{currentTheme.wallpaper?.source === 'transparent' ? 'Allows your native OS wallpaper to shine through.' : 'A beautiful custom background.'}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button 
                      onClick={() => updateThemeProperties(t => ({ ...t, wallpaper: { id: 'default', type: 'gradient', source: 'transparent' } }))}
                      style={{ background: 'transparent', border: '1px solid var(--pihu-border)', color: 'var(--pihu-text)', padding: '8px 16px', borderRadius: 'var(--pihu-radius-sm)', cursor: 'pointer', fontSize: '13px' }}
                    >
                      Reset to Transparent
                    </button>
                  </div>
                </div>

                <div style={{ height: '1px', background: 'var(--pihu-border)' }} />

                <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '8px', WebkitOverflowScrolling: 'touch' }}>
                  {wallpapers.filter(w => w.mode === currentTheme.mode).map(wallpaper => {
                    const isSelected = currentTheme.wallpaper?.source === wallpaper.source;
                    return (
                      <div 
                        key={wallpaper.id}
                        onClick={() => updateThemeProperties(t => ({ ...t, wallpaper: { id: wallpaper.id, type: 'image', source: wallpaper.source } }))}
                        style={{
                          minWidth: '160px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ 
                          width: '160px', 
                          height: '90px', 
                          borderRadius: 'var(--pihu-radius-sm)', 
                          backgroundImage: `url(${wallpaper.source})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          border: isSelected ? '2px solid var(--pihu-primary)' : '1px solid var(--pihu-border)',
                          transition: 'all 0.2s'
                        }} />
                        <div style={{ fontSize: '12px', textAlign: 'center', color: isSelected ? 'var(--pihu-text)' : 'color-mix(in srgb, var(--pihu-text) 60%, transparent)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {wallpaper.name}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </FrostedCard>
            </div>

          </div>
        )}

        {activeTab === 'shortcuts' && (
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
              <div>
                <h1 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: 'bold' }}>Shortcuts</h1>
                <p style={{ margin: 0, color: 'color-mix(in srgb, var(--pihu-text) 60%, transparent)', fontSize: '14px' }}>Manage keybindings for OS actions.</p>
              </div>
                <Input 
                  placeholder="Search shortcuts..." 
                  leftIcon={<Search size={16} />}
                  style={{ width: '200px' }}
                />
            </div>

            {/* KEYBINDINGS Section */}
            <div>
              <div style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.05em', color: 'color-mix(in srgb, var(--pihu-text) 50%, transparent)', marginBottom: '12px' }}>KEYBINDINGS</div>
              <FrostedCard style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ fontWeight: 'bold', color: 'var(--pihu-text)', borderBottom: '1px solid var(--pihu-border)', paddingBottom: '8px' }}>Action</div>
                <div style={{ fontWeight: 'bold', color: 'var(--pihu-text)', borderBottom: '1px solid var(--pihu-border)', paddingBottom: '8px' }}>Keybinding</div>
                
                {Object.entries(keybindings).map(([key, action]) => (
                  <React.Fragment key={key}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>{action.replace('layout:', '').replace(':', ' ')}</div>
                    <div>
                      <Chip>{key}</Chip>
                    </div>
                  </React.Fragment>
                ))}
              </FrostedCard>
            </div>

          </div>
        )}

        {activeTab === 'components' && (
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
              <div>
                <h1 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: 'bold' }}>UI Components Showcase</h1>
                <p style={{ margin: 0, color: 'color-mix(in srgb, var(--pihu-text) 60%, transparent)', fontSize: '14px' }}>Preview of the Frost Glassmorphism design system.</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              
              {/* BUTTONS */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.05em', color: 'color-mix(in srgb, var(--pihu-text) 50%, transparent)', marginBottom: '12px' }}>BUTTONS</div>
                <FrostedCard style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <Button variant="primary">Primary Button</Button>
                  <Button variant="secondary">Secondary Button</Button>
                  <Button variant="ghost">Ghost Button</Button>
                  <Button variant="danger">Danger Button</Button>
                  <Button variant="icon"><Component size={16} /></Button>
                </FrostedCard>
              </div>

              {/* INPUTS */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.05em', color: 'color-mix(in srgb, var(--pihu-text) 50%, transparent)', marginBottom: '12px' }}>INPUTS & CONTROLS</div>
                <FrostedCard style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <Input placeholder="Default Input" />
                  <Input placeholder="Search..." leftIcon={<Search size={16} />} />
                  <Select options={[{ label: 'Option 1', value: '1' }, { label: 'Option 2', value: '2' }]} />
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <Switch checked />
                    <Switch />
                    <Checkbox checked />
                    <Checkbox indeterminate />
                  </div>
                </FrostedCard>
              </div>

              {/* BADGES & CHIPS */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.05em', color: 'color-mix(in srgb, var(--pihu-text) 50%, transparent)', marginBottom: '12px' }}>BADGES & CHIPS</div>
                <FrostedCard style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <Badge variant="new">New</Badge>
                  <Badge variant="pro">Pro</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="error">Error</Badge>
                  <Chip variant="default" onDelete={() => {}}>Design</Chip>
                  <Chip variant="outline" onDelete={() => {}}>Development</Chip>
                </FrostedCard>
              </div>

              {/* TABS & AVATARS */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.05em', color: 'color-mix(in srgb, var(--pihu-text) 50%, transparent)', marginBottom: '12px' }}>TABS & AVATARS</div>
                <FrostedCard style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                  <Tabs tabs={[{ id: '1', label: 'Overview' }, { id: '2', label: 'Analytics' }]} activeTab="1" onChange={() => {}} />
                  <AvatarGroup max={3}>
                    <Avatar fallback="MJ" status="online" />
                    <Avatar fallback="AI" status="busy" />
                    <Avatar fallback="PO" status="away" />
                    <Avatar fallback="XX" />
                  </AvatarGroup>
                </FrostedCard>
              </div>

              {/* PROGRESS */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.05em', color: 'color-mix(in srgb, var(--pihu-text) 50%, transparent)', marginBottom: '12px' }}>PROGRESS</div>
                <FrostedCard style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <ProgressBar value={75} />
                  <ProgressBar indeterminate />
                  <div style={{ display: 'flex', gap: '24px' }}>
                    <ProgressRing value={75} />
                    <ProgressRing value={45} color="#10b981" />
                  </div>
                </FrostedCard>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
