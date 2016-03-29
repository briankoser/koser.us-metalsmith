{% extends "default.swig" %}

{% block title %}{{title|striptags}} · Journal · {{sitename}}{% endblock %}

{% block css %}
    {% if customcss == 'toptenpunctuation' %}
        <link rel="stylesheet" href="/css/journal.2015-10-24-top-ten-punctuation-marks.css">
        <link href='https://fonts.googleapis.com/css?family=Open+Sans&text=¶' rel='stylesheet' type='text/css'>
        <link href='https://fonts.googleapis.com/css?family=Roboto&text=¶' rel='stylesheet' type='text/css'>
        <link href='https://fonts.googleapis.com/css?family=Lato&text=¶' rel='stylesheet' type='text/css'>
        <link href='https://fonts.googleapis.com/css?family=Oswald&text=¶' rel='stylesheet' type='text/css'>
        <link href='https://fonts.googleapis.com/css?family=Lora&text=¶' rel='stylesheet' type='text/css'>
        <link href='https://fonts.googleapis.com/css?family=Montserrat&text=¶' rel='stylesheet' type='text/css'>
        <link href='https://fonts.googleapis.com/css?family=PT+Sans&text=¶' rel='stylesheet' type='text/css'>
        <link href='https://fonts.googleapis.com/css?family=Raleway&text=¶' rel='stylesheet' type='text/css'>
        <link href='https://fonts.googleapis.com/css?family=Ubuntu&text=¶' rel='stylesheet' type='text/css'>
        <link href='https://fonts.googleapis.com/css?family=Merriweather&text=¶' rel='stylesheet' type='text/css'>
        <link href='https://fonts.googleapis.com/css?family=PT+Serif&text=¶' rel='stylesheet' type='text/css'>
        <link href='https://fonts.googleapis.com/css?family=Bitter&text=¶' rel='stylesheet' type='text/css'>
        <link href='https://fonts.googleapis.com/css?family=Poiret+One&text=¶' rel='stylesheet' type='text/css'>
        <link href='https://fonts.googleapis.com/css?family=Oxygen&text=¶' rel='stylesheet' type='text/css'>
        <link href='https://fonts.googleapis.com/css?family=Alegreya&text=¶' rel='stylesheet' type='text/css'>
        <link href='https://fonts.googleapis.com/css?family=Alfa+Slab+One&text=¶' rel='stylesheet' type='text/css'>
        <link href='https://fonts.googleapis.com/css?family=Alice&text=¶' rel='stylesheet' type='text/css'>
        <link href='https://fonts.googleapis.com/css?family=Alex+Brush&text=¶' rel='stylesheet' type='text/css'>
        <link href='https://fonts.googleapis.com/css?family=Varela+Round&text=¶' rel='stylesheet' type='text/css'>
    {% endif %}
{% endblock %}

{% block body %}
    <article class="h-entry">
        <header>
            <h1 class="post-title p-name">{{title|safe}}</h1>
            <span class="post-author p-author">by {{author}}</span>
            <time class="post-date dt-published" datetime="{{pubdate|date('Y-m-dTH:i:s\Z')}}">{{pubdate|date('Y-m-d')}}</time>
        </header>
        
        <div class="e-content">
        {% block article %}
            {{contents|safe}}
        {% endblock %}
        </div>
        
        <footer>
            <nav>
                {% if next %}
                    <a class="float-left margin-top" rel="prev" href="/{{ next.path }}">« {{ next.title|striptags }}</a>
                {% endif %}
                {% if previous %}
                    <a class="float-right margin-top" rel="next" href="/{{ previous.path }}">{{ previous.title|striptags }} »</a>
                {% endif %}
            </nav>
        </footer>
    </article>
{% endblock %}