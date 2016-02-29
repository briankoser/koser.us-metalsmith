<!doctype html>
<html class="no-js" lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>{% block title %}{{title}} · {{sitename}}{% endblock %}</title>
        <meta name="description" content="{{description}}">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="#4f93f9">
        
        <meta name="twitter:card" content="summary">
        <meta name="twitter:site" content="@bmkoser">
        <meta property="og:url" content="{{sitelocation}}{{link}}">
        <meta property="og:title" content="{{title}}">
        <meta property="og:description" content="{{description}}">
        <meta property="og:image" content="http://koser.us/tile.png">

        <link rel="apple-touch-icon" href="apple-touch-icon.png">

        <link rel="stylesheet" href="/css/normalize.css">
        <link rel="stylesheet" href="/{{ fingerprint['css\main.css'] }}">
        
        {% block css %}{% endblock %}
    </head>
    <body>
        <div class="header-container">
            <header role="banner" class="clearfix">
                <h1 class="site-title"><a href="/">{{sitename}}</a></h1>
                
                <a href="#menu" class="menu-link">≡ Menu</a>
                <nav id="menu" role="navigation" class="site-nav">
                    <ul class="horizontal">
                        <li {% if section == 'home' %}class="site-nav-active"{% endif %}>
                            <a href="/">
                                <svg class="icon icon-home3"><use xlink:href="#icon-home3"></use></svg>
                                <span class="site-nav-link">Home</span>
                            </a>
                        </li>                        
                        <li {% if section == 'journal' %}class="site-nav-active"{% endif %}>
                            <a href="/journal/">
                                <svg class="icon icon-pen"><use xlink:href="#icon-pen"></use></svg>
                                <span class="site-nav-link">Journal</span>
                            </a>
                        </li>
                        <li {% if section == 'games' %}class="site-nav-active"{% endif %}>
                            <a href="/games/">
                                <svg class="icon icon-dice"><use xlink:href="#icon-dice"></use></svg>
                                <span class="site-nav-link">Games</span>
                            </a>
                        </li>
                        <li {% if section == 'recipes' %}class="site-nav-active"{% endif %}>
                            <a href="/recipes/">
                                <svg class="icon icon-spoon-knife"><use xlink:href="#icon-spoon-knife"></use></svg>
                                <span class="site-nav-link">Recipes</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>

        <main class="clearfix">
            {% block body %}
                {{contents|safe}}
            {% endblock%}
        </main>

        <div class="footer-container">
            <footer role="contentinfo">
                Built by <a href="http://briankoser.com">Brian Koser</a>. <span class="desktop-only">Not bad for a man in his jim jams.</span>
            </footer>
        </div>
                
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="/js/vendor/jquery-1.11.3.min.js"><\/script>')</script>
        <script src="/js/main.js" defer></script>
        
        {% if development %}
            <script src="http://localhost:35729/livereload.js"></script>
        {% endif %}
        
        {% block js %}
            {% if customjs == 'home' %}
                <script src="/js/home.js" defer></script>
            {% endif %}
        {% endblock %}
    </body>
    <svg style="position:absolute; width:0; height:0;" width="0" height="0" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
            <symbol id="icon-home3" viewBox="0 0 1024 1024">
                <title>home3</title>
                <path class="path1" d="M1024 608l-192-192v-288h-128v160l-192-192-512 512v32h128v320h320v-192h128v192h320v-320h128z"></path>
            </symbol>
            <symbol id="icon-pen" viewBox="0 0 1024 1024">
                <title>pen</title>
                <path class="path1" d="M1018.17 291.89l-286.058-286.058c-9.334-9.334-21.644-7.234-27.356 4.666l-38.354 79.904 267.198 267.198 79.904-38.354c11.9-5.712 14-18.022 4.666-27.356z"></path>
                <path class="path2" d="M615.384 135.384l-263.384 21.95c-17.5 2.166-32.080 5.898-37.090 28.752-0.006 0.024-0.012 0.042-0.018 0.066-71.422 343.070-314.892 677.848-314.892 677.848l57.374 57.374 271.986-271.99c-5.996-12.53-9.36-26.564-9.36-41.384 0-53.020 42.98-96 96-96s96 42.98 96 96-42.98 96-96 96c-14.82 0-28.852-3.364-41.384-9.36l-271.988 271.986 57.372 57.374c0 0 334.778-243.47 677.848-314.892 0.024-0.006 0.042-0.012 0.066-0.018 22.854-5.010 26.586-19.59 28.752-37.090l21.95-263.384-273.232-273.232z"></path>
            </symbol>
            <symbol id="icon-dice" viewBox="0 0 1024 1024">
                <title>dice</title>
                <path class="path1" d="M864 192h-512c-88 0-160 72-160 160v512c0 88 72 160 160 160h512c88 0 160-72 160-160v-512c0-88-72-160-160-160zM416 896c-53.020 0-96-42.98-96-96s42.98-96 96-96 96 42.98 96 96-42.98 96-96 96zM416 512c-53.020 0-96-42.98-96-96s42.98-96 96-96 96 42.98 96 96-42.98 96-96 96zM608 704c-53.020 0-96-42.98-96-96s42.98-96 96-96 96 42.98 96 96-42.98 96-96 96zM800 896c-53.020 0-96-42.98-96-96s42.98-96 96-96 96 42.98 96 96-42.98 96-96 96zM800 512c-53.020 0-96-42.98-96-96s42.98-96 96-96 96 42.98 96 96-42.98 96-96 96zM828.76 128c-14.93-72.804-79.71-128-156.76-128h-512c-88 0-160 72-160 160v512c0 77.046 55.196 141.83 128 156.76v-636.76c0-35.2 28.8-64 64-64h636.76z"></path>
            </symbol>
            <symbol id="icon-spoon-knife" viewBox="0 0 1024 1024">
                <title>spoon-knife</title>
                <path class="path1" d="M224 0c-106.040 0-192 100.288-192 224 0 105.924 63.022 194.666 147.706 217.998l-31.788 518.124c-2.154 35.132 24.882 63.878 60.082 63.878h32c35.2 0 62.236-28.746 60.082-63.878l-31.788-518.124c84.684-23.332 147.706-112.074 147.706-217.998 0-123.712-85.96-224-192-224zM869.334 0l-53.334 320h-40l-26.666-320h-26.668l-26.666 320h-40l-53.334-320h-26.666v416c0 17.672 14.326 32 32 32h83.338l-31.42 512.122c-2.154 35.132 24.882 63.878 60.082 63.878h32c35.2 0 62.236-28.746 60.082-63.878l-31.42-512.122h83.338c17.674 0 32-14.328 32-32v-416h-26.666z"></path>
            </symbol>
        </defs>
    </svg>
</html>