import { URL } from "url";
import { Utils } from "../utils/utils";
import { ConfigModel } from "../models/config";
import { setTimeout } from "timers/promises";
import { window, ProgressLocation, Progress } from "vscode";

export class buildManual {
    static async novo(pathToConfig: string) {
        window.withProgress(
            {
                cancellable: true,
                location: ProgressLocation.Notification,
                title: "Gerando Build Manual",
            },
            async (progress) => {
                progress.report({ increment: 0 });
                const config = new ConfigModel(pathToConfig);
                const urlJenkins = new URL(config.data.jenkins_url.toString());
                const nome_issue: string = await Utils.selecionaNomes(
                    "Datasul: Insira o nome da issue",
                    "Nome issue (exemplo: TSS-1234)"
                );
                progress.report({ increment: 5 });
                const nome_projeto: string = await Utils.selecionaNomes(
                    "Datasul: Insira o nome do projeto",
                    "Nome issue (exemplo: totvs-projeto)"
                );
                if (!nome_projeto || !nome_issue) {
                    return;
                }
                progress.report({ increment: 10 });

                const build = <string>await this.selectBuild(urlJenkins.origin);

                progress.report({ increment: 20 });

                const location = await this.generateBuild(
                    urlJenkins,
                    build,
                    nome_projeto,
                    nome_issue,
                    progress
                );
                let json = await this.fetchQueue(location);

                while (!json.executable) {
                    progress.report({
                        increment: +1,
                        message: "Aguardando build ser executado :" + json.why,
                    });
                    json = await this.fetchQueue(location);
                    setTimeout(1000);
                }
                progress.report({ increment: 100 });
                await Utils.MostraMensagemInfo(
                    `Build gerado com sucesso em:  
                    [Build #${json.executable.number}](${json.executable.url})`
                );
            }
        );
    }

    public static async generateBuild(
        urlJenkins: URL,
        build: string,
        nome_projeto: string,
        nome_issue: string,
        progress: Progress<{
            message?: string;
            increment?: number;
        }>
    ): Promise<string> {
        const getUrl = `${urlJenkins.origin}/crumbIssuer/api/json`;
        const postUrl = `${
            urlJenkins.origin
        }/view/Build-Manual/job/${build}/buildWithParameters?repositorio=${nome_projeto.trim()}&branch=${nome_issue.trim()}&issue=${nome_issue.trim()}&artefato=${nome_projeto.trim()}`;
        progress.report({ increment: 30 });
        const respGet = await fetch(getUrl);
        const crumbResp = await respGet.json();
        const cookie = respGet.headers.get("set-cookie");
        const headers = {
            "Jenkins-Crumb": crumbResp.crumb,
            Cookie: cookie,
        };
        progress.report({ increment: 40 });
        const repPost = await fetch(postUrl, {
            method: "POST",
            headers: headers,
        });
        progress.report({ increment: 60 });
        return repPost.headers.get("Location");
    }

    public static async fetchQueue(location: string) {
        const respGeneration = await fetch(`${location}/api/json`, {
            headers: {
                "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
            },
        });
        return await respGeneration.json();
    }

    static async fetchBuilds(
        url: string,
        showMessage: boolean = true
    ): Promise<string | void> {
        let build: string;
        try {
            const new_url = new URL(url);
            const url_origin = new_url.origin;
            const resp = await fetch(
                `${url_origin}/view/Build-Manual/api/json`
            );

            if (resp.status !== 200) {
                Utils.MostraMensagemErro(
                    "Erro ao buscar os builds Disponíveis, verifique a URL do Jenkins"
                );
                return;
            }

            const json = await resp.json();
            const names: string[] = json.jobs.map((job: any) => job.name);

            if (showMessage) {
                await Utils.MostraMensagemInfo(
                    "Servidor conectado com sucesso! \n Build disponíveis: \n" +
                        names.join("\n"),
                    false
                );
            } else {
                build = await Utils.selecionaDados(
                    names,
                    "Selecione o build que deseja executar"
                );
                return build;
            }
        } catch (err) {
            Utils.MostraMensagemErro("Erro ao acessar a URL: " + err);
        }
    }

    static async selectBuild(url: string) {
        return await this.fetchBuilds(url, false);
    }

    static async showBuilds(url: string) {
        await this.fetchBuilds(url);
    }
}
