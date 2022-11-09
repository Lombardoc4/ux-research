import { ModelInit, MutableModel } from "@aws-amplify/datastore";

type Exp1MetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Exp1 {
  readonly id: string;
  readonly tag?: string | null;
  readonly type?: string | null;
  readonly time?: number | null;
  readonly user?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Exp1, Exp1MetaData>);
  static copyOf(source: Exp1, mutator: (draft: MutableModel<Exp1, Exp1MetaData>) => MutableModel<Exp1, Exp1MetaData> | void): Exp1;
}