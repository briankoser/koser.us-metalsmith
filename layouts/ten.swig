{% extends "journal.swig" %}

{% block title %}Ten {{title}} · Journal · {{sitename}}{% endblock %}

{% block article %}
    <section class="summary">
        {{contents|safe}}
    </section>
    
    <ol class="top-list top-list-first">
        {% for item in firstlist %}
            <li>
                <h2>{{item.name|safe}}</h2>
                {% if images %}
                <img src="/img/journal/tens/tens-{{topten|lower|replace(' ', '-', 'g')}}-first-{{loop.index}}.jpg">
                {% endif %}
                <p class="list-comment">{{item.comment}}</p>
                <p class="list-response">{{item.response}}</p>
            </li>
        {% endfor %}
    </ol>
    
    <ol class="top-list top-list-second">
        {% for item in secondlist %}
            <li>
                <h2>{{item.name|safe}}</h2>
                {% if images %}
                <img src="/img/journal/tens/tens-{{topten|lower|replace(' ', '-', 'g')}}-second-{{loop.index}}.jpg">
                {% endif %}
                <p class="list-comment">{{item.comment}}</p>
                <p class="list-response">{{item.response}}</p>
            </li>
        {% endfor %}
    </ol>
{% endblock %}