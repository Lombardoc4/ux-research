
interface Event {
    tag: string,
    type: string
}

export function eventTracker(event: Event) {
    // Send data to db
    console.log('event', event)
    
    // return confirmation
    
    
}
