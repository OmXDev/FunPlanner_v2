import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { connectSocket } from "../../lib/socket";
import { setOnlineUsers } from "../../redux/slices/authSlice";

import ChatSidebar from "../ChatSidebar";
import NoChatSelected from "../chat-container/NoChatSelected";
import ChatContainer from "../chat-container/ChatContainer";
import Topbar from "../../components/ui/Topbar";
import Sidebar from "../../components/UserDashboard/pages/Sidebar";

const ChatAppLayout = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.chat);
  const { authUser } = useSelector((state) => state.auth);
  const [sidebarVisible, setSidebarVisible] = useState(false)

  useEffect(() => {
    if (authUser?._id) {
      const socket = connectSocket(authUser._id);
      socket.on("getOnlineUsers", (userIds) => {
        dispatch(setOnlineUsers(userIds));
      });
    }
  }, [authUser, dispatch]);

  return (
    <div className={`h-screen flex flex-col bg-[#161b22] text-white overflow-hidden`}>
      <div className="sticky top-0 z-40 bg-[#0d1117] border-b border-gray-800">
        <Topbar onMobileMenuToggle={() => setSidebarVisible(!sidebarVisible)} />
      </div>
      <div className="flex-shrink-0">
        <Sidebar
          onToggle={(visible) => setSidebarVisible(visible)}
          isMobileOpen={sidebarVisible}
      />
      </div>
      <div className={`flex flex-1 overflow-hidden  ${sidebarVisible ? "lg:pl-64" : "pl-0 lg:pl-16"}`}>
        <ChatSidebar />

        <div className={`flex-1 flex flex-col overflow-hidden `}>
          {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
        </div>
      </div>
    </div>
  );
};

export default ChatAppLayout;
