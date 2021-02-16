
const formatTime = (date) => {
  if (!date) return '';
  function time(date) {
    return date < 10 ? `0${date}` : date;
  }
  date = (date + '').length === 13 ? Number(date) : Number(date) * 1000;
  date = new Date(date);
  const yy = time(date.getFullYear());
  const mm = time(date.getMonth() + 1);
  const dd = time(date.getDate());
  const h = time(date.getHours());
  const m = time(date.getMinutes());
  const s = time(date.getSeconds());
  return `${yy}-${mm}-${dd} ${h}:${m}:${s}`;
}

export {
  formatTime
}
