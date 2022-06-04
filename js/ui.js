class ChatUI {
  constructor(list) {
    this.list = list;
  }
  clear() {
    this.list.innerHTML = "";
  }
  render(data) {
    // Render chat templates to the DOM
    const when = dateFns.distanceInWordsToNow(
      data.created_at.toDate(),
      { addSuffix: true }
    );
    const html = `
      <li class="list-group-item">
        <span class="username">${data.username}: </span>
        <span class="message">${data.message}</span>
        <div class="time">${when}</div>
      </li>
    `;

    this.list.innerHTML += html;
  };

  // Clear the list of chats (when the room changes)
}
