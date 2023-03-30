// TODO: CREATE EXPORT STRUCTURE, THAT ALL AGGREGATE + TYPES CAN BE IMPORTED VIA NPM
import PGHuelle from '../src';
import { count } from '../src/functions/aggregates';
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



/* console.log(
db.select()
  .from('person')
  .join('company')
  .on({ company: 'person' }, { person: 'id' }).getQuery()
)

db.select()
  .from('person')
  .join('company')
  .on({ company: 'person' }, { person: 'id' })
  .execute()
  .then((res) => console.log(res.rows))
  .catch((err) => console.log(err)); */
