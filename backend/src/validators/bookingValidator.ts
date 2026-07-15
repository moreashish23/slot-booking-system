import { checkSchema } from "express-validator";
import { objectIdParamSchema } from "./commonValidator";

export const bookSlotValidator = checkSchema({
  id: objectIdParamSchema("slot id"),
});

export const cancelBookingValidator = checkSchema({
  id: objectIdParamSchema("booking id"),
});