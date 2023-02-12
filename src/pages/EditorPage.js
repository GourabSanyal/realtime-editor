import React, { useRef, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import ACTIONS from "../actions/Actions";
import Client from "../components/Client";
import Editor from "../components/Editor";
import { initSocket } from "../sockets/socket";
import {
  useLocation,
  useNavigate,
  Navigate,
  useParams,
} from "react-router-dom";

const EditorPage = () => {
  const socketRef = useRef(null);
  const location = useLocation();
  const { roomId } = useParams();
  const reactNavigator = useNavigate();

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      function handleErrors(e) {
        console.log("socket error", e);
        toast.error("Socket connectiion failed. Try again later!");
        reactNavigator("/");
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });
    };
    init();
  }, [reactNavigator, roomId]);

  const [clients, setClients] = useState([
    { socketId: 1, username: "vibe" },
    { socketId: 2, username: "John Doe" },
    { socketId: 2, username: "John Doe" },
    { socketId: 2, username: "John Doe" },
  ]);

  if (!location.state) {
    return <Navigate to="/" />;
  }

  return (
    <div className="mainWrap">
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            <img className="logoImage" src="/code-sync.png" alt="logo" />
          </div>
          <h3>Connected</h3>
          <div className="clientsList">
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
            <h1>Heeyy</h1>
          </div>
        </div>
        <button className="btn copyBtn">Copy Room ID</button>
        <button className="btn leaveBtn">Leave</button>
      </div>
      <div className="editorWrap">
        <Editor />
      </div>
    </div>
  );
};

export default EditorPage;
