import {Publisher, Subjects, TicketUpdatedEvent} from '@sobsontickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
}
