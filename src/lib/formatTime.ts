const formatTime = (date: Date) => {
  return date.toLocaleTimeString("he-IL", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
export default formatTime;
