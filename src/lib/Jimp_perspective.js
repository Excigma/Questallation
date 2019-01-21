Jimp.prototype.perspective = function(cb) {
    var xSkewInRadians = Math.tan((30 * Math.PI) / 180); //30
    var xShear = parseInt(this.bitmap.height * xSkewInRadians);
    var xShearForThisLine = undefined;
    var original = this;

    debug('perspective xShear:' + xShear);

    new Jimp(this.bitmap.width, this.bitmap.height, '#000000FF', function(
        errNew,
        imgCanvas
    ) {
        if (errNew) {
            cb(errNew);
            return;
        }

        try {
            for (var y = 0; y < this.bitmap.height - 1; y++) {
                xShearForThisLine = parseInt((y + 1) * xSkewInRadians);
                imgCanvas.blit(
                    original
                    .clone()
                    .crop(0, y, original.bitmap.width, 1)
                    .resize(original.bitmap.width - 2 * xShearForThisLine, 1),
                    xShearForThisLine,
                    y
                ); // imgCanvas.blit()
            } // for
        } finally {
            cb(null, imgCanvas);
        }
    }); // new Jimp()
}; // perspective()