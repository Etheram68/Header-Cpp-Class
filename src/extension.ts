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
import { createQuickClass } from './basicInput';

export function activate(context: ExtensionContext) {
	context.subscriptions.push(commands.registerCommand('canonicalclass.makeclass', () => {
		/*const options: { [key: string]: (context: ExtensionContext) => Promise<void> } = {
			createQuickClass,
			createClass,
		};
		const quickPick = window.createQuickPick();
		quickPick.items = Object.keys(options).map(label => ({ label }));
		quickPick.onDidChangeSelection(selection => {
			if (selection[0]) {
				options[selection[0].label](context).catch(console.error);
			}
		});
		quickPick.onDidHide(() => quickPick.dispose());
		quickPick.show();*/
		createQuickClass();
	}));
}

// this method is called when your extension is deactivated
export function deactivate() {}
