(function() {


var displayTab = function(a) {
    var li = a.parentNode
    var div = a.parentNode.parentNode.parentNode
    
    if(li.classList.contains('active')) {
        return false;
    }
    div.querySelector('.tabs .active').classList.remove('active')
    li.classList.add('active')

    div.querySelector('.tab-content.active').classList.remove('active')
    div.querySelector(a.getAttribute('href')).classList.add('active')
}
var tabs = document.querySelectorAll('.tabs a')
for (var i = 0; i < tabs.length; i++) {
    var tab = tabs[i]
    tab.addEventListener('click', function(event) {
       
        displayTab(this)
        
    })
}
var hash = windows.location.hash
var a = document.querySelector('a[href="'+ hash +'"]')
if(a !== null && !a.parentNode.classList.contains('active')) {
    displayTab(a)
}
})()

