import { useContext, useEffect, useState } from "react";
import { isUserBasic, type UserBasic } from "~/types";
import UserContext from "./UserContext";
import JWTContext from "./JWTContext";
import ErrorContext from "./ErrorContext";

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
      if (!allUsers.every(user => isUserBasic(user))) {
        errorContext(`${URLPath} doesn't have valid items`);
        return;
      }
      setUsers(allUsers);
    };
    fetchData();
    return;
  }, []); // useEffect

  return <UserContext value={{ users, setUsers }}>{children}</UserContext>;
};

export default UserContextProvider;
