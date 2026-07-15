import { ParamSchema } from "express-validator";
import mongoose from "mongoose";


export function objectIdParamSchema(fieldName: string): ParamSchema {
  return {
    in: ["params"],
    custom: {
      options: (value: string) => mongoose.Types.ObjectId.isValid(value),
    },
    errorMessage: `Invalid ${fieldName}`,
  };
}