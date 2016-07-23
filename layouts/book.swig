{% extends "journal.swig" %}

{% block title %}Book Review: {{book}} · Journal · {{sitename}}{% endblock %}

{% block article %}
    <div class="book-summary media">
        <img src="https://covers.openlibrary.org/b/isbn/{{bookisbn}}-M.jpg" alt="{{book}} book cover" class="media-figure">
        
        <div class="media-body">
            <table class="table-vertical table-invisible">
                <tr><td>
                    {% if openlibraryurl %}
                    <a href="{{openlibraryurl}}" class="p-item h-item">{{bookdisplay|safe}}</a>
                    {% else %}
                    <span class="p-item h-item">{{bookdisplay|safe}}</span>
                    {% endif %}
                </td></tr>
                <tr><td>{{bookauthor}}</td></tr>
                <tr><td>{{bookpubdate}}</td></tr>
                <tr><td><data class="star-rating p-rating" value="{{bookrating}}">
                    {% set stars = ['☆☆☆☆☆', '★☆☆☆☆', '★★☆☆☆', '★★★☆☆', '★★★★☆', '★★★★★'] %}
                    {{ stars[bookrating] }}
                </data></td></tr>
            </table>
        </div>
    </div>
    
    <p>
        {% if audiobook %}
            <span>(Listened to audiobook)</span><br>
        {% endif %}
        {% if lydia %}
            <span>(Read to Lydia)</span><br>
        {% endif %}
    </p>
    
    <div class="e-content">
    {{contents|safe}}
    </div>
{% endblock %}