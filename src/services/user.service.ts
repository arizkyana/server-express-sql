import { User } from "../entity/User";
import { AppDataSource } from "../data-source";

export const getUsers = async (): Promise<User[]> => {
  const userRepo = AppDataSource.getRepository(User);
  const users = await userRepo.find();
  return users;
};
