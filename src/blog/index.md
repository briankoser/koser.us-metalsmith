---
title: Blog
description: The blog of Brian Koser, Melissa Koser, and Lydia Koser
paginate: posts
---
{% for post in collections.posts %}
    <span>{{post.title}} - {{post.path}} - {{post.excerpt}}</span>
{% endfor %}