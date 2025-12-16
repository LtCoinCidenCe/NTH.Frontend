import { createContext } from "react";

export const JWTContext = createContext("");

const AppjwtProvider: React.FC<{ appjwt: string, children: React.ReactNode }> = ({ appjwt, children }) => {
    return <JWTContext value={appjwt}>{children}</JWTContext>
};

export default AppjwtProvider;
