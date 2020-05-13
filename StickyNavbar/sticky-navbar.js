(function() {

    var scrollY = function () {
        var supportPageOffset = window.pageXOffset !== undefined;
        var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
        return supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
    }

    var element = document.querySelector('[data-sticky]')
    var rec = element.getBoundingClientRect()
    var top = rec.top + scrollY()
    var width = rec.width = width + "px"
    // Créer un fake element pour récupérer la hauteur de l'élémnet
    var fake = document.createElement('div')
    fake.style.width = rec.width + "px"
    fake.style.height = rec.height + "px"

    var onScroll = function () {
        var hasScrollClass = element.classList.contains('fixed')
        if (scrollY() > top && !hasScrollClass) {
            element.classList.add('fixed')
            element.style.width = width + "px"
            element.parentNode.insertBefore(fake, element)
        } else if (scrollY() < top && hasScrollClass) {
            element.classList.remove('fixed')
            element.parentNode.removeChild(fake)
        }
    }

    // Résoudre le problème de redimensionnement
    var onResize = function () {
        element.style.width = "100%"
        element.classList.remove('fixed')
        fake.style.display = "none"
        rec = element.getBoundingClientRect()
        top = rec.top + scrollY()
        width = rec.width = width + "px"
        fake = document.createElement('div')
        fake.style.width = rec.width + "px"
        fake.style.height = rec.height + "px"
        fake.style.display = "block"
        onScroll()
    }

    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onResize)
})()