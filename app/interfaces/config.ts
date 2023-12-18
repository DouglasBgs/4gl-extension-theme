import { URL } from "url";
export interface Rpo {
    folder: string;
    name: string;
}

export enum BancoName {
    Sql = "sql",
    Progress = "progress",
}
export interface Ambiente_datasul {
    name: string;
    folder: string;
    banco_version: string;
}
export interface IConfig {
    issue_codificacao: string;
    issue_tu: string;
    issue_ti: string;
    evidencia: string;
    arquivos_romana: string;
    arquivo_log_appserver: string;
    appserver: string;
    tss: string;
    dbacess_tss: string;
    rpo_local: string;
    rpo_rede: Rpo[];
    arquivo_log_appserver_64: string;
    appserver_64: string;
    tss_64: string;
    dbacess_tss_64: string;
    rpo_local_64: string;
    rpo_rede_64: Rpo[];
    tomcat_datasul: string;
    compilado_ems: string;
    compilado_datasul: string;
    jenkins_url: URL;
    ambiente_datasul: Ambiente_datasul[];
}

export interface SelectFile {
    command: string;
    elementName: string;
    type: string[];
}
