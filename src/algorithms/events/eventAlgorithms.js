
export const getEventStatistics = ({ events_invited = [], your_events = [], event_responses}) => {


    const {events_joined, events_declined, events_interested} = event_responses;

    return {
        yourEventsCount: your_events.length,
        eventsInvitedCount: events_invited.length,
        eventsJoinedCount: events_joined.length,
        eventsDeclinedCount: events_declined.length,
        eventsInterestedCount: events_interested.length,
    };
};