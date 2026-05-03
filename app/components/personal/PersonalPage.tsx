import { useContext, useState } from "react";
import UserContext from "../provider/UserContext";
import AvatarCrop from "./AvatarCrop";

const PersonalPage: React.FC = () => {
  const { currentUser } = useContext(UserContext);
  const [avatarBlob, setAvatarBlob] = useState<Blob | null>(null);
  console.log("avatarBlob", avatarBlob);
  return <div className="my-5 mx-auto flex flex-col items-center w-2xl space-y-3">
    <img className="w-24 h-24 rounded-full object-cover self-start"
      src={currentUser.userIconID === "00000000-0000-0000-0000-000000000000" ? undefined : `${import.meta.env.VITE_BACKEND_URL}/api/User/Icon/${currentUser.userIconID}`}
    />

    <AvatarCrop onCropComplete={setAvatarBlob} />
  </div>;
};

export default PersonalPage;
