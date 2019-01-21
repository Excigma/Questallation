module.exports.config = function() {
    const src = require("fs").readFileSync(`${process.cwd()}/.env`);
    for (const line of src.toString().split("\n")) {
        const keyValueArr = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        if (keyValueArr != null) {
            const key = keyValueArr[1];
            let value = keyValueArr[2] || ''
            const len = value ? value.length : 0
            if (len > 0 && value.charAt(0) === '"' && value.charAt(len - 1) === '"') {
                value = value.replace(/\\n/gm, '\n')
            }
            value = value.replace(/(^['"]|['"]$)/g, '').trim()
            if (!process.env.hasOwnProperty(key)) {
                process.env[key] = value
            }
        }
    }
    /*
        src.toString().split("\n").forEach(line => {
            const keyValueArr = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
            if (keyValueArr != null) {
                const key = keyValueArr[1];
                let value = keyValueArr[2] || ''
                const len = value ? value.length : 0
                if (len > 0 && value.charAt(0) === '"' && value.charAt(len - 1) === '"') {
                    value = value.replace(/\\n/gm, '\n')
                }
                value = value.replace(/(^['"]|['"]$)/g, '').trim()
                if (!process.env.hasOwnProperty(key)) {
                    process.env[key] = value
                }
            }
        });*/
}