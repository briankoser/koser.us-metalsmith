{% extends "default.swig" %}

{% block title %}{{data.name}} · {% parent %}{% endblock %}

{% block css %}
    
{% endblock %}

{% block body %}
    <article vocab="http://schema.org/" typeof="Recipe">
        <h1 property="name">{{data.name}}</h1>
        
        {% if data.author %}
            By <span property="author">{{data.author}}</span>
        {% endif %}
        
        {% if data.image %}
            <img property="image" src="{{data.image}}" />
        {% endif %}
        
        {% if data.yield %}
            <div>Yield: <span property="recipeYield">{{data.yield}}</span></div>
        {% endif %}
        
        Ingredients:
        <ul>
        {% for ingredient in data.ingredients %}
            <li property="ingredients">{{ingredient}}</li>
        {% endfor %}
        </ul>
        
        Instructions:
        <ol property="recipeInstructions">
        {% for instruction in data.instructions %}
            <li>{{instruction}}</li>
        {% endfor %}
        </ol>
        
        {% if data.description %}
            <span property="description">{{data.comments}}</span>
        {% endif %}
        
        {% if data.keywords %}
            <span property="keywords">{{data.keywords}}</span>
        {% endif %}
        
        Last updated <meta property="dateModified" content="{{data.datemodified}}">
            {{ data.datemodified|date('Y-m-d') }}
        </meta>
    </article>
{% endblock %}