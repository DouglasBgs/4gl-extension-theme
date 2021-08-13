
const vscode = require('vscode');
const repositorio = require('../repositorios.js');
const fs = require('fs');
const fs2 = require('fs-extra');
var child_process = require('child_process');
const { dbacess_tss } = require('../repositorios.js');

function criaDiretorio(nomeDiretorio) {
	return fs.mkdir(nomeDiretorio, (err) => {
		if (err) {
			return vscode.window.showErrorMessage('erro ao criar o diretório: já existe um diretório com esse nome na pasta especificada -' + err)
		} else {
			vscode.window.showInformationMessage('arquivos criados com sucesso')
		}
	});

}

async function selecionaDados(options, placeholder) {
	let dadoSelecionado = await vscode.window.showQuickPick(options, {
		placeHolder: placeholder,
	});
	return dadoSelecionado;
}

async function copiaDiretorio(copiar, destino) {
	await fs2.copy(copiar, destino, err => {
		if (err) {
			return vscode.window.showErrorMessage('erro ao copiar o diretório: Arquivo não encontrado no servidor -' + err)
		} else {
			vscode.window.showInformationMessage('arquivos copiados com sucesso')
		}
	})
}


function validaDadosInformados(texto) {
	return !!texto.match(/[A-Za-z].+\-.+[0-9]/);
}

function activate(context) {

	let create_issue = vscode.commands.registerCommand('extension.create.issue', async function () {
		let nome_issue = await vscode.window.showInputBox({ prompt: 'Insira o nome da issue de codificação', placeHolder: 'Nome issue' });
		if (validaDadosInformados(nome_issue)) {
			criaDiretorio(repositorio.issue_codificacao + nome_issue)
			criaDiretorio(repositorio.evidencia + nome_issue)
		} else {
			vscode.window.showInformationMessage('dados "' + nome_issue + '" Inválidos')
		}
	});

	let create_issue_tu = vscode.commands.registerCommand('extension.create.issue_tu', async function () {
		let nome_issue = await vscode.window.showInputBox({ prompt: 'Insira o nome da issue de Teste Unitário', placeHolder: 'Nome issue' });
		if (validaDadosInformados(nome_issue)) {
			try {
				await criaDiretorio(repositorio.issue_tu + nome_issue)
				await copiaDiretorio(repositorio.arquivos_romana + nome_issue, repositorio.issue_tu + nome_issue)
				return vscode.window.showInformationMessage(`Issue de teste Unitário:  ${nome_issue}  criado com sucesso`);
			} catch (err) {
				return vscode.window.showErrorMessage('erro na criação' + err);
			}
		} else {
			vscode.window.showInformationMessage('dados informados são inválidos!');

		}
	});
	let create_issue_ti = vscode.commands.registerCommand('extension.create.issue_ti', async function () {
		let nome_issue = await vscode.window.showInputBox({ prompt: 'Insira o nome da issue de Teste Integrado', placeHolder: 'Nome issue' });
		if (validaDadosInformados(nome_issue)) {
			try {
				await criaDiretorio(repositorio.issue_ti + nome_issue)
				await copiaDiretorio(repositorio.arquivos_romana + nome_issue, repositorio.issue_ti + nome_issue)
				return vscode.window.showInformationMessage(`Issue de teste Integrado:  ${nome_issue}  criado com sucesso`);
			} catch (err) {
				return vscode.window.showErrorMessage('erro na criação' + err);
			}
		} else {
			vscode.window.showInformationMessage('dados informados são inválidos!');
		}
	});
	let create_issue_associada = vscode.commands.registerCommand('extension.create.issue_associada', async function () {

		let nome_issue_associada = await vscode.window.showInputBox({ prompt: 'Insira o nome da issue que recebera a associação', placeHolder: 'Nome issue' });
		if (!validaDadosInformados(nome_issue_associada)) {
			vscode.window.showInformationMessage('dados "' + nome_issue_associada + '" Inválidos')
			return false
		}
		let options = ["Codificação", "Teste unitário", "Teste Integrado"]
		let placeHolder = `selecione a pasta que a issue ${nome_issue_associada} está`;
		let selecionado = await selecionaDados(options, placeHolder)
		let issue_servidor = await vscode.window.showInputBox({ prompt: 'Insira o nome da que deve ser associada', placeHolder: 'Nome issue' });
		if (!validaDadosInformados(issue_servidor)) {
			vscode.window.showInformationMessage(`dados: ${issue_servidor} Inválidos`)
			return false
		}
		switch (selecionado) {
			case 'Codificação':
				let Associada_codificacao = repositorio.issue_codificacao + nome_issue_associada + '\\associada\\'
				await criaDiretorio(Associada_codificacao)
				await copiaDiretorio(repositorio.arquivos_romana + issue_servidor, Associada_codificacao + issue_servidor)
				break;
			case 'Teste unitário':
				let Associada_tu = repositorio.issue_tu + nome_issue_associada + '\\associada\\'
				await criaDiretorio(Associada_tu)
				await copiaDiretorio(repositorio.arquivos_romana + issue_servidor, Associada_tu + issue_servidor)
				break
			case 'Teste Integrado':
				let Associada_ti = repositorio.issue_ti + nome_issue_associada + '\\associada\\'
				await criaDiretorio(Associada_ti)
				await copiaDiretorio(repositorio.arquivos_romana + issue_servidor, Associada_ti + issue_servidor)
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
				copiaDiretorio(elemento.folder, repositorio.rpo_local)
			}
		})
	});


	let open_appserver = vscode.commands.registerCommand('extension.open.appserver', async function () {

		child_process.exec(repositorio.appserver, function (error, stdout, stderr) {
			console.log(stdout);
			if(stderr){
				vscode.window.showErrorMessage(stderr);
			}else{
				vscode.window.showInformationMessage("Appserver aberto com sucesso");
			}
		});

	});
	let open_tss = vscode.commands.registerCommand('extension.open.tss', async function () {
		child_process.execFile(repositorio.dbacess_tss, function (error, stdout, stderr) {
			console.log(stdout);
			if(stderr){
				vscode.window.showErrorMessage(stderr);
			}else{
				child_process.execFile(repositorio.tss, function (error, stdout, stderr) {
					console.log(stdout);
					if(stderr){
						vscode.window.showErrorMessage(stderr);
					}else{
						vscode.window.showInformationMessage("Tss aberto com sucesso");
					}
				})
				
			}
		});

	});


	context.subscriptions.push(create_issue, create_issue_tu, create_issue_ti, create_issue_associada, open_log_archive, download_rpo, open_appserver,open_tss);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
