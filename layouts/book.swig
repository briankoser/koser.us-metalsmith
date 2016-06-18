{% extends "journal.swig" %}

{% block title %}Book Review: {{book}} · Journal · {{sitename}}{% endblock %}

{% block article %}
    <div class="book-summary media">
        <img src="https://covers.openlibrary.org/b/isbn/{{bookisbn}}-M.jpg" alt="{{book}} book cover" class="media-figure">
        
        <div class="media-body">
            <table class="table-vertical table-invisible">
                <tr><td>
                    {% if openlibraryurl %}
                    <a href="{{openlibraryurl}}">{{bookdisplay|safe}}</a>
                    {% else %}
                    {{bookdisplay|safe}}
                    {% endif %}
                </td></tr>
                <tr><td>{{bookauthor}}</td></tr>
                <tr><td>{{bookpubdate}}</td></tr>
                <tr><td><span class="star-rating">{{bookrating}}</span></td></tr>
            </table>
        </div>
    </div>
    
    <p>
        {% if audiobook %}
            <span>(Listened to audiobook)</span><br>
        {% endif %}
    </p>
    
    {{contents|safe}}
{% endblock %}