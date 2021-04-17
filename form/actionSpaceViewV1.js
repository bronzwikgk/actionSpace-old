var topNav = {
    name: 'div',
    class: 'topNav',
    navLinks: {
        name: 'span',
        class: 'item',
        content: {
            name: 'a',
            href: '#home',
            class: 'active',
            textContent:'Home'
            
        }
        
    }
    
}
var activeViewModelV1 = {
    name: 'activeView',
    class: 'container row full-width full-height',
    id: 'ActionView',
    textContent: 'Active View',
    innerHTML:topNav,
}