/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   template.ts                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: frfrey <frfrey@student.42lyon.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/07/22 10:41:27 by frfrey            #+#    #+#             */
/*   Updated: 2020/07/22 10:41:27 by frfrey           ###   ########lyon.fr   */
/*                                                                            */
/* ************************************************************************** */

import * as vscode from 'vscode';
import * as fs from 'fs';

export const getTemplate = ( name: string | undefined, filePathCpp: vscode.Uri , filePathHpp: vscode.Uri  ) => {
	if (name)
	{
		let len = name.length;
		len += 23;
		len = 80 - len - 1
		let star = "*"
		for (; len > 0; len--)
		{
			star += "*"
		}

		let classcpp =  "#include \"" + name + ".Class" + ".hpp\"\n" +
						"\n/*\n * ------------------------------- CONSTRUCTOR --------------------------------\n */\n\n" +
						name + "::" + name + "()\n{\n	std::cout << \"Default constructor called\"" +
						" << std::endl;\n}\n\n" +
						name + "::" + name + "( const " + name + " & src )\n{\n" +
						"	std::cout << \"Copy constructor called\" << std::endl;\n" +
						"	*this = src;\n}\n\n" +
						"\n/*\n * -------------------------------- DESTRUCTOR --------------------------------\n */\n\n" +
						name + "::~" + name + "()\n{\n	std::cout << \"Destructor called\" << std::endl;\n}\n\n" +
						"\n/*\n * --------------------------------- OVERLOAD ---------------------------------\n */\n\n" +
						name + " &				" + name + "::operator=( " + name + " const & rhs )\n{\n	//if ( this != &rhs )\n" +
						"		//this->_value = rhs.getValue();\n" +
						"	return *this;\n}\n\n" +
						"std::ostream &		operator<<( std::ostream & o, " + name + " const & i )\n" +
						"{\n	//o << \"Value = \" << i.getValue();\n	return o;\n}\n\n" +
						"\n/*\n * --------------------------------- METHODS --------------------------------- \n */\n\n" +
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
}


export const getTemplateFull = ( name: string, filePathCpp: vscode.Uri, filePathHpp: vscode.Uri, valueArray: Array<string | undefined>, typeArray: Array<string | undefined> ) => {
	let len = name.length;
	len += 23;
	len = 80 - len - 1
	let star = "*"
	for (; len > 0; len--)
	{
		star += "*"
	}

	let classcpp =  "#include \"" + name + ".Class" + ".hpp\"\n\n" +
					name + "::" + name + "()\n{\n}\n\n" +
					name + "::" + name + "( const " + name + " & object )\n{\n}\n\n" +
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
					"	private:\n\n";

	for (var i = 0; i < valueArray.length; i++)
	{
		classhpp += "		";
		if (typeArray[i] == 'string')
			classhpp += "std::" + typeArray[i];
		else
			classhpp += typeArray[i];
		classhpp += "		_" + valueArray[i] + ";\n";
	}

		classhpp += "};\n\n" +
					"std::ostream &		operator<<( std::ostream & o, " + name + " const & i );"+
					"\n\n" +
					"#endif /* *" + star + " " + name.toUpperCase() + "_CLASS_H */";


	fs.writeFile(filePathCpp.fsPath, classcpp, function (err: any) { if (err) return console.log(err); });
	fs.writeFile(filePathHpp.fsPath, classhpp, function (err: any) { if (err) return console.log(err); });

	vscode.window.showInformationMessage("Files : " + name + ".class.cpp, " + name + ".class.hpp created !");
}
