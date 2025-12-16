import { useContext } from "react";
import UserContext from "../UserContext";

const UserGrid: React.FC = () => {
  const { users, setUsers } = useContext(UserContext);
  console.log(users);
  return <></>
}

export default UserGrid;
