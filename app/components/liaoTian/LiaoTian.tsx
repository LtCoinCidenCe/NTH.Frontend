import { useContext, useEffect, useRef, useState, type FC } from "react";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import ErrorContext from "../provider/ErrorContext";
import JWTContext from "../provider/JWTContext";
import { LiaoTianJiLuZod, type LiaoTianMessage } from "~/types";

const LiaoTian: FC = () => {
  const errorContext = useContext(ErrorContext);
  const { jwt } = useContext(JWTContext);
  const [msgList, setMsgList] = useState<LiaoTianMessage[]>([]);
  const liaoTianShiRef = useRef<HubConnection>(null);
  const [arrowText, setArrowText] = useState("");
  useEffect(() => {
    console.debug("LiaoTian Effect runs");

    var liaotianHub = new HubConnectionBuilder().withUrl(`${import.meta.env.VITE_BACKEND_URL}/api/LiaoTianHub`, { accessTokenFactory: () => jwt, timeout: 10 * 1000 }).build();

    liaotianHub.onreconnected((connectionId) => {
      console.debug("Reconnected to the hub with connection ID:", connectionId);

    });
    liaotianHub.on("newest", (liaoTianMessage) => {
      setMsgList((prev) => [...prev, liaoTianMessage]);
    });

    const startHubAsync = async () => {
      console.debug("startHubAsync");
      try {
        await liaotianHub.start();
      } catch (error) {
        // errorContext("聊天未连通，无法获取群友鬼话");
        console.debug(error);
        throw error;
      }
      // here the connection is successful, or else it has thrown error
      liaoTianShiRef.current = liaotianHub;

      const liaoTianJiLuURL = `${import.meta.env.VITE_BACKEND_URL}/api/LiaoTian/History?lastReceivedChatID=${0}`;
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
      QunYouGuiHua.sort((a, b) => a.id - b.id);

      const messageRecordsRebuild = (earlyBirds: LiaoTianMessage[]) => {
        let birds = earlyBirds.length;
        if (birds !== 0) {
          let lastOne = QunYouGuiHua[QunYouGuiHua.length - 1];
          for (let eagle = 0; eagle < birds; eagle++) {
            const element = earlyBirds[eagle];
            if (element.id > lastOne.id)
              QunYouGuiHua.push(element);
          }
        }
        return QunYouGuiHua;
      };

      setMsgList(messageRecordsRebuild);
    }; // startHubAsync
    startHubAsync();

    return () => {
      const stopHubAsync = async () => {
        try {
          await liaotianHub.stop();
        } catch (error) {
          console.debug("stopHubAsync", error);
        }
      }
      stopHubAsync();
    };
  }, []); // useEffect LiaoTian

  console.debug(msgList);

  return <div className="flex flex-col min-w-xl mx-64 p-4">
    <form className="absolute bottom-20"
      onSubmit={async (e) => {
        e.preventDefault();
        if (arrowText === "") {
          return;
        }
        setArrowText("");
        console.debug("聊天submit");
        const sendArrowMessagePath = "/api/LiaoTian/ShuoHua";
        const sendAMURL = `${import.meta.env.VITE_BACKEND_URL}${sendArrowMessagePath}`;
        const response = await fetch(sendAMURL,
          {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${jwt}` },
            body: JSON.stringify({ words: arrowText })
          }
        );
        if (!response.ok) {
          errorContext("发送失败");
          return;
        }
      }}>
      <div className="flex flex-row h-10">
        <input className="flex-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          type="text"
          placeholder="点击输入文本"
          value={arrowText}
          onChange={e => setArrowText(e.target.value)}
        />
        <input className="flex-none w-20 rounded-lg bg-blue-400 text-white"
          type="submit" value="发送" />
      </div>
    </form>
  </div>;
};

export default LiaoTian;
