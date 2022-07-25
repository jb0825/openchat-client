export default function AddChat(props) {
  const handleAddChat = props.handleAddChat;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" className="add_chat" onClick={handleAddChat}>
      <path d="M11.25 13.75h1.5v-3h3v-1.5h-3v-3h-1.5v3h-3v1.5h3Zm-8.75 7.3V4.3q0-.75.525-1.275Q3.55 2.5 4.3 2.5h15.4q.75 0 1.275.525.525.525.525 1.275v11.4q0 .75-.525 1.275-.525.525-1.275.525H6.05ZM4 17.425 5.425 16H19.7q.125 0 .213-.088.087-.087.087-.212V4.3q0-.125-.087-.213Q19.825 4 19.7 4H4.3q-.125 0-.212.087Q4 4.175 4 4.3ZM4 4.3V4v13.425Z" />
    </svg>
  );
}
