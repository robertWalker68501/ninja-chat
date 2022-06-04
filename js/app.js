// DOM queries
const chatList = document.querySelector(".chat-list");
const newChat = document.querySelector(".new-chat");
const newName = document.querySelector(".new-name");
const updateMessage = document.querySelector(".update-mssg");
const rooms = document.querySelector(".chat-rooms");

// Check localstorage for a username
const username = localStorage.username ? localStorage.username : "Anonymous";

// Create new chat room & UI instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom("general", username);

// Get chats and render
chatroom.getChats(data => chatUI.render(data));

// Add a new chat
newChat.addEventListener("submit", e => {
  e.preventDefault();
  const message = newChat.message.value.trim();
  // Check to make sure message is not empty
  if(message) {
    // Add the message
    chatroom.addChat(message)
      // Reset the form
      .then(() => newChat.reset())
      // Log any errors
      .catch(error => console.log(error));
  }
});

// Update username
newName.addEventListener("submit", e => {
  e.preventDefault();
  // Get the new name from the form field
  const updatedName = newName.name.value.trim();
  // Check to make sure name is not empty
  if(updatedName) {
    // Update the name
    chatroom.updateName(updatedName);
    // Reset the form
    newName.reset();
    // Show then hide the success message
    updateMessage.textContent = `Your name has bee updated to ${updatedName}`;
    setTimeout(() => updateMessage.textContent = "", 3000);
    // // Store new name in localstorage
    localStorage.setItem("username", updatedName);
  }
});

// Update the chat room
rooms.addEventListener("click", e => {
  if(e.target.tagName === "BUTTON") {
    chatUI.clear();
    chatroom.updateRoom(e.target.getAttribute("id"));
    chatroom.getChats(chat => chatUI.render(chat));
  }
});
