import { foreignKey } from "../interfaces/TableDefinition";

export function primaryKey(isPK: boolean | undefined): string {
  if (isPK) return ' PRIMARY KEY';
  return '';
}

export function size(size: number | undefined): string {
  if (size) return `(${size})`;
  return '';
}

export function notNull(notNull: boolean | undefined) {
  if (notNull) return ' NOT NULL';
  return '';
}

export function unique(unique: boolean | undefined) {
  if(unique) return ' UNIQUE';
  return '';
}

export function foreignKeyConstraint(fk: foreignKey): string {
  let s = "\tFOREIGN KEY(";
  for(let i = 0; i < fk.keys.length; i++){ 
    if(i == fk.keys.length - 1) {
      s += `${fk.keys[i]})`;
    }
    else s += `${fk.keys[i]}, `;
  }

  s += ` REFERENCES ${fk.table}(${fk.tableKey})`;
  if(fk.onDelete) s += ` ON DELETE ${fk.onDelete}`;
  if(fk.onUpdate) s += ` ON UPDATE ${fk.onUpdate}`;

  return s; 
}