import PGHuelle from '../src';
import { generateScript, generateScriptString} from '../src/functions/functions';
import { CreateTableProps } from '../src/interfaces/TableDefinition';

const config = {
  user: 'postgres',
  password: 'root',
  port: 5432,
  database: 'node_test',
  host: 'localhost',
};

const db = new PGHuelle(config);
// Create Table
const person: CreateTableProps = {
  name: 'Person',
  columns: {
    id: {
      datatype: 'INT',
      primaryKey: true,
      notNull: true,
    },
    name: {
      datatype: 'TEXT',
      notNull: true,
    },
    age: {
      datatype: 'INT',
      notNull: true,
    },
  },
};

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

const tables: Array<CreateTableProps> = [person, manager, company];

generateScript(
  db,
  tables,
  '<path>',
  false,
  'CASCADE',
  db.insert('person').values('1', 'Test person', '21').getQuery(),
  db.insert('person').values('2', 'Test2', '30').getQuery(),
  db.insert('Manager').values('1', 'Manager 1').getQuery(),
  db.insert('Manager').values('2', 'Manager 2').getQuery(),
  db.insert('Company').values('1', '2', '1', 'Company 1').getQuery(),
  db.insert('Company').values('2', '1', '2', 'Company 2').getQuery(),
);

// This will execute the given script
db.rawQuery(
  generateScriptString(
    db,
    tables,
    false,
    'CASCADE',
    db.insert('person').values('1', 'Test person', '21').getQuery(),
    db.insert('person').values('2', 'Test2', '30').getQuery(),
    db.insert('Manager').values('1', 'Manager 1').getQuery(),
    db.insert('Manager').values('2', 'Manager 2').getQuery(),
    db.insert('Company').values('1', '2', '1', 'Company 1').getQuery(),
    db.insert('Company').values('2', '1', '2', 'Company 2').getQuery(),
  ),
)
  .then((res) => console.log('Success importing'))
  .catch((err) => console.log(err));
