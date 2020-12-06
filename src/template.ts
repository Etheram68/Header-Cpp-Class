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
		len += 17;
		len = 80 - len - 1
		let star = "*"
		for (; len > 0; len--)
		{
			star += "*"
		}

		let classcpp =  "#include \"" + name + ".hpp\"\n" +
						"\n/*\n** ------------------------------- CONSTRUCTOR --------------------------------\n*/\n\n" +
						name + "::" + name + "()\n{\n}\n\n" +
						name + "::" + name + "( const " + name + " & src )\n{\n}\n\n" +
						"\n/*\n** -------------------------------- DESTRUCTOR --------------------------------\n*/\n\n" +
						name + "::~" + name + "()\n{\n}\n\n" +
						"\n/*\n** --------------------------------- OVERLOAD ---------------------------------\n*/\n\n" +
						name + " &				" + name + "::operator=( " + name + " const & rhs )\n{\n	//if ( this != &rhs )\n" +
						"	//{\n		//this->_value = rhs.getValue();\n	//}\n" +
						"	return *this;\n}\n\n" +
						"std::ostream &			operator<<( std::ostream & o, " + name + " const & i )\n" +
						"{\n	//o << \"Value = \" << i.getValue();\n	return o;\n}\n\n" +
						"\n/*\n** --------------------------------- METHODS ----------------------------------\n*/\n\n" +
						"\n/*\n** --------------------------------- ACCESSOR ---------------------------------\n*/\n\n" +
						"\n/* ************************************************************************** */";

		let classhpp =	"#ifndef " + name.toUpperCase() + "_HPP\n" +
						"# define " + name.toUpperCase() + "_HPP\n\n" +
						"# include <iostream>\n" +
						"# include <string>\n\n" +
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
						"	private:\n\n" +
						"};\n\n" +
						"std::ostream &			operator<<( std::ostream & o, " + name + " const & i );"+
						"\n\n" +
						"#endif /* *" + star + " " + name.toUpperCase() + "_H */";


		fs.writeFile(filePathCpp.fsPath, classcpp, function (err: any) { if (err) return console.log(err); });
		fs.writeFile(filePathHpp.fsPath, classhpp, function (err: any) { if (err) return console.log(err); });

		vscode.window.showInformationMessage("Files : " + name + ".cpp, " + name + ".hpp created !");
	}
}

export const getTemplateTpp = ( name: string | undefined, filePathTpp: vscode.Uri ) => {
	if (name)
	{
		let len = name.length;
		len += 19;
		len = 80 - len - 1
		let star = "*"
		for (; len > 0; len--)
		{
			star += "*"
		}

		let classtpp =	"#ifndef " + name.toUpperCase() + "_TPP\n" +
						"# define " + name.toUpperCase() + "_TPP\n\n" +
						"# include <iostream>\n" +
						"# include <string>\n\n" +
						"template < typename T >\n" +
						"class " + name + "\n{\n" +
						"\n" +
						"	public:\n" +
						"\n" +
						"\n	/*\n	** ------------------------------- CONSTRUCTOR --------------------------------\n	*/\n\n" +
						"		" + name + "() {};\n" +
						"		" + name + "( " + name + " const & src ) {};\n\n" +
						"\n	/*\n	** -------------------------------- DESTRUCTOR --------------------------------\n	*/\n\n" +
						"		~" + name + "() {};\n\n" +
						"\n	/*\n	** --------------------------------- OVERLOAD ---------------------------------\n	*/\n\n" +
						"		" + name + " &		operator=( " + name + " const & rhs )\n		{\n			//if ( this != &rhs )\n" +
						"			//{\n				//this->_value = rhs.getValue();\n			//}\n" +
						"			return *this;\n		}\n\n" +
						"\n	/*\n	** --------------------------------- METHODS ----------------------------------\n	*/\n\n" +
						"\n" +
						"	private:\n\n" +
						"};\n\n" +
						"#endif /* *" + star + " " + name.toUpperCase() + "_TPP */";


		fs.writeFile(filePathTpp.fsPath, classtpp, function (err: any) { if (err) return console.log(err); });

		vscode.window.showInformationMessage("Files : " + name + ".tpp created !");
	}
}


export const getTemplateFull = ( name: string, filePathCpp: vscode.Uri, filePathHpp: vscode.Uri, valueArray: Array<string | undefined>, typeArray: Array<string | undefined> ) => {
	let len = name.length;
	len += 17;
	len = 80 - len - 1
	let star = "*"
	for (; len > 0; len--)
	{
		star += "*"
	}

	let classcpp =  "#include \"" + name + ".hpp\"\n\n" +
					name + "::" + name + "()\n{\n}\n\n" +
					name + "::" + name + "( const " + name + " & object )\n{\n}\n\n" +
					name + "::~" + name + "()\n{\n	std::cout << \"Destructor called\" << std::endl;\n}\n\n" +
					name + " &		" + name + "::operator=( " + name + " const & rhs )\n{\n	//if ( this != &rhs )\n" +
					"		//this->_value = rhs.getValue();\n" +
					"	return *this;\n}\n\n" +
					"std::ostream &		operator<<( std::ostream & o, " + name + " const & i )\n" +
					"{\n	//o << \"Value = \" << i.getValue();\n	return o;\n}\n\n" +
					"\n/* ************************************************************************** */";

	let classhpp =	"#ifndef " + name.toUpperCase() + "_HPP\n" +
					"# define " + name.toUpperCase() + "_HPP\n\n" +
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
					"#endif /* *" + star + " " + name.toUpperCase() + "_H */";


	fs.writeFile(filePathCpp.fsPath, classcpp, function (err: any) { if (err) return console.log(err); });
	fs.writeFile(filePathHpp.fsPath, classhpp, function (err: any) { if (err) return console.log(err); });

	vscode.window.showInformationMessage("Files : " + name + ".cpp, " + name + ".hpp created !");
}
