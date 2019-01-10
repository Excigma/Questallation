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
            aliases: ['1337'],
            description: 'Makes your text leeted',
            usage: '<Text:str>',
            extendedHelp: 'This command |)()35   '|'|-|][5 to text.'
        });
    }

    async run(message, [str]) {
        message.sendEmbed({
            title: '1337',
            color: 0x7289DA,
            author: {
                name: message.author.tag,
                icon_url: message.author.avatarURL()
            },
            description: converter(str) 
        })

    }
};

const charMap = {
    a: '/-\\\\',
    b: '|o',
    c: '(',
    d: '|)',
    e: '3',
    f: '|=',
    g: '9',
    h: '|-|',
    i: '][',
    j: '\\_|',
    k: '|<',
    l: '|\\_',
    m: '|\\\\/|',
    n: '|\\\\|',
    o: '()',
    p: '|D',
    q: '(,)',
    r: '|Z',
    s: '5',
    t: '\'|\'',
    u: '|\\_|',
    v: '\\\\/',
    w: '|/\\\\|',
    x: '><',
    y: '\\`/',
    z: '(\\\\)'
}
