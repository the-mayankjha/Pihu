export interface ServiceRegistry {
  register<T>(
    id: string,
    service: T
  ): void;
  get<T>(id: string): T;
}
