export function ILike(field: string, value: string): string {
  return `${field} = '${value}'`;
}
