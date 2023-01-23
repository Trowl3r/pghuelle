import { Pool } from 'pg';

export default class DataRetrivalClass {
  q: string;
  pool: Pool;

  constructor(q: string, pool: Pool) {
    this.q = q;
    this.pool = pool;
  }

  from(table: string, ...args: string[]): DataRetrivalClass {
    // TODO: THINK ABOUT MAKING IT NOT DRY WITH SELECT
    this.q += `FROM ${table}${args.length > 0 ? '' : ' '}`; // TODO: FIX THIS UGLY FORMAT

    args.forEach((property) => {
      this.q += `, ${property} `;
    });

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

  getQuery(): string {
    return this.q;
  }

  execute() {
    return this.pool.query(this.q);
  }
}
