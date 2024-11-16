// seperate date and time for datetime string
function separateDateTime(datetimeStr) {
    const dateObj = new Date(datetimeStr);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
    const day = dateObj.getDate();
    const month = monthNames[dateObj.getMonth()].toLowerCase();
    const year = dateObj.getFullYear();
  
    const time = dateObj.toLocaleTimeString([], {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
    });
  
    return [day, month, year, time];
  }