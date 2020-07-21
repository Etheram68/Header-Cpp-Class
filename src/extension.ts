import * as vscode from 'vscode';
import * as fs from 'fs';


export function activate(context: vscode.ExtensionContext) {


	let disposable = vscode.commands.registerCommand('canonicalclass.makeclass', async function (){
		let name = await vscode.window.showInputBox({
			prompt: "Enter your Class Name",
			validateInput: (text: string): string | undefined => {
				if (!text){
					return 'You must enter a name';
				} else {
					return undefined;
				}
			}
		})
		if (name !== undefined){
			name = name.charAt(0).toUpperCase() + name.slice(1)

			const wsedit = new vscode.WorkspaceEdit();
			const wsPath = vscode.workspace.workspaceFolders![0].uri.fsPath;

			const filePathCpp = vscode.Uri.file(wsPath + '/' + name + '.Class' + '.cpp');
			const filePathHpp = vscode.Uri.file(wsPath + '/' + name + '.Class' + '.hpp');

			wsedit.createFile(filePathCpp, { ignoreIfExists: true });
			wsedit.createFile(filePathHpp, { ignoreIfExists: true });

			vscode.workspace.applyEdit(wsedit);

			let len = name.length;
			len += 23;
			len = 80 - len - 1
			let star = "*"
			for (; len > 0; len--)
			{
				star += "*"
			}

			let classcpp =  "#include \"" + name + ".Class" + ".hpp\"\n\n" +
							name + "::" + name + "() {}\n\n" +
							name + "::" + name + "( const " + name + " & object ) {}\n\n" +
							name + "::~" + name + "()\n{\n	std::cout << \"Destructor called\" << std::endl;\n}\n\n" +
							name + " &		" + name + "::operator=( " + name + " const & rhs )\n{\n	//if ( this != &rhs )\n" +
							"		//this->_value = rhs.getValue();\n" +
							"	return *this;\n}\n\n" +
							"std::ostream &		operator<<( std::ostream & o, " + name + " const & i )\n" +
							"{\n	//o << \"Value = \" << i.getValue();\n	return o;\n}\n\n" +
							"\n/* ************************************************************************** */";

			let classhpp =	"#ifndef " + name.toUpperCase() + "_CLASS" + "_HPP\n" +
							"# define " + name.toUpperCase() + "_CLASS" + "_HPP\n\n" +
							"# include <iostream>\n\n" +
							"class " + name + "\n{\n" +
							"\n" +
							"	public:\n" +
							"\n" +
							"		" + name + "();\n" +
							"		" + name + "( " + name + " const & src );\n" +
							"		~" + name + "();\n" +
							"\n" +
							"		" + name + " &		operator=( " + name + " const & rhs );"+
							"\n\n" +
							"	private:\n" +
							"};\n\n" +
							"std::ostream &		operator<<( std::ostream & o, " + name + " const & i );"+
							"\n\n" +
							"#endif /* *" + star + " " + name.toUpperCase() + "_CLASS_H */";
			fs.writeFile(filePathCpp.fsPath, classcpp, function (err: any) { if (err) return console.log(err); });
			fs.writeFile(filePathHpp.fsPath, classhpp, function (err: any) { if (err) return console.log(err); });
			vscode.window.showInformationMessage("Files : " + name + ".class.cpp, " + name + ".class.hpp created !");
		}
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
