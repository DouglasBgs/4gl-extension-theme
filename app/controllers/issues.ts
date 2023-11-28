import { Etapa } from "../enums/etapa.enum.js";
import { Utils } from "../utils/utils.js";
import { Diretorios } from "../models/diretorios.js";
import { ConfigModel } from "../models/config.js";
import { Repositorio } from "../enums/repositorio.enum.js";
import { Servers } from "./servers.js";

export class Issues {
    public static async createLogix(pathToConfig: string) {
        const config = new ConfigModel(pathToConfig);
        const nome_issue: string = await Utils.selecionaNomes(
            "Logix: Insira o nome da issue ",
            "Nome issue (exemplo: TSS-1234)"
        );
        if (!nome_issue || !(await Utils.validaDadosInformados(nome_issue))) {
            Utils.MostraMensagemErro(` ${nome_issue}, Não é um nome válido`);
        } else {
            const options = [
                Etapa.Codificacao,
                Etapa.TesteUnitario,
                Etapa.TesteIntegrado,
            ];
            const selecionado = await this.selectStatus(nome_issue, options);
            switch (selecionado) {
                case Etapa.Codificacao:
                    Diretorios.criar(
                        nome_issue,
                        config.data.issue_codificacao,
                        Etapa.Codificacao
                    );
                    break;
                case Etapa.TesteUnitario:
                    Diretorios.criar(
                        nome_issue,
                        config.data.issue_tu,
                        Etapa.TesteUnitario
                    );
                    Diretorios.copiaPasta(
                        config.data.arquivos_romana + nome_issue,
                        config.data.issue_tu + nome_issue,
                        true
                    );
                    break;
                case Etapa.TesteIntegrado:
                    Diretorios.criar(
                        nome_issue,
                        config.data.issue_ti,
                        Etapa.TesteIntegrado
                    );
                    Diretorios.copiaPasta(
                        config.data.arquivos_romana + nome_issue,
                        config.data.issue_ti + nome_issue,
                        true
                    );
                    break;
                default:
                    break;
            }
        }
    }
    public static async createDatasul(
        pathToConfig: string,
        selecionado?: string
    ) {
        const config = new ConfigModel(pathToConfig);
        const nome_issue: string = await Utils.selecionaNomes(
            "Datasul: Insira o nome da issue ",
            "Nome issue (exemplo: TSS-1234)"
        );
        const options = [
            Repositorio.Datasul,
            Repositorio.Ems2,
            Repositorio.Ambos,
        ];
        if (!selecionado) {
            selecionado = await this.selectStatus(nome_issue, options);
        }
        switch (selecionado) {
            case Repositorio.Datasul:
                this.openTomcat(config, nome_issue);
                break;
            case Repositorio.Ems2:
                this.selectServerDatasul(config, nome_issue);

                break;
            case Repositorio.Ambos:
                this.openTomcat(config, nome_issue);
                this.selectServerDatasul(config, nome_issue);
                break;
            default:
                break;
        }
    }
    private static async openTomcat(config: ConfigModel, nome_issue: string) {
        const exists = await Diretorios.BuscaArquivos(
            `${config.data.compilado_datasul}${nome_issue}`
        );
        if (!exists) {
            Utils.MostraMensagemInfo(
                `Diretório informado é inexistente: ${config.data.compilado_datasul}${nome_issue}`
            );
            return;
        }
        await Diretorios.copiaPasta(
            `${config.data.compilado_datasul}${nome_issue}`,
            `${config.data.tomcat_datasul}webapps`
        ).then(() => {
            Utils.MostraMensagemInfo(
                `Arquivos copiados com sucesso para o tomcat: ${config.data.tomcat_datasul}`
            );
        });
        Servers.openTomcatDatasul(config.data.tomcat_datasul);
    }

    private static async selectStatus(nome_issue: string, options: any[]) {
        const placeHolder = `selecione a etapa atual do desenvolvimento da issue ${nome_issue}`;
        const selecionado = await Utils.selecionaDados(options, placeHolder);
        return selecionado;
    }

    private static async selectServerDatasul(
        config: ConfigModel,
        nome_issue: string
    ) {
        let pathToEms = `${config.data.compilado_ems}${nome_issue}`;
        const exists = await Diretorios.BuscaArquivos(pathToEms);
        if (!exists) {
            Utils.MostraMensagemInfo(
                `Diretório informado é inexistente: ${pathToEms}`
            );
            return;
        }
        const placeHolder = `selecione o servidor para deploy da issue ${nome_issue}`;
        const options = config.data.ambiente_datasul.map((ambiente) => {
            return ambiente.name;
        });

        const selecionado = await Utils.selecionaDados(options, placeHolder);
        const ambiente = config.data.ambiente_datasul.filter((ambiente) => {
            return ambiente.name == selecionado;
        });
        if (ambiente.length > 0) {
            const pathToServer = ambiente[0].folder;
            pathToEms = `${pathToEms}\\comp\\ems2\\11.5.X-SNAPSHOT\\${ambiente[0].banco_version}\\bin-gui`;
            await Diretorios.copiaPasta(
                pathToEms,
                pathToServer,
                false,
                "/xf *.txt *.log *.xml /COPY:DAT"
            )
                .then(() => {
                    Utils.MostraMensagemInfo(
                        `Arquivos copiados com sucesso para o servidor: ${pathToServer}`
                    );
                })
                .catch((err) => {
                    Utils.MostraMensagemErro(err);
                });
        }
    }
}
