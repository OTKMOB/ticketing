import {
  Publisher,
  OrderCancelledEvent,
  Subjects
} from '@otkmob-tickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
