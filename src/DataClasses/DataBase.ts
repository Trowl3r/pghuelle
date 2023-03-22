import { Pool } from 'pg';

/**
 * Base class, from which all Data classes inherit
 */
export default abstract class DataBase {
  q: string;
  pool: Pool;

  /**
   * This class gets the current string that has been generated and the pool connection 
   * @param q 
   * @param pool 
   */
  constructor(q: string, pool: Pool) {
    this.q = q;
    this.pool = pool;
  }

  /**
   *  Abstract methods, that will be available in all Classes 
   * @param table 
   * @param args 
   */
  abstract from(table: string, ...args: string[]): DataBase;
  abstract where(props: { [key: string]: string | number }): DataBase;

  /**
   * gets the current generated query 
   * @returns string
   */
  getQuery(): string {
    return this.q;
  }

  /**
   * Execute the generated query 
   * @returns TODO
   */
  execute() {
    return this.pool.query(this.q);
  }
}