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
        <li>[{{galleryTitles[gallery.path]}}]({{gallery.path}})</li>
    {% endfor %}
</ul>