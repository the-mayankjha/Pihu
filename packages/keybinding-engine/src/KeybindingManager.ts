import type { CommandBus } from '@pihu/kernel';

export interface KeybindingMap {
  [chordOrKey: string]: string; // e.g. "ctrl+s h" -> "layout:split:horizontal"
}

export const defaultKeybindings: KeybindingMap = {
  'ctrl+s h': 'layout:split:horizontal',
  'ctrl+s v': 'layout:split:vertical',
  'alt+ArrowUp': 'layout:focus:up',
  'alt+ArrowDown': 'layout:focus:down',
  'alt+ArrowLeft': 'layout:focus:left',
  'alt+ArrowRight': 'layout:focus:right',
  'meta+ArrowUp': 'layout:focus:up',
  'meta+ArrowDown': 'layout:focus:down',
  'meta+ArrowLeft': 'layout:focus:left',
  'meta+ArrowRight': 'layout:focus:right',
  'ctrl+m': 'layout:maximize',
  'ctrl+,': 'layout:open-settings',
  'ctrl+w': 'layout:close-tab',
  'ctrl+1': 'workspace:switch:1',
  'ctrl+2': 'workspace:switch:2',
};

export class KeybindingManager {
  private commandBus: CommandBus;
  private keymap: KeybindingMap;
  private chordState: string | null = null;
  private chordTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor(commandBus: CommandBus, customMap?: KeybindingMap) {
    this.commandBus = commandBus;
    this.keymap = { ...defaultKeybindings, ...customMap };
  }

  public updateKeymap(newMap: KeybindingMap) {
    this.keymap = newMap;
  }

  public getKeymap() {
    return this.keymap;
  }

  public startListening() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  public stopListening() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    // Ignore keydown if focused in an input/textarea
    const target = e.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
      return;
    }

    const key = this.getKeyString(e);
    if (!key) return; // e.g. just modifier pressed

    // Construct chord
    const sequence = this.chordState ? `${this.chordState} ${key}` : key;

    // Check if exact match
    const action = this.keymap[sequence];
    if (action) {
      e.preventDefault();
      this.executeAction(action);
      this.resetChord();
      return;
    }

    // Check if this is a valid prefix for any chord
    const isPrefix = Object.keys(this.keymap).some(k => k.startsWith(sequence + ' '));
    if (isPrefix) {
      e.preventDefault();
      this.chordState = sequence;
      if (this.chordTimeout) clearTimeout(this.chordTimeout);
      this.chordTimeout = setTimeout(() => this.resetChord(), 1500); // 1.5s timeout for chord
      return;
    }

    // No match, reset chord
    this.resetChord();
  };

  private executeAction(action: string) {
    if (action === 'layout:split:horizontal') this.commandBus.execute('layout:split', { direction: 'horizontal' });
    else if (action === 'layout:split:vertical') this.commandBus.execute('layout:split', { direction: 'vertical' });
    else if (action === 'layout:focus:up') this.commandBus.execute('layout:focus', { direction: 'up' });
    else if (action === 'layout:focus:down') this.commandBus.execute('layout:focus', { direction: 'down' });
    else if (action === 'layout:focus:left') this.commandBus.execute('layout:focus', { direction: 'left' });
    else if (action === 'layout:focus:right') this.commandBus.execute('layout:focus', { direction: 'right' });
    else if (action === 'layout:maximize') this.commandBus.execute('layout:maximize');
    else if (action === 'layout:open-settings') this.commandBus.execute('layout:open-settings');
    else if (action === 'layout:close-tab') this.commandBus.execute('layout:close-tab');
    else if (action === 'workspace:switch:1') this.commandBus.execute('workspace:switch', { id: 'ws-1' });
    else if (action === 'workspace:switch:2') this.commandBus.execute('workspace:switch', { id: 'ws-2' });
  }

  private resetChord() {
    this.chordState = null;
    if (this.chordTimeout) {
      clearTimeout(this.chordTimeout);
      this.chordTimeout = null;
    }
  }

  private getKeyString(e: KeyboardEvent): string {
    const modifiers = [];
    if (e.ctrlKey) modifiers.push('ctrl');
    if (e.altKey) modifiers.push('alt');
    if (e.shiftKey) modifiers.push('shift');
    if (e.metaKey) modifiers.push('meta'); // cmd on mac

    let key = e.key;
    // Don't register standalone modifiers
    if (['Control', 'Alt', 'Shift', 'Meta'].includes(key)) return '';

    // Convert to lowercase if it's a single letter for consistency
    if (key.length === 1) key = key.toLowerCase();

    return [...modifiers, key].join('+');
  }
}
