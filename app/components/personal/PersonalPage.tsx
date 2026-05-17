import { useContext, useState } from "react";
import UserContext from "../provider/UserContext";
import AvatarCrop from "./AvatarCrop";
import IconEditing from "./IconEditing";

const PersonalPage: React.FC = () => {
  const { currentUser } = useContext(UserContext);

  return <div>
    <IconEditing />
  </div>;
};

export default PersonalPage;
