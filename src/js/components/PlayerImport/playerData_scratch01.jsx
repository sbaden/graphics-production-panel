   
var players = [];

var rosterURL = "http://feeds.nfl.com/feeds-rs/roster/";
var headshotURL = "http://www.nfl.com/static/content/public/static/img/fantasy/transparent/512x512/";

var requests = $.when.apply(null, teamCollection.map(function(team) {
    return $.ajax({
        url: rosterURL + team + ".json",
        type: 'GET',
        success: function(response){
            processPlayerNames(response, players);
        },
    });
}));

requests.then(function(){
    var numPlayers = function(){
        var playerCount = 0;
        for(var player in players){
            playerCount++;
        }
        return playerCount;
    }

    
    var allFirstNameFreqs = getAllFreqs(players, 'first');   // returns an obj (charCount: frequency)
    var allLastNameFreqs = getAllFreqs(players, 'last');   // returns an obj (charCount: frequency)
    var freqReportFirst = buildFreqReport(numPlayers, allFirstNameFreqs, maxBarHeight);     // returns array of objs
    var freqReportLast = buildFreqReport(numPlayers, allLastNameFreqs, maxBarHeight);     // returns array of objs
    var firstName90Percent = get90PercentPlayers(freqReportFirst);
    var lastName90Percent = get90PercentPlayers(freqReportLast);
    var plyr90Percent = getSampleName(players, firstName90Percent, lastName90Percent);
        
    var plyr90PercentName = plyr90Percent.firstName + ' ' + plyr90Percent.lastName,
    var plyr90HS = headshotURL + plyr90Percent.id + '.png',
    var plyr90Team = plyr90Percent.team,
    var plyr90Pos = plyr90Percent.pos

    var readyTemplate = template(report);
    $('body').append(readyTemplate);
    console.log('Complete');
},
function(response){  // Handle errors
    console.log(response);
});




function processPlayerNames(data, players){
    var jsonData = data.teamPlayers;

    for (var key in jsonData) {
        var player = {
            name: {
                first: jsonData[key].firstName,
                last: jsonData[key].lastName,
            },
            status: jsonData[key].status,
            id: jsonData[key].esbId,
            pos: jsonData[key].position,
            team: jsonData[key].teamFullName
        };

        if (player.status == "ACT"){ // ACT = ACTIVE,  RES = INJURED/RESERVE, 
            players.push(player); 
        }      
    }
    // return players;
}


function getAllFreqs(players, mySwitch){
    var freqArray = new Array();
    var freqObj = new Object();

    for(var player in players){
        if(mySwitch === 'first'){
            freqArray.push(players[player].name.first.length);
        }
        else {
            freqArray.push(players[player].name.last.length);
        }
    }


    freqArray.sort(function(a,b){return a-b});
    
    for(var i = 0; i < freqArray.length; i++){
        var num = freqArray[i];
        freqObj[num] = freqObj[num] ? freqObj[num]+1 : 1;
    }
    return freqObj;
}


function buildFreqReport(numPlayers, names, maxBarHeight){  // names is an obj w/ key/value pairs (charCount: frequency)
    var largestValue = findLargest(names);
    var count = 0;
    var freqReport = new Array();

    for (key in names){
        var obj = new Object();

        key = Number(key);  // Convert key ("2") to number (2)
        count += names[key];
        var playerPercent = Number((count/numPlayers)*100).toFixed(2);

        obj.x = key;
        obj.y = Math.ceil((names[key] * maxBarHeight) / largestValue);  // set ratio
        obj.yLabel = names[key];
        obj.percentLabel = playerPercent;
        obj.numPlayers = count;
        freqReport.push(obj);
    }
    return freqReport;
}


function findLargest(log){
    var largestValue = 0;

    for (key in log){  // Determine the largest value in the bar log
        if (log[key] > largestValue) { largestValue = log[key]; }
    }
    return largestValue;
}


function get90PercentPlayers(array) {
    for(item in array){
        if(array[item].percentLabel >= 90){
            console.log(array[item].percentLabel);
            return array[item].x;
        }
    }
}


function getSampleName(players, firstCount, lastCount){
    var samplePlayer = {}

    for (var player in players) {
        if (players[player].name.first.length === firstCount && players[player].name.last.length === lastCount){
            samplePlayer.firstName = players[player].name.first;
            samplePlayer.lastName = players[player].name.last;
            samplePlayer.id = players[player].id;
            samplePlayer.pos = players[player].pos;
            samplePlayer.team = players[player].team;
            console.log(samplePlayer);

            return samplePlayer;
        }
    }
}


