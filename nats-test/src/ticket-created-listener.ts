import { Message, Stan } from "node-nats-streaming";
import { BaseListener } from "./base-listener";
import { TicketCreatedEvent } from "./ticket-created-event";
import { Subjects } from "./subjects";

export class TicketCreatedListener extends BaseListener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = "payments-service";

  constructor(client: Stan) {
    super(client);
  }

  onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    console.log("TicketCreatedListener", data);
    msg.ack();
  }
}
