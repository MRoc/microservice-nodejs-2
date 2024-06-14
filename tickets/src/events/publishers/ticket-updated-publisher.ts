import {
  BasePublisher,
  Subjects,
  TicketUpdatedEvent,
} from "@mroc/ex-ms-common/build";

export class TicketUpdatedPublisher extends BasePublisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
