import { Pool } from 'pg';
import DataBase from '../DataClasses/DataBase';
import { equal, generateFrom } from '../functions/helpers';

/**
 * Data Retrival class, that does everything needed for querying data 
 */
export default class DataRetrivalClass extends DataBase {
  /**
   * gets the current string and connection
   */
  constructor(q: string, pool: Pool) {
    super(q, pool);
  }

  /**
   * Generates the from statement 
   * @param table 
   * @param args 
   * @returns DataRetrivalClass 
   */
  from(table: string, ...args: string[]): DataRetrivalClass {
    this.q += generateFrom(table, ...args);

    return this;
  }

  /**
   * Orders result by desc order
   * @param p 
   * @returns DataRetrivalClass
   */
  desc(p: string = "id"): DataRetrivalClass {
    this.q += `ORDER BY ${p} DESC`;

    return this;
  }

  /**
   * Orders result by asc order
   * @param p 
   * @returns DataRetrivalClass
   */
  asc(p: string = "id"): DataRetrivalClass {
    this.q += `ORDER BY ${p} ASC`;

    return this;
  }

  /**
   * Executes the where statement 
   * @param props 
   * @returns DataRetrivalClass
   */
  where(props: { [key: string]: string | number; }): DataRetrivalClass {
    this.q += `WHERE ${equal(props, "WHERE")}`;
    
    return this;
  }
}
