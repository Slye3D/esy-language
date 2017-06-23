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
 * Javascript Obfuscator
 * @param esy
 */
function obfuscator(esy) {
	var JavaScriptObfuscator = require('javascript-obfuscator');
	esy.configs.def('obfuscator', {
		compact: false,
		controlFlowFlattening: false,
		controlFlowFlatteningThreshold: 0.75,
		deadCodeInjection: false,
		deadCodeInjectionThreshold: 0.4,
		debugProtection: false,
		debugProtectionInterval: false,
		disableConsoleOutput: false,
		mangle: false,
		reservedNames: [],
		rotateStringArray: true,
		seed: 0,
		selfDefending: false,
		sourceMap: false,
		sourceMapBaseUrl: '',
		sourceMapFileName: '',
		sourceMapMode: 'separate',
		stringArray: true,
		stringArrayEncoding: false,
		stringArrayThreshold: 0.75,
		unicodeEscapeSequence: false
	});
	esy.block(/^enc$/ig, (matches, block) => {
		return JavaScriptObfuscator.obfuscate(esy.compile(block.body), esy.configs.get('obfuscator')).getObfuscatedCode();
	});
	return {
		name: "Esy Ofuscator",
		version: "0.0.1",
		author: "Slye Development Team"
	};
}
module.exports = obfuscator;