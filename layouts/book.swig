{% extends "journal.swig" %}

{% block title %}Book Review: {{book}} · Journal · {{sitename}}{% endblock %}

{% block article %}  
    {{contents|safe}}
    
    <p>
        {% if audiobook %}
            <span>(Listened to audiobook)</span><br>
        {% endif %}
        <span class="star-rating kilo">{{rating}}</span>
    </p>
{% endblock %}