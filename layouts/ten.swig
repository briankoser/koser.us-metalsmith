{% extends "journal.swig" %}

{% block article %}
    <section class="summary">
        {{contents|safe}}
    </section>
    
    <section class="top-list top-list-first {% if images %}top-list-images{% endif %}">
        <h2>{{firstlistauthor}}</h2>
        <ol>
            {% for item in firstlist %}
                <li>
                    <h3>
                        {% if item.link %}
                            <a href="{{item.link}}">{{item.name|safe}}</a>
                        {% else %}
                            {{item.name|safe}}
                        {% endif %}
                    </h3>
                    {% if images %}
                    <img src="/img/journal/tens/tens-{{topten|lower|replace(' ', '-', 'g')}}-first-{{loop.index}}.jpg">
                    {% endif %}
                    <p class="list-comment">{{item.comment|safe}}</p>
                    {% if item.response %}
                    <p class="list-response">{{item.response|safe}} –{{secondlistauthor|first}}</p>
                    {% endif %}
                </li>
            {% endfor %}
        </ol>
    </section>
    
    <section class="top-list top-list-second {% if images %}top-list-images{% endif %}">
        <h2>{{secondlistauthor}}</h2>
        <ol>
            {% for item in secondlist %}
                <li>
                    <h3>
                        {% if item.link %}
                            <a href="{{item.link}}">{{item.name|safe}}</a>
                        {% else %}
                            {{item.name|safe}}
                        {% endif %}
                    </h3>
                    {% if images %}
                    <img src="/img/journal/tens/tens-{{topten|lower|replace(' ', '-', 'g')}}-second-{{loop.index}}.jpg">
                    {% endif %}
                    <p class="list-comment">{{item.comment|safe}}</p>
                    {% if item.response %}
                    <p class="list-response">{{item.response|safe}} –{{firstlistauthor|first}}</p>
                    {% endif %}
                </li>
            {% endfor %}
        </ol>
    </section>
{% endblock %}