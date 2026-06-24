import type { EventBus } from "./event-bus";
import type { CommandBus } from "./command-bus";
import type { ServiceRegistry } from "./services";

export class Kernel {
  events: EventBus;
  commands: CommandBus;
  services: ServiceRegistry;

  constructor(events: EventBus, commands: CommandBus, services: ServiceRegistry) {
    this.events = events;
    this.commands = commands;
    this.services = services;
  }
}
