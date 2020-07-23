/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   header.ts                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: frfrey <frfrey@student.42lyon.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/07/23 20:24:24 by frfrey            #+#    #+#             */
/*   Updated: 2020/07/23 20:24:24 by frfrey           ###   ########lyon.fr   */
/*                                                                            */
/* ************************************************************************** */

import * as vscode from 'vscode';
import { assert } from 'console';

export async function getHeadercpp(command: string, filePathCpp: vscode.Uri) {

	if (command && command.length > 0)
	{
		await vscode.workspace.openTextDocument(filePathCpp).then((a: vscode.TextDocument) => {
			vscode.window.showTextDocument(a, 1, false).then( e => {
				e.edit(() => {
					vscode.commands.executeCommand(command).then(() => {});
				});
			});
		}, (err: any) => {
			vscode.window.showErrorMessage("Header Cpp Class: " + err.message);
		});
		vscode.workspace.onDidSaveTextDocument;
		vscode.workspace.onDidCloseTextDocument;
	}
}

export async function getHeaderhpp(command: string, filePathHpp: vscode.Uri) {

	if (command && command.length > 0)
	{
		await vscode.workspace.openTextDocument(filePathHpp).then((a: vscode.TextDocument) => {
			vscode.window.showTextDocument(a, 1, false).then( e => {
				e.edit(() => {
					vscode.commands.executeCommand(command).then(() => {});
				});
			});
		}, (err: any) => {
			vscode.window.showErrorMessage("Header Cpp Class: " + err.message);
		});
		vscode.workspace.onDidSaveTextDocument;
		vscode.workspace.onDidCloseTextDocument;
	}
}
