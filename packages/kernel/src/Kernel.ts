import { EventBus } from "./event-bus";
import { CommandBus } from "./command-bus";
import { ServiceRegistry } from "./services";

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
