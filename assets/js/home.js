$(document).ready(function() {
    var highlightBrian   = function() { $('#family').prop('src', '/img/family-brian.jpg'); }
    var highlightMelissa = function() { $('#family').prop('src', '/img/family-melissa.jpg'); }
    var highlightLydia   = function() { $('#family').prop('src', '/img/family-lydia.jpg'); }
    var highlightNone    = function() { $('#family').prop('src', '/img/family-all.jpg'); }
    
    $('#brian').hover(highlightBrian, highlightNone);
    $('#melissa').hover(highlightMelissa, highlightNone);
    $('#lydia').hover(highlightLydia, highlightNone);
});