import React, { useContext } from "react";
import ErrorContext from "../provider/ErrorContext";

const AuthorGrid: React.FC = () => {
  const errorContext = useContext(ErrorContext);
  // console.log("AuthorGrid");
  return <p onClick={() => errorContext(`not found ${new Date()}`)} >something unusual</p>;
};

export default AuthorGrid;
