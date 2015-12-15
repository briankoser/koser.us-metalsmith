{% extends "default.swig" %}

{% block title %}{{data.name}} · Recipes · {{sitename}}{% endblock %}

{% block css %}
    
{% endblock %}

{% block body %}
    <article vocab="http://schema.org/" typeof="Recipe">
        <h1 property="name">{{data.name}}</h1>
        
        <section class="milli">
            {% if data.author %}
                By <span property="author">{{data.author}}</span>
            {% endif %}
            
            {% if data.image %}
                <img property="image" src="{{data.image}}" />
            {% endif %}
            
            {% if data.yield %}
                <div>Yield: <span property="recipeYield">{{data.yield|safe}}</span></div>
            {% endif %}
        </section>
        
        <section>
            <ul>
            {% for ingredient in data.ingredients %}
                <li property="ingredients">{{ingredient|safe}}</li>
            {% endfor %}
            </ul>
        </section>
        
        <section>
            <ol property="recipeInstructions">
            {% for instruction in data.instructions %}
                <li>{{instruction|safe}}</li>
            {% endfor %}
            </ol>
        </section>
        
        <section>
            {% if data.comments %}
                <span property="description">{{data.comments|safe}}</span>
            {% endif %}
        </section>
        
        <section>
            <ul class="keywords horizontal">
                {% for keyword in data.keywords %}
                    <li class="paper">{{keyword}}</li>
                {% endfor %}
            </ul>
        </section>
        
        <section class="milli">
            Last updated <meta property="dateModified" content="{{data.datemodified}}">
                {{ data.datemodified|date('Y-m-d') }}
            </meta>
        </section>
    </article>
{% endblock %}