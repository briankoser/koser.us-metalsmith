$(document).ready(function() {
    $('.view-gallery').on('click', launchGallery);
});

function launchGallery() {
    var pswpElement = document.querySelectorAll('.pswp')[0];

    // build items array
    var items = [
        {
            src: 'http://cdn.koser.us/pictures/2015-09-03-lydia-born/2015-09-03-lydia-born-001.jpg',
            w: 384,
            h: 512
        },
        {
            src: 'http://cdn.koser.us/pictures/2015-09-03-lydia-born/2015-09-03-lydia-born-002.jpg',
            w: 979,
            h: 1306
        },
        {
            src: 'http://cdn.koser.us/pictures/2015-09-03-lydia-born/2015-09-03-lydia-born-003.jpg',
            w: 979,
            h: 1306
        },
        {
            src: 'http://cdn.koser.us/pictures/2015-09-03-lydia-born/2015-09-03-lydia-born-005.jpg',
            w: 1306,
            h: 979
        }
    ];

    // define options (if needed)
    var options = {
        // optionName: 'option value'
        // for example:
        index: 0 // start at first slide
    };

    // Initializes and opens PhotoSwipe
    var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
}