import { isDateStringValid } from 'utils/date';

function createEntry(date, text) {
  if (text.length > 240) return null;

  const parsedDate = date.substr(0, 10);
  const isDateValid = isDateStringValid(parsedDate);
  if (!isDateValid) return null;

  return {
    date: parsedDate,
    text,
  }
}

export { createEntry }
