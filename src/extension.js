
const vscode = require('vscode');
const repositorio = require('../.repositorios');
const fs = require('fs');
const fs2 = require('fs-extra');
var child_process = require('child_process');
const path = require('path');

async function criaDiretorio(nomeDiretorio) {
	fs.mkdir(nomeDiretorio, (err) => {
		if (err) {
			vscode.window.showErrorMessage('Não foi possível criar os arquivos:' + err).then(1);
		}
	});
}

async function selecionaDados(options, placeholder) {
	let dadoSelecionado = await vscode.window.showQuickPick(options, {
		placeHolder: placeholder,
		ignoreFocusOut: true
	});
	return dadoSelecionado;
}

async function copiaDiretorio(copiar, destino, tipo) {

	switch (tipo) {
		case 'arquivo':
			let rd = fs.createReadStream(copiar);
			let wr = fs.createWriteStream(destino);
			let file = fs.statSync(copiar);
			let filesize = file.size;
			let bytesCopiados = 0;
			let i = 0;
			if (verificaExistencia(copiar)) {
				new Promise(function (resolve, reject) {
					rd.on('data', function (buffer) {
						bytesCopiados += buffer.length
						let porcentagem = ((bytesCopiados / filesize) * 100).toFixed(2)
						let intPorcentagem = parseInt(porcentagem);
						if (intPorcentagem > i) {
							vscode.window.setStatusBarMessage(`$(desktop-download) Copiando arquivos ${porcentagem}%`, 10000)
							i + 1
						}
					})
					rd.on('error', reject);
					wr.on('error', reject);
					wr.on('finish', resolve);
					rd.pipe(wr);
				}).then(function () {
					vscode.window.showInformationMessage('Arquivos copiados com sucesso').then(1);
				}).catch(function (error) {
					rd.destroy();
					wr.end()
					vscode.window.showErrorMessage('Não foi possível copiar os arquivos:' + error).then(1);

				})
			} else {
				vscode.window.showErrorMessage('Arquivos para copiar não encontrado em: ' + copiar).then(1);
			}
			break

		case 'pasta':
			if (verificaExistencia(copiar)) {
				vscode.window.withProgress({
					location: vscode.ProgressLocation.Notification,
					title: "Aguarde",
					cancellable: false
				}, async (progress, token) => {
					setTimeout(() => {
						progress.report({ increment: 0, message: "copiando arquivos de: " + copiar });
					}, 0);

					await fs2.copy(copiar, destino, err => {
						if (err) {
							return vscode.window.showErrorMessage('erro ao copiar o diretório: Arquivo não encontrado no servidor -' + err).then(1);
						} else {
							vscode.window.showInformationMessage('arquivos copiados com sucesso').then(1);
						}

					})
					const p = new Promise(resolve => {
						setTimeout(() => {
							resolve();
						}, 10000);
					});
					return p

				})
			} else {
				vscode.window.showErrorMessage('Pasta para copiar não encontrado em: ' + copiar).then(1);
			}
			break;
		default:
			break;
	}

}

function verificaExistencia(nomeDiretorio) {

	if (fs.existsSync(nomeDiretorio)) {
		return true
	}
	else {
		return false
	}
}

function validaDadosInformados(texto) {
	return !!texto.match(/[A-Za-z].+\-.+[0-9]/);
}

