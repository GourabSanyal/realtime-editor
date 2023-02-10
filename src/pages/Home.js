import React, { useState } from "react";
import { v4 as uuidV4 } from "uuid";

const Home = () => {
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");

  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidV4();
    setRoomId(id);
    // console.log(id);
  };

  return (
    <div className="homePageWrapper">
      <div className="formWrapper">
        <img
          className="homePageLogo"
          src="/code-sync.png"
          alt="code-sync-logo"
        />
        <h4 className="mainLabel">Paste Invitation ROOM ID</h4>
        <div className="inputGroup">
          <input
            type="text"
            className="inputBox"
            placeholder="ROOM ID"
            onChange={(e) => setRoomId(e.target.value)}
            value={roomId}
          />
          <input
            type="text"
            className="inputBox"
            placeholder="USER NAME"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
          <button className="btn joinBtn">Join</button>
          <span className="createInfo">
            If you don't have an invite create &nbsp;{" "}
            <a onClick={createNewRoom} href="#" className="createNewBtn">
              new room
            </a>
          </span>
        </div>
      </div>
      <footer className="footer">
        <h4>
          Built with 💛 by &nbsp;
          <a href="https://github.com/gourabsanyal/" className="createNewBtn">
            Gourab
          </a>
        </h4>
      </footer>
    </div>
  );
};

export default Home;
