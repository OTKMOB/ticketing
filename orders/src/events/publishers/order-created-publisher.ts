import { Publisher, OrderCreatedEvent, Subjects } from '@otkmob-tickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
