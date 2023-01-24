import { Pool, PoolConfig } from 'pg';
import DataRetrivalClass from './DataRetrival';
import DataManipulationClass from './DataManipulation';

export default class PGHuelle {
  pool: Pool;

  constructor(config: PoolConfig) {
    this.pool = new Pool(config);
  }

  rawQuery(f: string) {
    return this.pool.query(f);
  }

  // Data Retrival
  select(f: string = '*', ...args: string[]): DataRetrivalClass {
    let q = `SELECT ${f}${args.length > 0 ? '' : ' '}`; // TODO: FIX THIS UGLY FORMAT

    args.forEach((property) => {
      q += `, ${property} `;
    });

    return new DataRetrivalClass(q, this.pool);
  }

  // Data Manipulation
  delete(): DataManipulationClass {
    let q = 'DELETE ';

    return new DataManipulationClass(q, this.pool);
  }

  insert(t: string): DataManipulationClass {
    let q = `INSERT INTO ${t} `;

    return new DataManipulationClass(q, this.pool);
  }

  update(t: string): DataManipulationClass {
    let q = `UPDATE ${t} `;

    return new DataManipulationClass(q, this.pool);
  }
}
