import {ExpirationCompletedEvent, Publisher, Subjects} from '@sobsontickets/common';

export class ExpirationCompletedPublisher extends Publisher<ExpirationCompletedEvent> {
    readonly subject = Subjects.ExpirationCompleted;
}
