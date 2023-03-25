import { Pool } from 'pg';
import DataBase from './DataBase';
import { foreignKeyConstraint, notNull, primaryKey, size } from '../functions/constraints';
import { DataType, Constraints, CreateTableProps, foreignKey } from '../interfaces/TableDefinition';

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
      if (options.foreignKey) fks.push(options.foreignKey);
      if (i < columnNames.length - 1 || fks.length > 0) this.q += ',\n';
      i++;
    });
    this.q += '\n';

    i = 0;
    fks.forEach((fk) => {
      this.q += '\n' + foreignKeyConstraint(fk);
      if(i < fks.length - 1) this.q += ",";
      else "\n"
      i++;
    });

    this.q += '\n);';
    return this;
  }
}
