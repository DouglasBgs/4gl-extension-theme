const vscode = acquireVsCodeApi();
window.addEventListener("load", main);
let codificacao = document.getElementById("codificacao");
let issue_tu = document.getElementById("issue_tu");
let issue_ti = document.getElementById("issue_ti");
let evidencia = document.getElementById("evidencia");
//Logix
let arquivos_romana = document.getElementById("arquivos_romana");
let arquivo_log_appserver = document.getElementById("arquivo_log_appserver");
let arquivo_log_appserver_64 = document.getElementById(
    "arquivo_log_appserver_64"
);
let appserver = document.getElementById("appserver");
let appserver_64 = document.getElementById("appserver_64");
let tss = document.getElementById("tss");
let tss_64 = document.getElementById("tss_64");
let dbacess_tss = document.getElementById("dbacess_tss");
let dbacess_tss_64 = document.getElementById("dbacess_tss_64");
let rpo_local = document.getElementById("rpo_local");
let rpo_local_64 = document.getElementById("rpo_local_64");
let rpo_rede = [];
let rpo_rede_64 = [];

//datasul
let tomcat_datasul = document.getElementById("tomcat_datasul");
let compilado_ems = document.getElementById("compilado_ems");
let compilado_datasul = document.getElementById("compilado_datasul");
let jenkins_url = document.getElementById("jenkins_url");

function main() {
    vscode.postMessage({
        command: "onload",
    });
}
function submit(close) {
    vscode.postMessage({
        command: "save",
        close: close,
        data: {
            issue_codificacao: codificacao.value,
            issue_tu: issue_tu.value,
            issue_ti: issue_ti.value,
            evidencia: evidencia.value,
            arquivos_romana: arquivos_romana.value,
            arquivo_log_appserver: arquivo_log_appserver.value,
            appserver: appserver.value,
            tss: tss.value,
            dbacess_tss: dbacess_tss.value,
            rpo_local: rpo_local.value,
            arquivo_log_appserver_64: arquivo_log_appserver_64.value,
            appserver_64: appserver_64.value,
            tss_64: tss_64.value,
            dbacess_tss_64: dbacess_tss_64.value,
            rpo_local_64: rpo_local_64.value,
            rpo_rede: rpo_rede,
            rpo_rede_64: rpo_rede_64,
            tomcat_datasul: tomcat_datasul.value,
            compilado_ems: compilado_ems.value,
            compilado_datasul: compilado_datasul.value,
            jenkins_url: jenkins_url.value,
        },
    });
}

async function selectFolder(elementName) {
    await vscode.postMessage({
        command: "selectFolder",
        elementName: elementName,
    });
}
async function selectFile(elementName, type) {
    await vscode.postMessage({
        command: "selectFile",
        elementName: elementName,
        type: type,
    });
}

async function verifyURL() {
    await vscode.postMessage({
        command: "verifyURL",
        elementName: jenkins_url.id,
        url: jenkins_url.value,
    });
}

window.addEventListener("message", (event) => {
    const command = event.data.command;
    switch (command) {
        case "SelectedFolder":
            document.querySelector(`#${event.data.elementId}`).value =
                event.data.folder;
            break;
        case "SelectedPath":
            console.log(event.data.config);
            LoadFieldsValue(event.data.config);

            break;
        case "SelectedFile":
            document.querySelector(`#${event.data.elementId}`).value =
                event.data.file;
            break;
        default:
            break;
    }
});

function LoadFieldsValue(data) {
    if (data) {
        codificacao.value = data.issue_codificacao;
        issue_tu.value = data.issue_tu;
        issue_ti.value = data.issue_ti;
        evidencia.value = data.evidencia;
        arquivos_romana.value = data.arquivos_romana;
        arquivo_log_appserver.value = data.arquivo_log_appserver;
        arquivo_log_appserver_64.value = data.arquivo_log_appserver_64;
        appserver.value = data.appserver;
        appserver_64.value = data.appserver_64;
        tss.value = data.tss;
        tss_64.value = data.tss_64;
        dbacess_tss.value = data.dbacess_tss;
        dbacess_tss_64.value = data.dbacess_tss_64;
        rpo_local.value = data.rpo_local;
        rpo_local_64.value = data.rpo_local_64;
        rpo_rede = data.rpo_rede;
        rpo_rede_64 = data.rpo_rede_64;
        loadDropDown(data.rpo_rede, data.rpo_rede_64);
        tomcat_datasul.value = data.tomcat_datasul;
        compilado_ems.value = data.compilado_ems;
        compilado_datasul.value = data.compilado_datasul;
        jenkins_url.value = data.jenkins_url;
    }
}

function loadDropDown(rpo32, rpo64) {
    let rpo32list = document.querySelector("#rpo32List");
    rpo32list.replaceChildren(...[]);
    insertValues(rpo32, rpo32list);
    let rpo64list = document.querySelector("#rpo64List");
    rpo64list.replaceChildren(...[]);
    insertValues(rpo64, rpo64list);
}

function insertValues(rpo, list) {
    for (let i = 0; i < rpo.length; i++) {
        let option = document.createElement("vscode-option");
        option.textContent = rpo[i].name;
        list.appendChild(option);
    }
}

function adicionaRpo(version) {
    vscode.postMessage({
        command: "addRpo",
        rpoVersion: version,
    });
}

function removeRpo(version) {
    vscode.postMessage({
        command: "removeRpo",
        rpoVersion: version,
    });
}
