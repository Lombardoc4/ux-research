// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Exp1 } = initSchema(schema);

export {
  Exp1
};