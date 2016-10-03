var fs = require('fs');

var filePathIn = 'src\\games\\data\\games-played-2016-raw.json'
var filePathOut = 'src\\games\\data\\games-played-2016.json'

var data = fs.readFileSync(filePathIn, 'utf-8');

var generateGraphData = function (data) {
    return data
}

var graphData = generateGraphData(data)
fs.writeFileSync(filePathOut, graphData);