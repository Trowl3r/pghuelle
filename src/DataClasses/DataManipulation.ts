import { Pool } from 'pg';
import DataBase from './DataBase';
import { equal, generateFrom } from '../functions/helpers';

/**
 * Data Retrival class, that does everything needed for 
 * inserting, deleteing and updating data
 */
export default class DataManipulationClass extends DataBase {
  /**
   * gets the current string and connection
   */
  constructor(q: string, pool: Pool) {
    super(q, pool);
  }

  /**
   * Generates the from statement 
   * @param table 
   * @returns DataManipulationClass
   */
  from(table: string): DataManipulationClass {
    this.q += generateFrom(table, ...[]);

    return this;
  }

  /**
   * Generates the string to insert data to database
   * @param table 
   * @returns DataManipulationClass
   */
  values(...args: string[]): DataManipulationClass {
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

  /**
   * Generates query to set data at update 
   * @param props 
   * @returns DataManipulationClass 
   */
  set(props: { [key: string]: string | number }): DataManipulationClass {
    this.q += `SET ${equal(props, 'SET')}`;

    return this;
  }

  /**
   * Executes the where statement 
   * @param props 
   * @returns DataManipulationClass 
   */
  where(props: { [key: string]: string | number }): DataManipulationClass {
    this.q += `WHERE ${equal(props, "WHERE")}`;

    return this;
  }
}
