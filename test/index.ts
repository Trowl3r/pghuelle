// TODO: CREATE EXPORT STRUCTURE, THAT ALL AGGREGATE + TYPES CAN BE IMPORTED VIA NPM
import PGHuelle from '../src';
import { count } from '../src/functions/functions';
import { CreateTableProps } from '../src/interfaces/TableDefinition';

const config = {
  user: 'postgres',
  password: 'root',
  port: 5432,
  database: 'node_test',
  host: 'localhost',
};

const db = new PGHuelle(config);

/* db.select()
  .from('person')
  .execute()
  .then((res: { rows: any; }) => console.log(res.rows))
  .catch((err: any) => console.error(err)); */

// console.log(db.select(count('*')).from('person').getQuery());

/* db.select()
  .from('person')
  .where({ id: 1 })
  .asc('name')
  .execute()
  .then((res) => console.log(res.rows))
  .catch((err) => console.error(err)); */

/* db.delete()
  .from('person')
  .where({id: 1})
  .execute()
  .then((res) => console.log('Deleted Table'))
  .catch((err) => console.error(err));  */

/* db.insert('person')
  .values('3', 'Torben', '21')
  .execute()
  .then((res) => console.log('Created Values'))
  .catch((err) => console.error(err)); */

/* db.update('person')
  .set({ id: 1, name: 'Torben', age: 27 })
  .execute()
  .then((res) => console.log('Updated Values'))
  .catch((err) => console.error(err)); */

// Create Table
const manager: CreateTableProps = {
  name: 'Manager',
  columns: {
    id: {
      datatype: 'INT',
      primaryKey: true,
    },
    name: {
      datatype: 'VARCHAR',
      size: 50,
    },
  },
};

const company: CreateTableProps = {
  name: 'Company',
  columns: {
    id: {
      datatype: 'INT',
      primaryKey: true,
    },
    person: {
      datatype: 'INT',
      notNull: true,
      foreignKey: {
        keys: ['person'],
        table: 'Person',
        tableKey: 'id',
        onDelete: 'CASCADE',
      },
    },
    manager: {
      datatype: 'INT',
      notNull: true,
      foreignKey: {
        keys: ['manager'],
        table: 'Manager',
        tableKey: 'id',
        onDelete: 'RESTRICT',
      },
    },
    name: {
      datatype: 'VARCHAR',
      size: 50,
    },
  },
};

// console.log(db.createTable(company).getQuery());

/* db.createTable(manager)
  .execute()
  .then((res) => console.log('Table Inserted'))
  .catch((err) => console.log(err)); */

/* db.insert('Manager').values('1', 'Manager 1')
  .execute()
  .then((res) => console.log("Inserted"))
  .catch((err) => console.log(err));  */

/* db.createTable(company)
  .execute()
  .then((res) => console.log('Table Inserted'))
  .catch((err) => console.log(err)); */

db.insert('Company').values('1', '2', '1','Test')
  .execute()
  .then((res) => console.log("Inserted"))
  .catch((err) => console.log(err)); 
