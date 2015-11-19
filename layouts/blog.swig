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
                {% if next %}
                    <a class="float-left" rel="prev" href="/{{ next.path }}">« {{ next.title }}</a>
                {% endif %}
                {% if previous %}
                    <a class="float-right" rel="next" href="/{{ previous.path }}">{{ previous.title }} »</a>
                {% endif %}
            </nav>
        </footer>
    </article>
{% endblock %}