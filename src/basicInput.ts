/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   basicInput.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: frfrey <frfrey@student.42lyon.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/07/22 10:21:45 by frfrey            #+#    #+#             */
/*   Updated: 2020/07/22 10:21:45 by frfrey           ###   ########lyon.fr   */
/*                                                                            */
/* ************************************************************************** */

import * as vscode from 'vscode';
import { getTemplate } from './template';

export async function createQuickClass() {
	let name = await vscode.window.showInputBox({
		prompt: "Enter your Class Name",
		placeHolder: "ClassName",
		validateInput: (text: string): string | undefined => {
			if (!text){
				return 'You must enter a name';
			} else {
				return undefined;
			}
		}
	});
	if (name !== undefined){
		name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()

		const wsedit = new vscode.WorkspaceEdit();
		const wsPath = vscode.workspace.workspaceFolders![0].uri.fsPath;

		const filePathCpp = vscode.Uri.file(wsPath + '/' + name + '.Class' + '.cpp');
		const filePathHpp = vscode.Uri.file(wsPath + '/' + name + '.Class' + '.hpp');

		wsedit.createFile(filePathCpp, { ignoreIfExists: true });
		wsedit.createFile(filePathHpp, { ignoreIfExists: true });

		vscode.workspace.applyEdit(wsedit);

		getTemplate(name, filePathCpp, filePathHpp )
	}
}

export async function createClass() {
	let name = await vscode.window.showInputBox({
		prompt: "Enter your Class Name",
		placeHolder: "ClassName",
		validateInput: (text: string): string | undefined => {
			if (!text){
				return 'You must enter a name';
			} else {
				return undefined;
			}
		}
	});
	if (name !== undefined){
		name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase

		const wsedit = new vscode.WorkspaceEdit();
		const wsPath = vscode.workspace.workspaceFolders![0].uri.fsPath;

		const filePathCpp = vscode.Uri.file(wsPath + '/' + name + '.Class' + '.cpp');
		const filePathHpp = vscode.Uri.file(wsPath + '/' + name + '.Class' + '.hpp');

		wsedit.createFile(filePathCpp, { ignoreIfExists: true });
		wsedit.createFile(filePathHpp, { ignoreIfExists: true });

		vscode.workspace.applyEdit(wsedit);

		getTemplate(name, filePathCpp, filePathHpp )
	}
}
