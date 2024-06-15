import {
  BasePublisher,
  Subjects,
  OrderCreatedEvent,
} from "@mroc/ex-ms-common/build";

export class OrderCreatedPublisher extends BasePublisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
