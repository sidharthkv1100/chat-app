const RoomSelector = ({ setRoom }) => {
  return (
    <div>
      <input
        placeholder="Enter Room Name"
        onKeyDown={(e) => e.key === "Enter" && setRoom(e.target.value)}
      />
    </div>
  );
};

export default RoomSelector;
