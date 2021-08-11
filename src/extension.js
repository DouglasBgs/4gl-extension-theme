
const vscode = require('vscode');
const repositorio = require('../repositorios.js');
const fs = require('fs');
const fs2 = require('fs-extra');
const { time } = require('console');

function criaDiretorio(nomeDiretorio) {
return fs.mkdir(nomeDiretorio, (err) => {
		if (err) {
			return err
		}
	});

}

function copiaDiretorio(copiar, destino) {
	return fs2.copy(copiar, destino, (err) => {
		if (err) {
			return err
		}
	});

}
function validaDadosInformados(texto) {
	return !!texto.match(/[A-Za-z].+\-.+[0-9]/);
}

function activate(context) {

	let create_issue = vscode.commands.registerCommand('extension.create.issue', async function () {
		const nome_issue = await vscode.window.showInputBox({ prompt: 'Insira o nome da issue de codificação', placeHolder: 'Nome issue' });
		if (validaDadosInformados(nome_issue)) {
			try {
				 criaDiretorio(repositorio.issue_codificacao + nome_issue)
				 criaDiretorio(repositorio.evidencia + nome_issue)
				return vscode.window.showInformationMessage('Issue de codificação: ' + nome_issue + ' criado com sucesso');
			} catch (err) {
				return vscode.window.showErrorMessage('erro na criação' + err);
			};
		} else {
			vscode.window.showInformationMessage('dados ' + nome_issue + ' Inválidos');

		}

	});

	let create_issue_tu = vscode.commands.registerCommand('extension.create.issue_tu', async function () {
		const nome_issue = await vscode.window.showInputBox({ prompt: 'Insira o nome da issue de Teste Unitário', placeHolder: 'Nome issue' });
		if (validaDadosInformados(nome_issue)) {
			try {
				await criaDiretorio(repositorio.issue_tu + nome_issue)				
				await copiaDiretorio(repositorio.arquivos_romana + nome_issue, repositorio.issue_tu + nome_issue)
				return vscode.window.showInformationMessage('Issue de teste Unitário: ' + nome_issue + ' criado com sucesso');
			} catch (err) {
				return vscode.window.showErrorMessage('erro na criação' + err);
			}
		} else {
			vscode.window.showInformationMessage('dados informados são inválidos!');

		}
	});
	let create_issue_ti = vscode.commands.registerCommand('extension.create.issue_ti', async function () {
		const nome_issue = await vscode.window.showInputBox({ prompt: 'Insira o nome da issue de Teste Integrado', placeHolder: 'Nome issue' });
		if (validaDadosInformados(nome_issue)) {
			try {
				await criaDiretorio(repositorio.issue_ti + nome_issue)
				await copiaDiretorio(repositorio.arquivos_romana + nome_issue, repositorio.issue_ti + nome_issue)
				return vscode.window.showInformationMessage('Issue de teste Integrado: ' + nome_issue + ' criado com sucesso');
			} catch (err) {
				return vscode.window.showErrorMessage('erro na criação' + err);
			}
		} else {
			vscode.window.showInformationMessage('dados informados são inválidos!');
		}
	});
	context.subscriptions.push(create_issue, create_issue_tu,create_issue_ti);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
