import { useContext } from "react";
import UserContext from "../provider/UserContext";
import ErrorContext from "../provider/ErrorContext";

const UserGrid: React.FC = () => {
  const errorContext = useContext(ErrorContext);
  const { users, setUsers } = useContext(UserContext);
  console.log(users);
  return <></>
}

export default UserGrid;
