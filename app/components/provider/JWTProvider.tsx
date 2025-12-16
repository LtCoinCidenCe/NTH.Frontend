import JWTContext from "./JWTContext";

const JWTProvider: React.FC<{ appjwt: string, children: React.ReactNode }> = ({ appjwt, children }) => {
  return <JWTContext value={appjwt}>{children}</JWTContext>;
};

export default JWTProvider;
