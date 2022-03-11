export async function localHistory(newMessage) {
  let history = localStorage.getItem("history");
  if (history) {
    let parsedHistory = JSON.parse(history);
    let updatedHistory;
    if (Array.isArray(history) && history.length === 0) {
      updatedHistory = history.push(newMessage);
    } else {
      updatedHistory = [...parsedHistory, newMessage];
    }
    localStorage.setItem("history", JSON.stringify(updatedHistory));
  }
}
