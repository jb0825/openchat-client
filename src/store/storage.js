export const storage = new Map();

storage.set("server", "localhost:3001");

// storage.set("messageList", []);
// 위처럼 messageList 를 사용하면 push 함수 쓸때 오류 발생해서 밑처럼 바꿈
storage["messageList"] = [];
