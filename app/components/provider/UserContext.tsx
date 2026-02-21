import { createContext } from "react";
import { User0, type UserBasic } from "~/types";

// For React refresh to work correctly, your file should only export React components.
const UserContext = createContext<{ users: UserBasic[], currentUser: UserBasic, setUsers: React.Dispatch<React.SetStateAction<UserBasic[]>> }>
    ({ users: [], currentUser: User0, setUsers: () => { } });

export default UserContext;
