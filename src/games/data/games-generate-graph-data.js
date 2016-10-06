var fs = require('fs');

var filePathIn = 'games-played-2016-raw.json'
var filePathOut = 'games-played-2016.json'

var generateGraphData = function (raw) {
    var data = {}

    data['total-played'] = raw.reduce((previous, current) => (Number.parseInt(previous['-quantity']) || previous) + Number.parseInt(current['-quantity']))

    data['minutes-played'] = raw.reduce((previous, current) => (Number.parseInt(previous['-length']) || previous) + Number.parseInt(current['-length']))

    const lengths = raw.map(o => o['-length'])
    const longestDuration = Math.max(...lengths)
    data.longest = raw.find(o => o['-length'] == longestDuration)

    const shortestDuration = Math.min(...lengths)
    data.shortest = raw.find(o => o['-length'] == shortestDuration)

    data.hindex = 11

    const months = raw.map(o => new Date(o['-date']).getMonth())
    var monthCounts = Array(12).fill(0)
    for (var i = 0; i < months.length; i++) {
        monthCounts[months[i]] += 1
    }
    data['played-by-month'] = {}
    data['played-by-month'].labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    data['played-by-month'].series = [monthCounts] 

    return data
}

var data = JSON.parse(fs.readFileSync(filePathIn, 'utf-8'));
var graphData = generateGraphData(data.plays.play)
fs.writeFileSync(filePathOut, JSON.stringify(graphData));

// "played-by-day": {
//     "labels": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
//     "series": [
//         [32, 31, 23, 6, 68, 63, 64]
//     ]
// },

// game_stats['played-by-day'] = {}
// game_stats['played-by-day']['labels'] = Date::ABBR_DAYNAMES.compact
// game_stats['played-by-day']['series'] = Array.new(1) { games_played_by_day }
// game_stats['played-by-player-count'] = {}
// game_stats['played-by-player-count']['labels'] = 2.upto(player_count.count - 1).to_a.map{|num| num.to_s}
// game_stats['played-by-player-count']['series'] = Array.new(1) { player_count.compact }