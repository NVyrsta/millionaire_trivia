// https://opentdb.com
const BASE_URL =
  'https://opentdb.com/api.php?amount=15&difficulty=easy&type=multiple';

export const fetchData = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
}