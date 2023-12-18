import { OpenDialogOptions, window } from "vscode";
import { Utils } from "../utils/utils";
import { ConfigModel } from "./config";

import { BancoName, IConfig, Ambiente_datasul } from "../interfaces/config";
import { WebviewFile } from "../controllers/webview";

export class AmbienteModel {
    public static async addAmbiente(dados: IConfig, pathToConfig: string) {
        const config = new ConfigModel(pathToConfig);
        const name = await Utils.selecionaNomes(
            "Nome do Ambiente ",
            "Gales, Caraiva, etc..."
        );
        const options: OpenDialogOptions = {
            canSelectMany: false,
            canSelectFolders: true,
            openLabel: "Selecionar",
        };
        const folder = await window.showOpenDialog(options).then((fileUri) => {
            return fileUri[0].fsPath;
        });
        const banco = await Utils.selecionaDados(
            [BancoName.Progress, BancoName.Sql],
            "Selecione o banco de dados"
        );
        const version = await Utils.selecionaDados(
            ["12", "11"],
            "Selecione a versão PROGRESS do ambiente"
        );
        const ambienteValues: Ambiente_datasul = {
            name: name,
            folder: folder,
            banco_version: `${banco}_${version}`,
        };
        dados.ambiente_datasul.push(ambienteValues);
        config.save(dados);
        WebviewFile.Reload(dados);
    }

    public static async removeAmbiente(dados: IConfig, pathToConfig: string) {
        const config = new ConfigModel(pathToConfig);
        const options: string[] = [];
        const placeHolder: string = "Selecione o ambiente para remover";
        dados.ambiente_datasul.forEach((element) => {
            options.push(element.name);
        });

        const selecionado = await Utils.selecionaDados(options, placeHolder);

        dados.ambiente_datasul = this.searchAmbiente(
            selecionado,
            dados.ambiente_datasul
        );

        dados = config.save(dados);
        WebviewFile.Reload(dados);
    }

    public static searchAmbiente(
        name: string,
        array: Ambiente_datasul[]
    ): Ambiente_datasul[] {
        const index = array.findIndex((ambiente) => ambiente.name == name);
        array.splice(index);
        const Ambientes = array;
        return Ambientes;
    }
}
