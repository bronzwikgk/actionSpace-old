// Right NavBar UI

var rightTabsLinkTemp = {
    "name": "span",
    "attributes": {
        "class": "tab-link",
        "data-action-type": ""
    },
    "items": {
        "text##0": "title"
    }
}

var rightTabs = {
    "name": "div",
    "attributes": {
        "id": "rightNavTabs",
        "class": "nav-tabs"
    },
    "items": {
        "element##0": {
            "name": "div",
            "attributes": {
                "id": "tabLinks",
                "class": "tab-links"
            },
            "items": {
                "element##0": {
                    "name": "div",
                    "attributes": {},
                    "items": {
                        "element##0": rightTabsLinkTemp,
                        // "element##1": rightTabsLinkTemp,
                        // "element##2": rightTabsLinkTemp
                    }
                }
            }
        },
        "element##1": {
            "name": "div",
            "attributes": {
                "class": "tab-contents"
            },
            "items": {}
        }
    }
}

var rightNavBar = {
    "name": "div",
    "attributes": {
        "id": "navbarSideRight",
        "class": "navbar-side-right resizable-left"
    },
    "items": {
        "element##0": rightTabs,
    }
}