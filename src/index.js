
const vscode = require('vscode');
const fs = require('fs');
const fs2 = require('fs-extra');
const child_process = require('child_process');
const path = require('path');

const {diretoriosServices} = require('./services');
// const {dadosServices} = require('./services');
const {rpoServices} = require('./services');

const diretorio = new diretoriosServices();
// const dados = new dadosServices();
const rpo = new rpoServices();

let repositorio = null





function verificaExtensao(values) {

	let  i = Object.entries(values) 
	let saveValues = values
	i.forEach(element => {
	if(element[0] =='issue_codificacao' || element[0] =='issue_tu' || element[0] =='arquivos_romana'|| element[0] =='issue_ti'||  element[0] =='evidencia') {
		let barra = (element[1].charAt(element[1].length-1));
		let elementName = element[0]
		if(barra != '\\'){
			let newValue = element[1] + '\\'
			saveValues[elementName] = newValue
			 
		} else { 
			saveValues[elementName] = element[1]
		}

	}
	});
	return saveValues
}

function reloadImports(context) {
	const repositorios_disk = path.join(context.extensionPath);
	const pathtoRepositorios = path.join(repositorios_disk, 'repositorios.json');
	repositorio = JSON.parse(fs.readFileSync(pathtoRepositorios, "utf8"));
}

