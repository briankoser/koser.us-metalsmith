---
title: Board Game Stats
description: The board game statistics of Brian and Melissa Koser
section: games
---
# Board Game Stats

<ul>
    {% for post in collections.gamestats %}
        {% if post.year %}
            <li>[{{ post.year }}](/{{ post.path }})
        {% endif %}
    {% endfor %}
</ul>