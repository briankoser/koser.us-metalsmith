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

    return data
}

var data = JSON.parse(fs.readFileSync(filePathIn, 'utf-8'));
var graphData = generateGraphData(data.plays.play)
fs.writeFileSync(filePathOut, JSON.stringify(graphData));