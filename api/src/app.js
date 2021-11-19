import express from "express";
import morgan from "morgan";

import productsRoute from "./routes/products.routes";
import usersRoute from "./routes/users.routes";
import authRoute from "./routes/auth.routes";

// roles mock al iniar app
import { createRoles } from "./libs/initialSetup";

const app = express();
createRoles();

// voy atraer a modo de ejemoplo los datos del package.json
import pkg from "../package.json";
app.set("pkg", pkg);

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: app.get("pkg").name,
    author: app.get("pkg").author,
    description: app.get("pkg").description,
    version: app.get("pkg").version,
  });
});

app.use("/api/products", productsRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);

export default app;
