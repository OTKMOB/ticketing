import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects
} from '@otkmob-tickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
