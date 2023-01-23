import PGHuelle from '../src';

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
  .then((res) => console.log(res.rows))
  .catch((err) => console.error(err)); */

/* new PGHuelle(config).select()
  .from('person')
  .execute()
  .then((res) => console.log(res.rows))
  .catch((err) => console.error(err));  */

db.select().from("person").desc("name").execute()
  .then((res) => console.log(res.rows))
  .catch((err) => console.error(err));  