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


// There are some heads without parenthesis: (else in this example)
// 	env h{
// 		console.log("Hi")
// 	}else{
// 		console.log("Hello")
// 	}
// 	console.log("World!")

// Some programmers put braces themselves:
// 	if(a){
// 		return;
// 	}

// This function is recursive in some cases:
// 	for(let i = 2, s = Math.sqrt(num); i <= s; i++)
// 		if (num % i === 0)
// 			return false;

String.prototype.startsWithA    = function (array) {
	for(var s = 0;s < array.length;s++)
		if(this.startsWith(array[s]))
			return true;
	return false;
};

/**
 *
 * @param code
 * @return {string}
 * @return string
 */
function OLB2(code){
	// 1. Find OLB: Jump to 2,3 => we should search fo a OLB with left parentheses `(` or left brace `{`, change offset to end of brace
	// 2. Find parentheses: Jump to 3
	// 3. Find braces: Finish
	const OLBs  = ['for', 'else', 'if', 'foreach'];
	var re      = '',
		offset  = 0,
		isAfter = false,
		opens   = -1,
		closed  = -1,
		isEnd   = false,
		fOB ;
	for(; offset < code.length;offset++){
		if(!isEnd)
			re += code[offset];
		if(isEnd){
			// Finding braces

			var h = code.substr(offset);
			if(h[0] == ';')
				h = h.substr(1);
			if(h.startsWithA(OLBs)){
				var c = OLB2(h);
				var io = 0,
					ob = -1,
					cb = -1;
				while(ob !== cb || ob == -1){
					if(c[io] == '{')
						ob++;
					if(c[io] == '}')
						cb++;
					io++;
				}
				if(c.substr(io, 4) == 'else'){
					fOB = ob;
					while(ob !== cb || ob == fOB){
						if(c[io] == '{')
							ob++;
						if(c[io] == '}')
							cb++;
						io++;
					}
				}
				io--;
				re  +=  '{' + c.substr(0, io) + '}' + c.substr(io);
				break;
			}else {
				re += '{';
				var ob = 0,
					cb = 0;
				do{
					if(code[offset] == '{')
						ob++;
					if(code[offset] == '}')
						cb++;
					re  += code[offset];
					offset++;
				}while(code[offset] !== ';' && (code[offset] !== '}' || ob != cb));
				if(code[offset] == '}')
					re += '}';
				re += '}';
			}
			isEnd = false;
		}else if(isAfter){
			// Finding parentheses

			if(code[offset] == '(')
				opens++;
			if(code[offset] == ')')
				closed++;
			if(opens == closed && opens > -1){
				if(code[offset + 1] != '{'){
					// Skip the semicolon after header
					if(code[offset + 1] == ';')
						offset++;
					isEnd = true;
				}
				opens   = closed = 0;
				isAfter = false;
			}
		}else {
			// Finding OLBs
			if(code[offset - 1] == ' ')
				continue;
			let reg	= new RegExp('\\w', 'ig')
			if(code[offset - 1] != undefined && reg.test(code[offset - 1]))
				continue;
			for(var s = 0;s < OLBs.length;s++){
				var p = true,
					j = 0;
				while(j < OLBs[s].length){
					if(OLBs[s][j] != code[offset + j]) {
						p = false;
						break;
					}
					j++
				}
				// j = OLBs[s].length
				var nc = code[offset + j];
				if(nc >= 'A' && nc <= 'z'){
					p = false;
				}
				if(p){
					var l = 1;
					while(l < j){
						re += code[offset + l];
						l++;
					}
					offset += j - 1;
					// Skip the semicolon after header
					if(code[offset] == ';')
						offset++;
					if(code[offset + 1] == '('){
						isAfter = true;
						opens   = closed = -1;
					}else if(code[offset + 1] != '{'){
						isEnd   = true;
					}
				}
			}
		}
	}
	// console.log(code)
	// console.log('->')
	// console.log(re)
	// console.log()
	// console.log()
	return re;
}

module.exports  = OLB2;
