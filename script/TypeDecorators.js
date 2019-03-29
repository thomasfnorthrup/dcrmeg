/**
* TypeDecorators for elegant datatype operations
**/

/**
* String type decorators
**/
String.prototype.capitalizeFirstLetter = function () {
    return (this.length > 0) ? this.charAt(0).toUpperCase() + this.slice(1) : '';
};

String.prototype.contains = function (str, exactMatch) {
    exactMatch = exactMatch || false;
    return (!exactMatch) ? (this.indexOf(str) != -1) : (this.toLowerCase().indexOf(str.toLowerCase()) != -1);
};

String.prototype.startsWith = function (str) {
    return this.slice(0, str.length) == str;
};

String.prototype.endsWith = function (str) {
    return this.slice(-str.length) == str;
};


/**
* Array type decorators
**/

//NOTE: remove and use indexOf
Array.prototype.ExactMatchExists = function (str) {
    for (var i = 0; i < this.length; i++) {
        if (str == this[i]) {
            return true;
        }
    }
    return false;
};

//NOTE: remove and use indexOf
Array.prototype.MatchExists = function (str) {
    for (var i = 0; i < this.length; i++) {
        if (str == this[i]) {
            return i;
        }
    }
    return -1;
};

Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
};

//NOTE: rename this weirdness
Array.prototype.DeleteItem = function (index) {
    this.splice(index, 1);
};