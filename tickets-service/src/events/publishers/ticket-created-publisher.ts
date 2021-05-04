import {Publisher, Subjects, TicketCreatedEvent} from '@sobsontickets/common';

export class TicketCreatedPublisher extends  Publisher<TicketCreatedEvent>{
    readonly subject = Subjects.TicketCreated
}
