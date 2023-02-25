import { Pool } from 'pg';
import DataBase from '../DataClasses/DataBase';
import { equal, generateFrom } from '../functions/helpers';

export default class DataRetrivalClass extends DataBase {
  constructor(q: string, pool: Pool) {
    super(q, pool);
  }

  from(table: string, ...args: string[]): DataRetrivalClass {
    this.q += generateFrom(table, ...args);

    return this;
  }

  namedFrom(tables: {[key: string]: string}) {
    this.q += `FROM `;
    
  }

  desc(p: string = "id"): DataRetrivalClass {
    this.q += `ORDER BY ${p} DESC`;

    return this;
  }

  asc(p: string = "id"): DataRetrivalClass {
    this.q += `ORDER BY ${p} ASC`;

    return this;
  }

  where(props: { [key: string]: string | number; }): DataRetrivalClass {
    this.q += `WHERE ${equal(props, "WHERE")}`;
    
    return this;
  }
}
