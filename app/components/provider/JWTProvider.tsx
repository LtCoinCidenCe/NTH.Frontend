import { useContext, useEffect, useState } from "react";
import ErrorContext from "./ErrorContext";
import JWTContext from "./JWTContext";

/**
 * This component has some trust on workspaceLayout,
 * so don't mess it.
 */
const JWTProvider: React.FC<{ loaderJWT: string, initialRefreshTimer: number, children: React.ReactNode }> = ({ loaderJWT, initialRefreshTimer, children }) => {
  const errorContext = useContext(ErrorContext);
  const [jwtfeed, setjwtfeed] = useState(loaderJWT);

  useEffect(() => {
    // 通过闭包保存变量，在useEffect返回清理函数中打false
    let isMounted = true;
    let updater = 0;



    // periodic relogin
    const relogin = async () => {
      if (!isMounted)
        return;
      // retrieve username and password every time in case the user logs out.
      let NTHUsername = localStorage.getItem("NTHUsername");
      let NTHPassword = localStorage.getItem("NTHPassword");
      if (NTHUsername === null || NTHPassword === null) {
        return;
      }
      const userLoginDTO = { Username: NTHUsername, Password: NTHPassword };
      try {
        const fetched = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/Login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(userLoginDTO) });
        const token = await fetched.text();
        if (fetched.status >= 500) {
          errorContext("server error");
          return;
        }
        if (fetched.status !== 200) {
          errorContext("用户名或密码不正确");
          return;
        }
        if (!isMounted) // super edge case because of await
          return;
        localStorage.setItem("appjwt", token);
        setjwtfeed(token);
      }
      catch (error) {
        console.error(error);
        return;
      }
      // if there is no problem then schedule next login
      updater = Number(setTimeout(relogin, 14 * 60 * 1000));
    };




    // run once after login
    updater = Number(setTimeout(relogin, initialRefreshTimer));

    return () => {
      isMounted = false;
      clearTimeout(updater);
      console.log('定时登录器已清除，组件卸载');
    };
  }, []); // useEffect

  return <JWTContext value={jwtfeed}>{children}</JWTContext>;
};

export default JWTProvider;
