{% extends "default.swig" %}

{% block title %}{{title}} · Blog · {{sitename}}{% endblock %}

{% block css %}
    {% if customcss == 'toptenpunctuation' %}
        <link rel="stylesheet" href="/css/blog.2015-10-24-top-ten-punctuation-marks.css">
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