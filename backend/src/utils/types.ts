import { ValidationResult } from "joi";

export type ValidatedEvent<T> =
  | ValidationResult<T>
  | { error: string; value: null };
