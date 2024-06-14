import {
  BasePublisher,
  Subjects,
  TicketUpdatedEvent,
} from "@mroc/ex-ms-common/build";

export class TickerUpdatedPublisher extends BasePublisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
