---
title: Photo Gallery
description: The family photos of Brian, Melissa, and Lydia Koser
section: gallery
json_files:
    source_file: galleries
    filename_pattern: gallery/:path
    as_permalink: false
    layout: gallery.swig
    description: The family photos of Brian, Melissa, and Lydia Koser
    section: gallery
---
# Gallery

<ul class="recipe-list">
    {% for gallery in galleries %}
        <li>[{{galleryTitles[gallery.title]}}]({{gallery.path}})</li>
    {% endfor %}
</ul>

<!--// title: Lydia born
// date: 2015-09-03
// description: The family photos of Brian, Melissa, and Lydia Koser.
// layout: gallery.swig
// section: gallery
// pictures: [
//     {
//         "src": "http://cdn.koser.us/pictures/2015-09-03-lydia-born/2015-09-03-lydia-born-001.jpg",
//         "w": 384,
//         "h": 512
//     },
//     {
//         "src": "http://cdn.koser.us/pictures/2015-09-03-lydia-born/2015-09-03-lydia-born-002.jpg",
//         "w": 979,
//         "h": 1306
//     },
//     {
//         "src": "http://cdn.koser.us/pictures/2015-09-03-lydia-born/2015-09-03-lydia-born-003.jpg",
//         "w": 979,
//         "h": 1306
//     },
//     {
//         "src": "http://cdn.koser.us/pictures/2015-09-03-lydia-born/2015-09-03-lydia-born-005.jpg",
//         "w": 1306,
//         "h": 979
//     }
// ] -->