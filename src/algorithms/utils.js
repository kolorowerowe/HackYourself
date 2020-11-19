export const getRecipients = (messages, user_name) => {
    let recipients = [];
    for (let thread of messages) {
        if (thread.participants) {
            recipients = [...recipients, ...thread.participants.map(p => p.name).filter(p => p && p !== user_name)];
        }
    }

    return recipients;
}
