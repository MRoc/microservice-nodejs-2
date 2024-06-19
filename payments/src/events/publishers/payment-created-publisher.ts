import {
  Subjects,
  BasePublisher,
  PaymentCreatedEvent,
} from "@mroc/ex-ms-common/build";

export class PaymentCreatedPublisher extends BasePublisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
