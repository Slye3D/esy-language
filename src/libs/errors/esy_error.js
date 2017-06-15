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
 * Makes new EsyError
 * @param message
 * @param DocumentationURL
 * @constructor
 */
function EsyError(message, DocumentationURL){
	this.message    = message;
	this.docs       = DocumentationURL;
	this.toString = function(){
		var re  = this.message;
		if(this.docs){
			re += ' (Visit: `'+this.docs+'` for more details.)';
		}
		return re;
	};
}
module.exports  = EsyError;