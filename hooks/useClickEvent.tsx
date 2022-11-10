
import { DataStore } from '@aws-amplify/datastore';
import { Exp1 } from '../src/models';

import { API, graphqlOperation} from 'aws-amplify';
import GraphQLAPI from '@aws-amplify/api-graphql';

import { createExp1 } from '../src/graphql/mutations';


interface Event {
    tag: string,
    type: string,
    time: number,
}

export interface GraphQLResult {
    data?: object;
    errors?: [object];
    extensions?: {
        [key: string]: any;
    };
}

export async function eventTracker(event: Event) {
    const prevUser = window.localStorage.getItem('lom13-exp1');
    const newEvent = {
        tag: event.tag,
        type: event.type,
        time: (new Date().getTime() - event.time)/1000,
        user: (prevUser || 'U-' + event.time),
    }

    try {
        const { data } : any  = await API.graphql(graphqlOperation(
          createExp1,
          {input: newEvent}
        ));


        if (!prevUser && data && data.createExp1 && data.createExp1.id)
            window.localStorage.setItem('lom13-exp1', 'U-' + event.time);

        return data.createExp1.id;

      } catch (e){
        if (typeof e === "string") {
            e.toUpperCase() // works, `e` narrowed to string
        } else if (e instanceof Error) {
            e.message // works, `e` narrowed to Error
        }
      }

}
