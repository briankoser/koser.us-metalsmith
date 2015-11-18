{% extends "default.swig" %}

{% block body%}
    <article>
        <header>
            <h1 class="post-title">{{title}}</h1>
            <span class="post-author">by {{author}}</span>
            <span class="post-date">{{pubdate|date('Y-m-d')}}</span>
        </header>
    
        {{contents|safe}}
        
        <footer>
            <nav>
                <!-- jekyll blog nav
                {% if page.previous %}
                    <a class="left" rel="prev" href="{{ page.previous.url }}">« {{ page.previous.title }}</a>
                {% endif %}
                {% if page.next %}
                    <a class="right" rel="next" href="{{ page.next.url }}">{{ page.next.title }} »</a>
                {% endif %}
                -->
            </nav>
        </footer>
    </article>
{% endblock %}