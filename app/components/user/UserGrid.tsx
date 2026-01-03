import { useContext, useState } from "react";
import UserContext from "../provider/UserContext";
import ErrorContext from "../provider/ErrorContext";
import UserCard from "./UserCard";

const UserGrid: React.FC = () => {
  const errorContext = useContext(ErrorContext);
  const { users, setUsers } = useContext(UserContext);
  const [filterText, setFilterText] = useState('');

  const fa = filterText.toLowerCase();

  // 备用
  const filterFormSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
  }

  return (
    <div className="container mx-auto p-4">
      {/* 过滤输入框 */}
      <form className="relative mb-6" onSubmit={filterFormSubmit}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none"
          className="absolute px-2 py-1 h-full inset-y-0 left-0 flex items-center">
          <circle cx="6" cy="7" r="4" stroke="oklch(55.1% 0.027 264.364)" strokeWidth="2" />
          <path d="M9.2 10.2L15 16" stroke="oklch(55.1% 0.027 264.364)" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          placeholder="搜索用户..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </form>

      {/* 用户卡片网格 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {users.filter(x => x.username.toLowerCase().includes(fa) || x.displayname.toLowerCase().includes(fa))
          .map((user) => (
            <UserCard key={user.id} userid={user.id} username={user.username}
              displayname={user.displayname} userRole={user.userRole} />
          ))}
      </div>
    </div>
  );
};

export default UserGrid;
