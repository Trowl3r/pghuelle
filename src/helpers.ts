export function generateFrom(table: string, ...args: string[]): string {
  let q = `FROM ${table}${args.length > 0 ? '' : ' '}`; // TODO: FIX THIS UGLY FORMAT

  args.forEach((property) => {
    q += `, ${property} `;
  });

  return q;
}

export function equal(props: { [key: string]: string | number }, f: 'WHERE' | 'SET'): string {
  let q = '';

  let char = f === 'WHERE' ? 'SET' : ',';

  let c = Object.keys(props).length;
  let i = 1;
  for (const k in props) {
    const v = props[k];

    if (isNaN(Number(v))) {
      if (i === c) q += `${k} = '${v}' `;
      else q += `${k} = '${v}' ${char} `;
    } else {
      if (i === c) q += `${k} = ${v} `;
      else q += `${k} = ${v} ${char} `;
    }

    i++;
  }

  return q;
}
