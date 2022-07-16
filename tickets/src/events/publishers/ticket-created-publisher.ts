import {
  Publisher,
  Subjects,
  TicketCreatedEvent
} from '@otkmob-tickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
