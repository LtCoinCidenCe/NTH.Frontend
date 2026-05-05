import { useContext, useState } from "react";
import UserContext from "../provider/UserContext";
import AvatarCrop from "./AvatarCrop";
import IconEditing from "./IconEditing";

const PersonalPage: React.FC = () => {
  const { currentUser } = useContext(UserContext);
  const [avatarBlob, setAvatarBlob] = useState<Blob | null>(null);
  const [isIconOpen, setIsIconOpen] = useState(false);
  console.log("avatarBlob", avatarBlob);

  return <div>
    <IconEditing />
    <AvatarCrop onCropComplete={(b) => {
      console.log("croppedBlob", b);
      setAvatarBlob(b);
    }} />
  </div>;
};

export default PersonalPage;
