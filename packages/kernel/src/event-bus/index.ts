export interface EventBus {
  emit<T>(
    event: string,
    payload?: T
  ): void;
  on<T>(
    event: string,
    callback: (payload: T) => void
  ): () => void;
}
