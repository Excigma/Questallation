String.prototype.toProperCase = function() {
	return this.replace(/([^\W_]+[^\s-]*) */g, function(txt) { return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase(); });
};


String.prototype.replaceAll = function(search, replacement) {
	return this.replace(RegExp(search, "gi"), replacement);
};


Array.prototype.random = function() {
	return this[Math.floor(Math.random() * this.length)];
};