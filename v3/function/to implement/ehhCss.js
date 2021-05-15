var proto = Element.prototype;
var slice = Function.call.bind(Array.prototype.slice);
var matches = Function.call.bind(proto.matchesSelector ||  proto.mozMatchesSelector || proto.webkitMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector);

// Returns true if a DOM Element matches a cssRule
var elementMatchCSSRule = function (element, cssRule) {
    return matches(element, cssRule.selectorText);
};

// Returns true if a property is defined in a cssRule
var propertyInCSSRule = function (prop, cssRule) {
    return prop in cssRule.style && cssRule.style[prop] !== "";
};

// Here we get the cssRules across all the stylesheets in one array
var cssRules = slice(document.styleSheets).reduce(function (rules, styleSheet) {
    return rules.concat(slice(styleSheet.cssRules));
}, []);

// Example of usage:

// get a reference to an element, then...
var bar = document.getElementById("bar");

// get only the css rules that matches that element
var elementRules = cssRules.filter(elementMatchCSSRule.bind(null, bar));

// check if the property "width" is in one of those rules
hasWidth = propertyInCSSRule.bind(null, "width");

// Do something if `width` is defined in the element's rules
if (elementRules.some(hasWidth)) {
    // ...
}