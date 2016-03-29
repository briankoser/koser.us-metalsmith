---
title: Journal
description: The journal of Brian Koser, Melissa Koser, and Lydia Koser
paginate: posts
section: journal
---
# Journal

{% for post in collections.posts %}
<article>
    <header>
        <h2 class="post-title">[{{ post.title|safe }}](/{{ post.path }})</a></h2>
        <span class="post-author">by {{ post.author }}</span>
        <span class="post-date">{{ post.pubdate|date('Y-m-d') }}</span>
    </header>
    <p class="post-excerpt">{{ post.excerpt|striptags }} ([more](/{{ post.path }}))</p>
</article>
{% endfor %}