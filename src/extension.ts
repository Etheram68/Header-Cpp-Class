/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   extension.ts                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: frfrey <frfrey@student.42lyon.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/07/22 10:02:46 by frfrey            #+#    #+#             */
/*   Updated: 2020/07/22 10:02:46 by frfrey           ###   ########lyon.fr   */
/*                                                                            */
/* ************************************************************************** */

import { window, commands, ExtensionContext } from 'vscode';
import { createQuickClass, createTemplateFile } from './basicInput';
import * as vscode from 'vscode';

export function activate(context: ExtensionContext) {
	context.subscriptions.push(commands.registerCommand('canonicalclass.makeclass', async () => {
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
		if (name !== undefined && name.slice(name.length - 4) == ".tpp")
			createTemplateFile(name);
		else
			createQuickClass(name);
	}));
}

// this method is called when your extension is deactivated
export function deactivate() {}
