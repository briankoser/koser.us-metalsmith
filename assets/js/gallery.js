$(document).ready(function() {
    $('.view-gallery').on('click', launchGallery);
});

function launchGallery() {
    var pswpElement = document.querySelectorAll('.pswp')[0];

    // build items array
    var items = JSON.parse(document.getElementById('gallery-data').innerHTML);

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