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
        <li>
            <a href="{{gallery.path}}">
                <span class="milli">({{gallery.date}})</span>
                {{galleryTitles[gallery.path]|safe}}
            </a>
        </li>
    {% endfor %}
</ul>