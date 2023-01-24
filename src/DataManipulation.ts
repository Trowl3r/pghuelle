import { Pool } from "pg";
import DataBase from "./DataBase";
import { generateFrom } from "./helpers";

export default class DataManipulationClass extends DataBase {
  constructor(q: string, pool: Pool) {
    super(q, pool);
  }

  from(table: string): DataManipulationClass {
    this.q = generateFrom(this.q, table, ...[]); 

    return this;
  }
}