import * as vscode from 'vscode'
import { getRandomText } from './quran'
import {
  command,
  triggerCharacters,
  commandNumberRegExp,
} from './const'

function insertText(wordsCount: number) {
  const editor = vscode.window.activeTextEditor
  editor?.edit(edit => {
    editor.selections.forEach(selection => {
      edit.delete(selection)
      edit.insert(selection.start, getRandomText(wordsCount))
    })
  })
}

function extractCount(
  document: vscode.TextDocument,
  position: vscode.Position,
): number {
  const line = document.lineAt(position).text
  const matchResult = commandNumberRegExp.exec(line)
  if (!matchResult) return 0
  return +matchResult[1]
}

export function activate(context: vscode.ExtensionContext) {
  const AutoCompletion = vscode.languages.registerCompletionItemProvider(
    '*',
    {
      provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position,
      ) {
        const wordsCount = extractCount(document, position)
        const vsCommand = new vscode.CompletionItem(command)
        vsCommand.insertText = new vscode.SnippetString(
          getRandomText(wordsCount),
        )
        vsCommand.label = `${command}${wordsCount || ''}`

        const documentation = wordsCount
          ? `به صورت تصادفی تعداد ${wordsCount.toLocaleString('fa')} واژه از ترجمه‌ی قرآن را درج می‌کند.\u{200f}`
          : 'ترجمه یکی از آیات قرآن را به صورت تصادفی درج می‌کند.\u{200f}'

        vsCommand.documentation = new vscode.MarkdownString(documentation)
        return [vsCommand]
      },
    },
    ...triggerCharacters,
  )
  context.subscriptions.push(AutoCompletion)

  ////////////////////
  // Command
  ////////////////////

  let disposable = vscode.commands.registerCommand(
    'extension.GenerateText',
    () => {
      vscode.window
        .showInputBox({
          placeHolder: 'چند کلمه تصادفی درج شود؟\u{200f}',
          prompt:
            'چند واژه تصادفی لازم دارید؟ (خالی بودن به معنای یک آیه است).\u{200f}',
        })
        .then((words = '') => {
          insertText(+words)
        })
    },
  )
  context.subscriptions.push(disposable)
}
export function deactivate() {}
