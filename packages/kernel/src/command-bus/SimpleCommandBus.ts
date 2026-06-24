import type { CommandBus } from './index';

export class SimpleCommandBus implements CommandBus {
  private handlers = new Map<string, Function>();

  register(id: string, handler: Function): void {
    if (this.handlers.has(id)) {
      console.warn(`Command handler for ${id} is being overwritten.`);
    }
    this.handlers.set(id, handler);
  }

  async execute(id: string, payload?: unknown): Promise<unknown> {
    const handler = this.handlers.get(id);
    if (!handler) {
      throw new Error(`No handler registered for command: ${id}`);
    }
    return handler(payload);
  }
}
