export function generateFrom(q: string, table: string, ...args: string[]): string {
  q += `FROM ${table}${args.length > 0 ? '' : ' '}`; // TODO: FIX THIS UGLY FORMAT

  args.forEach((property) => {
    q += `, ${property} `;
  });

  return q;
}
