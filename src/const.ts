export const Command: string = 'plorem';
export const TriggerCharacters: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
export const CommandNumberRegExp = new RegExp(`(${Command}([^\sa-zA-Z]*))`, 'gis');
