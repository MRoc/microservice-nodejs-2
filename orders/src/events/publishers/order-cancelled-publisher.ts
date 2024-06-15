import {
  BasePublisher,
  Subjects,
  OrderCancelledEvent,
} from "@mroc/ex-ms-common/build";

export class OrderCancelledPublisher extends BasePublisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
