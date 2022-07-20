import {
  PaymentCreatedEvent,
  Publisher,
  Subjects
} from '@otkmob-tickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
