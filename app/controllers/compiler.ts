import { window, OpenDialogOptions, Uri } from "vscode";
import { readFile } from "fs";
import { Utils } from "../utils/utils";
import { dirname } from "path";
import { createHash } from "crypto";

interface FileData {
    file: Buffer;
    fileName: string;
    filePath: string;
}
export class Compiler {
    public static ResquestId = Compiler.newHash();
    public static database: string;

    static async compile() {
        // const config = new ConfigModel(pathToConfig);
        this.selecionarFontes();
    }

    public static async selecionarFontes() {
        const options: OpenDialogOptions = {
            canSelectMany: true,
            canSelectFolders: false,
            openLabel: "Selecionar",

            defaultUri: Uri.file(
                "C:/Users/douglas.barbosa/Documents/GIT/EMS2/progress/src/eqp"
            ),
            filters: {
                "Arquivos Progress": ["p", "w", "cls", "i"],
            },
        };
        await window.showOpenDialog(options).then(async (fileUri) => {
            if (fileUri && fileUri[0]) {
                this.database = await Utils.selecionaDados(
                    ["Oracle", "Progress", "SQL Server"],
                    "Selecione o banco que deseja compilar",
                    false
                );
                this.carregarArquivos(fileUri);
            } else {
                Utils.MostraMensagemInfo("Nenhum arquivo selecionado!");
            }
        });
    }

    static async carregarArquivos(fileUris: Uri[]) {
        const fileDataArray: FileData[] = [];

        for (const fileUri of fileUris) {
            try {
                const FileBuffer = await this.lerArquivos(fileUri.fsPath);
                const fileName = fileUri.fsPath.split("\\").pop() || "";
                const filePath = dirname(fileUri.fsPath);
                fileDataArray.push({
                    file: FileBuffer,
                    fileName,
                    filePath: filePath,
                });
            } catch (error) {
                Utils.MostraMensagemErro(
                    `Erro ao processar o arquivo ${fileUri}: ${error.message}`
                );
            }
        }
        await this.enviarArquivos(fileDataArray);
    }
    static bufferToBlob(buffer: Buffer, mimeType: string): Blob {
        const arrayBuffer = buffer.buffer.slice(
            buffer.byteOffset,
            buffer.byteOffset + buffer.byteLength
        );
        return new Blob([arrayBuffer], { type: mimeType });
    }

    static async enviarArquivos(files: FileData[]): Promise<void> {
        const formdata = new FormData();
        files.forEach((file) => {
            formdata.append(
                file.filePath,
                this.bufferToBlob(file.file, "text/plain"),
                file.fileName
            );
        });
        formdata.append("database", this.database);
        formdata.append("hash", this.ResquestId);
        const requestOptions: RequestInit = {
            method: "POST",
            body: formdata,
            redirect: "follow",
        };

        fetch("http://localhost:3000/upload", requestOptions)
            .then((response) => response.json())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));
    }

    static lerArquivos(fileUri: string): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            readFile(fileUri, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    static newHash(): string {
        return createHash("sha1")
            .update(new Date().toString() + Math.random().toString())
            .digest("hex");
    }
}

// apos enviar o arquivo o compilador deve colocar a respota no servidor de testes já protno para testar caso ocorra sucesso 