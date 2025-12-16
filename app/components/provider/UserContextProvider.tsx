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
      const allUsersURL = `${import.meta.env.VITE_BACKEND_URL}/api/User`;
      const response = await fetch(allUsersURL, { method: "GET", headers: { "Authorization": `Bearer ${jwt}` } });
      if (!response.ok) {
        errorContext("数据读取失败，请刷新");
        return;
      }
      const allUsers = await response.json();
      if (!Array.isArray(allUsers)) {
        errorContext("数据读取失败，请刷新。/api/User is not array");
        return;
      }
      if (!allUsers.every(user => isUserBasic(user))) {
        errorContext("/api/User doesn't have valid items");
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
