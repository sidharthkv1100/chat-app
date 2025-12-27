import { useEffect, useState } from "react";
import { collection, addDoc, onSnapshot, query, where, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import RoomSelector from "./RoomSelector";

function Chat({ user }) {
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  // SAFETY CHECK (prevents crash)
  if (!user) {
    return <p>Loading user...</p>;
  }

  useEffect(() => {
    if (!room) return;

    const q = query(
      collection(db, "messages"),
      where("room", "==", room)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => doc.data()));
    });

    return () => unsub();
  }, [room]);

  const sendMessage = async () => {
    if (!text.trim()) return;

    await addDoc(collection(db, "messages"), {
      text,
      room,
      user: user.displayName || "Anonymous",
      createdAt: serverTimestamp()
    });

    setText("");
  };

  // ✅ MUST RETURN JSX
  if (!room) {
    return <RoomSelector setRoom={setRoom} />;
  }

  return (
    <div>
      <h2>Room: {room}</h2>

      {messages.map((msg, i) => (
        <p key={i}>
          <strong>{msg.user}:</strong> {msg.text}
        </p>
      ))}

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
