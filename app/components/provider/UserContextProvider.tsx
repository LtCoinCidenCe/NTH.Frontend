import { useContext, useEffect, useState } from "react";
import UserContext from "./UserContext";
import JWTContext from "./JWTContext";
import ErrorContext from "./ErrorContext";
import { UserBasicZod, type UserBasic } from "~/types";

const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const errorContext = useContext(ErrorContext);
  const jwt = useContext(JWTContext);
  const [users, setUsers] = useState<UserBasic[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const URLPath = "/api/User";
      const allUsersURL = `${import.meta.env.VITE_BACKEND_URL}${URLPath}`;
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
      setUsers(parsedUsers.map(x => x.data));
    };
    fetchData();
    return;
  }, []); // useEffect

  return <UserContext value={{ users, setUsers }}>{children}</UserContext>;
};

export default UserContextProvider;
