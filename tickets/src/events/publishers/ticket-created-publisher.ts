import {
  BasePublisher,
  Subjects,
  TicketCreatedEvent,
} from "@mroc/ex-ms-common/build";

export class TicketCreatedPublisher extends BasePublisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
