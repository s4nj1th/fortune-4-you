// @ts-ignore
import proverbsRaw from '../data/proverbs.txt?raw';
// @ts-ignore
import lessonsRaw from '../data/lessons.txt?raw';

function parseLines(raw: string) {
  return raw.split('\n').map(l => l.trim()).filter(line => line !== '');
}

export async function getFortunes() {
  const lines = parseLines(proverbsRaw);
  return lines.map((message, id) => ({ id, message }));
}

export async function getLessons() {
  const lines = parseLines(lessonsRaw);
  const lessons = [];
  for (let i = 0; i < lines.length; i += 3) {
    if (lines[i] && lines[i+1] && lines[i+2]) {
      lessons.push({
        id: i / 3,
        english: lines[i],
        chinese: lines[i+1],
        pronunciation: lines[i+2]
      });
    }
  }
  return lessons;
}

export async function getRandomCookie() {
  const [fortunes, lessons] = await Promise.all([
    getFortunes(),
    getLessons()
  ]);
  
  const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  const lesson = lessons[Math.floor(Math.random() * lessons.length)];
  
  return { fortune, lesson };
}
