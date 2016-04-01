{% extends "default.swig" %}

{% block title %}{{title|striptags}} · Gallery · {{sitename}}{% endblock %}

{% block css %}
    <link rel="stylesheet" href="/css/vendor/photoswipe/photoswipe.css"> 
    <link rel="stylesheet" href="/css/vendor/photoswipe/default-skin/default-skin.css"> 
{% endblock %}

{% block js %}
    <script src="/js/vendor/photoswipe.min.js"></script>
    <script src="/js/vendor/photoswipe-ui-default.min.js"></script>
    <script src="/js/gallery.js"></script>
{% endblock %}

{% block body %}
    <h1>{{title}}</h1>

    {{contents|safe}}
    
    <button class="view-gallery">View gallery</button>
    
    <script type="application/json" id="gallery-data">
        {{pictures|safe|json}}
    </script>
    
    <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="pswp__bg"></div>

        <div class="pswp__scroll-wrap">
            <div class="pswp__container">
                <div class="pswp__item"></div>
                <div class="pswp__item"></div>
                <div class="pswp__item"></div>
            </div>

            <div class="pswp__ui pswp__ui--hidden">
                <div class="pswp__top-bar">
                    <div class="pswp__counter"></div>
                    
                    <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
                    <button class="pswp__button pswp__button--share" title="Share"></button>
                    <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
                    <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>

                    <div class="pswp__preloader">
                        <div class="pswp__preloader__icn">
                        <div class="pswp__preloader__cut">
                            <div class="pswp__preloader__donut"></div>
                        </div>
                        </div>
                    </div>
                </div>

                <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                    <div class="pswp__share-tooltip"></div> 
                </div>

                <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>

                <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>

                <div class="pswp__caption">
                    <div class="pswp__caption__center"></div>
                </div>
            </div>
        </div>
    </div>
{% endblock %}