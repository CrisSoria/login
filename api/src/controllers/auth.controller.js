import User from "../models/User";
import Role from "../models/Role";
import jwt from "jsonwebtoken";
import config from "../config";

export const signup = async (req, res) => {
  const { username, email, password, roles } = req.body;

  const newUser = new User({
    username,
    email,
    password: await User.encryptPassword(password),
  });

  // analizo si está enviado roles
  if (roles) {
    //veo si existe el rol
    const foundRoles = await Role.find({ name: { $in: roles } });
    newUser.roles = foundRoles.map((role) => role._id);
  } else {
    // si no ingresa nada le pongo el rol usuario
    const roleUser = await Role.findOne({ name: "user" });
    newUser.roles = [roleUser._id];
  }

  const savedUser = await newUser.save();
  // metodo de jwt par crear un token. Recibe el dato que guardare en el token, una palabra secreta para generarlo y un objeto de configuracion.
  const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
    expiresIn: 86400, //24 hs
  });
  res.status(200).json({ token });
};

export const signin = async (req, res) => {
  const userFound = await User.findOne({ email: req.body.email }).populate(
    "roles"
  );

  if (!userFound) return res.status(400).json({ message: "User not found" });

  const matchPassword = await User.comparePassword(
    req.body.password,
    userFound.password
  );
  if (!matchPassword)
    return res.status(401).json({ token: null, message: "Invalid password" });

  const token = jwt.sign({ id: userFound._id }, config.SECRET, {
    expiresIn: 86400, //24 hs
  });
  res.json({ token });
};
