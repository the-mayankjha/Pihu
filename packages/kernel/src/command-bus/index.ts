export interface CommandBus {
  register(
    id: string,
    handler: Function
  ): void;
  execute(
    id: string,
    payload?: unknown
  ): Promise<unknown>;
}
