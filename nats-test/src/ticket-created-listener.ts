import { Message, Stan } from "node-nats-streaming";
import { BaseListener } from "./base-listener";

export class TicketCreatedListener extends BaseListener {
  subject = "ticket:created";
  queueGroupName = "payments-service";

  constructor(client: Stan) {
    super(client);
  }

  onMessage(data: any, msg: Message) {
    console.log("Event data!", data);
    msg.ack();
  }
}
