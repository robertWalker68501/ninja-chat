class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = db.collection("chats");
    this.unsub;
  };
  // Adding new chat documents
  async addChat(message) {
    // Format a chat object
    const now = new Date();
    const chat = {
      message,
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(now),
    }
    // Save the chat document
    const response = await this.chats.add(chat);
    return response;
  };

  // Setting up a real-time listener to get new chats
  getChats(callback) {
    this.unsub = this.chats
      .where("room", "==", this.room)
      .orderBy("created_at")
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if(change.type === "added") {
            // Update the UI
            callback(change.doc.data());
          }
        });
      });
  };

  // Updating the username
  updateName(username) {
    this.username = username;
    localStorage.setItem("username", username);
  };

  // Updating the room
  updateRoom(room) {
    this.room = room;
    console.log('Room updated');
    if(this.unsub) {
      this.unsub();
    }
  }
}