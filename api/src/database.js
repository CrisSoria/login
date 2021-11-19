import mongoose from "mongoose";

const url = "mongodb://localhost/apilogindb";

mongoose
  .connect(url)
  .then((db) => console.log("DB is connected"))
  .catch((err) => console.error(err));
