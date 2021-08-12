var htmlInheritedAttributes = [
    "accept", "accept-charset", "accesskey", "action", "align", "allow", "alt", "async", "autocapitalize", "autocomplete", "autofocus", "autoplay", "background", "bgcolor", "border", "buffered", "capture", "challenge", "charset", "checked", "cite", "class", "code", "codebase", "color", "cols", "colspan", "content", "contenteditable", "contextmenu", "controls", "coords", "crossorigin", "csp", "data", "data-*", "datetime", "decoding", "default", "defer", "dir", "dirname", "disabled", "download", "draggable", "enctype", "enterkeyhint", "for", "form", "formaction", "formenctype", "formmethod", "formnovalidate", "formtarget", "headers", "height", "hidden", "high", "href", "hreflang", "http-equiv", "icon", "id", "importance", "integrity", "intrinsicsize", "inputmode", "ismap", "itemprop", "keytype", "kind", "label", "lang", "language", "loading", "list", "loop", "low", "manifest", "max", "maxlength", "minlength", "media", "method", "min", "multiple", "muted", "novalidate", "open", "optimum", "pattern", "ping", "placeholder", "poster", "preload", "radiogroup", "readonly", "referrerpolicy", "rel", "required", "reversed", "rows", "rowspan", "sandbox", "scope", "scoped", "selected", "shape", "size", "sizes", "slot", "span", "spellcheck", "src", "srcdoc", "srclang", "srcset", "start", "step", "style", "summary", "tabindex", "target", "title", "translate", "type", "usemap", "value", "width", "wrap"
]
var htmlManualAttributes =['toolbar',"mode","after","data-command","fileID", "before", "innerText", "innerHTML","data-action","data-value"]

var bannedElements = [
    'link',
    'script'
];
var required = [
    'nodeType',
    'nodeValue',
    'tagName'
];
var ignored = [
    'attributes',
    'childNodes',
    'children',
    'classList',
    'dataset',
    'style'
];
var serials = [
    'innerHTML',
    'innerText',
    'outerHTML',
    'outerText',
    'prefix',
    'text',
    'textContent',
    'wholeText'
];
var eventHandlerAttributes = [
    "onabort", "onautocomplete", "onautocompleteerror", "onblur", "oncancel", "oncanplay", "oncanplaythrough", "onchange", "onclick", "onclose", "oncontextmenu", "oncuechange", "ondblclick", "ondrag", "ondragend", "ondragenter", "ondragexit", "ondragleave", "ondragover", "ondragstart", "ondrop", "ondurationchange", "onemptied", "onended", "onerror", "onfocus", "oninput", "oninvalid", "onkeydown", "onkeypress", "onkeyup", "onload", "onloadeddata", "onloadedmetadata", "onloadstart", "onmousedown", "onmouseenter", "onmouseleave", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "onmousewheel", "onpause", "onplay", "onplaying", "onprogress", "onratechange", "onreset", "onresize", "onscroll", "onseeked", "onseeking", "onselect", "onshow", "onsort", "onstalled", "onsubmit", "onsuspend", "ontimeupdate", "ontoggle", "onvolumechange", "onwaiting"
]
var htmlBlockElements = []
var htmlInlineElements =[]
var htmlElementList = ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "link", "main", "map", "mark", "menu", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rb", "rp", "rt", "rtc", "ruby", "s", "samp", "script", "section", "select", "slot", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr", "tool-tip"]
// var userStates = [login, loginSuccess, loginError, logout, logoutSuccess]
// var ActionButtonProps ={
//     dataTestID: string,
//   disabled?: boolean,
//   handler: MouseEventHandler,
//   icon: Icon,
//   label: string,
//   text: string,
// }

var serverNodeRequest = {
    "parameters": {},
    "parameter": {},
    "contentLength": -1,
    "contextPath": "",
    "queryString": ""
}

var serNodeResponse = {
    "pathInfo": "exec",
    "contextPath": "",
    "parameter": {},
    "contentLength": -1,
    "queryString": "",
    "parameters": {}
}


