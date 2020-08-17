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
import * as fs from 'fs';

import { getTemplate, getTemplateFull, getTemplateTpp } from './template';
import { getHeadercpp, getHeaderhpp } from './header';

export async function createQuickClass(name: string | undefined) {

	if (name !== undefined){
		name = name.charAt(0).toUpperCase() + name.slice(1)

		const wsedit = new vscode.WorkspaceEdit();
		const wsPath = vscode.workspace.workspaceFolders![0].uri.fsPath;

		const filePathCpp = vscode.Uri.file(wsPath + '/' + name + '.cpp');
		const filePathHpp = vscode.Uri.file(wsPath + '/' + name + '.hpp');

		let command = (vscode.workspace.getConfiguration().get('headercppclass.headerId') as string).trim();

		wsedit.createFile(filePathCpp, { ignoreIfExists: true });
		wsedit.createFile(filePathHpp, { ignoreIfExists: true });

		vscode.workspace.applyEdit(wsedit);

		getTemplate( name, filePathCpp, filePathHpp );
		await getHeadercpp( command, filePathCpp );
		await getHeaderhpp( command, filePathHpp );
	}
}

export async function createTemplateFile(name: string | undefined){
	if (name !== undefined){
		name = name.charAt(0).toUpperCase() + name.slice(1);

		name = name.substr(0, name.length - 4);

		const wsedit = new vscode.WorkspaceEdit();
		const wsPath = vscode.workspace.workspaceFolders![0].uri.fsPath;

		const filePathTpp = vscode.Uri.file(wsPath + '/' + name + ".tpp");

		let command = (vscode.workspace.getConfiguration().get('headercppclass.headerId') as string).trim();

		wsedit.createFile(filePathTpp, { ignoreIfExists: true });
		vscode.workspace.applyEdit(wsedit);
		
		getTemplateTpp( name, filePathTpp );
		await getHeadercpp( command, filePathTpp );
	}
}
/*
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

	let value1: string | undefined;
	let value2: string | undefined;
	let value3: string | undefined;
	let valueArray = [];
	let typeArray = [];

	for ( ; value1 !== 'exit' || !value1; )
	{
		value1 = await vscode.window.showInputBox({
			prompt: "Enter your Type Name, (Press 'exit' for leave.)",
			placeHolder: "Type",
			validateInput: (text: string): string | undefined => {
				if (!text){
					return 'You must enter a Type or Press \'exit\' if finish';
				} else {
					return undefined;
				}
			}
		})
		if (value1 != 'exit')
			value2 = await vscode.window.showInputBox({
				prompt: "Enter your variable Name",
				placeHolder: "Variable Name",
				validateInput: (text: string): string | undefined => {
					if (!text){
						return 'You must enter a Variable';
					} else {
						return undefined;
					}
				}
			})
		if (value1 !== 'exit')
		{
			typeArray.push(value1?.toLowerCase());
			valueArray.push(value2?.toLowerCase());
		}
	}
	if (name !== undefined){
		name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()

		const wsedit = new vscode.WorkspaceEdit();
		const wsPath = vscode.workspace.workspaceFolders![0].uri.fsPath;

		const filePathCpp = vscode.Uri.file(wsPath + '/' + name + '.Class' + '.cpp');
		const filePathHpp = vscode.Uri.file(wsPath + '/' + name + '.Class' + '.hpp');

		wsedit.createFile(filePathCpp, { ignoreIfExists: true });
		wsedit.createFile(filePathHpp, { ignoreIfExists: true });

		vscode.workspace.applyEdit(wsedit);

		getTemplateFull( name, filePathCpp, filePathHpp, valueArray, typeArray )
	}
}
*/
