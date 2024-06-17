import {
  Subjects,
  BasePublisher,
  ExpirationCompleteEvent,
} from "@mroc/ex-ms-common";

export class ExpirationCompletePublisher extends BasePublisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
