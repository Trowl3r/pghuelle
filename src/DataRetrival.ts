class DataRetrivalClass {
    q: string;

    constructor(q: string) {
        this.q = q;
    }

    from(table: string, ...args: string[]) {
        this.q += `FROM ${table}`;

        args.forEach(property => {
            this.q += `, ${property} `;
        });

        return this;
    }

    getQuery() {
        return this.q;
    }

    // TODO: Create Execute function to execute the query  
}

export default function selectr(f: string = "*", ...args: string[]): DataRetrivalClass {
    let q = `SELECT ${f}${args.length > 0 ? "" : " "}`; // TODO: FIX THIS UGLY FORMAT

    args.forEach(property => {
        q += `, ${property} `;
    });

    return new DataRetrivalClass(q);
}