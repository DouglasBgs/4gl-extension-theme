
const vscode = require('vscode');
const repositorio = require('../repositorios.js');
const fs = require('fs');
 
function  activate(context) {

	let disposable = vscode.commands.registerCommand('extension.create.issue', async function () {
		const nome_issue = await vscode.window.showInputBox({ prompt: 'Insira o nome da issue', placeHolder: 'Nome issue' });
		fs.mkdir(repositorio.issue_codificacao+nome_issue, (err) => {
			if (err) {
				vscode.window.showInformationMessage('erro na criação'+ err);
			}
		});
		fs.mkdir(repositorio.evidencia+nome_issue, (err) => {
			if (err) {
				vscode.window.showInformationMessage('erro na criação'+ err);
			}
			vscode.window.showInformationMessage('criado com sucesso');
		});		
	});

	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
