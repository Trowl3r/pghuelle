import { Pool } from 'pg';

export default abstract class DataBase {
  q: string;
  pool: Pool;

  constructor(q: string, pool: Pool) {
    this.q = q;
    this.pool = pool;
  }

  abstract from(table: string, ...args: string[]): DataBase;

  getQuery(): string {
    return this.q;
  }

  execute() {
    return this.pool.query(this.q);
  }
}