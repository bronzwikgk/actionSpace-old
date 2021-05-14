

//TODO:USE THIS FUNCTION TO CREATE STYLESHEET INSTEAD OF CORE.CSS FILE





const addStyleSheet = (cssJson) => {
    cssJson.forEach((singleStyle) => {
        var style = document.createElement('style');
        var head = document.head;

        head.appendChild(style)
        style.type = "text/css";
        let rawCss = "";

        cssJson.forEach((singleStyle) => {
            if (singleStyle.separator === 'comma') {
                rawCss += singleStyle.selectors.join(',') + '{' + singleStyle.style + ';}';
            } else if (singleStyle.separator === 'space') {
                rawCss += singleStyle.selectors.join(' ') + '{' + singleStyle.style + ';}';
            } else {
                rawCss += singleStyle.selectors.toString() + '{' + singleStyle.style + ';}';
            }

            rawCss += "\n\n";
        })

        console.log(rawCss)


        if (style.styleSheet) {
            style.styleSheet.cssText = rawCss;
        } else {
            style.appendChild(document.createTextNode(rawCss));
        }
    })
}
