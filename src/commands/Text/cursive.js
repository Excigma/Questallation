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
            description: 'Makes your text cursive',
            usage: '<Text:str>',
            extendedHelp: 'This command makes your text niceee and fancy.'
        });
    }

    async run(message, [str]) {
        message.sendEmbed({
            title: 'Cursive',
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
    a: '𝒶',
    A: '𝒜',
    b: '𝒷',
    B: '𝐵',
    c: '𝒸',
    C: '𝒞',
    d: '𝒹',
    D: '𝒟',
    e: '𝑒',
    E: '𝐸',
    f: '𝒻',
    F: '𝐹',
    g: '𝑔',
    G: '𝒢',
    h: '𝒽',
    H: '𝐻',
    i: '𝒾',
    I: '𝐼',
    j: '𝒿',
    J: '𝒥',
    k: '𝓀',
    K: '𝒦',
    l: '𝓁',
    L: '𝐿',
    m: '𝓂',
    M: '𝑀',
    n: '𝓃',
    N: '𝒩',
    o: '𝑜',
    O: '𝒪',
    p: '𝓅',
    P: '𝒫',
    q: '𝓆',
    Q: '𝒬',
    r: '𝓇',
    R: '𝑅',
    s: '𝓈',
    S: '𝒮',
    t: '𝓉',
    T: '𝒯',
    u: '𝓊',
    U: '𝒰',
    v: '𝓋',
    V: '𝒱',
    w: '𝓌',
    W: '𝒲',
    x: '𝓍',
    X: '𝒳',
    y: '𝓎',
    Y: '𝒴',
    z: '𝓏',
    Z: '𝒵'
}
