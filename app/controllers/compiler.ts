import { window, OpenDialogOptions, Uri } from "vscode";
import { createReadStream, mkdirSync, readFile, writeFile, writeFileSync } from "fs";
import { Utils } from "../utils/utils";
import { dirname, join } from "path";
import { createHash } from "crypto";
import { copySync } from "fs-extra";
import * as AdmZip from 'adm-zip';



interface FileData {
    file: Buffer;
    fileName: string;
    filePath: string;
}
export class Compiler {
    public static ResquestId = Compiler.newHash();
    public static database: string;
    public static TocompileFolder: string;

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
                //adicionar um config para pegar o caminho do Azure Ems2
            ),
            filters: {
                "Arquivos Progress": ["p", "w", "cls", "i*"],
                "Todos os arquivos": ["*"],
            },
        };
        await window.showOpenDialog(options).then(async (fileUri) => {
            if (fileUri && fileUri[0]) {
                Compiler.TocompileFolder = Compiler.getFolderName(fileUri[0].fsPath);
                if (!fileUri[0].fsPath.toLocaleLowerCase().includes("src")) {
                    Utils.MostraMensagemErro(" Para o correto funcionamento do compilador é necessário que os arquivos estejam dentro de um pasta SRC");
                    return;
                }
                this.database = "Progress";
                // this.database = await Utils.selecionaDados(
                //     ["Progress", "SQL Server", "Oracle"],
                //     "Selecione o banco que deseja compilar",
                //     false
                // );
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

        await fetch("http://jv-neo-dev01.sp01.local:3333/upload", requestOptions)
            .then(
                (response) => response.json()
            )
            .then(async (result) => {
                let message: string = "";
                result.message = JSON.parse(result.message);
                result.message.forEach((element: any) => {
                    message += "Arquivo: " + Compiler.getFileName(element.Program) + " resultado: " + element.Result + "\n";
                });
                await fetch(`http://jv-neo-dev01.sp01.local:3333/download/${Compiler.ResquestId}`, { method: 'GET' })
                    .then(
                        (response) => response

                    ).then(async (result) => {
                        const outputPath = join("C:\\Users\\douglas.barbosa\\Desktop\\fndlm\\download");
                        const buffer = Buffer.from(await result.arrayBuffer());
                        const zip = new AdmZip(buffer);
                        const zipEntries = zip.getEntries();

                        zipEntries.forEach((zipEntry) => {
                            const entryData = zipEntry.getData();
                            const entryPath = join(outputPath, zipEntry.entryName);
                            if (zipEntry.isDirectory) {
                                mkdirSync(entryPath, { recursive: true });
                            } else {
                                const entryDir = dirname(entryPath);
                                mkdirSync(entryDir, { recursive: true });
                                writeFileSync(entryPath, entryData, 'binary');
                                console.log('Arquivo salvo em:', entryPath);
                            }
                        });

                    });
                window.showInformationMessage('Compilação executada com sucesso: Selecione o local para salvar os fontes', { modal: true, detail: message, }, ...["Rede", "Local"]).then((value) => {

                    switch (value) {
                        case "Rede":
                            Utils.MostraMensagemInfo("Arquivos salvos no ambiente de rede");
                            break;
                        case "Local":
                            copySync(result.resultFolder, Compiler.TocompileFolder);
                            Utils.MostraMensagemInfo("Arquivos salvos localmente");
                            break;
                        default:
                            break;
                    }


                });
                Utils.MostraMensagemInfo(result.message);
            })
            .catch((error) => console.log("error", error));
    }

    static getFileName(fileUri: string): string {
        return fileUri.split("\\").pop() || "";
    }
    static getFolderName(fileUri: string): string {
        return fileUri.substring(0, fileUri.lastIndexOf("\\") + 1);
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