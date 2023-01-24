import { Pool } from 'pg';
import DataBase from './DataBase';
import { equal, generateFrom } from './helpers';

export default class DataManipulationClass extends DataBase {
  constructor(q: string, pool: Pool) {
    super(q, pool);
  }

  from(table: string): DataManipulationClass {
    this.q += generateFrom(table, ...[]);

    return this;
  }

  values(...args: string[]) {
    this.q += 'VALUES (';

    // TODO: Make this for-loop more beautiful
    for (let i = 0; i < args.length; i++) {
      if (isNaN(Number(args[i]))) {
        if (i === args.length - 1) this.q += `'${args[i]}'`; // For Text
        else this.q += `'${args[i]}', `;
      } else {
        if (i === args.length - 1) this.q += `${args[i]}`; // For Numeric
        else this.q += `${args[i]}, `;
      }
    }

    this.q += ')';

    return this;
  }

  set(props: { [key: string]: string | number }): DataManipulationClass {
    this.q += `SET ${equal(props, 'SET')}`;

    return this;
  }

  where(props: { [key: string]: string | number }): DataManipulationClass {
    this.q += ` WHERE ${equal(props, "WHERE")}`;

    return this;
  }
}
