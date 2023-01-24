import { Pool } from 'pg';
import DataBase from './DataBase';
import { generateFrom } from './helpers';

export default class DataRetrivalClass extends DataBase {
  constructor(q: string, pool: Pool) {
    super(q, pool);
  }

  from(table: string, ...args: string[]): DataRetrivalClass {
    this.q = generateFrom(this.q, table, ...args);

    return this;
  }

  desc(p: string = "id"): DataRetrivalClass {
    this.q += `ORDER BY ${p} DESC`;

    return this;
  }

  asc(p: string = "id"): DataRetrivalClass {
    this.q += `ORDER BY ${p} ASC`;

    return this;
  }
}
