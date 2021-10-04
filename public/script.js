function getFilePath() {
    const vscode = acquireVsCodeApi();
    const counter = document.getElementById('fileUpload').value;
    vscode.postMessage({
        command: 'alert',
        text: '🐛  on line ' + counter
    })
}

