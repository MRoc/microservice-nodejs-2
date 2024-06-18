import {
  BaseListener,
  ExpirationCompleteEvent,
  OrderStatus,
  Subjects,
  natsWrapper,
} from "@mroc/ex-ms-common/build";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Order } from "../../models/order";
import { OrderCancelledPublisher } from "../publishers/order-cancelled-publisher";

export class ExpirationCompleteListener extends BaseListener<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
  readonly queueGroupName = queueGroupName;
  async onMessage(data: ExpirationCompleteEvent["data"], msg: Message) {
    const { orderId } = data;

    const order = await Order.findById(orderId).populate("ticket");
    if (!order) {
      throw new Error("Order not found");
    }

    order.set({ status: OrderStatus.Cancelled });
    await order.save();

    await new OrderCancelledPublisher(natsWrapper.client()).publish({
      id: order.id,
      version: order.version,
      status: OrderStatus.Cancelled,
      userId: order.userId,
      expiresAt: order.expiresAt.toISOString(),
      ticket: {
        id: order.ticket.id,
        price: order.ticket.price,
      },
    });

    msg.ack();
  }
}
