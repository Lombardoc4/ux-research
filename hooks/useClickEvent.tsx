import { type } from "os";

interface Event {
    tag: string,
    type: string,
    time: number,
    // user: string,
}

export async function eventTracker(event: Event) {
    const prevUser = window.localStorage.getItem('lom13-exp1')
    
    console.log('event', {
        tag: event.tag,
        type: event.type,
        timing: (new Date().getTime() - event.time)/1000,
        user: (prevUser || 'U-' + event.time),
    })
    // Send data to db
    const confirmResult = true;
    // const confirmResult = await DataStore.save(
    //     new Exp1({
    //         "tag": event.tag,
    //         "type": event.type,
    //         "timing": (new Date().getTime() - event.time)/1000,
    //         "user": (prevUser || 'U-' + event.time),
    //     })
    // );
    
    
    // Set Cookie/Local Storage
    if (!prevUser && confirmResult) 
        window.localStorage.setItem('lom13-exp1', 'U-' + event.time);
    
    // return confirmation
    
    
}
