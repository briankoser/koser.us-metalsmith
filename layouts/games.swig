{% extends "default.swig" %}

{% block title %}{{title}} · {% parent %}{% endblock %}

{% block css %}
    <link rel="stylesheet" href="/css/vendor/chartist.min.css">
    <link rel="stylesheet" href="/css/games.css">
{% endblock %}

{% block js %}
    <script src="/js/vendor/chartist.js"></script>
    <script src="/js/vendor/HumanizeDuration.js"></script>
    <script>
        function getAllSupportedItems( ) {
            return $.getJSON("games2014.json").then(function (data) {
                return data;
            });
        }
        
        window.onload = function() {
            getAllSupportedItems().done(function (data) {
                $('#total-played').html(data['total-played']);
                var milliseconds_played = data['minutes-played'] * 60 * 1000;
                var milliseconds_played_per_week = milliseconds_played / 44;
                milliseconds_played_per_week = 
                    Math.floor(milliseconds_played_per_week - (milliseconds_played_per_week % (60 * 1000)));
                $('#time-spent').html(
                    humanizeDuration(milliseconds_played, { units: ["hours", "minutes"] }) +
                    ' (' + humanizeDuration(milliseconds_played_per_week, { units: ["hours", "minutes"] }) + ' per week)'
                );
                $('#hindex').html(data['hindex']);
                
                var longest = data['longest'];
                var longest_milliseconds_played = longest['Duration'] * 60 * 1000;
                var longest_string = longest['Name'] + '; ' + humanizeDuration(longest_milliseconds_played);
                $('#longest').html(longest_string);
                
                var shortest = data['shortest'];
                var shortest_milliseconds_played = shortest['Duration'] * 60 * 1000;
                var shortest_string = shortest['Name'] + '; ' + humanizeDuration(shortest_milliseconds_played);
                $('#shortest').html(shortest_string);
                
                new Chartist.Bar('.ct-played-by-month', data['played-by-month']);
                new Chartist.Bar('.ct-played-by-day', data['played-by-day']);
                new Chartist.Bar('.ct-played-by-player-count', data['played-by-player-count']);
                new Chartist.Bar('.ct-listed-by-total-played', data['listed-by-total-played']);
                new Chartist.Bar('.ct-listed-by-minutes', data['listed-by-minutes']);
            });
        };
    </script>
{% endblock %}

{% block body%}
    <h1>{{title}}</h1>
    
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
{% endblock %}