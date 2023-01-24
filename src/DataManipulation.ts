import { Pool } from 'pg';
import DataBase from './DataBase';
import { generateFrom } from './helpers';

export default class DataManipulationClass extends DataBase {
  constructor(q: string, pool: Pool) {
    super(q, pool);
  }

  from(table: string): DataManipulationClass {
    this.q = generateFrom(this.q, table, ...[]);

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
    this.q += 'SET ';

    // This is a really ugly way but since I want to have a prototype,
    // this is ok for the start
    // TODO: Make this more beautiful
    let c = Object.keys(props).length;
    let i = 1;
    for (const k in props) {
      const v = props[k];

      if (isNaN(Number(v))) {
        if (i === c) this.q += `${k}='${v}'`;
        else this.q += `${k}='${v}', `;
      } else {
        if (i === c) this.q += `${k}=${v}`;
        else this.q += `${k}=${v}, `;
      }

      i++;
    }

    return this;
  }
}
