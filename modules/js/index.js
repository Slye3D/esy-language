/**
 *    _____ __
 *   / ___// /_  _____
 *   \__ \/ / / / / _ \
 *  ___/ / / /_/ /  __/
 * /____/_/\__, /\___/
 *       /____/
 *       Copyright 2017 Slye Development Team. All Rights Reserved.
 *       Licence: MIT License
 */

/**
 * Allow predefined js blocks
 * @param esy
 */
function js(esy) {
	let block   = esy.block;

	// If statement
	block.self(/^if\s*\(.+?\)\s*$/ig);
	block.self(/^else$/ig);

	// Do{}while(...) and while(...) statements
	block.self(/^do$/ig);
	block.self(/^while\s*\([^;]+?\)$/ig);

	// for expression
	block.self(/^for\s*\(.+?\)\s*$/ig);

	//with expression
	block.self(/^with\s*\(.+?\)\s*$/ig);

	//switch statement
	block.self(/^switch\s*\(.+?\)\s*$/ig);
	block.self(/^(case\s+.+?:?)+$/ig);
	block.self(/^default\s+.+?:\s*$/ig);

	//try catch finally
	block.self(/^try$/ig);
	block.self(/^catch\(.+?\)$/ig);
	block.self(/^finally$/ig);

	// functions and classes

	//Default function
	block.self(/^function\s*([$A-Z_][$A-Z_0-9]*)?\s*\((.+?)?\)\s*$/ig);
	//Arrow function
	block.self(/^(\([^()]+?\)|\w+)\s*=>\s*$/ig);

	// Method definition:

	// property
	block.self(/^([$A-Z_][$A-Z_0-9]*)\s*\(([^;]*?)?\)\s*$/ig);
	// Generator method
	block.self(/^\*\s*([$A-Z_][$A-Z_0-9]*)\s*\((.+?)?\)\s*$/ig);
	// get
	block.self(/^get\s+([$A-Z_][$A-Z_0-9]*)\s*\(\)$/ig);
	// set
	block.self(/^set\s+([$A-Z_][$A-Z_0-9]*)\s*\([^,]+?\)$/ig);

	// Generator deceleration
	block.self(/^function\s*\*\s*([$A-Z_][$A-Z_0-9]*)?\s*\((.+?)?\)\s*$/ig);

	// Class deceleration
	block.self(/^class(\s+\S+)?(\s+extends\s+\S+)?$/ig);

	// property
	block.self(/^static\s+([$A-Z_][$A-Z_0-9]*)\s*\((.+?)?\)\s*$/ig);
	// Generator method
	block.self(/^static\s+\*\s*([$A-Z_][$A-Z_0-9]*)\s*\((.+?)?\)\s*$/ig);
	// get
	block.self(/^static\s+get\s+([$A-Z_][$A-Z_0-9]*)\s*\(\)$/ig);
	// set
	block.self(/^static\s+set\s+([$A-Z_][$A-Z_0-9]*)\s*\([^,]+?\)$/ig);


	return {
		name: "Esy JavaScript",
		version: "0.0.1",
		author: "Slye Development Team"
	};
}
module.exports = js;