import { useContext, useEffect, useState } from "react";
import { JWTContext } from "./AppjwtProvider";
import { ErrorContext } from "./ErrorToastProvider";

const VideoGrid: React.FC = () => {
  const errorContext = useContext(ErrorContext);
  const jwt = useContext(JWTContext);
  const [videos, setVideos] = useState<number[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const workStartedURL = `${import.meta.env.VITE_BACKEND_URL}/api/Video/WorkStarted`;
      const response = await fetch(workStartedURL, { method: "GET", headers: { "Authorization": `Bearer ${jwt}` } });
      if (!response.ok) {
        errorContext(`${response.status}`);
        return;
      }
      const workStarted = await response.json();
      errorContext("no problem");
      setVideos([1]);
    }
    fetchData();
    return;
  }, []);
  if (videos.length === 0)
    return <>super</>
  else
    return <div><img className="w-[480px] h-[270px] object-cover" src={`${import.meta.env.VITE_BACKEND_URL}/api/Video/1/Thumbnail`} /></div>
}

export default VideoGrid;
