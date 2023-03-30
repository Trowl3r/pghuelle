import { Pool } from 'pg';
import DataBase from './DataBase';
import { foreignKeyConstraint, notNull, primaryKey, size } from '../functions/constraints';
import { DataType, Constraints, CreateTableProps, foreignKey, dropConstraints } from '../interfaces/TableDefinition';

/**
 * Data Definition class, that does everything needed for structure data
 */
export default class DataDefinitionClass extends DataBase {
  /**
   * gets the current string and connection
   */
  constructor(q: string, pool: Pool) {
    super(q, pool);
  }

  /**
   * Private Method for generating 1 column by constraints with given options
   * JUST A HELPER METHOD FOR MORE ORGANIZED / READABLE CODE
   */
  private generateColumn(options: Constraints): void {
    this.q += ` ${options.datatype}`;
    this.q += size(options.size);
    this.q += primaryKey(options.primaryKey);
    this.q += notNull(options.notNull);
  }

  /**
   * Geneartes a simple create table, takes a name, the options and if not exists bool
   * @param props
   * @param ine If not exists option
   */
  createTable(props: CreateTableProps, ine: boolean): DataDefinitionClass {
    this.q = 'CREATE TABLE ';
    if (ine) this.q += 'IF NOT EXISTS ';
    this.q += `${props.name} (\n`;

    const columns = props.columns;
    const columnNames = Object.keys(columns);
    let i = 0; // TODO: Change this
    let fks: foreignKey[] = [];

    columnNames.forEach((name) => {
      const options: Constraints = columns[name];
      this.q += `\t${name}`;
      this.generateColumn(options);
      if (options.foreignKey) fks.push(options.foreignKey); // Add fk if exists on row
      if (i < columnNames.length - 1 || fks.length > 0) this.q += ',\n'; // check if this is the last line
      i++;
    });

    i = 0;
    // Add all fks add the end
    fks.forEach((fk) => {
      this.q += '\n' + foreignKeyConstraint(fk);
      // Check if this is the last foreign key
      if (i < fks.length - 1) this.q += ',';
      else '\n';
      i++;
    });

    this.q += '\n);';
    return this;
  }

  /**
   * 
   * Drops the given table with given constaraint
   * @param table 
   * @param constraint 
   * @param ie 
   * @returns 
   */
  dropTable(table: string, constraint: dropConstraints = 'CASCADE', ie = false): DataDefinitionClass {
    this.q += `DROP TABLE ${ie ? 'IF EXISTS ' : ''}${table} ${constraint}`;

    return this;
  }
}
