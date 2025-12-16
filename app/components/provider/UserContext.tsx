import { createContext } from "react";
import type { UserBasic } from "~/types";

// For React refresh to work correctly, your file should only export React components.
const UserContext = createContext<{ users: UserBasic[], setUsers: React.Dispatch<React.SetStateAction<UserBasic[]>> }>({ users: [], setUsers: () => { } });

export default UserContext;
