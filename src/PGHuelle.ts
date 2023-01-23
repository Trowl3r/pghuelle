import { Pool, PoolConfig } from 'pg';
import DataRetrivalClass from './DataRetrival';

export default class PGHuelle{
  pool: Pool;

  constructor(config: PoolConfig) {
    this.pool = new Pool(config);
  }

  select(f: string = '*', ...args: string[]): DataRetrivalClass {
    let q = `SELECT ${f}${args.length > 0 ? '' : ' '}`; // TODO: FIX THIS UGLY FORMAT

    args.forEach((property) => {
      q += `, ${property} `;
    });

    return new DataRetrivalClass(q, this.pool);
  }
}