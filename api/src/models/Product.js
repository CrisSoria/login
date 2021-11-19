import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: String,
    category: String,
    price: Number,
    imgUrl: String,
  },
  {
    timestamps: true, //quiero que guarde fechas de creacion o actualizacion
    versionKey: false, // que no guarde la version del elemento
  }
);

export default model("Product", productSchema);
