import { ayat } from './fa.ansarian'

/**
 * متن را پاکسازی می‌کند
 * @param text 
 * @returns 
 */
function clearText(text: string) {
  return text
    .replace(/[\(\)]/g, '')
    .replace(/‌/g, ' ')
    .replace(/\]/g, '')
    .replace(/\[=\s?/g, 'یعنی ')
    .replace(/\[/g, '')
}

/**
 * متنی تصادفی از قرآن را بر می‌گرداند
 * @param wordsCount 
 * @returns متن تصادفی
 */
export function getRandomText(wordsCount?: number) {
  let randomAyahIndex = ~~(Math.random() * ayat.length)
  if (!wordsCount) {
    return clearText(ayat[randomAyahIndex])
  }

  const words = []
  do {
    words.push(...ayat[randomAyahIndex].split(' '))
    randomAyahIndex = (randomAyahIndex + 1) % ayat.length
  } while (words.length <= wordsCount)

  words.length = wordsCount

  return clearText(words.join(' '))
}
