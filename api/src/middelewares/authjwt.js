// midelwere de autorizacion. verificara si tengo un token que sea valido|
import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";
import Role from "../models/Role";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];

    if (!token) return res.status(403).json({ message: "No token provider" });

    // voy a extraer el id que introduje en el token
    const decoded = jwt.verify(token, config.SECRET);
    // console.log(decoded);
    req.userId = decoded.id; //todas las subsiguientes aplicaciones que tengan un req podran acceder a este req.userId

    const user = await User.findById(req.userId, { password: 0 }); //no traigas la contraseña
    if (!user) return res.status(404).json({ message: "no user found" });
    next();
  } catch (error) {
    console.log("NO PASO EL middelewares DE VERIFICACION DE TOKEN", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const isModerator = async (req, res, next) => {
  const user = await User.findById(req.userId);
  const roles = await Role.find({ _id: { $in: user.roles } });

  console.log(roles);
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "moderator") {
      next();
      return;
    }
  }
  return res.status(403).json({ message: "Require Moderator role" });
};

export const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId);
  const roles = await Role.find({ _id: { $in: user.roles } });

  console.log(roles);
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "admin") {
      next();
      return;
    }
  }
  return res.status(403).json({ message: "Require Admin role" });
};
