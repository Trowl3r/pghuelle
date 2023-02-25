export function count(q: string): string {
    return `COUNT(${q})`;
}

export function max(q: string): string {
    return `MAX(${q})`;
}

export function min(q: string): string {
    return `MIN(${q})`;
}

export function avg(q: string): string {
    return `AVG(${q})`;
}

export function sum(q: string): string {
    return `SUM(${q})`;
}
