const vscode = require('vscode');
const fs = require('fs');

function activate(context) {
    console.log('active !!!');

    // register
    let commandOfGetFileStateBytes = vscode.commands.registerCommand('getFileStateBytes', uri => {
        // path
        const filePath = uri.path.substring(1);
        fs.stat(filePath, (err, stats) => {
            if (err) {
                vscode.window.showErrorMessage(`获取文件时遇到错误了${err}!!!`)
            }

            if (stats.isDirectory()) {
                vscode.window.showWarningMessage(`类型错误！只能检测文件，请重新选择！！！`);
            }

            if (stats.isFile()) {
                const {size,birthtime,mtime } = stats
                const createTime = birthtime.toLocaleString();
                const modifyTime = mtime.toLocaleString();

                vscode.window.showInformationMessage(`
                    文件大小为:${size}Bytes;
                    文件createTime为:${createTime};
                    文件modifyTime为:${modifyTime}
                `, { modal: true });
            }
        });
        
        const stats = fs.statSync(filePath);
    });

    context.subscriptions.push(commandOfGetFileStateBytes);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}