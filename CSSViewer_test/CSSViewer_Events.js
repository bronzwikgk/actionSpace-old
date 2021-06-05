window.onmouseover = function (e) {
    let targetElem = e.target,
        datamod = targetElem.getAttribute('data-model'),
        cssbox = document.getElementById('CSSViewerBox'),
        activeElem = document.getElementsByClassName('CSSViewerActiveElem')[0];
    if (cssbox && !e.path.includes(cssbox)) {
        cssbox.remove();
        activeElem.classList.remove('CSSViewerActiveElem');
    }
    if (datamod !== null && typeof datamod !== 'undefined') {
        updateCSSObj(targetElem, CSSViewer_categoriesProperties);
        targetElem.classList.add('CSSViewerActiveElem');
        let result = processReq(datamod);
        action(result);

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        document.querySelectorAll(".accordion>.tab>.tabTitle>.pointer").forEach(function (item) {
            item.onclick = function (e) {
                let targetTab = this.parentElement.parentElement,
                    activeTab = document.querySelector('.accordion>.tab.active');
                if (targetTab.classList.contains('active')) {
                    targetTab.classList.remove('active');
                    targetTab.style.height = "30px";
                } else {
                    if (activeTab) {
                        activeTab.classList.remove("active");
                        activeTab.style.height = "30px";
                    };
                    targetTab.classList.add("active");
                    targetTab.style.height = targetTab.scrollHeight + "px"
                }

            };
        })
        document.querySelectorAll("#CSSViewerBox>#tabContainer>.tab>.tabContent>.property>input").forEach(function(item){
            item.onchange = function (e) {
                let propName = this.previousElementSibling.innerText.trim(),
                    value = this.value.trim();
                document.querySelector(".CSSViewerActiveElem").style[propName] = value;
            }
        })
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }

}