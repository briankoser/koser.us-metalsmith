var fs = require('fs')

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

    const months = raw.map(o => new Date(`${o['-date']} 00:00:00`).getMonth())
    var monthCounts = Array(12).fill(0)
    for (var i = 0; i < months.length; i++) {
        monthCounts[months[i]] += 1
    }
    data['played-by-month'] = {}
    data['played-by-month'].labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    data['played-by-month'].series = [monthCounts]

    const days = raw.map(o => new Date(`${o['-date']} 00:00:00`).getDay())
    var dayCounts = Array(7).fill(0)
    for (var i = 0; i < days.length; i++) {
        dayCounts[days[i]] += 1
    }
    data['played-by-day'] = {}
    data['played-by-day'].labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    data['played-by-day'].series = [dayCounts]

    return data
}

var data = JSON.parse(fs.readFileSync(filePathIn, 'utf-8'))
var graphData = generateGraphData(data.plays.play)
fs.writeFileSync(filePathOut, JSON.stringify(graphData))

// "played-by-player-count": {
//     "labels": ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
//     "series": [
//         [59, 59, 63, 43, 21, 18, 19, 1, 2, 2]
//     ]
// },
// "listed-by-total-played": {
//     "labels": ["Tumblin' Dice", "Splendor", "Spyfall", "Bananagrams", "Bang! The Dice Game", "Pandemic", "Dixit", "The Resistance", "Cosmic Encounter", "Pandemic Legacy", "Dice Masters", "Pit", "But Wait, There's More!", "Seasons", "Hanabi", "Ca$h 'n Guns", "Star Realms", "Five Tribes", "Dice Town", "Specter Ops", "XenoShyft Onslaught", "Wits and Wagers", "Doodle Quest", "Forbidden Island", "Castles of Mad King Ludwig", "King of Tokyo", "Jaipur", "Double Feature", "Sheriff of Nottingham", "Pitchcar", "Caverna", "Paperback", "Monopoly Deal", "T.I.M.E. Stories", "Baseball Highlights: 2045", "Gravwell", "Mascarade", "Trains", "Smash Up", "Volt: Robot Battle Arena", "Dutch Blitz", "Mottainai", "Spoons", "Balderdash", "Discworld: Ankh-Morpork", "For Sale", "Kingsburg", "Sherlock Holmes Consulting Detective", "Dead of Winter", "Ticket to Ride", "Werewolf", "Fluxx", "Say Anything", "Rampage", "Agricola", "Scoville", "Taboo", "Roll for the Galaxy", "Suburbia", "Tales of the Arabian Nights", "Flick'em Up", "Huggermugger", "Jamaica", "Tzolk'in", "Alien Frontiers", "Galaxy Trucker", "Zombie 15'", "Like Minds", "True Colors", "Run Fight or Die", "Lords of Waterdeep", "Kaosball", "Boggle", "Castaways", "Apples to Apples", "Mission: Red Planet", "Puerto Rico", "Settlers of Catan", "Kingsport Festival", "Scattergories", "Alchemists", "Farkle", "DungeonQuest"],
//     "series": [
//         [20, 16, 13, 12, 10, 10, 9, 8, 8, 7, 7, 6, 6, 5, 5, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
//     ]
// },
// "listed-by-minutes": {
//     "labels": ["XenoShyft Onslaught", "Pandemic Legacy", "Cosmic Encounter", "Splendor", "Pandemic", "Specter Ops", "Dixit", "Caverna", "Seasons", "Dice Masters", "Castles of Mad King Ludwig", "Five Tribes", "Tumblin' Dice", "Sherlock Holmes Consulting Detective", "Dice Town", "Dead of Winter", "The Resistance", "Baseball Highlights: 2045", "Sheriff of Nottingham", "Scoville", "Settlers of Catan", "Agricola", "Castaways", "Bang! The Dice Game", "But Wait, There's More!", "Kingsburg", "Ticket to Ride", "Ca$h 'n Guns", "Paperback", "Hanabi", "Alchemists", "Trains", "Forbidden Island", "Alien Frontiers", "Smash Up", "Star Realms", "Mottainai", "T.I.M.E. Stories", "King of Tokyo", "Tales of the Arabian Nights", "Bananagrams", "Lords of Waterdeep", "Rampage", "Farkle", "Jaipur", "Doodle Quest", "DungeonQuest", "Balderdash", "Tzolk'in", "Suburbia", "Dutch Blitz", "Spyfall", "Double Feature", "Wits and Wagers", "Say Anything", "Discworld: Ankh-Morpork", "Kingsport Festival", "Pitchcar", "Galaxy Trucker", "Gravwell", "Zombie 15'", "Puerto Rico", "Volt: Robot Battle Arena", "Werewolf", "Kaosball", "Jamaica", "Run Fight or Die", "Roll for the Galaxy", "Mascarade", "Monopoly Deal", "Flick'em Up", "Apples to Apples", "Mission: Red Planet", "Spoons", "Taboo", "Huggermugger", "Fluxx", "Boggle", "True Colors", "For Sale", "Scattergories", "Like Minds", "Pit"],
//     "series": [
//         [826, 680, 668, 591, 529, 502, 452, 446, 439, 424, 411, 373, 373, 333, 288, 263, 253, 252, 244, 234, 232, 222, 215, 196, 189, 188, 187, 187, 185, 185, 176, 175, 157, 150, 150, 146, 139, 137, 133, 127, 126, 123, 121, 120, 117, 115, 114, 113, 111, 110, 109, 108, 107, 105, 103, 103, 99, 99, 92, 88, 85, 83, 73, 71, 70, 61, 61, 60, 59, 56, 52, 47, 47, 46, 40, 40, 35, 34, 34, 32, 30, 15, 14]
//     ]
// }

// game_stats['played-by-player-count'] = {}
// game_stats['played-by-player-count']['labels'] = 2.upto(player_count.count - 1).to_a.map{|num| num.to_s}
// game_stats['played-by-player-count']['series'] = Array.new(1) { player_count.compact }

