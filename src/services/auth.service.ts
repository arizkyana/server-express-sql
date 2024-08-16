import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { decrypt, encrypt } from "../helpers/encryption";
import { SECRET } from "../helpers/env";
import { validateLoginSchema, validateRegisterSchema } from "./auth.validation";
import jwt from "jsonwebtoken";

const userRepo = AppDataSource.getRepository(User);

export interface ILogin {
  identifier: string;
  password: string;
}

export const login = async (payload: ILogin) => {
  await validateLoginSchema.validate(payload);
  const { identifier, password } = payload;

  const user = await userRepo
    .createQueryBuilder("user")
    .where("user.email = :identifier OR user.username = :identifier", {
      identifier,
    })
    .getOne();

  if (!user) {
    throw new Error("user not found");
  }

  const decryptPassword = decrypt(`${SECRET}`, user.password);

  if (password !== decryptPassword) {
    throw new Error("Email and Password do not match");
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    `${SECRET}`,
    {
      expiresIn: "1h",
    }
  );

  return token;
};

export interface IRegister {
  fullName: string;
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export const register = async (payload: IRegister) => {
  await validateRegisterSchema.validate(payload);

  const { fullName, username, email, password } = payload;

  const user = new User();
  user.fullName = fullName;
  user.username = username;
  user.email = email;
  user.password = encrypt(`${SECRET}`, password);

  const result = await userRepo.save(user);

  return result;
};
