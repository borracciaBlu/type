"use strict";

var isToStringTagSupported = require("../lib/is-to-string-tag-supported")
  , isPrototype            = require("../prototype/is");

var regExpTest = RegExp.prototype.test
  , objToString = Object.prototype.toString
  , objBaseString = objToString.call(/a/);

module.exports = function (value) {
	if (!value) return false;

	// Sanity check (reject objects which do not expose common RegExp interface)
	if (!hasOwnProperty.call(value, "lastIndex")) return false;
	if (typeof value.lastIndex !== "number") return false;
	if (typeof value.test !== "function") return false;
	if (typeof value.exec !== "function") return false;

	// Ensure its native RegExp object (has [[RegExpMatcher]] slot)
	if (isToStringTagSupported && typeof value[Symbol.toStringTag] === "string") {
		// Edge case (possibly a regExp with custom Symbol.toStringTag)
		try {
			var lastIndex = value.lastIndex;
			regExpTest.call(value, "");
			if (value.lastIndex !== lastIndex) value.lastIndex = lastIndex;
			return true;
		} catch (error) {
			return false;
		}
	}
	if (objToString.call(value) !== objBaseString) return false;
	return !isPrototype(value);
};
