import { MousePointer2, ToggleRight, List, Tag, Search } from 'lucide-react';
import { GlassCard, Switch, Button, Select, Badge, Input, MusicPlayerWidget } from '../components';
import { useLayoutStore } from '@pihu/layout-engine';

export function SettingsPreviewSidebar() {
  const { workspaces, activeWorkspaceId, maximizedPanelId } = useLayoutStore();
  const workspace = activeWorkspaceId ? workspaces[activeWorkspaceId] : null;
  const layout = workspace?.centerLayout;

  const isSettingsMaximized = !!maximizedPanelId;
  const isOnlyPanel = layout?.type === 'panel' && layout.tabs.length === 1;
  const showPreviews = isSettingsMaximized || isOnlyPanel;

  return (
    <div style={{ padding: '16px', color: 'var(--pihu-text)', height: '100%', overflow: 'hidden', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ margin: '0 0 16px 0', color: 'var(--pihu-primary)', fontSize: '14px', fontWeight: 'bold', flexShrink: 0 }}>Tools & Inspect</h3>
      <div style={{ fontSize: '12px', color: 'color-mix(in srgb, var(--pihu-text) 60%, transparent)', marginBottom: '24px', flexShrink: 0 }}>Right Sidebar Widgets</div>
      
      <div style={{ overflowY: 'auto', overflowX: 'hidden', flex: 1, paddingRight: '4px' }}>
        {showPreviews && (
          <>
            {/* Music Widget Showcase */}
            <div style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.05em', color: 'var(--pihu-text)', marginBottom: '12px' }}>Glass Music Player</div>
            <div style={{ marginBottom: '24px' }}>
              <MusicPlayerWidget />
            </div>

            {/* Preview */}
            <div style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.05em', color: 'var(--pihu-text)', marginBottom: '12px' }}>Preview</div>
            <GlassCard style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px 16px' }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F59E0B' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }} />
              </div>
              
              <Button variant="primary" size="md" style={{ width: '100%' }}>
                Primary Button
              </Button>
              
              <Button variant="secondary" size="md" style={{ width: '100%' }}>
                Secondary Button
              </Button>
              
              <Button variant="ghost" size="md" style={{ width: '100%' }}>
                Ghost Button
              </Button>
            </GlassCard>

            {/* UI Preview */}
            <div style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.05em', color: 'var(--pihu-text)', marginBottom: '12px' }}>UI Preview</div>
            <GlassCard style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', flexShrink: 0 }}>
                  <span style={{ opacity: 0.6, display: 'flex' }}><MousePointer2 size={16} /></span> Button
                </div>
                <Button variant="primary" size="sm">Click</Button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', flexShrink: 0 }}>
                  <span style={{ opacity: 0.6, display: 'flex' }}><ToggleRight size={16} /></span> Toggle
                </div>
                <Switch checked={true} onChange={() => {}} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', flexShrink: 0 }}>
                  <span style={{ opacity: 0.6, display: 'flex' }}><List size={16} /></span> Select
                </div>
                <div style={{ flex: 1, maxWidth: '120px' }}>
                  <Select 
                    value="option1"
                    onChange={() => {}}
                    options={[
                      { label: 'Option 1', value: 'option1' },
                      { label: 'Option 2', value: 'option2' }
                    ]}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', flexShrink: 0 }}>
                  <span style={{ opacity: 0.6, display: 'flex' }}><Tag size={16} /></span> Badge
                </div>
                <Badge variant="primary">New</Badge>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', alignItems: 'stretch', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px' }}>
                  <span style={{ opacity: 0.6, display: 'flex' }}><Search size={16} /></span> Search
                </div>
                <Input 
                  placeholder="Search components..." 
                  leftIcon={<Search size={14} />}
                />
              </div>

            </GlassCard>
          </>
        )}
      </div>
    </div>
  );
}
