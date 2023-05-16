export const command = 'plorem'
export const triggerCharacters = '1234567890'.split('')
export const commandNumberRegExp = new RegExp(`${command}(\\d*)`, 'gi')