function activate(context) {

	let create_issue = vscode.commands.registerCommand('extension.create.issue', async function () {
		let nome_issue = await vscode.window.showInputBox({ prompt: 'Insira o nome da issue ', placeHolder: 'Nome issue', ignoreFocusOut: true });
		if (!validaDadosInformados(nome_issue)) {
			vscode.window.showInformationMessage(`${nome_issue}, Não é um nome válido`).then(1);
			return false
		} else {
			let options = ["Codificação", "Teste unitário", "Teste Integrado"]
			let placeHolder = `selecione a etapa de desenvolvimento da issue ${nome_issue}`;
			let selecionado = await selecionaDados(options, placeHolder)
			switch (selecionado) {
				case 'Codificação':
					let verificar = verificaExistencia(repositorio.issue_codificacao + nome_issue);
					if (!verificar) {
						await criaDiretorio(repositorio.issue_codificacao + nome_issue);
						await criaDiretorio(repositorio.evidencia + nome_issue);
						vscode.window.showInformationMessage(`Issue de Codificação: ${nome_issue} criado com sucesso`).then(1);
					} else {
						vscode.window.showInformationMessage(`Pasta já existe no diretório informado`).then(1);
					}
					break;
				case 'Teste unitário':
					let verificarTu = verificaExistencia(repositorio.issue_tu + nome_issue);
					if (!verificarTu) {
						await criaDiretorio(repositorio.issue_tu + nome_issue)
						await copiaDiretorio(repositorio.arquivos_romana + nome_issue, repositorio.issue_tu + nome_issue, 'pasta')
						vscode.window.showInformationMessage(`Issue de teste Unitário:  ${nome_issue}  criado com sucesso`).then(1);
					} else {
						await copiaDiretorio(repositorio.arquivos_romana + nome_issue, repositorio.issue_tu + nome_issue, 'pasta')
						vscode.window.showInformationMessage(`Pasta ${nome_issue} já existe - atualizando arquivos do servidor`).then(1);
					}

					break
				case 'Teste Integrado':
					let verificarTi = verificaExistencia(repositorio.issue_ti + nome_issue);
					if (!verificarTi) {
						await criaDiretorio(repositorio.issue_ti + nome_issue)
						await copiaDiretorio(repositorio.arquivos_romana + nome_issue, repositorio.issue_ti + nome_issue, 'pasta')
						vscode.window.showInformationMessage(`Issue de teste Integrado:  ${nome_issue}  criado com sucesso`).then(1);
					} else {
						await copiaDiretorio(repositorio.arquivos_romana + nome_issue, repositorio.issue_ti + nome_issue, 'pasta')
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
		if (!validaDadosInformados(nome_issue_associada)) {
			vscode.window.showInformationMessage('dados "' + nome_issue_associada + '" Inválidos').then(1);
			return false
		}
		let options = ["Codificação", "Teste unitário", "Teste Integrado"]
		let placeHolder = `selecione a pasta que a issue ${nome_issue_associada} está`;
		let selecionado = await selecionaDados(options, placeHolder)
		let issue_servidor = await vscode.window.showInputBox({ prompt: 'Insira o nome da que deve ser associada', placeHolder: 'Nome issue', ignoreFocusOut: true });
		if (!validaDadosInformados(issue_servidor)) {
			vscode.window.showInformationMessage(`dados: ${issue_servidor} Inválidos`).then(1);
			return false
		}
		switch (selecionado) {
			case 'Codificação':
				let Associada_codificacao = repositorio.issue_codificacao + nome_issue_associada + '\\associada\\'
				await criaDiretorio(Associada_codificacao)
				await copiaDiretorio(repositorio.arquivos_romana + issue_servidor, Associada_codificacao + issue_servidor, 'pasta')
				break;
			case 'Teste unitário':
				let Associada_tu = repositorio.issue_tu + nome_issue_associada + '\\associada\\'
				await criaDiretorio(Associada_tu)
				await copiaDiretorio(repositorio.arquivos_romana + issue_servidor, Associada_tu + issue_servidor, 'pasta')
				break
			case 'Teste Integrado':
				let Associada_ti = repositorio.issue_ti + nome_issue_associada + '\\associada\\'
				await criaDiretorio(Associada_ti)
				await copiaDiretorio(repositorio.arquivos_romana + issue_servidor, Associada_ti + issue_servidor, 'pasta')
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
		const selecionado = await selecionaDados(options, 'Selecione a versão do Rpo que deseja fazer o download')


		repositorio.rpo_rede.forEach((elemento) => {
			if (elemento.name == selecionado) {
				copiaDiretorio(elemento.folder, repositorio.rpo_local, 'arquivo')
			}
		})
	});


	let open_appserver = vscode.commands.registerCommand('extension.open.appserver', async function () {

		await child_process.exec(repositorio.appserver, function (error, stdout, stderr) {
			if (error) {
				vscode.window.showErrorMessage('erro:'+ error).then(1);
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
	let open_Webview = vscode.commands.registerCommand('extension.open.Webview', () => {
		let webviewPanel = vscode.window.createWebviewPanel(
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
		let html = fs.readFileSync(pathToHtml).toString();
		// Handle messages from the webview
		webviewPanel.webview.onDidReceiveMessage(
			message => {
			  switch (message.command) {
				case 'alert':
				  vscode.window.showErrorMessage(message.text);
				  return;
			  }
			},
			undefined,
			context.subscriptions
		  );
		webviewPanel.webview.postMessage({ command: 'refactor' });
		webviewPanel.webview.html = `<!DOCTYPE html>
		<html lang="pt-br">
		
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<link href="${bootstrap}" rel="stylesheet">
			<link href="${style}" rel="stylesheet">
			<title>Selecionar arquivos</title>
			<script src="${script}"></script>
		</head>`+ html


	})




	context.subscriptions.push(create_issue, create_issue_associada, open_log_archive, download_rpo, open_appserver, open_tss, open_Webview);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
