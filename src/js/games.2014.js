function getAllSupportedItems( ) {
    return $.getJSON("/games/data/games-played-2014.json").then(function (data) {
        return data;
    });
}

function getLengthWithGameString(length, game) {
    return length + ' (' + game + ')';
}

function minutesToMilliseconds(minutes) {
    return minutes * 60 * 1000;
}

window.onload = function() {
    getAllSupportedItems().done(function (data) {
        $('#total-played').html(data['total-played']);
        var milliseconds_played = minutesToMilliseconds(data['minutes-played']);
        var milliseconds_played_per_week = milliseconds_played / 44;
        milliseconds_played_per_week = 
            Math.floor(milliseconds_played_per_week - (milliseconds_played_per_week % (60 * 1000)));
        $('#time-spent').html(
            humanizeDuration(milliseconds_played, { units: ["hours", "minutes"] }) +
            ' (' + humanizeDuration(milliseconds_played_per_week, { units: ["hours", "minutes"] }) + ' per week)'
        );
        $('#hindex').html(data.hindex);
        
        var longestInMilliseconds = minutesToMilliseconds(data.longest.Duration);
        $('#longest').html(getLengthWithGameString(humanizeDuration(longestInMilliseconds), data.longest.Name));
        
        var shortestInMilliseconds = minutesToMilliseconds(data.shortest.Duration);
        $('#shortest').html(getLengthWithGameString(humanizeDuration(shortestInMilliseconds), data.shortest.Name));
        
        new Chartist.Bar('.ct-played-by-month', data['played-by-month']);
        new Chartist.Bar('.ct-played-by-day', data['played-by-day']);
        new Chartist.Bar('.ct-played-by-player-count', data['played-by-player-count']);
        new Chartist.Bar('.ct-listed-by-total-played', data['listed-by-total-played']);
        new Chartist.Bar('.ct-listed-by-minutes', data['listed-by-minutes']);
    });
};
