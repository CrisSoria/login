import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    /* relaciono a los user con el modelo de rol */
    roles: [
      {
        ref: "Role",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// methods para encryptar la contraseña y para verificarla
userSchema.statics.encryptPassword = async (password) => {
  try {
    // numero de veces que se ejecutar el algoritmo de encriptación
    const salt = await bcrypt.genSalt(10);
    // ahora hasheo la contraseña
    const encryptedPassword = await bcrypt.hash(password, salt);
    return encryptedPassword;
  } catch (err) {
    console.log("FALLÓ LA ENCRIPTACIÓN DE PASSWORD", err);
  }
};

userSchema.statics.comparePassword = async (password, receivedPassword) => {
  // metodo de bcrypt que retorna true o false
  return await bcrypt.compare(password, receivedPassword);
};

export default model("User", userSchema);
