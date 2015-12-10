{% extends "default.swig" %}

{% block title %}{{title}} · {{sitename}}{% endblock %}

{% block css %}
    <link rel="stylesheet" href="/css/vendor/chartist.min.css">
    <link rel="stylesheet" href="/css/games.css">
{% endblock %}

{% block js %}
    <script src="/js/vendor/chartist.js"></script>
    <script src="/js/vendor/HumanizeDuration.js"></script>
    <script src="/js/games.2014.js"></script>
{% endblock %}

{% block body%}
    <h1>{{title}}</h1>
    
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
{% endblock %}