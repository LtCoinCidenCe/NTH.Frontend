import { useContext } from "react";
import UserContext from "../provider/UserContext";
import ErrorContext from "../provider/ErrorContext";

const UserGrid: React.FC = () => {
  const errorContext = useContext(ErrorContext);
  const { users, setUsers } = useContext(UserContext);
  return <></>
}

export default UserGrid;
