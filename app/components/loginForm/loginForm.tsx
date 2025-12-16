import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import ErrorContext from "../provider/ErrorContext";

const LoginForm: React.FC<{ username: string, password: string }> = ({ username, password }) => {
  const [NTHUsername, setNTHUsername] = useState(username);
  const [NTHPassword, setNTHPassword] = useState(password);
  const [hidePassword, setHidePassword] = useState("password");
  const navigator = useNavigate();
  const errorContext = useContext(ErrorContext);
  const onLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!(NTHUsername.length > 2 && NTHPassword.length > 5)) {
      errorContext("用户名太短或密码太短");
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
      localStorage.setItem("NTHUsername", NTHUsername);
      localStorage.setItem("NTHPassword", NTHPassword);
      localStorage.setItem("appjwt", token);
      navigator("/", { replace: true });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    // 全屏居中容器：垂直+水平居中，最小高度占满屏幕
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      {/* 表单卡片：白色背景、阴影、圆角、响应式宽度 */}

      <form method="POST" className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-6"
        onSubmit={onLoginSubmit}>
        {/* 标题：居中、加粗、渐变色文字 */}
        <h1 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
          super翻译
        </h1>

        {/* 用户名输入框：带图标、圆角、聚焦效果 */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </span>
          <input
            name="username" // 指定用户名输入框ID
            type="text"
            placeholder="请输入用户名"
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
            value={NTHUsername}
            onChange={(event) => { setNTHUsername(event.target.value) }}
          />
        </div>

        {/* 密码输入框：带图标、圆角、聚焦效果 */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </span>
          <input
            name="password" // 指定密码输入框ID
            type={hidePassword}
            placeholder="请输入密码"
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
            value={NTHPassword}
            onChange={(event) => { setNTHPassword(event.target.value) }}
          />

          {/* 右侧显示/隐藏切换按钮（绝对定位，不影响输入框布局） */}
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            onClick={() => setHidePassword(prev => prev === "password" ? "text" : "password")}
            aria-label={hidePassword === "password" ? "显示密码" : "隐藏密码"}
          >
            {/* 根据状态切换图标：闭眼（隐藏）/睁眼（显示） */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {/* 显示密码：睁眼图标 */}
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z" />
              {
                hidePassword === "text" ? null : (
                  // 隐藏密码：图标斜杠
                  <line x1="0" y1="0" x2="24" y2="24" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                )
              }
            </svg>
          </button>
        </div>

        {/* 登录按钮：全屏宽度、渐变背景、悬停效果 */}
        <button
          className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 transition-all shadow-md hover:shadow-lg"
          type="submit"
        // onClick={OnButtonClick}
        >
          登录
        </button>

      </form>
    </div>
  );
};

export default LoginForm;
