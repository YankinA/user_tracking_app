import Joi, { ValidationResult } from "joi";
import { ValidatedEvent } from "../utils/types";

const eventSchema = Joi.object({
  event: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).default([]),
  url: Joi.string().required(),
  title: Joi.string().required(),
  ts: Joi.number().required(),
});

export const validateEvents = (
  events: any,
): ValidatedEvent<typeof eventSchema>[] => {
  if (Array.isArray(events)) {
    return events.map((event: { [key: string]: string }) =>
      eventSchema.validate(event),
    );
  }
  return [{ error: "is not array", value: null }];
};
