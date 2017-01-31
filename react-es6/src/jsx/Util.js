const util = {
    map: function(value, low1, high1, low2, high2) {
        return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    },

    randomInt: function(min, max) {
        return Math.floor( Math.random() * (max - min + 1) + min );
    },

    newChar: function(){
        var c = this.randomInt(63, 122 - 1);
        
        if (c === 63) c = 32;
        if (c === 64) c = 46;

        return String.fromCharCode(c);
    }
}

export default util;