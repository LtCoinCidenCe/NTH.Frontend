import React from 'react';
import { Link, NavLink } from 'react-router';

const WorkspaceHeader: React.FC<{ NTHUsername: string, userID: number }> = ({ NTHUsername, userID }) => {
  // 左侧导航菜单配置
  const leftMenus = [
    { label: '主页', path: '/' },
    { label: '用户', path: '/user' },
    { label: '作者', path: '/author' },
    { label: '视频', path: '/video' },
  ];

  return (
    // 顶部固定导航栏，z-50 确保在页面最上层
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="container mx-auto px-4">
        {/*  flex 布局：左侧菜单 + 右侧切换用户 */}
        <div className="flex items-center justify-between h-16">
          {/* 左侧导航菜单 */}
          <nav className="flex items-center space-x-6">
            {leftMenus.map((menu) => (
              <NavLink
                key={menu.path}
                to={menu.path}
                className={({ isActive, isPending }) => (
                  isActive ? "text-blue-500 dark:text-blue-400" : // 活跃路由高亮色
                    isPending ? "text-gray-700 dark:text-gray-300" : "" // 普通状态色
                )}
              >
                <div className='text-xl font-medium transition-colors hover:text-blue-500 dark:hover:text-blue-400'>
                  {menu.label}
                </div>
              </NavLink>
            ))}
          </nav>

          {/* 右侧切换用户导航 */}
          <nav>
            <Link
              to="/login"
              className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
            >
              <img src={`${import.meta.env.VITE_BACKEND_URL}/api/User/${userID}/Icon`} className="w-[35px] h-[35px] rounded-full mr-2" />

              {/* 用户图标 */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              切换用户
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default WorkspaceHeader;
