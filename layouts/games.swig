{% extends "default.swig" %}

{% block title %}{{title}} · {{sitename}}{% endblock %}

{% block css %}
    <link rel="stylesheet" href="/css/vendor/chartist.min.css">
    <link rel="stylesheet" href="/css/games.css">
{% endblock %}

{% block js %}
    <script src="/js/vendor/chartist.js"></script>
    <script src="/js/vendor/HumanizeDuration.js"></script>
    
    {% if year == '2014' %}
        <script src="/js/games.2014.js"></script>
    {% elseif year == '2015' %}
        <script src="/js/games.2015.js"></script>
    {% endif %}
{% endblock %}

{% block body%}
    <h1>{{title}}</h1>
    
    <article>
        {{contents|safe}}
    </article>
    
    <footer>
        <nav>
            {% if previous.year %}
                <a class="float-left" rel="next" href="/{{ previous.path }}">« {{ previous.title }}</a>
            {% endif %}
            {% if next.year %}
                <a class="float-right" rel="prev" href="/{{ next.path }}">{{ next.title }} »</a>
            {% endif %}
        </nav>
    </footer>
{% endblock %}