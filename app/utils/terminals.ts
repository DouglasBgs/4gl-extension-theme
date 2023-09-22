import {  Terminal, window } from 'vscode'
import { Utils } from './utils';
import { fail } from 'assert';



export class Terminals { 
  public static criaTerminal(name: string, shellPath: string = 'cmd.exe') {
    let terminal = this.verificaTerminal(name);
    if (!terminal || terminal.name != name) {
      terminal =  window.createTerminal(name, shellPath)
    }
    return terminal
  }

  public static verificaTerminal(name: string) {
    let terminals = window.terminals
    let terminal = terminals.find((terminal) => terminal.name == name)
    return terminal
  }

  public static executaComando(name: string, command: string | string[] = 'echo hello word', close: boolean = false) {
    const terminal = this.criaTerminal(name)
    Utils.MostraMensagemInfo(`${name} - Executando no terminal integrado`)
    if (Array.isArray(command)) {
      command.forEach((cmd) => {
        terminal.sendText(cmd)
      })
    } else  {
      terminal.sendText(command)
    }
    if (close) {  
      terminal.sendText('exit /B 0')
    }
  }
}