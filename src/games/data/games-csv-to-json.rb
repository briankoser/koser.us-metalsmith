require 'csv'
require 'json'

def create_file(data, dest)
    File.open(dest, 'w') {|f| f.write(data) }
end

csv_text = File.read('games-played-2015.csv')
csv = CSV.parse(csv_text, :headers => true)
games_played_total = 0
minutes_total = 0
h_index = 0
longest_game = {}
shortest_game = {}
games_played_by_count = {}
games_played_by_minutes = {}
games_played_by_day = []
games_played_by_month = Array.new(12, 0)
player_count = []
games = {}

csv.each do |row|
  game = row.to_hash
  games_played_total += 1
  minutes = game['Duration'].to_i
  minutes_total += minutes
  players = game['Players'].split(',')
  name = game['Name'].strip
  
  if longest_game.empty? || minutes > longest_game['Duration'].to_i
    longest_game = game
  end
  
  if shortest_game.empty? || minutes < shortest_game['Duration'].to_i
    shortest_game = game
  end
  
  date = DateTime.strptime(game['Date'], '%m/%d/%Y')
  
  if games_played_by_month[date.month - 1] == nil
    games_played_by_month[date.month - 1] = 0;
  end
  games_played_by_month[date.month - 1] += 1;
  
  if games_played_by_day[date.wday] == nil
    games_played_by_day[date.wday] = 0;
  end
  games_played_by_day[date.wday] += 1;
  
  if player_count[players.length] == nil
    player_count[players.length] = 0;
  end
  player_count[players.length] += 1;
  
  if games[name] == nil
    games[name] = []
  end
  games[name].push(game)
end

games.each do |name, game|
    games_played_by_count[name] = game.length
end

games.each do |name, game|
    games_played_by_minutes[name] = game.map{|x| x['Duration'].to_i}.reduce{|sum, x| sum + x}
end

games.each do |name, game|
    
end

h_index = games_played_by_count
            .sort_by{|key, value| -value}
            .each_with_index
            .map{|game, index| game[1] >= (index + 1)}
            .count(true)

game_stats = {}
game_stats['total-played'] = games_played_total
game_stats['minutes-played'] = minutes_total
game_stats['longest'] = longest_game
game_stats['shortest'] = shortest_game
game_stats['hindex'] = h_index

game_stats['played-by-month'] = {}
game_stats['played-by-month']['labels'] = Date::ABBR_MONTHNAMES.compact
game_stats['played-by-month']['series'] = Array.new(1) { games_played_by_month }
game_stats['played-by-day'] = {}
game_stats['played-by-day']['labels'] = Date::ABBR_DAYNAMES.compact
game_stats['played-by-day']['series'] = Array.new(1) { games_played_by_day }
game_stats['played-by-player-count'] = {}
game_stats['played-by-player-count']['labels'] = 2.upto(player_count.count - 1).to_a.map{|num| num.to_s}
game_stats['played-by-player-count']['series'] = Array.new(1) { player_count.compact }

sorted = games_played_by_count.sort_by{|key, value| -value}
game_stats['listed-by-total-played'] = {}
game_stats['listed-by-total-played']['labels'] = sorted.map{|key, value| key}
game_stats['listed-by-total-played']['series'] = Array.new(1) { sorted.map{|key, value| value} }

sorted = games_played_by_minutes.sort_by{|key, value| -value}
game_stats['listed-by-minutes'] = {}
game_stats['listed-by-minutes']['labels'] = sorted.map{|key, value| key}
game_stats['listed-by-minutes']['series'] = Array.new(1) { sorted.map{|key, value| value} }

print game_stats
json_object = JSON.generate game_stats
create_file json_object, 'games-played-2015.json'