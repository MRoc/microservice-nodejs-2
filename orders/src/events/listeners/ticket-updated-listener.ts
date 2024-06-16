import {
  BaseListener,
  TicketUpdatedEvent,
  Subjects,
  NotFoundError,
} from "@mroc/ex-ms-common/build";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Ticket } from "../../models/ticket";

export class TicketUpdatedListener extends BaseListener<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
  readonly queueGroupName = queueGroupName;
  async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
    const { id } = data;
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      throw new NotFoundError();
    }

    const { title, price } = data;
    ticket.set({ title, price });

    await ticket.save();

    msg.ack();
  }
}
