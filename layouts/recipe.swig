{% extends "default.swig" %}

{% block title %}{{ title }} · {% parent %}{% endblock %}

{% block css %}
    
{% endblock %}

{% block body%}
    <article vocab="http://schema.org/" typeof="Recipe">
        <h1 property="name">{{ name }}</h1>
        By <span property="author">{{ author }}</span>
        <img property="image" src="{{ image }}" />
        
        <div>
            Yield: <span property="recipeYield">{{ yield }}</span>
        </div>
        
        Ingredients:
        <ul>
        {% for ingredient in ingredients %}
            <li property="ingredients">{{ ingredient }}</li>
        {% endfor %}
        </ul>
        
        Instructions:
        <ol property="recipeInstructions">
        {% for instruction in instructions %}
            <li>{{ instruction }}</li>
        {% endfor %}
        </ol>
        
        <span property="description">{{ comments }}</span>
        
        <span property="keywords">{{ keywords }}</span>
        
        Last updated <meta property="dateModified" content="{{ datemodified }}">
            {{ datemodified|date('Y-m-d') }}
        </meta>
    </article>
{% endblock %}