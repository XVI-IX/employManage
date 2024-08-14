import { PartialCondition } from "@app/common/domain/adapters";

export function ILike<T>(
  field: keyof T,
  value: T[keyof T] extends string ? string : never,
): PartialCondition<T> {
  const condition: PartialCondition<T> = {};
  const lowerField = field;
  const lowerValue = typeof value === 'string' ? `LOWER(${value})` : value;
  condition[lowerField as keyof T] = {
    $relational: '=',
    $value: `${lowerValue}`,
  };
}
