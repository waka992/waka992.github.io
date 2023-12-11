export default function useShortStr(front=0, back=0) {
  return function (text) {
    if (text) {
      text = String(text);
      return text.slice(0, front) + ".." + text.slice(-back);
    }
  };
}
