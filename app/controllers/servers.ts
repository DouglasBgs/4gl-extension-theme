import { Uri, commands } from "vscode";
import { ConfigModel } from "../models/config";
import { Utils } from "../utils/utils.js";
import { Build } from "../enums/build.enum";
import { Terminals } from "../utils/terminals";

export class Servers {
    public static async openAppServer(pathToAppServer: string) {
        const config = new ConfigModel(pathToAppServer);
        const build: string = await this.selectBuild();
        if (!build) {
            return;
        }
        let appserver: string;
        let nameAppServer: string;
        if (build == Build.b64) {
            appserver = config.data.appserver_64;
            nameAppServer = "AppServer 64";
        } else {
            appserver = config.data.appserver;
            nameAppServer = "AppServer";
        }
        Terminals.executaComando(nameAppServer, appserver);
    }

    public static async openTss(pathToTss: string) {
        const config = new ConfigModel(pathToTss);
        const build: string = await this.selectBuild();
        if (!build) {
            return;
        }
        let tss: string;
        let dbAcessTss: string;
        let nameTss: string;
        let nameDbAccess: string;
        if (build == Build.b64) {
            tss = `${config.data.tss} -console`;
            nameTss = "TSS 64";
            nameDbAccess = "DBAcess TSS 64";
            dbAcessTss = `${config.data.dbacess_tss} -console`;
        } else {
            tss = `${config.data.tss_64} -console`;
            nameTss = "TSS";
            nameDbAccess = "DBAcess TSS";
            dbAcessTss = `${config.data.dbacess_tss_64} -console`;
        }
        Terminals.executaComando(nameTss, tss);
        Terminals.executaComando(nameDbAccess, dbAcessTss);
    }

    public static async openTomcat(pathToTomcat: string) {
        const config = new ConfigModel(pathToTomcat);
        this.openTomcatDatasul(config.data.tomcat_datasul);
    }

    public static async openTomcatDatasul(pathToTomcat: string) {
        const tomcat: string = `
    cd ${pathToTomcat}
    ${pathToTomcat}\\bin\\catalina.bat run Using CATALINA_BASE:"${pathToTomcat}" Using CATALINA_HOME:   "${pathToTomcat}" Using CATALINA_TMPDIR: "${pathToTomcat}temp"`;
        const nameTomcat: string = "Tomcat Datasul";
        Terminals.executaComando(nameTomcat, tomcat);
    }

    public static async selectBuild() {
        const options = [Build.b32, Build.b64];
        const build: any = await Utils.selecionaDados(
            options,
            "Selecione o Build para executar o comando"
        );

        return build;
    }

    public static async openLogFile(pathToLogFile: string) {
        const repositorio = new ConfigModel(pathToLogFile);
        const build: string = await this.selectBuild();
        if (!build) {
            return;
        }
        let uri: Uri;
        if (build == Build.b64) {
            uri = Uri.file(repositorio.data.arquivo_log_appserver_64);
        } else {
            uri = Uri.file(repositorio.data.arquivo_log_appserver);
        }
        await commands.executeCommand("vscode.open", uri);
    }
}
