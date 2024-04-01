export function handleDate(date: string) {
    const newDate = new Date(date)
    const timeString = newDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    const [hour, minute] = timeString.split(':');
    const day = newDate.toLocaleDateString('en-US', { day: 'numeric' });
    const month = newDate.toLocaleDateString('en-US', { month: 'short' });
    const dayDisplay = `${month} ${day} at ${hour}:${minute.toLowerCase()}`;
    return dayDisplay;
}