function activate(context) {

	reloadImports(context)
	let create_issue = vscode.commands.registerCommand('extension.create.issue', async function () {
		let nome_issue = await vscode.window.showInputBox({ prompt: 'Insira o nome da issue ', placeHolder: 'Nome issue', ignoreFocusOut: true });
		if (!dados.validaDadosInformados(nome_issue)) {
			vscode.window.showInformationMessage(`${nome_issue}, Não é um nome válido`).then(1);
			return false
		} else {
			let options = ["Codificação", "Teste unitário", "Teste Integrado"]
			let placeHolder = `selecione a etapa de desenvolvimento da issue ${nome_issue}`;
			let selecionado = await dados.selecionaDados(options, placeHolder)
			switch (selecionado) {
				case 'Codificação':
					let verificar = diretorio.verificaExistencia(repositorio.issue_codificacao + nome_issue);
					if (!verificar) {
						await diretorio.criaDiretorio(repositorio.issue_codificacao + nome_issue);
						await diretorio.criaDiretorio(repositorio.evidencia + nome_issue);
						vscode.window.showInformationMessage(`Issue de Codificação: ${nome_issue} criado com sucesso`).then(1);
					} else {
						vscode.window.showInformationMessage(`Pasta já existe no diretório informado`).then(1);
					}
					break;
				case 'Teste unitário':
					let verificarTu = diretorio.verificaExistencia(repositorio.issue_tu + nome_issue);
					if (!verificarTu) {
						await diretorio.criaDiretorio(repositorio.issue_tu + nome_issue)
						await diretorio.copiaDiretorio(repositorio.arquivos_romana + nome_issue, repositorio.issue_tu + nome_issue, 'pasta')
						vscode.window.showInformationMessage(`Issue de teste Unitário:  ${nome_issue}  criado com sucesso`).then(1);
					} else {
						await diretorio.copiaDiretorio(repositorio.arquivos_romana + nome_issue, repositorio.issue_tu + nome_issue, 'pasta')
						vscode.window.showInformationMessage(`Pasta ${nome_issue} já existe - atualizando arquivos do servidor`).then(1);
					}

					break
				case 'Teste Integrado':
					let verificarTi = diretorio.verificaExistencia(repositorio.issue_ti + nome_issue);
					if (!verificarTi) {
						await diretorio.criaDiretorio(repositorio.issue_ti + nome_issue)
						await diretorio.copiaDiretorio(repositorio.arquivos_romana + nome_issue, repositorio.issue_ti + nome_issue, 'pasta')
						vscode.window.showInformationMessage(`Issue de teste Integrado:  ${nome_issue}  criado com sucesso`).then(1);
					} else {
						await diretorio.copiaDiretorio(repositorio.arquivos_romana + nome_issue, repositorio.issue_ti + nome_issue, 'pasta')
						vscode.window.showInformationMessage(`Pasta ${nome_issue} já existe - atualizando arquivos do servidor`).then(1);
					}
					break
				default:
					break;
			}
		}

	})

	let create_issue_associada = vscode.commands.registerCommand('extension.create.issue_associada', async function () {

		let nome_issue_associada = await vscode.window.showInputBox({ prompt: 'Insira o nome da issue que recebera a associação', placeHolder: 'Nome issue', ignoreFocusOut: true });
		if (!dados.validaDadosInformados(nome_issue_associada)) {
			vscode.window.showInformationMessage('dados "' + nome_issue_associada + '" Inválidos').then(1);
			return false
		}
		let options = ["Codificação", "Teste unitário", "Teste Integrado"]
		let placeHolder = `selecione a pasta que a issue ${nome_issue_associada} está`;
		let selecionado = await dados.selecionaDados(options, placeHolder)
		let issue_servidor = await vscode.window.showInputBox({ prompt: 'Insira o nome da que deve ser associada', placeHolder: 'Nome issue', ignoreFocusOut: true });
		if (!dados.validaDadosInformados(issue_servidor)) {
			vscode.window.showInformationMessage(`dados: ${issue_servidor} Inválidos`).then(1);
			return false
		}
		switch (selecionado) {
			case 'Codificação':
				let Associada_codificacao = repositorio.issue_codificacao + nome_issue_associada + '\\associada\\'
				await diretorio.criaDiretorio(Associada_codificacao)
				await diretorio.copiaDiretorio(repositorio.arquivos_romana + issue_servidor, Associada_codificacao + issue_servidor, 'pasta')
				break;
			case 'Teste unitário':
				let Associada_tu = repositorio.issue_tu + nome_issue_associada + '\\associada\\'
				await diretorio.criaDiretorio(Associada_tu)
				await diretorio.copiaDiretorio(repositorio.arquivos_romana + issue_servidor, Associada_tu + issue_servidor, 'pasta')
				break
			case 'Teste Integrado':
				let Associada_ti = repositorio.issue_ti + nome_issue_associada + '\\associada\\'
				await diretorio.criaDiretorio(Associada_ti)
				await diretorio.copiaDiretorio(repositorio.arquivos_romana + issue_servidor, Associada_ti + issue_servidor, 'pasta')
				break
			default:
				break;
		}
	});
	let open_log_archive = vscode.commands.registerCommand('extension.open.arquivo_log', async function () {
		let uri = vscode.Uri.file(repositorio.arquivo_log_appserver);
		await vscode.commands.executeCommand('vscode.open', uri);
	});

	let download_rpo = vscode.commands.registerCommand('extension.download.rpo', async function () {
		var options = [];
		repositorio.rpo_rede.forEach((elemento) => {
			options.push(elemento.name)
		})
		const selecionado = await dados.selecionaDados(options, 'Selecione a versão do Rpo que deseja fazer o download')


		repositorio.rpo_rede.forEach((elemento) => {
			if (elemento.name == selecionado) {
				diretorio.copiaDiretorio(elemento.folder, repositorio.rpo_local, 'arquivo')
			}
		})
	});


	let open_appserver = vscode.commands.registerCommand('extension.open.appserver', async function () {

		await child_process.exec(repositorio.appserver, function (error, stdout, stderr) {
			if (error) {
				vscode.window.showErrorMessage('erro:' + error).then(1);
			} else {
				vscode.window.showInformationMessage("Appserver fechado").then(1);
			}
		});
		vscode.window.showInformationMessage("Appserver aberto com sucesso").then(1);

	});
	let open_tss = vscode.commands.registerCommand('extension.open.tss', async function () {
		child_process.exec(repositorio.tss, function (error, stdout, stderr) {
			if (stderr) {
				vscode.window.showErrorMessage(stderr).then(1);
			}
		});
		child_process.exec(repositorio.dbacess_tss, function (error, stdout, stderr) {
			if (stderr) {
				vscode.window.showErrorMessage(stderr).then(1);
			} else {
				vscode.window.showInformationMessage("TSS fechado").then(1);

			}
		})
		vscode.window.showInformationMessage("Tss aberto  em modo processo").then(1);
	});
	let webviewPanel = undefined;
	let open_Webview = vscode.commands.registerCommand('extension.open.Webview', () => {
		if (webviewPanel) {
			webviewPanel.reveal();
		} else {
			webviewPanel = vscode.window.createWebviewPanel(
				'configDiretorios',
				'Configurar diretórios',
				vscode.ViewColumn.One,
				{
					enableScripts: true,
					retainContextWhenHidden: true,
					localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'public'))],

				})
			// Get path to resource on disk
			const onDiskPath = vscode.Uri.file(path.join(context.extensionPath, 'public/bootstrap/dist/css/', 'bootstrap.min.css'));
			const bootstrap = webviewPanel.webview.asWebviewUri(onDiskPath);

			const ScriptPath = vscode.Uri.file(path.join(context.extensionPath, 'public/', 'script.js'));
			const script = webviewPanel.webview.asWebviewUri(ScriptPath);
			const stylePath = vscode.Uri.file(path.join(context.extensionPath, 'public/', 'style.css'));
			const style = webviewPanel.webview.asWebviewUri(stylePath);

			const pathToLwcDist = path.join(context.extensionPath, 'public');
			const pathToHtml = path.join(pathToLwcDist, 'index.html');
			const html = fs.readFileSync(pathToHtml).toString();
			const pathToDist = path.join(context.extensionPath);
			const pathToRpo = path.join(pathToDist, 'repositorios.json');

			let view = `<!DOCTYPE html>
			<html lang="pt-br">
			
			<head>
			<script type="text/javascript" src="js/bootstrap-filestyle.min.js"> </script>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<link href="${bootstrap}" rel="stylesheet">
				<link href="${style}" rel="stylesheet">
				<title>Selecionar arquivos</title>
				<script src="${script}"></script>
				
			</head>`+ html
			webviewPanel.webview.html = view
			webviewPanel.webview.onDidReceiveMessage(message => {
				(async () => {
					switch (message.command) {
						case 'adicionaRpo':
							await rpo.adicionaRpo(pathToRpo);
							await reloadImports(context)
							webviewPanel.webview.postMessage({
								command: 'SelectedPath',
								diretorios: repositorio
							})
							break;
						case 'deletaRpo':
							await rpo.deletaRpo(pathToRpo);
							await reloadImports(context)
							webviewPanel.webview.postMessage({
								command: 'SelectedPath',
								diretorios: repositorio
							})
							break;
						case 'SelectPath':
							webviewPanel.webview.postMessage({
								command: 'SelectedPath',
								diretorios: repositorio
							})
							break;
						case 'save':
							const NewValues = await verificaExtensao(message.values)
							await diretorio.salvaArquivo(pathToRpo, NewValues)
							await reloadImports(context)
							webviewPanel.webview.postMessage({
								command: 'SelectedPath',
								diretorios: repositorio
							})
						case 'message': 
							if (message.type == 'error'){
								vscode.window.showErrorMessage(message.values)
							} else {
								vscode.window.showInformationMessage(message.values)
							}
						default:
							break;

					}
				})();

			},
				undefined, context.subscriptions
			);
			webviewPanel.onDidDispose(() => {
				webviewPanel = undefined;
			}, null, context.subscriptions);
		}

	})

	context.subscriptions.push(create_issue, create_issue_associada, open_log_archive, download_rpo, open_appserver, open_tss, open_Webview);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
