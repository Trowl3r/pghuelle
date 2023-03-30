export type dropConstraints = 'CASCADE' | 'RESTRICT';
export type DataType = 'INT' | 'VARCHAR' | 'DATE' | 'TEXT';
type onAction = 'NO ACTION' | 'RESTRICT' | 'SET NULL' | 'SET DEFAULT' | 'CASCADE';

export interface foreignKey {
  keys: string[];
  table: string;
  tableKey: string;
  onDelete?: onAction;
  onUpdate?: onAction;
}

export interface Constraints {
  datatype: DataType;
  size?: number;
  primaryKey?: boolean;
  notNull?: boolean;
  unique?: boolean;
  foreignKey?: foreignKey;
}

export interface CreateTableProps {
  name: string;
  columns: {
    [key: string]: Constraints;
  };
}
