import { Pool, PoolConfig } from 'pg';
import DataRetrivalClass from './DataClasses/DataRetrival';
import DataManipulationClass from './DataClasses/DataManipulation';
import DataDefinitionClass from './DataClasses/DataDefinition';
import { CreateTableProps, dropConstraints } from './interfaces/TableDefinition';

/**
 * This class will be the base of the library.
 * Every chanining begins in this class.
 */
export default class PGHuelle {
  pool: Pool;

  /**
   * A new Pool object will be saven here with the given PoolConfig
   * @param config
   */
  constructor(config: PoolConfig) {
    this.pool = new Pool(config);
  }

  /**
   * Gives the possibility to execute a given SQL Statement
   * @param f
   * @returns TODO
   */
  rawQuery(f: string) {
    return this.pool.query(f);
  }

  // Data Retrival
  /**
   * Creates the start for a select statement, and returns a DRC
   * @param f
   * @param args
   * @returns DataRetrivalClass
   */
  select(f: string = '*', ...args: string[]): DataRetrivalClass {
    let q = `SELECT ${f}${args.length > 0 ? '' : ' '}`; // TODO: FIX THIS UGLY FORMAT

    args.forEach((property) => {
      q += `, ${property} `;
    });

    return new DataRetrivalClass(q, this.pool);
  }

  // Data Manipulation
  /**
   * Creates the start of a delete statement and return a DMC
   * @returns DataManipulationClass
   */
  delete(): DataManipulationClass {
    let q = 'DELETE ';

    return new DataManipulationClass(q, this.pool);
  }

  /**
   * Create the start of an insert statement and returns a DMC
   * @param t
   * @returns DataManipulationClass
   */
  insert(t: string): DataManipulationClass {
    let q = `INSERT INTO ${t} `;

    return new DataManipulationClass(q, this.pool);
  }

  /**
   * Create the start of an update statement and returns a DMC
   * @param t
   * @returns DataManipulationClass
   */
  update(t: string): DataManipulationClass {
    let q = `UPDATE ${t} `;

    return new DataManipulationClass(q, this.pool);
  }

  // Data Definition
  createTable(props: CreateTableProps, ine = false): DataDefinitionClass {
    return new DataDefinitionClass("", this.pool).createTable(props, ine);
  }

  dropTable(table: string, constraint: dropConstraints, ie = false): DataDefinitionClass { 
    return new DataDefinitionClass("", this.pool).dropTable(table, constraint, ie);
  }
}
