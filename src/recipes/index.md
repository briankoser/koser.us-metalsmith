---
title: Recipes
description: The recipes of Brian and Melissa Koser
section: recipes
json_files:
    source_file: recipes
    filename_pattern: recipes/:urlname
    as_permalink: false
    layout: recipe.swig
    section: recipes
---
# Recipes

<ul class="recipe-list">
    {% for recipe in recipes %}
        <li>[{{recipe.name}}]({{recipe.urlname}})</li>
    {% endfor %}
</ul>