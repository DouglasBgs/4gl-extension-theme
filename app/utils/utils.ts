import { window } from "vscode";

export class Utils {
  public static MostraMensagemErro(error: string) {
    window.showErrorMessage("erro:" + error);
  }

  public static MostraMensagemInfo(message: string, modal = false) {
    window.showInformationMessage(message, { modal: modal })
  }

  public static MostraMensagemStatusBar(message: string, time: number = 10000) {
    window.setStatusBarMessage(message, time);
  }

  public static async selecionaDados(options: any, placeholder: string) {
    let dadoSelecionado = await window.showQuickPick(options, {
      placeHolder: placeholder,
      ignoreFocusOut: true,
    });
    return dadoSelecionado;
  }
  public static async selecionaNomes(prompt: string, placeHolder: string, ignoreFocusOut = true) {
    let nome = await window.showInputBox({
      prompt: prompt,
      placeHolder: placeHolder,
      ignoreFocusOut: ignoreFocusOut,
      title: prompt

    });
    return nome;
  }

  public static async validaDadosInformados(texto: string) {
    return !!texto.match(/[A-Za-z].+\-.+[0-9]/);
  }
}
