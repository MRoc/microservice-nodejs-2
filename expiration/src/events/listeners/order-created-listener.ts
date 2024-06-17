import { BaseListener, OrderCreatedEvent, Subjects } from "@mroc/ex-ms-common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { expirationQueue } from "../../queues/expiration-queue";

export class OrderCreatedListener extends BaseListener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  readonly queueGroupName = queueGroupName;
  async onMessage(
    data: OrderCreatedEvent["data"],
    msg: Message
  ): Promise<void> {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    console.log(`Expiring order ${data.id} in ${delay}ms for job!`);
    await expirationQueue.add("order", { orderId: data.id }, { delay });
    msg.ack();
  }
}
