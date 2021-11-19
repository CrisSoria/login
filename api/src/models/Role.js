import { Schema, model } from "mongoose";

//para hardcodear los roles en los middelewares
export const ROLES = ["user", "admin", "moderator"];

const roleSchema = new Schema(
  {
    name: String,
  },
  {
    versionKey: false,
  }
);

export default model("Role", roleSchema);
//los roles se crearan por dfecto al iniciar el server
