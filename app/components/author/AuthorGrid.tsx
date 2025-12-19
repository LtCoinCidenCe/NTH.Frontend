import { useContext } from "react";
import ErrorContext from "../provider/ErrorContext";
import AuthorContext from "../provider/AuthorContext";

const AuthorGrid: React.FC = () => {
  const errorContext = useContext(ErrorContext);
  const { authors, setAuthors } = useContext(AuthorContext);
  console.log(authors);
  return <p onClick={() => errorContext(`not found ${new Date()}`)} >something unusual</p>;
};

export default AuthorGrid;
