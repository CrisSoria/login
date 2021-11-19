// chequara que los datos que se estan enviando son posibles
import { ROLES } from "../models/Role";
import User from "../models/User";

export const checkDuplicatedUsernameOrMail = async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).json({ message: "The user already exists" });

  const email = await User.findOne({ email: req.body.email });
  if (email)
    return res.status(400).json({ message: "The email already exists" });

  next();
};

export const checkRolesExisted = (req, res, next) => {
  const { roles } = req.body;

  if (roles) {
    for (let i = 0; i < roles.length; i++) {
      //deberia hacer una consulta a la DB y traer un array de roles existentes (ahora lo hardcodeo)
      if (!ROLES.includes(roles[i])) {
        res.status(400).json({ message: `Role ${roles[i]} does not exist` });
      }
    }
  }
  next();
};
