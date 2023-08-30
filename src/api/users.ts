import { User } from "../types/users";
import { wait } from "./utils";

export const getUser = async (id: number): Promise<User | undefined> => {
  return wait(2000).then(() =>
    fetch("users.json")
      .then((res) => res.json())
      .then((users: Array<User>) => users.find((user) => user.id === id))
  );
};
