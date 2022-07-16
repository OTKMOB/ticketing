import {
  Publisher,
  Subjects,
  TicketUpdatedEvent
} from '@otkmob-tickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
