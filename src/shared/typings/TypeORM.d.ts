import { FindConditions, ObjectLiteral } from 'typeorm';
import { EntityFieldsNames } from 'typeorm/common/EntityFieldsNames';

export type TOrderByClause<T> = {
  [P in EntityFieldsNames<T>]?: 'ASC' | 'DESC' | 1 | -1;
};

export type TWhereClause<T> =
  | string
  | ObjectLiteral
  | FindConditions<T>
  | FindConditions<T>[];
