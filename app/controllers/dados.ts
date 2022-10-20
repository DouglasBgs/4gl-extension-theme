const vscode = require("vscode");

export class DadosController {
  constructor() {}

  public static async selecionaDados(
    options: Array<string>,
    placeholder: string
  ): Promise<string[]> {
    let dadoSelecionado: any = await vscode.window.showQuickPick(options, {
      placeHolder: placeholder,
      ignoreFocusOut: true,
    });
    return dadoSelecionado;
  }

  public static validaDadosInformados(texto: string) {
    return !!texto.match(/[A-Za-z].+\-.+[0-9]/);
  }
}
