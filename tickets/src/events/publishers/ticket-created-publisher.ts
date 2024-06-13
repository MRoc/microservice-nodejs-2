import {
  BasePublisher,
  Subjects,
  TicketCreatedEvent,
} from "@mroc/ex-ms-common/build";

export class TickerCreatedPublisher extends BasePublisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
