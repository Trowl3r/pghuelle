import { CreateTableProps, dropConstraints } from '../interfaces/TableDefinition';
import PGHuelle from '../PGHuelle';
import { writeFileSync } from 'fs';

// TODO: work on a way to generate a script string with the props
// given as they are eg: getScriptString(person, manager, company)
// instead of an Array

/***
 * Returns a string that can be used as an installation script
 * @param props
 * @return
 */
export function generateScriptString(
  huelle: PGHuelle,
  props: Array<CreateTableProps>,
  ine: boolean = false,
  dropOption: dropConstraints = 'CASCADE',
  ...args: string[]
): string {
  let script: string = '';

  props.forEach((prop) => {
    script += huelle.dropTable(prop.name, dropOption, true).getQuery() + ';\n';
  });

  // Add extra linebreak just for formatting purposes
  script += '\n';

  props.forEach((prop) => {
    script += huelle.createTable(prop, ine).getQuery() + '\n\n';
  });

  args.forEach((arg) => {
    script += arg + ";\n";
  })

  return script;
}

// TODO: Include inserts the the generate aswell
export async function generateScript(
  huelle: PGHuelle,
  props: Array<CreateTableProps>,
  path: string,
  ine: boolean = false,
  dropOption: dropConstraints = 'CASCADE',
  ...args: string[]
) {
  try {
    await writeFileSync(path, generateScriptString(huelle, props, ine, dropOption, ...args));
    console.log('Success generating .sql file');
  } catch (err: any) {
    console.log(err);
  }
}
