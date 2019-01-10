const { Command } = require('klasa');

const converter = (str) => {
    var string = '';
    str.split('').forEach(char => {
        if (charMap[char]) string += charMap[char]
        else string += char
    })
    return string;
}

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: 'Makes your text blocked',
            usage: '<Text:str>',
            extendedHelp: 'This command converts letters to emojis'
        });
    }

    async run(message, [str]) {
        message.sendEmbed({
            title: 'Block',
            color: 0x7289DA,
            author: {
                name: message.author.tag,
                icon_url: message.author.avatarURL()
            },
            description: converter(str.split('').join('​')) // zero width char
        })

    }
};

const charMap = {
    a: '​🇦',
    b: '​🇧',
    c: '​🇨',
    d: '​🇩',
    e: '​🇪',
    f: '​🇫',
    g: '​🇬',
    h: '​🇭',
    i: '​🇮',
    j: '​🇯',
    k: '🇰',
    l: '​🇱',
    m: '​🇲',
    n: '​🇳',
    o: '​🇴',
    p: '​🇵',
    q: '​🇶',
    r: '​🇷',
    s: '​🇸',
    t: '​🇹',
    u: '​🇺',
    w: '🇼',
    x: '🇽',
    v: '​​​🇻',
    y: '​🇾',
    z: '​🇿',
    '\u003F': '❔',
    '\u0021': '❕',
    '\u002A': '*⃣',
    0: '0⃣',
    1: '1⃣',
    2: '2⃣',
    3: '3⃣',
    4: '4⃣',
    5: '5⃣',
    6: '6⃣',
    7: '7⃣',
    8: '8⃣',
    9: '9⃣'

}
