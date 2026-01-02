import { useContext, useState } from "react";
import UserContext from "../provider/UserContext";
import ErrorContext from "../provider/ErrorContext";
import UserCard from "./UserCard";

const UserGrid: React.FC = () => {
  const errorContext = useContext(ErrorContext);
  const { users, setUsers } = useContext(UserContext);
  const [filterText, setFilterText] = useState('');

  // 生成用户头像URL
  const getAvatarUrl = (userId: number) =>
    `${import.meta.env.VITE_BACKEND_URL}/api/User/${userId}/Icon`;

  return (
    <div className="container mx-auto p-4">
      {/* 过滤输入框 */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="搜索用户..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* 用户卡片网格 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {users.map((user) => (
          <UserCard
            key={user.id}
            username={user.username}
            displayname={user.displayname}
            userRole={user.userRole}
            avatarUrl={getAvatarUrl(user.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default UserGrid;
