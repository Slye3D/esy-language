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
 * Events
 * @param esy
 */
function events(esy) {
	const {regex, block, compile} = esy;
	var pattern = new regex(
		regex.beginning(),

		regex.text('#'),
		regex.identifier().capture(),

		regex.group(
			regex.text('<'),
			regex.callParameters().capture(),
			regex.text('>')
		).optional(),

		regex.text('('),
		regex.arguments().optional().capture(),
		regex.text(')'),

		regex.group(
			regex.text('.'),
			regex.identifier().capture()
		).optional(),

		regex.end()
	).autoSpace().toObj();

	esy.block(pattern, (matches, block) => {
		let variable    = matches[1],
			event       = matches[2] ? matches[2] + ',' : '',
			args        = matches[3] || '',
			evFunc      = matches[4] ? '.' + matches[4] : '.on',
			body        = compile(block.body);

		return `${variable}${evFunc}(${event}function(${args}){
			${body}
		})`
	});

	// Nested event listener

	let pattern2    = new regex(
		regex.beginning(),
		regex.text('#'),

		// Var name
		regex.identifier().capture(),

		// Default `evFunc`
		regex.group(
			regex.text('<'),
			regex.callParameters().capture(),
			regex.text('>')
		).optional(),

		regex.end()
	).autoSpace().toObj();

	let pattern3    = new regex(
		regex.beginning(),

		regex.group(
			regex.text('<'),
			regex.callParameters().capture(),
			regex.text('>')
		).optional(),

		regex.text('('),
		regex.arguments().optional().capture(),
		regex.text(')'),

		regex.group(
			regex.text('.'),
			regex.identifier().capture()
		).optional(),

		regex.end()
	).autoSpace().toObj();


	esy.block.self(pattern3);

	esy.block(pattern2, (matches, {body}) => {
		let variable    = matches[1],
			defEvFunc   = matches[2] ? matches[2] : 'on',
			re          = '';

		body.forEach(value => {
			if(typeof value !== 'object')
				throw new Error('Wrong nested event listener.');
			let {head, body}    = value,
				e               = new RegExp(pattern3);
			if(e.test(head)){
				let match = e.exec(head);
				while(match === null){
					match = e.exec(head);
				}

				let event       = match[1] ? match[1] + ',' : '',
					args        = match[2] || '',
					evFunc      = match[3] ? '.' + match[3] : '.' + defEvFunc,
					b           = compile(body);

				re  +=
`${variable}${evFunc}(${event}function(${args}){
	${b}
})
`

			}else {
				throw new Error('Wrong nested event listener.');
			}
		});

		return re;
	});

	return {
		name: "Esy Events",
		version: "0.0.2",
		author: "Slye Development Team"
	};
}
module.exports = events;