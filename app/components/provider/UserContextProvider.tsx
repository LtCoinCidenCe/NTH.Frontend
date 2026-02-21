import { useContext, useEffect, useState } from "react";
import UserContext from "./UserContext";
import JWTContext from "./JWTContext";
import ErrorContext from "./ErrorContext";
import { User0, UserBasicZod, type UserBasic } from "~/types";

const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const errorContext = useContext(ErrorContext);
  const { jwt, userIdentifier } = useContext(JWTContext);
  const [users, setUsers] = useState<UserBasic[]>([]);
  const [currentUser, setCurrentUser] = useState<UserBasic>(User0);
  useEffect(() => {
    const fetchData = async () => {
      const URLPath = "/api/User";
      const allUsersURL = `${import.meta.env.VITE_BACKEND_URL}${URLPath}`;
      try {
        const response = await fetch(allUsersURL, { method: "GET", headers: { "Authorization": `Bearer ${jwt}` } });
        if (!response.ok) {
          errorContext("数据读取失败，请刷新");
          return;
        }
        const allUsers = await response.json();
        if (!Array.isArray(allUsers)) {
          errorContext(`数据读取失败，请刷新。${URLPath} is not array`);
          return;
        }
        const parsedUsers = allUsers.map(x => UserBasicZod.safeParse(x));
        if (!parsedUsers.every(x => x.success)) {
          errorContext(`${URLPath} doesn't have valid items`);
          return;
        }
        const fruit = parsedUsers.map(x => x.data);
        const current = fruit.find(x => x.id === Number.parseInt(userIdentifier.substring(2)));
        if (!current) {
          errorContext("数据读取失败，请刷新。current user failed");
          return;
        }
        setUsers(fruit);
        setCurrentUser(current);
      } catch (error) {
        console.log("network error");
        errorContext(`${error}`);
      }
    };
    fetchData();
    return;
  }, []); // useEffect

  return <UserContext value={{ users, currentUser, setUsers }}>{users.length > 0 ? children : undefined}</UserContext>;
};

export default UserContextProvider;
