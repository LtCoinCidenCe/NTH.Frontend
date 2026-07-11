import { useContext, useEffect, useRef, useState, type FC } from "react";
import { AbortError, HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import ErrorContext from "../provider/ErrorContext";
import JWTContext from "../provider/JWTContext";
import { LiaoTianJiLuZod, type LiaoTianMessage } from "~/types";

const LiaoTian: FC = () => {
  const errorContext = useContext(ErrorContext);
  const { jwt } = useContext(JWTContext);
  const [msgList, setMsgList] = useState<LiaoTianMessage[]>([]);
  const liaoTianShiRef = useRef<HubConnection>(null);
  useEffect(() => {
    console.log("LiaoTian Effect runs");

    var liaotianHub = new HubConnectionBuilder().withUrl(`${import.meta.env.VITE_BACKEND_URL}/api/LiaoTianHub`, { accessTokenFactory: () => jwt, timeout: 10 * 1000 }).build();
    liaotianHub.onreconnected((connectionId) => {
      console.log("Reconnected to the hub with connection ID:", connectionId);
    });
    liaotianHub.on("newest", (liaoTianMessage) => {
      console.log("new liaoTianMessage", liaoTianMessage)
      setMsgList((prev) => [...prev, liaoTianMessage]);
    });

    const startHubAsync = async () => {
      await liaotianHub.start();
      // here the connection is successful, or else it has thrown error
      liaoTianShiRef.current = liaotianHub;
      const liaoTianJiLuURL = `${import.meta.env.VITE_BACKEND_URL}/api/LiaoTian/History?lastReceivedChatID=0`;
      const response = await fetch(liaoTianJiLuURL, { method: "GET", headers: { "Authorization": `Bearer ${jwt}` } });
      if (!response.ok) {
        errorContext(`/api/LiaoTian/History: ${response.status}`);
        return;
      }
      const longList = await response.json();
      const parsedLongList = LiaoTianJiLuZod.safeParse(longList);
      if (!parsedLongList.success) {
        errorContext("/api/LiaoTian/History: Invalid data format");
        return;
      }
      const QunYouGuiHua = parsedLongList.data;
      setMsgList(QunYouGuiHua);
    };
    startHubAsync();

    return () => {
      const stopHubAsync = async () => {
        try {
          await liaotianHub.stop();
        } catch (error) {
          console.log("2", error);
        }
      }
      stopHubAsync();
    };
  }, []); // useEffect LiaoTian
  return <div></div>;
};

export default LiaoTian;
