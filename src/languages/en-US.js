/* eslint-disable */

const { Language, util } = require('klasa');

module.exports = class extends Language {
	constructor(...args) {
		super(...args);
		this.language = {
			DEFAULT: (key) => `${key} has not been localized for en-US yet.`,
			DEFAULT_LANGUAGE: 'Default Language',
			PREFIX_REMINDER: (prefix) => `Hello, I'm ExcigmaBot. My prefix is: ${Array.isArray(prefix) ? prefix.map(pre => `\`${pre}\``).join(', ') : `\`${prefix}\``}`,


			//     _____          _     _     _                              _____           _
			//    / ____|        | |   | |   (_)                            / ____|         | |
			//   | (___     ___  | |_  | |_   _   _ __     __ _   ___      | |  __    __ _  | |_    ___  __      __   __ _   _   _
			//    \___ \   / _ \ | __| | __| | | | '_ \   / _` | / __|     | | |_ |  / _` | | __|  / _ \ \ \ /\ / /  / _` | | | | |
			//    ____) | |  __/ | |_  | |_  | | | | | | | (_| | \__ \     | |__| | | (_| | | |_  |  __/  \ V  V /  | (_| | | |_| |
			//   |_____/   \___|  \__|  \__| |_| |_| |_|  \__, | |___/      \_____|  \__,_|  \__|  \___|   \_/\_/    \__,_|  \__, |
			//                                             __/ |                                                              __/ |
			//                                            |___/                                                              |___/


			SETTING_GATEWAY_EXPECTS_GUILD: 'The parameter <Guild> expects either a Guild or a Guild Object.',
			SETTING_GATEWAY_VALUE_FOR_KEY_NOEXT: (data, key) => `<:excigmabot_failure:490319592477032448> | The value ${data} for the key ${key} does not exist.`,
			SETTING_GATEWAY_VALUE_FOR_KEY_ALREXT: (data, key) => `<:excigmabot_failure:490319592477032448> | The value ${data} for the key ${key} already exists.`,
			SETTING_GATEWAY_SPECIFY_VALUE: '<:excigmabot_failure:490319592477032448> | You must specify the value to add or filter.',
			SETTING_GATEWAY_KEY_NOT_ARRAY: (key) => `<:excigmabot_failure:490319592477032448> | The key ${key} is not an Array.`,
			SETTING_GATEWAY_KEY_NOEXT: (key) => `<:excigmabot_failure:490319592477032448> | The key ${key} does not exist in the current data schema.`,
			SETTING_GATEWAY_INVALID_TYPE: '<:excigmabot_failure:490319592477032448> | The type parameter must be either add or remove.',


			//    _____                         _
			//   |  __ \                       | |
			//   | |__) |   ___   ___    ___   | | __   __   ___   _ __   ___
			//   |  _  /   / _ \ / __|  / _ \  | | \ \ / /  / _ \ | '__| / __|
			//   | | \ \  |  __/ \__ \ | (_) | | |  \ V /  |  __/ | |    \__ \
			//   |_|  \_\  \___| |___/  \___/  |_|   \_/    \___| |_|    |___/
			//
			//


			RESOLVER_INVALID_CUSTOM: (name, type) => `<:excigmabot_failure:490319592477032448> | ${name} must be a valid ${type}.`,
			RESOLVER_INVALID_PIECE: (name, piece) => `<:excigmabot_failure:490319592477032448> | ${name} must be a valid ${piece} name.`,
			RESOLVER_INVALID_MSG: (name) => `<:excigmabot_failure:490319592477032448> | ${name} must be a valid message id.`,
			RESOLVER_INVALID_USER: (name) => `<:excigmabot_failure:490319592477032448> | ${name} must be a mention or valid user id.`,
			RESOLVER_INVALID_MEMBER: (name) => `<:excigmabot_failure:490319592477032448> | ${name} must be a mention or valid user id.`,
			RESOLVER_INVALID_CHANNEL: (name) => `<:excigmabot_failure:490319592477032448> | ${name} must be a channel tag or valid channel id.`,
			RESOLVER_INVALID_EMOJI: (name) => `<:excigmabot_failure:490319592477032448> | ${name} must be a custom emoji tag or valid emoji id.`,
			RESOLVER_INVALID_GUILD: (name) => `<:excigmabot_failure:490319592477032448> | ${name} must be a valid guild id.`,
			RESOLVER_INVALID_ROLE: (name) => `<:excigmabot_failure:490319592477032448> | ${name} must be a role mention or role id.`,
			RESOLVER_INVALID_LITERAL: (name) => `<:excigmabot_failure:490319592477032448> | Your option did not match the only possibility: ${name}`,
			RESOLVER_INVALID_BOOL: (name) => `<:excigmabot_failure:490319592477032448> | ${name} must be true or false.`,
			RESOLVER_INVALID_INT: (name) => `<:excigmabot_failure:490319592477032448> | ${name} must be an integer.`,
			RESOLVER_INVALID_FLOAT: (name) => `<:excigmabot_failure:490319592477032448> | ${name} must be a valid number.`,
			RESOLVER_INVALID_REGEX_MATCH: (name, pattern) => `<:excigmabot_failure:490319592477032448> | ${name} must follow this regex pattern \`${pattern}\`.`,
			RESOLVER_INVALID_URL: (name) => `<:excigmabot_failure:490319592477032448> | ${name} must be a valid url.`,
			RESOLVER_INVALID_DATE: (name) => `<:excigmabot_failure:490319592477032448> | ${name} must be a valid date.`,
			RESOLVER_INVALID_DURATION: (name) => `<:excigmabot_failure:490319592477032448> | ${name} must be a valid duration string.`,
			RESOLVER_INVALID_TIME: (name) => `<:excigmabot_failure:490319592477032448> | ${name} must be a valid duration or date string.`,
			RESOLVER_STRING_SUFFIX: ' characters',
			RESOLVER_MINMAX_EXACTLY: (name, min, suffix) => `<:excigmabot_failure:490319592477032448> | ${name} must be exactly ${min}${suffix}.`,
			RESOLVER_MINMAX_BOTH: (name, min, max, suffix) => `<:excigmabot_failure:490319592477032448> | ${name} must be between ${min} and ${max}${suffix}.`,
			RESOLVER_MINMAX_MIN: (name, min, suffix) => `<:excigmabot_failure:490319592477032448> | ${name} must be greater than ${min}${suffix}.`,
			RESOLVER_MINMAX_MAX: (name, max, suffix) => `<:excigmabot_failure:490319592477032448> | ${name} must be less than ${max}${suffix}.`,


			//    _____                          _     _                     _                           _   _
			//   |  __ \                        | |   (_)                   | |                         | | | |
			//   | |__) |   ___    __ _    ___  | |_   _    ___    _ __     | |__     __ _   _ __     __| | | |   ___   _ __
			//   |  _  /   / _ \  / _` |  / __| | __| | |  / _ \  | '_ \    | '_ \   / _` | | '_ \   / _` | | |  / _ \ | '__|
			//   | | \ \  |  __/ | (_| | | (__  | |_  | | | (_) | | | | |   | | | | | (_| | | | | | | (_| | | | |  __/ | |
			//   |_|  \_\  \___|  \__,_|  \___|  \__| |_|  \___/  |_| |_|   |_| |_|  \__,_| |_| |_|  \__,_| |_|  \___| |_|
			//
			//

			REACTIONHANDLER_PROMPT: '<:excigmabot_warn:490319593274081280> | Which page would you like to jump to?',

			//     _____                                                       _
			//    / ____|                                                     | |
			//   | |        ___    _ __ ___    _ __ ___     __ _   _ __     __| |    _ __ ___     ___   ___   ___    __ _    __ _    ___
			//   | |       / _ \  | '_ ` _ \  | '_ ` _ \   / _` | | '_ \   / _` |   | '_ ` _ \   / _ \ / __| / __|  / _` |  / _` |  / _ \
			//   | |____  | (_) | | | | | | | | | | | | | | (_| | | | | | | (_| |   | | | | | | |  __/ \__ \ \__ \ | (_| | | (_| | |  __/
			//    \_____|  \___/  |_| |_| |_| |_| |_| |_|  \__,_| |_| |_|  \__,_|   |_| |_| |_|  \___| |___/ |___/  \__,_|  \__, |  \___|
			//                                                                                                               __/ |
			//                                                                                                              |___/


			COMMANDMESSAGE_MISSING: '<:excigmabot_failure:490319592477032448> | Missing one or more required arguments after end of input.',
			COMMANDMESSAGE_MISSING_REQUIRED: (name) => `<:excigmabot_failure:490319592477032448> | ${name} is a required argument.`,
			COMMANDMESSAGE_MISSING_OPTIONALS: (possibles) => `<:excigmabot_failure:490319592477032448> | Missing a required option: (${possibles})`,
			COMMANDMESSAGE_NOMATCH: (possibles) => `<:excigmabot_failure:490319592477032448> | Your option didn't match any of the possibilities: (${possibles})`,
			MONITOR_COMMAND_HANDLER_REPROMPT: (tag, error, time) => `${tag} | **${error}** | You have **${time}** seconds to respond to this prompt with a valid argument. Type **"ABORT"** to abort this prompt.`, // eslint-disable-line max-len
			MONITOR_COMMAND_HANDLER_REPEATING_REPROMPT: (tag, name, time) => `${tag} | **${name}** is a repeating argument | You have **${time}** seconds to respond to this prompt with additional valid arguments. Type **"CANCEL"** to cancel this prompt.`, // eslint-disable-line max-len
			MONITOR_COMMAND_HANDLER_ABORTED: '<:excigmabot_warn:490319593274081280> | Aborted',


			//    _____           _       _   _       _   _
			//   |_   _|         | |     |_| | |     |_| | |
			//     | |    _ __   | |__    _  | |__    _  | |_    ___    _ __
			//     | |   | '_ \  | '_ \  | | | '_ \  | | | __|  / _ \  | '__|
			//    _| |_  | | | | | | | | | | | |_/ | | | | |_  | |_| | | |
			//   |_____| |_| |_| |_| |_| |_| |_.__/  |_|  \__|  \___/  |_|
			//
			//

			INHIBITOR_COOLDOWN: (remaining) => `<:excigmabot_failure:490319592477032448> | You have just used this command. You can use this command again in ${remaining} second${remaining === 1 ? '' : 's'}.`,
			INHIBITOR_DISABLED: '<:excigmabot_failure:490319592477032448> | This command is currently disabled',
			INHIBITOR_MISSING_BOT_PERMS: (missing) => `<:excigmabot_failure:490319592477032448> | I have insufficient permissions, missing: **${missing}**`,
			INHIBITOR_MISSING_USER_PERMS: (missing) => `<:excigmabot_failure:490319592477032448> | You have insufficient permissions, missing: **${missing}**`,
			INHIBITOR_NSFW: '<:excigmabot_failure:490319592477032448> | You may not use NSFW commands in this channel.',
			INHIBITOR_PERMISSIONS: '<:excigmabot_failure:490319592477032448> | You do not have permission to use this command',
			INHIBITOR_REQUIRED_CONFIGS: (configs) => `<:excigmabot_failure:490319592477032448> | The guild is missing the **${configs.join(', ')}** guild setting${configs.length !== 1 ? 's' : ''} and thus the command cannot run.`,
			INHIBITOR_RUNIN: (types) => `<:excigmabot_failure:490319592477032448> | This command is only available in ${types} channels`,
			INHIBITOR_RUNIN_NONE: (name) => `<:excigmabot_failure:490319592477032448> | The ${name} command is not configured to run in any channel.`,



			//     _____                                                       _     _                   _
			//    / ____|                                                     | |   | |                 | |
			//   | |        ___    _ __ ___    _ __ ___     __ _   _ __     __| |   | |_    ___  __  __ | |_
			//   | |       / _ \  | '_ ` _ \  | '_ ` _ \   / _` | | '_ \   / _` |   | __|  / _ \ \ \/ / | __|
			//   | |____  | (_) | | | | | | | | | | | | | | (_| | | | | | | (_| |   | |_  |  __/  >  <  | |_
			//    \_____|  \___/  |_| |_| |_| |_| |_| |_|  \__,_| |_| |_|  \__,_|    \__|  \___| /_/\_\  \__|
			//
			//



			COMMAND_BLACKLIST_DESCRIPTION: 'Blacklists or un-blacklists users and guilds from the bot.',
			COMMAND_BLACKLIST_SUCCESS: (usersAdded, usersRemoved, guildsAdded, guildsRemoved) => [
				usersAdded.length ? `<:excigmabot_success:490319592615575553> | **Users Added**\n${util.codeBlock('', usersAdded.join(', '))}` : '',
				usersRemoved.length ? `<:excigmabot_success:490319592615575553> | **Users Removed**\n${util.codeBlock('', usersRemoved.join(', '))}` : '',
				guildsAdded.length ? `<:excigmabot_success:490319592615575553> | **Guilds Added**\n${util.codeBlock('', guildsAdded.join(', '))}` : '',
				guildsRemoved.length ? `<:excigmabot_success:490319592615575553> | **Guilds Removed**\n${util.codeBlock('', guildsRemoved.join(', '))}` : ''
			].filter(val => val !== '').join('\n'),
			COMMAND_EVAL_DESCRIPTION: 'Evaluates arbitrary Javascript. Reserved for bot owner.',
			COMMAND_EVAL_EXTENDEDHELP: [
				'The eval command evaluates code as-in, any error thrown from it will be handled.',
				'It also uses the flags feature. Write --silent, --depth=number or --async to customize the output.',
				'The --silent flag will make it output nothing.',
				"The --depth flag accepts a number, for example, --depth=2, to customize util.inspect's depth.",
				'The --async flag will wrap the code into an async function where you can enjoy the use of await, however, if you want to return something, you will need the return keyword',
				'The --showHidden flag will enable the showHidden option in util.inspect.',
				'If the output is too large, it\'ll send the output as a file, or in the console if the bot does not have the ATTACH_FILES permission.'
			].join('\n'),
			COMMAND_EVAL_ERROR: (time, output, type) => `<:excigmabot_failure:490319592477032448> | **Error**:${output}\n**Type**:${type}\n${time}`,
			COMMAND_EVAL_OUTPUT: (time, output, type) => `<:excigmabot_success:490319592615575553> | **Output**:${output}\n**Type**:${type}\n${time}`,
			COMMAND_EVAL_SENDFILE: (time, type) => `<:excigmabot_warn:490319593274081280> | Output was too long... sent the result as a file.\n**Type**:${type}\n${time}`,
			COMMAND_EVAL_SENDCONSOLE: (time, type) => `<:excigmabot_warn:490319593274081280> | Output was too long... sent the result to console.\n**Type**:${type}\n${time}`,
			COMMAND_UNLOAD: (type, name) => `<:excigmabot_success:490319592615575553> | Unloaded ${type}: ${name}`,
			COMMAND_UNLOAD_DESCRIPTION: 'Unloads the klasa piece.',
			COMMAND_TRANSFER_ERROR: '<:excigmabot_failure:490319592477032448> | That file has been transfered already or never existed.',
			COMMAND_TRANSFER_SUCCESS: (type, name) => `<:excigmabot_success:490319592615575553> | Successfully transferred ${type}: ${name}`,
			COMMAND_TRANSFER_FAILED: (type, name) => `<:excigmabot_failure:490319592477032448> | Transfer of ${type}: ${name} to Client has failed. Please check your Console.`,
			COMMAND_TRANSFER_DESCRIPTION: 'Transfers a core piece to its respective folder',
			COMMAND_RELOAD: (type, name) => `<:excigmabot_success:490319592615575553> | Reloaded ${type}: ${name}`,
			COMMAND_RELOAD_ALL: (type) => `<:excigmabot_success:490319592615575553> | Reloaded all ${type}.`,
			COMMAND_RELOAD_DESCRIPTION: 'Reloads a klasa piece, or all pieces of a klasa store.',
			COMMAND_REBOOT: '<:excigmabot_success:490319592615575553> | Bot is rebooting please wait..',
			COMMAND_REBOOT_DESCRIPTION: 'Reboots the bot.',
			COMMAND_LOAD: (time, type, name) => `<:excigmabot_success:490319592615575553> | Successfully loaded ${type}: ${name}. (Took: ${time})`,
			COMMAND_LOAD_FAIL: '<:excigmabot_failure:490319592477032448> | The file does not exist, or an error occurred while loading your file. Please check your console.',
			COMMAND_LOAD_ERROR: (type, name, error) => `<:excigmabot_failure:490319592477032448> | Failed to load ${type}: ${name}. Reason:${util.codeBlock('js', error)}`,
			COMMAND_LOAD_DESCRIPTION: 'Load a piece from your bot.',
			COMMAND_INVITE_SELFBOT: 'Why would you need an invite link for a selfbot...',
			COMMAND_INVITE_DESCRIPTION: 'Displays the join server link of the bot.',
			COMMAND_INFO_DESCRIPTION: 'Provides some information about this bot.',
			COMMAND_HELP_DESCRIPTION: 'Display help for a command.',
			COMMAND_HELP_NO_EXTENDED: 'No extended help available.',
			COMMAND_HELP_NODM: '<:excigmabot_failure:490319592477032448> | You have DMs disabled, I couldn\'t send you the commands in DMs.',
			COMMAND_HELP_USAGE: (usage) => `usage :: ${usage}`,
			COMMAND_HELP_EXTENDED: 'Extended Help ::',
			COMMAND_ENABLE: (type, name) => `+ Successfully enabled ${type}: ${name}`,
			COMMAND_ENABLE_DESCRIPTION: 'Re-enables or temporarily enables a command/inhibitor/monitor/finalizer. Default state restored on reboot.',
			COMMAND_DISABLE: (type, name) => `+ Successfully disabled ${type}: ${name}`,
			COMMAND_DISABLE_DESCRIPTION: 'Re-disables or temporarily disables a command/inhibitor/monitor/finalizer/event. Default state restored on reboot.',
			COMMAND_DISABLE_WARN: 'You probably don\'t want to disable that, since you wouldn\'t be able to run any command to enable it again',
			COMMAND_CONF_NOKEY: 'You must provide a key',
			COMMAND_CONF_NOVALUE: 'You must provide a value',
			COMMAND_CONF_GUARDED: (name) => `${util.toTitleCase(name)} may not be disabled.`,
			COMMAND_CONF_UPDATED: (key, response) => `Successfully updated the key **${key}**: \`${response}\``,
			COMMAND_CONF_KEY_NOT_ARRAY: 'This key is not array type. Use the action \'reset\' instead.',
			COMMAND_CONF_GET_NOEXT: (key) => `The key **${key}** does not seem to exist.`,
			COMMAND_CONF_GET: (key, value) => `The value for the key **${key}** is: \`${value}\``,
			COMMAND_CONF_RESET: (key, response) => `The key **${key}** has been reset to: \`${response}\``,
			COMMAND_CONF_NOCHANGE: (key) => `The value for **${key}** was already that value.`,
			COMMAND_CONF_SERVER_DESCRIPTION: 'Define per-server configuration.',
			COMMAND_CONF_SERVER: (key, list) => `**Server Configuration${key}**\n${list}`,
			COMMAND_CONF_USER_DESCRIPTION: 'Define per-user configuration.',
			COMMAND_CONF_USER: (key, list) => `**User Configuration${key}**\n${list}`,
			COMMAND_STATS: (memUsage, uptime, users, servers, channels, klasaVersion, discordVersion, processVersion, msg) => [
				'= STATISTICS =',
				'',
				`• Mem Usage  :: ${memUsage} MB`,
				`• Uptime     :: ${uptime}`,
				`• Users      :: ${users}`,
				`• Servers    :: ${servers}`,
				`• Channels   :: ${channels}`,
				`• Discord.js :: v${discordVersion}`,
				`• Node.js    :: ${processVersion}`,
				this.client.options.shardCount ? `• Shard      :: ${((msg.guild ? msg.guild.shardID : msg.channel.shardID) || this.client.options.shardId) + 1} / ${this.client.options.shardCount}` : ''
			],
			COMMAND_STATS_DESCRIPTION: 'Provides some details about the bot and stats.',
			MESSAGE_PROMPT_TIMEOUT: '<:excigmabot_warn:490319593274081280> | The prompt has timed out.'
		};
	}

	async init() {
		await super.init();
	}

};
