const { Command } = require("klasa");

const converter = (str) => {
    var string = "";
    str.split("").forEach(char => {
        if (charMap[char]) string += charMap[char].split("").random();
        else string += char;
    });
    return string;
};

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "Makes your text cancerous",
            usage: "<Text:str>",
            extendedHelp: "This command makes your text niceee and cancerous."
        });
    }

    async run(message, [str]) {
        message.sendEmbed({
            title: "Cancer",
            color: 0x7289DA,
            author: {
                name: message.author.tag,
                icon_url: message.author.avatarURL()
            },
            description: converter(str)
        });

    }
};


const charMap = {
    a: "ἀἁἂἃἄἅἆἇἈἉἊἋἌἍἎἏⒶⓐ⒜AaẠạẢảḀḁÂÃǍǎẤấẦầẨẩȂȃẪẫẬậÀÁẮắẰằẲẳẴẵẶặĀāĄąǞȀȁÅǺǻÄäǟǠǡâáåãàẚȦȧȺÅⱥÆæǼǢǣⱯꜲꜳꜸꜺꜹꜻªΛΔ",
    b: "ẞßβⒷⓑ⒝BbḂḃḄḅḆḇƁɃƀƃƂƄƅℬ",
    c: "Ⓒⓒ⒞CcḈḉĆćĈĉĊċČčÇçƇƈȻȼℂ℃ℭƆϾϽ",
    d: "Ⓓⓓ⒟DdḊḋḌḍḎḏḐḑḒḓĎďƊƋƌƉĐđȡⅅⅆǱǲǳǄǅǆȸ",
    e: "Ⓔⓔ⒠EeḔḕḖḗḘḙḚḛḜḝẸẹẺẻẾếẼẽỀềỂểỄễỆệĒēĔĕĖėĘęĚěÈèÉéÊêËëȄȅȨȩȆȇƎⱸɆℇℯ℮ƐℰƏǝⱻɇΞΣ",
    f: "Ⓕⓕ⒡FfḞḟƑƒꜰℲⅎꟻℱ℻",
    g: "Ⓖⓖ⒢GgƓḠḡĜĝĞğĠġĢģǤǥǦǧǴℊ⅁ǵ",
    h: "Ⓗⓗ⒣HhḢḣḤḥḦḧḨḩḪḫẖĤĥȞȟĦħⱧⱨꜦℍǶℏℎℋℌꜧ",
    i: "Ⓘⓘ⒤IiḬḭḮḯĲĳìíîïÌÍÎÏĨĩĪīĬĭĮįıƗƚỺǏǐⅈȉȈȊȋἰἱἲἳἴἵἶἷἸἹἺἻἼἽἾἿ",
    j: "ℑℐⒿⓙ⒥JjĴĵȷⱼɈɉǰ",
    k: "Ⓚⓚ⒦KkḰḱḲḳḴḵĶķƘƙꝀꝁꝂꝃꝄꝅǨǩⱩⱪĸ",
    l: "Ⓛⓛ⒧LlḶḷḸḹḺḻḼḽĹĺĻļĽİľĿŀŁłỈỉỊịȽⱠꝈꝉⱡⱢꞁℒǇǈǉ⅃⅂ℓ℄",
    m: "ⓜ⒨MmḾḿṀṁṂṃꟿꟽⱮƩƜℳ",
    n: "Ⓝⓝ⒩NnṄṅṆṇṈṉṊṋŃńŅņŇňǸǹŊƝñŉÑȠƞŋǊǋǌȵℕ№ᾐᾑᾒᾓᾔᾕᾖᾗ",
    o: "OoṌṍṎṏṐṑṒṓȪȫȬȭȮȯȰȱǪǫǬǭỌọỎỏỐốỒồỔổỖỗỘộỚớỜờỞởỠỡỢợƠơŌōŎŏŐőÒÓÔÕÖǑȌȍȎȏŒœØǾꝊǽǿℴ⍥⍤Ⓞⓞ⒪òóôõöǒøꝎꝏὀὁὂὃὄὅὈὉὊὋὌὍΘΦ",
    p: "Ⓟⓟ⒫℗PpṔṕṖṗƤƥⱣℙǷꟼ℘Ϸϸῤῥ",
    q: "ⓠ⒬QqɊɋℚ℺ȹ",
    r: "Ⓡⓡ⒭RrŔŕŖŗŘřṘṙṚṛṜṝṞṟȐȑȒȓɍɌƦⱤ℞Ꝛꝛℜℛ℟ℝ",
    s: "Ⓢⓢ⒮SsṠṡṢṣṤṥṦṧṨṩŚśŜŝŞşŠšȘșȿꜱƧƨϟϨϩ",
    t: "Ⓣⓣ⒯TtṪṫṬṭṮṯṰṱŢţŤťŦŧƬƮẗȚȾƫƭțⱦȶ℡™ͲͳϮϯ",
    u: "Ⓤⓤ⒰UuṲṳṴṵṶṷṸṹṺṻỤỦủỨỪụứỬửừữỮỰựŨũŪūŬŭŮůŰűǙǚǗǘǛǜŲųǓǔȔȕÛûȖȗÙùÜüƯúɄưƲƱΰῠῡῢΰμ",
    v: "Ⓥⓥ⒱VvṼṽṾṿỼɅ℣ⱱⱴⱽν",
    w: "Ⓦⓦ⒲WwẀẁẂẃẄẅẆẇẈẉŴŵẘⱲⱳώωϢϣ",
    x: "Ⓧⓧ⒳XxẊẋẌẍℵ×",
    y: "Ⓨⓨ⒴yYẎẏỾỿẙỲỳỴỵỶỷỸỹŶŷƳƴŸÿÝýɎɏȲƔ⅄ȳℽλϒϓϔΨ",
    z: "Ⓩⓩ⒵ZzẐẑẒẓẔẕŹźŻżŽžȤȥⱫⱬƵƶɀℨℤ"
};
