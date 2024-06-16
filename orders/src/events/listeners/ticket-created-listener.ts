import {
  BaseListener,
  TicketCreatedEvent,
  Subjects,
} from "@mroc/ex-ms-common/build";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Ticket } from "../../models/ticket";

export class TicketCreatedListener extends BaseListener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  readonly queueGroupName = queueGroupName;
  async onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    const { id, title, price } = data;

    const ticket = Ticket.build({ id, title, price });
    await ticket.save();

    msg.ack();
  }
}
