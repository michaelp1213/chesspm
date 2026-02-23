
var clickedViewGame = 0;
var refgridt;
// { name: "Country", type: "select", items: countries, valueField: "Id", textField: "Name" },
var TournStatus = [
  { Name: "NotSet", Id: 0 },
{ Name: "Active", Id: 1 },
{ Name: "Stopped", Id: 2 },
{ Name: "Paused", Id: 3 },
{ Name: "Finished", Id: 4 },

{ Name: "Preparing", Id: 5 },
{ Name: "Started", Id: 6 },
{ Name: "StartNoRestore", Id: 60 }, // after prepare better here
{ Name: "CantInviteBadState", Id: 7 },
{ Name: "SeekForPlayers", Id: 8 },
{ Name: "FoundPlayers", Id: 9 },
{ Name: "PlayersError", Id: 10 },
{ Name: "Sheduled", Id: 11 },
{ Name: "Forgot", Id: 14 },
{ Name: "RestoreNeeded", Id: 18 },
{ Name: "RestoringNow", Id: 28 },


// next 2 users cannot see

{ Name: "Init", Id: 20 },
{ Name: "NotExists", Id: 30 }
];

var logTypes = [
    { Name: "", Id: 0 },
{ Name: "Debug", Id: 1 },
{ Name: "Info", Id: 2 },
{ Name: "Warn", Id: 3 },
{ Name: "Error", Id: 4 }
];

var manageTypes = [
    { Name: "", Id: 0 },
{ Name: "Auto", Id: 1 },
{ Name: "En1", Id: 2 },
{ Name: "En2", Id: 3 },
{ Name: "Man", Id: 4 },
 ];

var gResults = [
{ Name: "Unknown", Id: 0 },
{ Name: "White won", Id: 1 },
{ Name: "Black won", Id: 2 },
{ Name: "Draw", Id: 3 }
];
var resTypes = [
{ Name: "notfinished", Id: 0 },
    
{ Name: "mate", Id: 2 },
{ Name: "resign", Id: 3 },
{ Name: "time", Id: 4 },
{ Name: "stalemate", Id: 5 },
{ Name: "repetition", Id: 6 },
{ Name: "nomaterial", Id: 7 },
{ Name: "otherdraw", Id: 8 },
{ Name: "agreement", Id: 9 },
{ Name: "disconnect", Id: 10 },
{ Name: "byengine", Id: 15 },
{ Name: "toomuchmoves", Id: 19 },

{ Name: "evaluation", Id: 20 },
{ Name: "fiftymoves", Id: 50 },
 { Name: "technical", Id: 60 },
  { Name: "oddswisswin", Id: 61 },  // in swiss free round win
   { Name: "notappeared", Id: 62 },
];

var tournTypes = [
{ Name: "notset", Id: 0 },

{ Name: "engines", Id: 1 },
{ Name: "humans", Id: 2 },
{ Name: "simul", Id: 3 },

];


var gameTypes = [
{ Name: "", Id: 0 },
{ Name: "Game", Id: 1 },
{ Name: "Problem", Id: 2 },
{ Name: "Find move", Id: 6 },
{ Name: "Analys", Id: 7 },
{ Name: "Simul", Id: 5 },
{ Name: "Ponder", Id: 8 },
];

var connTypes = [
  { Name: "NotConnected", Id: 0 },
{ Name: "Connected", Id: 1 },
{ Name: "Disconnecting", Id: 2 },
{ Name: "Disconnected", Id: 100 },
];

var GPTypes = [
{ Name: "Zero Status", Id: 0 },
  { Name: "Ready (1)", Id: 1 },
  { Name: "Analysis (3)", Id: 3 },
{ Name: "View Games (4)", Id: 4 },
 { Name: "Simultan (5)", Id: 5 },
 { Name: "View 4 (104)", Id: 104 },
 // { Name: "No active Tournament", Id: 41 },
  { Name: "Play Tourn Free (40)", Id: 40 },
  { Name: "Play Tourn (41)", Id: 41 },
   { Name: "View Hum.Tourn (141)", Id: 141 },
 { Name: "View Eng.Tourn (44)", Id: 44 },
{ Name: "Move Analys (6)", Id: 6 },
{ Name: "Full Analys (7)", Id: 7 },
{ Name: "Seek game (11)", Id: 11 },
{ Name: "Disconnect (100)", Id: 100 },
{ Name: "State 92", Id: 92 },
{ Name: "State 93", Id: 93 },
{ Name: "State 94", Id: 94 },
{ Name: "State 95", Id: 95 },

{ Name: "Teacher 51", Id: 51 },
{ Name: "Teacher 52", Id: 52 },
{ Name: "Problem Solving", Id: 2 },
 
{ Name: "Group", Id: 12 },
{ Name: "Book 20", Id: 20 },
{ Name: "Book 21", Id: 21 },
{ Name: "Book 22", Id: 22 },
{ Name: "Book 23", Id: 23 },
{ Name: "Book 24", Id: 24 },
{ Name: "Book 25", Id: 25 },
{ Name: "Book 26", Id: 26 },
{ Name: "Book 27", Id: 27 },
{ Name: "Book 28", Id: 28 },
{ Name: "Book 29", Id: 29 },
];

var eGameStates = [
{ Name: "NoState", Id: 0 },
{ Name: "NotForGame", Id: 1 },
{ Name: "Bad Ename", Id: 2 },
{ Name: "WaitForGame", Id: 9 },
{ Name: "InGame", Id: 10 },
{ Name: "InSimultaneous", Id: 15 },
{ Name: "ProcessFinished", Id: 98 },
{ Name: "ErrorStartProcess", Id: 99 },
{ Name: "ProcessError", Id: 98 },
{ Name: "RemoteDisconnected", Id: 100 }
];

var countries = [
{ Name: "", Id: 0 },
{ Name: "United States", Id: 1 },
{ Name: "Canada", Id: 2 },
{ Name: "United Kingdom", Id: 3 }
];

if (Modernizr.touch) {
    $('.hasDropDown').click(function () {
        $(this).find('.drop').addClass('visible');

    });
}
$('.drop').click(function () {
    $('.drop').hide();
});

setFenAndColor = function (obj, resscore, fen, wb, wTime, bTime,wscore,bscore) {
    board2.setFen(fen);
    var top =190;
    if(wb==2)
        top = 10;
    var score = 0;
    if (wscore && bscore)
      score=(wscore+bscore)/2.0;
    $('#PlayerWhiteBlackInMoveImg').css('padding-top', top);
    if (wTime)
        $('#wTime').html(wTime);
    else $('#wTime').html('');
    if (bTime)
        $('#bTime').html(bTime);
    else $('#bTime').html('');
    nameW = obj.WhiteName; nameB = obj.BlackNme;
    if (obj.WhiteEName && obj.WhiteEName != '') nameW = obj.WhiteEName;
    if (obj.BlackEName && obj.BlackEName != '') nameB = obj.BlackEName;
    var dst = nameW + '-' + nameB;
    if (resscore==2)
        dst += '<br>Score: ' + (score / 100.0) + ' &nbsp;HMove: ' + obj.movenum;
    else if (resscore == 1) {
        var res1 = getRes(parseInt(obj.result));
        var opp = '';
        if (obj.result == '1') opp = 'Black '; else if (obj.result == '2') opp = 'White ';
        dst += '<br>Result: ' + res1 + ' &nbsp;' + getResType(obj.restype, opp);
        if (obj.restype == 20) dst += ' ' + (score / 100.0);
    }
    $('#downBoard').html(dst);
    
}
$(document).ready(function () {
    // loadGame();
    // getUsersList();
    // getEnginesList();
    // getTournList();
    // getLastTournament();
    // getLogs();
    //var MyDateField = function (config) {
    //    jsGrid.Field.call(this, config);
    //};
    InitGridCustomFields();
    function InitGridCustomFields() {
             

        var jsGridCustomCurrencyField = function (config) {
            jsGrid.Field.call(this, config);
        };

        jsGridCustomCurrencyField.prototype = new jsGrid.Field({
                    
            itemTemplate: function (value) {
                return parseFloat(value).toFixed(2);
            },
                  
                    
        });

        jsGrid.fields.customCurrencyField = jsGridCustomCurrencyField;
    }
    //MyDateField.prototype = new jsGrid.Field({

    //    css: "date-field",            // redefine general property 'css'
    //    align: "center",              // redefine general property 'align'

    //    myCustomProperty: "foo",      // custom property

    //    sorter: function (date1, date2) {
    //        return new Date(date1) - new Date(date2);
    //    },

    //    itemTemplate: function (value) {
    //        return new Date(value).toDateString();
    //    },

    //    //insertTemplate: function (value) {
    //    //    return this._insertPicker = $("<input>").datepicker({ defaultDate: new Date() });
    //    //},

    //    editTemplate: function (value) {
    //        return this._editPicker = $("<input>").datepicker().datepicker("setDate", new Date(value));
    //    },

    //    insertValue: function () {
    //        return this._insertPicker.datepicker("getDate").toISOString();
    //    },

    //    editValue: function () {
    //        return this._editPicker.datepicker("getDate").toISOString();
    //    }
    //});

    //jsGrid.fields.date = MyDateField;
  
});

         
function showGame(id, histplay,score) {
    //var url = window.location.href;
    var newpage = "../PgnViewer.htm?lt=12&play=2&pos=topbrd&fn=&gn=" + id + "&src=" + histplay + "&score=" + score;
    //location.href = newpage;
    window.open(newpage);
    //getHistoryGame(id);
}
function getHistoryGame(gn) {
            
    var LastPgn = '';
    if (refgridt) clearTimeout(refgridt);
    var fname = '';
    servName = 'GetGameFromHistoryPgn';
    $.ajax({
        type: "POST",
        url: "../ws/ViewService.asmx/" + servName,
        data: "{'id': '" + gn + "'}",
        //data: "{'fn':'" + fname + "', 'gamenum': '" + gn + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var game = JSON.parse(data.d);


            LastPgn = game.GamePGN;
            bootbox. alert(LastPgn);
            var x = 1;

        },
        error: function (result) {
            tempdata = null;

        }
    });
}
function getPlayinGame(gn) {

    var LastPgn = '';
    if (refgridt) clearTimeout(refgridt);
    var fname = '';
    servName = 'GetGameFromPlayingPgn';
    $.ajax({
        type: "POST",
        url: "../ws/ViewService.asmx/" + servName,
        data: "{'id': '" + gn + "'}",
        //data: "{'fn':'" + fname + "', 'gamenum': '" + gn + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var game = JSON.parse(data.d);


          LastPgn = game.GamePGN;
          LastKeys = game.keys;
            bootbox.alert(LastPgn);
            var x = 1;

        },
        error: function (result) {
            tempdata = null;

        }
    });
}
function loadGame() {
    gn = 1;
    var LastPgn = ''; 
    if (refgridt) clearTimeout(refgridt);
    servName = 'GetGameFromChessDbPgn';
    $.ajax({
        type: "POST",
        url: "../ws/ViewService.asmx/" + servName,
        data: "{'id': '" + gn + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var game = JSON.parse(data.d);
                    

          LastPgn = game.GamePGN;
          LastKeys = game.keys;
            var x = 1;
                    
        },
        error: function (result) {
            tempdata = null;

        }
    });
}

function getParticipants() {
    var tid = $("#TournId1").val();
    if (!tid) tid = '';
    var LastPgn = '';
    if (refgridt) clearTimeout(refgridt);
    servName = 'GetTournParticipants';
    $.ajax({
        type: "POST",
        url: "../ws/ViewService.asmx/" + servName,
        data: "{'id': '" + tid + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var users = JSON.parse(data.d);
            var x = 1;

            $("#jsGrid").jsGrid({
                width: "100%",
                height: "480px",
               
                inserting: false,
                editing: false,
                sorting: true,
                paging: false,
                pageSize: 10,
                selecting: true,
                data: users,

                fields: [
                    { name: "Name", type: "text", width: 80, validate: "required" },
                     { name: "dName", type: "text", title: "dName", sorting: false, width: 110 },
                       { name: "Elo", title: "Elo", type: "number", width: 60 },
                     { name: "ConnectionStatus", title: "Conn Status", type: "select", items: connTypes, valueField: "Id", textField: "Name", width: 90, align: "center" },

                     { name: "GameProblemType", title: "GameTourn Type", type: "select", items: GPTypes, valueField: "Id", textField: "Name", width: 110, align: "center" },

                       { name: "tournId", title: "Tourn Id", type: "number", width: 60 },
                          { name: "convnum", title: "conv num", type: "number", width: 50 },
                          { name: "PingFromClientTimeStr", title: "Client Ping time", type: "text", width: 90 },
                         { name: "PingFromServerTimeStr", title: "Server Ping time", type: "text", width: 90 } ,
                    
 
                   // { name: "IP", type: "text", title: "IP", sorting: false, width: 80 },
                    // { name: "ConnectionId", type: "text", title: "ConnectionId", sorting: false, width: 200 },
                    //  { name: "tempUser", title: "Temp", type: "checkbox", width: 50 },
                      
                ],
                rowClick: function (args) {
                    console.log(args);

                    var getData = args.item;
                    var keys = Object.keys(getData);
                    var text = [];

                    $.each(keys, function (idx, value) {
                        if (value == 'Name') {
                            $("#UserName").val(getData[value]);
                        }
                        text.push(value + " : " + getData[value])

                    });

                    $("#label").text(text.join(", "))
                }
            });
            if (refgridt) clearTimeout(refgridt);
            if (!Modernizr.touch)
                refgridt = setTimeout(function () {
                    getParticipants();
                }, 60000);

        },
        error: function (result) {

            if (refgridt) clearTimeout(refgridt);
            if (!Modernizr.touch)
                refgridt = setTimeout(function () {
                    getParticipants();
                }, 60000);
        }
    });
}
        
function getHumansList() {
    gn = 1;
    var LastPgn = '';
    if (refgridt) clearTimeout(refgridt);
    servName = 'GetHumansList';
    $.ajax({
        type: "POST",
        url: "../ws/ViewService.asmx/" + servName,
        data: "{'id': '" + gn + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var users = JSON.parse(data.d);
            var x = 1;

            $("#jsGrid").jsGrid({
                width: "100%",
                height: "480px",

                inserting: false,
                editing: false,
                sorting: true,
                paging: false,
                pageSize: 10,
                selecting: true,
                data: users,

                fields: [
                    { name: "Name", type: "text", width: 120, validate: "required" },
                            
                     { name: "ConnectionStatus", title: "Conn Status", type: "select", items: connTypes, valueField: "Id", textField: "Name", width: 90, align: "center" },
                            
                     { name: "GameProblemType", title: "GameTourn Type", type: "select", items: GPTypes, valueField: "Id", textField: "Name", width: 110, align: "center" },
                       { name: "tournId", title: "Tourn Id", type: "number", width: 50 },
                    // { name: "LocalState", title: "LocalState", type: "select", items: GPTypes, valueField: "Id", textField: "Name", width: 90, align: "center" },
                     { name: "dName", type: "text", title: "dnm", sorting: false, width: 25 },
                       { name: "groupid", type: "text", title: "Gro up", width: 50, },
                         { name: "convnum", title: "conv num", type: "number", width: 50 },
                           { name: "wb", title: "WB", type: "number", width: 50 },

                     { name: "busy", title: "Busy", type: "checkbox", width: 50 },
                    { name: "IP", type: "text", title: "IP", sorting: false, width: 80 },
                     { name: "ConnectionId", type: "text", title: "ConnectionId", sorting: false, width: 200 },
                      { name: "tempUser", title: "Temp", type: "checkbox", width: 50 },
                     //ConnectionStatusTime
                ],
                rowClick: function (args) {
                    console.log(args);

                    var getData = args.item;
                    var keys = Object.keys(getData);
                    var text = [];

                    $.each(keys, function (idx, value) {
                        if (value == 'Name') {
                            $("#UserName").val(getData[value]);                                   
                        }
                        text.push(value + " : " + getData[value])

                    });

                    $("#label").text(text.join(", "))
                }
            });
            if (refgridt) clearTimeout(refgridt);
            if (!Modernizr.touch)
                refgridt = setTimeout(getHumansList, 4000);

        },
        error: function (result) {

            if (refgridt) clearTimeout(refgridt);
            if (!Modernizr.touch)
                refgridt = setTimeout(getHumansList, 4000);
        }
    });
}
function getUsersList() {
    gn = 1;
    var LastPgn = '';
    if (refgridt) clearTimeout(refgridt);
    servName = 'GetUsersList';
    $.ajax({
        type: "POST",
        url: "../ws/ViewService.asmx/" + servName,
        data: "{'id': '" + gn + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var users = JSON.parse(data.d);
            var x = 1;
     
            $("#jsGrid").jsGrid({
                width: "100%",
                height: "480px",

                inserting: false,
                editing: false,
                sorting: true,
                paging: false,
                pageSize: 10,
                selecting: true,
                data: users,

                fields: [
                    { name: "Name", type: "text", width: 150, validate: "required" },
                    { name: "isComp", title: "Comp", type: "checkbox", width: 50 },
                    { name: "isRemote", title: "Remote", type: "checkbox", width: 50 },
                     { name: "Level", title: "Lev el", type: "number", width: 40 },
                    //{ name: "ConnectionStatus", title: "CStatus", type: "number", width: 100 },
                            
                    //{ name: "GameProblemType", title: "GPT", type: "number", width: 100, align: "center" },
                     { name: "GameProblemType", title: "GPType", type: "select", items: GPTypes, valueField: "Id", textField: "Name", width: 110, align: "center" },
                     { name: "tournId", title: "Tourn Id", type: "number", width: 50 },
                     { name: "dName", type: "text", title: "dnm", sorting: false, width: 25 },

                       { name: "convnum", title: "Game Num", type: "number", width: 50 },
                         { name: "wb", title: "WB", type: "number", width: 50 },

                     // { name: "LocalState", title: "LocalState", type: "select", items: GPTypes, valueField: "Id", textField: "Name", width: 90, align: "center" },
                        { name: "groupid", type: "text", title: "Gro up", width: 50, },

                       { name: "StatusSynchronized", title: "Sta Syn", type: "checkbox", width: 40 },

                         { name: "isThinking", title: "Think ing", type: "checkbox", width: 50 },
                               
                        { name: "ConnectionStatus", title: "CStatus", type: "select", items: connTypes, valueField: "Id", textField: "Name", width: 100, align: "center" },

                         { name: "PingFromClientTimeStr", title: "Client Ping time", type: "text", width: 90 },
                         { name: "PingFromServerTimeStr", title: "Server Ping time", type: "text", width: 90 },
                         { name: "BadConnFromServerTimeStr", title: "Bad conn time", type: "text", width: 90 },
                                 
                       // ConnectionStatusTime = userPing  also PingFromClientTime
                               

                     { name: "busy", title: "Busy", type: "checkbox", width: 50 },
                    { name: "IP", type: "text", title: "IP", sorting: false, width: 150 },
                    { name: "eName", type: "text", title: "eName", sorting: false, width: 150 },
                         
                ],
                rowClick: function (args) {
                    console.log(args);

                    var getData = args.item;
                    var keys = Object.keys(getData);
                    var text = [];

                    $.each(keys, function (idx, value) {
                        if (value == 'Name') {
                            $("#UserName").val(getData[value]);
                        }
                        text.push(value + " : " + getData[value])

                    });

                    $("#label").text(text.join(", "))
                }
            });
            if (refgridt) clearTimeout(refgridt);
            if (!Modernizr.touch)
                refgridt = setTimeout(getUsersList, 4000);

        },
        error: function (result) {
                    
            if (refgridt) clearTimeout(refgridt);
            if (!Modernizr.touch)
                refgridt = setTimeout(getUsersList, 4000);
        }
    });
}

        

function getDiscoEnginesList() {
    if (refgridt) clearTimeout(refgridt);
    gn = 1;
    var LastPgn = '';
    servName = 'GetDiscoEnginesList';
    $.ajax({
        type: "POST",
        url: "../ws/ViewService.asmx/" + servName,
        data: "{'id': '" + gn + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var users = JSON.parse(data.d);
            $("#jsGrid").jsGrid({
                width: "100%",
                height: "480px",

                inserting: false,
                editing: false,
                sorting: true,
                paging: false,
                pageSize: 10,
                selecting: true,
                data: users,

                fields: [
                    { name: "Name", type: "text", width: 140, validate: "required" },
                    //{ name: "isComp", title: "Comp", type: "checkbox", width: 50 },
                    //{ name: "isRemote", title: "Rem", type: "checkbox", width: 50 },
                    //{ name: "ConnectionStatus", title: "ConStat", type: "number", width: 70, align: "center" },
                     { name: "ConnectionStatus", title: "CStatus", type: "select", items: connTypes, valueField: "Id", textField: "Name", width: 100, align: "center" },
                      { name: "ConnectionStatusTimeStr", title: "Status time", type: "text", width: 110 },
                               { name: "Level", title: "Lev el", type: "number", width: 40 },

                      // { name: "eGameState", title: "GState", type: "number", width: 70, align: "center" },
             //   { name: "eGameState", title: "GState", type: "select", items: eGameStates, valueField: "Id", textField: "Name", width: 90, align: "center" },


                    //{ name: "GameProblemType", title: "GPType", type: "number", width: 70, align: "center" },
                    { name: "GameProblemType", title: "GPType", type: "select", items: GPTypes, valueField: "Id", textField: "Name", width: 110, align: "center" },

                    { name: "convnum", title: "Game", type: "number", width: 70, align: "center" },
                     { name: "StatusSynchronized", title: "Sta Syn", type: "checkbox", width: 40 },

                { name: "engineStopped", title: "Stopped", type: "checkbox", width: 50 },
                        { name: "inTourn", title: "Tou rn", type: "checkbox", width: 50 },
              { name: "tournId", title: "Tid", type: "number", width: 60, align: "center" },


                    { name: "eName", type: "text", title: "eName", sorting: false, width: 130 },
                    { name: "dName", type: "text", title: "dName", sorting: false, width: 130 },
                     { name: "eGroup", type: "text", title: "eGroup", sorting: false, width: 70 },



                    //  { name: "CanBeInvited", title: "Invit", type: "checkbox", width: 50 },

                //{ name: "busy", title: "Busy", type: "checkbox", width: 50 },
                   // { name: "IP", type: "text", title: "IP", sorting: false, width: 90 },







                     { name: "remoteConnectionId", title: "Rem ConnId", type: "number", width: 60 },

            // { name: "Elo", title: "Elo", type: "number", width: 100 },

                      
                ],
                rowClick: function (args) {
                    console.log(args);

                    var getData = args.item;
                    var keys = Object.keys(getData);
                    var text = [];

                    $.each(keys, function (idx, value) {
                        if (value == 'Name') {
                            $("#UserName").val(getData[value]);
                        }
                        text.push(value + " : " + getData[value])

                    });

                    $("#label").text(text.join(", "))
                }

            });
            if (refgridt) clearTimeout(refgridt);
            if (!Modernizr.touch)
                refgridt = setTimeout(getDiscoEnginesList, 6000);
        },
        error: function (result) {
            //tempdata = null;
            if (refgridt) clearTimeout(refgridt);
            if (!Modernizr.touch)
                refgridt = setTimeout(getDiscoEnginesList, 6000);
        }
    });
}
function getEnginesList() {
    if (refgridt) clearTimeout(refgridt);
    gn = 1;
    var LastPgn = '';
    servName = 'GetEnginesList';
    $.ajax({
        type: "POST",
        url: "../ws/ViewService.asmx/" + servName,
        data: "{'id': '" + gn + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var users = JSON.parse(data.d);
            $("#jsGrid").jsGrid({
                width: "100%",
                height: "480px",

                inserting: false,
                editing: false,
                sorting: true,
                paging: false,
                pageSize: 10,
                selecting: true,
                data: users,

                fields: [
                    { name: "Name", type: "text", width: 110, validate: "required" },
                    { name: "isComp", title: "Co mp", type: "checkbox", width: 40 },
                    { name: "isRemote", title: "Rem", type: "checkbox", width: 40 },
                       { name: "Level", title: "Lev el", type: "number", width: 40 },
                    { name: "eName", type: "text", title: "eName", sorting: false, width: 110 },
                    { name: "dName", type: "text", title: "dName", sorting: false, width: 120 },
                   
                    //{ name: "ConnectionStatus", title: "ConStat", type: "number", width: 70, align: "center" },
                     { name: "ConnectionStatus", title: "CStatus", type: "select", items: connTypes, valueField: "Id", textField: "Name", width: 100, align: "center" },

                      // { name: "eGameState", title: "GState", type: "number", width: 70, align: "center" },
               // { name: "eGameState", title: "GState", type: "select", items: eGameStates, valueField: "Id", textField: "Name", width: 90, align: "center" },


                    //{ name: "GameProblemType", title: "GPType", type: "number", width: 70, align: "center" },
                    { name: "GameProblemType", title: "GPType", type: "select", items: GPTypes, valueField: "Id", textField: "Name", width: 110, align: "center" },
                      { name: "tournId", title: "Tourn Id", type: "number", width: 50 },

                    { name: "convnum", title: "Game", type: "number", width: 60, align: "center" },
                     { name: "isThinking", title: "Th ink", type: "checkbox", width: 40 },
                     { name: "StatusSynchronized", title: "Sta Syn", type: "checkbox", width: 40 },
                             
                            
                { name: "engineStopped", title: "Stop ped", type: "checkbox", width: 40 },
                        { name: "inTourn", title: "Tou rn", type: "checkbox", width: 50 },
              { name: "tournId", title: "Tid", type: "number", width: 50, align: "center" },

                 
                     { name: "eGroup", type: "text", title: "Group", sorting: false, width: 50 },
                            
                     { name: "remoteConnectionId", title: "Rem ConnId", type: "number", width: 60 },


                      { name: "CanBeInvited", title: "Invit", type: "checkbox", width: 50 },
                            
                { name: "busy", title: "Busy", type: "checkbox", width: 50 },
                    { name: "IP", type: "text", title: "IP", sorting: false, width: 90 },
                     
                            
                
                            
 


                            
                    
             { name: "Elo", title: "Elo", type: "number", width: 100 },


                        
                ],
                rowClick: function (args) {
                    console.log(args);

                    var getData = args.item;
                    var keys = Object.keys(getData);
                    var text = [];

                    $.each(keys, function (idx, value) {
                        if (value == 'Name') {
                            $("#UserName").val(getData[value]);
                        }
                        text.push(value + " : " + getData[value])

                    });

                    $("#label").text(text.join(", "))
                }

            });
            if (refgridt) clearTimeout(refgridt);
            if (!Modernizr.touch)
                refgridt = setTimeout(getEnginesList, 4000);
        },
        error: function (result) {
            //tempdata = null;
            if (refgridt) clearTimeout(refgridt);
            if (!Modernizr.touch)
                refgridt = setTimeout(getEnginesList, 4000);
        }
    });
}
//function format2AfterPoint(value) {
//    return   parseFloat(value).toFixed(2);  
//};

function getSheduledTournList() {
    gn = 1;
    var LastPgn = '';
    if (refgridt) clearTimeout(refgridt);
    servName = 'GetSheduledTournList';
    $.ajax({
        type: "POST",
        url: "../ws/ViewService.asmx/" + servName,
        data: "{'id': '" + gn + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var tourns = JSON.parse(data.d);
            var x = 1;
            $("#jsGrid").jsGrid({
                width: "100%",
                height: "480px",

                inserting: false,
                editing: false,
                sorting: true,
                paging: false,
                pageSize: 10,
                selecting: true,
                data: tourns,

                fields: [
                     { name: "TournId", title: "id", type: "number", width: 50, align: "center" },
                    { name: "Header", type: "text", width: 200, validate: "required" },
                    // { name: "tournStatus", title: "stat", type: "number", width: 50, align: "center" },
                     { name: "TourneyType", title: "Tourn type", type: "select", items: tournTypes, valueField: "Id", textField: "Name", width: 66, align: "center" },

                     { name: "tournStatus", title: "Status", type: "select", items: TournStatus, valueField: "Id", textField: "Name", width: 100, align: "center" },

                       { name: "TimeType", title: "Time", type: "text", sorting: false, width: 60 },
                     { name: "ManageType", title: "Status", type: "select", items: manageTypes, valueField: "Id", textField: "Name", width: 40, align: "center" },


                     { name: "MaxPlayingGames", title: "Max Games", type: "number", width: 50, align: "center" },
                      { name: "Replays", title: "Rep lays", type: "number", width: 50, align: "center" },
                      { name: "CurrentReplay", title: "Curr Repl", type: "number", width: 50, align: "center" },
                    
                      { name: "AllowParallel", title: "Allow Parall", type: "checkbox", width: 60 },
                       { name: "GroupStr", type: "text", title: "Gro ups", width: 50,  },
 

                     { name: "LastGameStartTimeStr", title: "Last Game start", type: "text", width: 110 },
                    { name: "LastGameCannotStartTimeStr", title: "Last Game bad start", type: "text", width: 110, validate: "required" },


                ],
                rowClick: function (args) {
                    console.log(args);

                    var getData = args.item;
                    setFenAndColor(getData,1, getData.Fen, getData.wbToMove);
                    var keys = Object.keys(getData);
                    var text = [];

                    $.each(keys, function (idx, value) {
                        if (value == 'Fen') {
                            board2.setFen(getData[value]);
                        }
                        text.push(value + " : " + getData[value])

                    });

                    $("#label").text(text.join(", "))
                }
            });
            if (refgridt) clearTimeout(refgridt);
            if (!Modernizr.touch)
                refgridt = setTimeout(getSheduledTournList, 7000);
        },
        error: function (result) {
            if (refgridt) clearTimeout(refgridt);
            if (!Modernizr.touch)
                refgridt = setTimeout(getSheduledTournList, 7000);

        }
    });
}

function getTournList() {
    gn = 1;
    var LastPgn = '';
    if (refgridt) clearTimeout(refgridt);
    servName = 'GetTournList';
    $.ajax({
        type: "POST",
        url: "../ws/ViewService.asmx/" + servName,
        data: "{'id': '" + gn + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var tourns = JSON.parse(data.d);
            var x = 1;
            $("#jsGrid").jsGrid({
                width: "100%",
                height: "480px",

                inserting: false,
                editing: false,
                sorting: true,
                paging: false,
                pageSize: 10,
                selecting: true,
                data: tourns,
                selecting: true,

                fields: [
                     { name: "TournId", title: "id", type: "number", width: 50, align: "center" },
                     { name: "Header", type: "text", width: 200, validate: "required" },                   

                     { name: "tournStatus", title: "Status", type: "select", items: TournStatus, valueField: "Id", textField: "Name", width: 100, align: "center" },
                     { name: "TourneyType", title: "Tourn type", type: "select", items: tournTypes, valueField: "Id", textField: "Name", width: 66, align: "center" },

                     { name: "TournRounds", title: "Total Rounds", type: "number", width: 50, align: "center" },
                     { name: "Replays", title: "Rep lays", type: "number", width: 50, align: "center" },
                     { name: "CurrentReplay", title: "Curr Repl", type: "number", width: 50, align: "center" },
                     { name: "TimeType", title: "Time", type: "text", sorting: false, width: 60 },
                     { name: "TimeTypeEng", title: "Time Eng", type: "text", sorting: false, width: 60 },
                     { name: "CurrentRound", title: "Curent Round", type: "number", width: 50, align: "center" },

                     { name: "NextRoundStartTimeIsManual", title: "Next Manual", type: "checkbox", width: 50 },
                     { name: "NextRoundStartTimeStr", title: "Manual Starttime", type: "text", width: 100 },

                     { name: "tournViewersCount", title: "View ers", type: "number", width: 50, align: "center" },
                     { name: "TournamentStartedTimeStr", title: "Tourn start", type: "text", width: 110 },

                     { name: "FinishedGames", title: "Ended Games", type: "number", width: 60, align: "center" },

                     { name: "ManageType", title: "Status", type: "select", items: manageTypes, valueField: "Id", textField: "Name", width: 40, align: "center" },

                     { name: "MaxPlayingGames", title: "Max Games", type: "number", width: 50, align: "center" },

                      //TournGames

                     { name: "AllowParallel", title: "Allow Parall", type: "checkbox", width: 60 },

                     { name: "StartedGameId", title: "Started Game", type: "number", width: 60, align: "center" },
                     { name: "GroupStr", type: "text", title: "Gro ups", width: 50, },

                     { name: "GamesWonWhite", title: "White Won", type: "number", width: 60, align: "center" },
                     { name: "GamesWonBlack", title: "Black Won", type: "number", width: 60, align: "center" },
                     { name: "WhiteProcent", title: "White %", type: "customCurrencyField", width: 70, align: "center" },

                     { name: "LastGameStartTimeStr", title: "Last Game start", type: "text", width: 110 },
                     { name: "LastGameCannotStartTimeStr", title: "Last Game bad start", type: "text", width: 110, validate: "required" },
                    

                     

                ],
                rowClick: function (args) {
                    console.log(args);
                    var getData = args.item;
                    setFenAndColor(getData, 0, getData.Fen, getData.wbToMove);
                    var keys = Object.keys(getData);
                    var text = [];
                    $.each(keys, function (idx, value) {
                        if (value == 'Fen') {
                            board2.setFen(getData[value]);
                        }
                        if (value == 'TournId') {
                            $("#TournId1").val(getData[value]);
                            $("#inputTournId").val(getData[value]);
                        }
                        if (value == 'UsersList') {
                            ulist = getData[value];
                        }
                        text.push(value + " : " + getData[value])

                    });

                    var txt1 = text.join(", ") + '<br/><br/>' + 'Users: ' + ulist;;
                    $("#label").html(txt1);
                }
            });
            if (refgridt) clearTimeout(refgridt);
            if (!Modernizr.touch)
                refgridt = setTimeout(getTournList, 7000);
        },
        error: function (result) {
            if (refgridt) clearTimeout(refgridt);
            if (!Modernizr.touch)
                refgridt = setTimeout(getTournList, 7000);

        }
    });
}


function getTournResultsFromMemory(lt) {
    //gn = 1;
    var LastPgn = '';
    if (refgridt) clearTimeout(refgridt);
    servName = 'GetTournResults';
    $.ajax({
        type: "POST",
        url: "../ws/ViewService.asmx/" + servName,
        data: "{'id': '" + lt + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var tourns = JSON.parse(data.d);
            var x = 1;
            $("#jsGrid").jsGrid({
                width: "100%",
                height: "480px",

                inserting: false,
                editing: false,
                sorting: true,
                paging: false,
                pageSize: 10,
                selecting: true,
                data: tourns,
                selecting: true,
                //  new{  i.OppWName, i.OppBName, i.User1IsW, i.LastResult, i.LastRestype, i.RoundNum , i.ReplayNum });
                fields: [
                     //{ name: "TournId", title: "id", type: "number", width: 50, align: "center" },
                     { name: "OppWName", title: "User Left", type: "text", width: 100, validate: "required" },
                      { name: "OppBName", title: "User Right", type: "text", width: 100, validate: "required" },
                      { name: "User1IsW", title: "User1 IsW", type: "number", width: 40, align: "center" },
                      { name: "LastResult", title: "Result", type: "select", items: gResults, valueField: "Id", textField: "Name", width: 80, align: "center" },
                      { name: "LastRestype", title: "Result type", type: "select", items: resTypes, valueField: "Id", textField: "Name", width: 70, align: "center" },

                   
                     { name: "RoundNum", title: "Round", type: "number", width: 50, align: "center" },
                     { name: "ReplayNum", title: "Rep lay", type: "number", width: 50, align: "center" },
                       { name: "resultStr", title: "Result by users(WB)",  type: "text", width: 100, validate: "required" },
               

                ],
                rowClick: function (args) {
                    console.log(args);
                    var getData = args.item;
                    setFenAndColor(getData, 0, getData.Fen, getData.wbToMove);
                    var keys = Object.keys(getData);
                    var text = [];
                    $.each(keys, function (idx, value) {
                        if (value == 'Fen') {
                            board2.setFen(getData[value]);
                        }
                        if (value == 'TournId') {
                            $("#TournId1").val(getData[value]);
                            $("#inputTournId").val(getData[value]);
                        }
                        if (value == 'UsersList') {
                            ulist = getData[value];
                        }
                        text.push(value + " : " + getData[value])

                    });

                    var txt1 = text.join(", ") + '<br/><br/>' + 'Users: ' + ulist;;
                    $("#label").html(txt1);
                }
            });
            if (refgridt) clearTimeout(refgridt);
            if (!Modernizr.touch)
                refgridt = setTimeout(function () {
                    getTournResultsFromMemory(lt);
                }, 5000);
        },
        error: function (result) {
            if (refgridt) clearTimeout(refgridt);
            if (!Modernizr.touch)
                refgridt = setTimeout(function () {
                    getTournResultsFromMemory(lt);
                }, 5000);

        }
    });
}

function getTournPairListFromMemory(lt) {
    //gn = 1;
    var LastPgn = '';
    if (refgridt) clearTimeout(refgridt);
    servName = 'GetTournPairs';
    $.ajax({
        type: "POST",
        url: "../ws/ViewService.asmx/" + servName,
        data: "{'id': '" + lt + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var tourns = JSON.parse(data.d);
            var x = 1;
            $("#jsGrid").jsGrid({
                width: "100%",
                height: "480px",

                inserting: false,
                editing: false,
                sorting: true,
                paging: false,
                pageSize: 10,
                selecting: true,
                data: tourns,
                selecting: true,
                //  new{  i.OppWName, i.OppBName, i.User1IsW, i.LastResult, i.LastRestype, i.RoundNum , i.ReplayNum });
                fields: [
                     //{ name: "TournId", title: "id", type: "number", width: 50, align: "center" },
                     { name: "OppWName", title: "User Left", type: "text", width: 100, validate: "required" },
                      { name: "OppBName", title: "User Right", type: "text", width: 100, validate: "required" },
                      //{ name: "User1IsW", title: "User1 IsW", type: "number", width: 40, align: "center" },
                      { name: "LastResult", title: "Result", type: "select", items: gResults, valueField: "Id", textField: "Name", width: 80, align: "center" },
                      { name: "LastRestype", title: "Result type", type: "select", items: resTypes, valueField: "Id", textField: "Name", width: 70, align: "center" },


                     { name: "RoundNum", title: "Round", type: "number", width: 50, align: "center" },
                     { name: "CurrentReplay", title: "Rep lay", type: "number", width: 50, align: "center" },
                     //  { name: "resultStr", title: "Result by users(WB)", type: "text", width: 100, validate: "required" },


                ],
                rowClick: function (args) {
                    console.log(args);
                    var getData = args.item;
                    setFenAndColor(getData, 0, getData.Fen, getData.wbToMove);
                    var keys = Object.keys(getData);
                    var text = [];
                    $.each(keys, function (idx, value) {
                        if (value == 'Fen') {
                            board2.setFen(getData[value]);
                        }
                        if (value == 'TournId') {
                            $("#TournId1").val(getData[value]);
                            $("#inputTournId").val(getData[value]);
                        }
                        if (value == 'UsersList') {
                            ulist = getData[value];
                        }
                        text.push(value + " : " + getData[value])

                    });

                    var txt1 = text.join(", ") + '<br/><br/>' + 'Users: ' + ulist;;
                    $("#label").html(txt1);
                }
            });
            if (refgridt) clearTimeout(refgridt);
            if (!Modernizr.touch)
                refgridt = setTimeout(function () {
                    getTournPairListFromMemory(lt);
                }, 5000);
        },
        error: function (result) {
            if (refgridt) clearTimeout(refgridt);
            if (!Modernizr.touch)
                refgridt = setTimeout(function () {
                    getTournPairListFromMemory(lt);
                }, 5000);

        }
    });
}


function getTournListFromMemory(lt) {
    //gn = 1;
    var LastPgn = '';
    if (refgridt) clearTimeout(refgridt);
    servName = 'GetTournListFromMemory';
    $.ajax({
        type: "POST",
        url: "../ws/ViewService.asmx/" + servName,
        data: "{'id': '" + lt + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var tourns = JSON.parse(data.d);
            var x = 1;
            $("#jsGrid").jsGrid({
                width: "100%",
                height: "480px",

                inserting: false,
                editing: false,
                sorting: true,
                paging: false,
                pageSize: 10,
                selecting: true,
                data: tourns,
                selecting: true,

                fields: [
                     { name: "TournId", title: "id", type: "number", width: 50, align: "center" },
                     { name: "Header", type: "text", width: 200, validate: "required" },

                     { name: "tournStatus", title: "Status", type: "select", items: TournStatus, valueField: "Id", textField: "Name", width: 100, align: "center" },
                     { name: "TourneyType", title: "Tourn type", type: "select", items: tournTypes, valueField: "Id", textField: "Name", width: 66, align: "center" },

                     { name: "TournRounds", title: "Total Rounds", type: "number", width: 50, align: "center" },
                     { name: "Replays", title: "Rep lays", type: "number", width: 50, align: "center" },
                     { name: "CurrentReplay", title: "Curr Repl", type: "number", width: 50, align: "center" },
                     { name: "TimeType", title: "Time", type: "text", sorting: false, width: 60 },
                     { name: "TimeTypeEng", title: "Time Eng", type: "text", sorting: false, width: 60 },
                     { name: "CurrentRound", title: "Cur. Round", type: "number", width: 50, align: "center" },

                     { name: "tournViewersCount", title: "View ers", type: "number", width: 50, align: "center" },
                     { name: "TournamentStartedTimeStr", title: "Tourn start", type: "text", width: 110 },

                     { name: "FinishedGames", title: "Ended Games", type: "number", width: 60, align: "center" },

                     { name: "ManageType", title: "Status", type: "select", items: manageTypes, valueField: "Id", textField: "Name", width: 40, align: "center" },

                     { name: "MaxPlayingGames", title: "Max Games", type: "number", width: 50, align: "center" },

                      //TournGames

                     { name: "AllowParallel", title: "Allow Parall", type: "checkbox", width: 60 },

                     { name: "StartedGameId", title: "Started Game", type: "number", width: 60, align: "center" },
                     { name: "GroupStr", type: "text", title: "Gro ups", width: 50, },

                     { name: "GamesWonWhite", title: "White Won", type: "number", width: 60, align: "center" },
                     { name: "GamesWonBlack", title: "Black Won", type: "number", width: 60, align: "center" },
                     { name: "WhiteProcent", title: "White %", type: "customCurrencyField", width: 70, align: "center" },

                     { name: "LastGameStartTimeStr", title: "Last Game start", type: "text", width: 110 },
                     { name: "LastGameCannotStartTimeStr", title: "Last Game bad start", type: "text", width: 110, validate: "required" },


                ],
                rowClick: function (args) {
                    console.log(args);
                    var getData = args.item;
                    setFenAndColor(getData, 0, getData.Fen, getData.wbToMove);
                    var keys = Object.keys(getData);
                    var text = [];
                    $.each(keys, function (idx, value) {
                        if (value == 'Fen') {
                            board2.setFen(getData[value]);
                        }
                        if (value == 'TournId') {
                            $("#TournId1").val(getData[value]);
                            $("#inputTournId").val(getData[value]);
                        }
                        if (value == 'UsersList') {
                            ulist = getData[value];
                        }
                        text.push(value + " : " + getData[value])

                    });

                    var txt1 = text.join(", ") + '<br/><br/>' + 'Users: ' + ulist;;
                    $("#label").html(txt1);
                }
            });
            if (refgridt) clearTimeout(refgridt);
            if (!Modernizr.touch)
                refgridt = setTimeout(function () {
                    getTournListFromMemory(lt);
                }, 4000);
        },
        error: function (result) {
            if (refgridt) clearTimeout(refgridt);
            if (!Modernizr.touch)
                refgridt = setTimeout(function () {
                    getTournListFromMemory(lt);
                }, 4000);

        }
    });
}

function getFinTournList(act) {
    gn = 1;
    var LastPgn = '';
    if (refgridt) clearTimeout(refgridt);
    servName = 'GetFinTournList';
    if (act == 1 || act == 2) {
        servName = 'GetFinTournListFromDB';
        gn = act;
    }
    $.ajax({
        type: "POST",
        url: "../ws/ViewService.asmx/" + servName,
        data: "{'id': '" + gn + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var tourns = JSON.parse(data.d);
            var x = 1;
            $("#jsGrid").jsGrid({
                width: "100%",
                height: "480px",

                inserting: false,
                editing: false,
                sorting: true,
                paging: false,
                pageSize: 10,
                selecting: true,
                data: tourns,
                selecting:true,

                fields: [
                     { name: "TournId", title: "id", type: "number", width: 50, align: "center" },
                    { name: "Header", type: "text", width: 200, validate: "required" },
                           

                       { name: "tournStatus", title: "Status", type: "select", items: TournStatus, valueField: "Id", textField: "Name", width: 100, align: "center" },

                          { name: "TourneyType", title: "Tourn type", type: "select", items: tournTypes, valueField: "Id", textField: "Name", width: 66, align: "center" },


                      { name: "TimeType", title: "Time", type: "text", sorting: false, width: 60 },
                       { name: "TimeTypeEng", title: "Time Eng", type: "text", sorting: false, width: 60 },
                       { name: "GroupStr", type: "text", title: "Gro ups", width: 50, },

                     
                      { name: "Replays", title: "Rep lays", type: "number", width: 50, align: "center" },
                      { name: "CurrentReplay", title: "Curr Repl", type: "number", width: 50, align: "center" },
                        { name: "TournRounds", title: "Total Rounds", type: "number", width: 50, align: "center" },

                       { name: "CurrentRound", title: "Cur. Round", type: "number", width: 50, align: "center" },
                         { name: "TournamentStartedTimeStr", title: "Tourn start", type: "text", width: 110 },


                         //{ name: "CurrentRound", title: "Cur. Round", type: "number", width: 50, align: "center" },
                         //  { name: "CurrentRound", title: "Cur. Round", type: "number", width: 50, align: "center" },


                          { name: "MaxPlayingGames", title: "Max Games", type: "number", width: 50, align: "center" },
                    { name: "StartedGameId", title: "Last Game", type: "number", width: 60, align: "center" },

                      { name: "FinishedGames", title: "Ended Games", type: "number", width: 60, align: "center" },
                      { name: "GamesWonWhite", title: "White Won", type: "number", width: 60, align: "center" },
                      { name: "GamesWonBlack", title: "Black Won", type: "number", width: 60, align: "center" },
                      { name: "WhiteProcent", title: "White %", type: "customCurrencyField", width: 70, align: "center" },

                     
                     { name: "LastGameStartTimeStr", title: "Last Game start", type: "text", width: 110 },
                    { name: "LastGameCannotStartTimeStr", title: "Last Game bad start", type: "text", width: 110, validate: "required" },


                        
                ],
                rowClick: function (args) {
                    console.log(args);

                    var getData = args.item;
                    setFenAndColor(getData,0, getData.Fen, getData.wbToMove);
                    var keys = Object.keys(getData);
                    var text = [];

                    $.each(keys, function (idx, value) {
                        if (value == 'Fen') {
                            board2.setFen(getData[value]);
                        }
                        if (value == 'TournId') {
                            $("#TournId1").val(getData[value]);
                            $("#inputTournId").val(getData[value]);
                        }
                        text.push(value + " : " + getData[value])                               

                    });

                    $("#label").text(text.join(", "))
                }
            });
            if (refgridt) clearTimeout(refgridt);
            if (!Modernizr.touch)
                refgridt = setTimeout(function () {
                    getFinTournList(act);
                }, 60000);
        },
        error: function (result) {
            if (refgridt) clearTimeout(refgridt);
            if (!Modernizr.touch)
                refgridt = setTimeout(function () {
                    getFinTournList(act);
                }, 60000);

        }
    });
}

function getTournamentListFromDB(ttype) {
    gn = 1;
    var LastPgn = '';
    var user = '';
    if (refgridt) clearTimeout(refgridt);
    servName = 'GetSimultanListFromDB';
    if (ttype == 1)
        servName = 'GetEngineTournamentListFromDB';
    else if (ttype == 3)
        servName = 'GetSimultanListFromDB';
    if (ttype == 0)
        servName = 'GetTournamentListFromDB';
    $.ajax({
        type: "POST",
        url: "../ws/ViewService.asmx/" + servName,
        data: "{'userName': '" + user + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var tourns = JSON.parse(data.d);
            var x = 1;
            $("#jsGrid").jsGrid({
                width: "100%",
                height: "480px",

                inserting: false,
                editing: false,
                sorting: true,
                paging: false,
                pageSize: 10,
                selecting: true,
                data: tourns,
                selecting: true,

                fields: [
                     { name: "TournId", title: "id", type: "number", width: 50, align: "center" },
                    { name: "Header", type: "text", width: 200, validate: "required" },


                       { name: "tournStatus", title: "Status", type: "select", items: TournStatus, valueField: "Id", textField: "Name", width: 100, align: "center" },

                          { name: "TourneyType", title: "Tourn type", type: "select", items: tournTypes, valueField: "Id", textField: "Name", width: 66, align: "center" },
                
                            { name: "TournamentStartedTimeStr", title: "Tourn start", type: "text", width: 110 },

                        { name: "Replays", title: "Rep lays", type: "number", width: 50, align: "center" },
                        { name: "CurrentReplay", title: "Curr Repl", type: "number", width: 50, align: "center" },
                        { name: "TournRounds", title: "Total Rounds", type: "number", width: 50, align: "center" },

                       { name: "CurrentRound", title: "Cur. Round", type: "number", width: 50, align: "center" },
               // { name: "UsersList", type: "text", title: "Grp master", width: 60 },
                      
                        { name: "TimeType", title: "Time", type: "text", sorting: false, width: 60 },
                          { name: "TimeTypeEng", title: "Time Eng", type: "text", sorting: false, width: 60 },

                         { name: "GroupStr", type: "text", title: "Gro ups", width: 50 },
                           { name: "ManageType", title: "Status", type: "select", items: manageTypes, valueField: "Id", textField: "Name", width: 40, align: "center" },


                      { name: "MaxPlayingGames", title: "Max Games", type: "number", width: 50, align: "center" },
                    

                         //{ name: "CurrentRound", title: "Cur. Round", type: "number", width: 50, align: "center" },
                         //  { name: "CurrentRound", title: "Cur. Round", type: "number", width: 50, align: "center" },



                    { name: "StartedGameId", title: "Last Game", type: "number", width: 60, align: "center" },

                      { name: "FinishedGames", title: "Ended Games", type: "number", width: 60, align: "center" },
                      { name: "GamesWonWhite", title: "White Won", type: "number", width: 60, align: "center" },
                      { name: "GamesWonBlack", title: "Black Won", type: "number", width: 60, align: "center" },
                      { name: "WhiteProcent", title: "White %", type: "customCurrencyField", width: 70, align: "center" },

                     
                     { name: "LastGameStartTimeStr", title: "Last Game start", type: "text", width: 110 },
                    { name: "LastGameCannotStartTimeStr", title: "Last Game bad start", type: "text", width: 110, validate: "required" },



                ],
                rowClick: function (args) {
                    console.log(args);

                    var getData = args.item;
                    setFenAndColor(getData, 0, getData.Fen, getData.wbToMove);
                    var keys = Object.keys(getData);
                    var text = [];
                    var ulist = '';
                    $.each(keys, function (idx, value) {
                        if (value == 'Fen') {
                            board2.setFen(getData[value]);
                        }
                        if (value == 'TournId') {
                            $("#TournId1").val(getData[value]);
                            $("#inputTournId").val(getData[value]);
                        }
                        if (value == 'UsersList') {
                            ulist=getData[value];
                        }
                        text.push(value + " : " + getData[value])

                    });
                    var txt1 = text.join(", ") + '<br/><br/>' + 'Users: ' + ulist;;
                    $("#label").html(txt1);
                }
            });
            if (refgridt) clearTimeout(refgridt);
            if (!Modernizr.touch)
                refgridt = setTimeout(function () {
                    getTournamentListFromDB(ttype);
                }, 60000);
        },
        error: function (result) {
            if (refgridt) clearTimeout(refgridt);
            if (!Modernizr.touch)
                refgridt = setTimeout(function () {
                    getTournamentListFromDB(ttype);
                }, 60000);

        }
    });
}

// fromDB
function getSimultanList(db) {
    gn = 1;
    var LastPgn = '';
    if (refgridt) clearTimeout(refgridt);
    servName = 'GetSimultanListFromDB';
    if (db != 1)
        servName = 'GetSimultanList';
    var user = '';
    $.ajax({
        type: "POST",
        url: "../ws/ViewService.asmx/" + servName,
        data: "{'userName': '" + user + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var tourns = JSON.parse(data.d);
            var x = 1;
            $("#jsGrid").jsGrid({
                width: "100%",
                height: "480px",

                inserting: false,
                editing: false,
                sorting: true,
                paging: false,
                pageSize: 10,
                selecting: true,
                data: tourns,
                selecting: true,

                fields: [
                     { name: "TournId", title: "id", type: "number", width: 50, align: "center" },
                    { name: "Header", type: "text", width: 250, validate: "required" },


                       { name: "tournStatus", title: "Status", type: "select", items: TournStatus, valueField: "Id", textField: "Name", width: 100, align: "center" },

                           { name: "TourneyType", title: "Tourn type", type: "select", items: tournTypes, valueField: "Id", textField: "Name", width: 66, align: "center" },
                   { name: "ManageType", title: "Status", type: "select", items: manageTypes, valueField: "Id", textField: "Name", width: 40, align: "center" },

                       

                      { name: "TimeType", title: "Time", type: "text", sorting: false, width: 60 },
                      // { name: "UsersList", type: "text", title: "Grp master", width: 60 },
                       { name: "GroupStr", type: "text", title: "Gro ups", width: 50, },

                      { name: "MaxPlayingGames", title: "Max Games", type: "number", width: 50, align: "center" },
                      { name: "Replays", title: "Rep lays", type: "number", width: 50, align: "center" },
                        { name: "TournRounds", title: "Total Rounds", type: "number", width: 50, align: "center" },

                       { name: "CurrentRound", title: "Cur. Round", type: "number", width: 50, align: "center" },

                 


                    { name: "StartedGameId", title: "Last Game", type: "number", width: 60, align: "center" },

                      { name: "FinishedGames", title: "Ended Games", type: "number", width: 60, align: "center" },
                      { name: "GamesWonWhite", title: "White Won", type: "number", width: 60, align: "center" },
                      { name: "GamesWonBlack", title: "Black Won", type: "number", width: 60, align: "center" },
                     // { name: "WhiteProcent", title: "White %", type: "customCurrencyField", width: 70, align: "center" },

                       { name: "TournamentStartedTimeStr", title: "Tourn start", type: "text", width: 110 },
                     { name: "LastGameStartTimeStr", title: "Last Game start", type: "text", width: 110 },
                    { name: "LastGameCannotStartTimeStr", title: "Last Game bad start", type: "text", width: 110, validate: "required" },



                ],
                rowClick: function (args) {
                    console.log(args);

                    var getData = args.item;
                    //setFenAndColor(getData, 0, getData.Fen, getData.wbToMove);
                    var keys = Object.keys(getData);
                    var text = [];
                    var ulist = '';
                    $.each(keys, function (idx, value) {
                        if (value == 'Fen') {
                            board2.setFen(getData[value]);
                        }
                        if (value == 'UsersList') {
                            ulist = getData[value];
                        }
                        text.push(value + " : " + getData[value])

                    });
                   
                    var txt1 = text.join(", ") + '<br/><br/>' + 'Users: ' + ulist;;
                    $("#label").html(txt1);
                }
            });
            if (refgridt) clearTimeout(refgridt);
            if (!Modernizr.touch)
                refgridt = setTimeout(function () {
                    getSimultanList(db);
                }, 60000);
        },
        error: function (result) {
            if (refgridt) clearTimeout(refgridt);
            if (!Modernizr.touch)
                refgridt = setTimeout(function () {
                    getSimultanList(db);
                }, 60000);

        }
    });
}

//function getLastTournament() {
//    gn = 1;
//    var LastPgn = '';
//    if (refgridt) clearTimeout(refgridt);
//    servName = 'GetLastTournament';
//    $.ajax({
//        type: "POST",
//        url: "../ws/ViewService.asmx/" + servName,
//        data: "{'id': '" + gn + "'}",

//        contentType: 'application/json',
//        dataType: "json",
//        success: function (data) {
//            var tourns = JSON.parse(data.d);
//            var x = 1;
//            $('#grid').DataTable({
//                data: tourns
//            });
//        },
//        error: function (result) {
//            tempdata = null;

//        }
//    });
//}

        

function getDiscoGamesList() {
    gn = 1;
    var LastPgn = '';
    if (refgridt) clearTimeout(refgridt);
    servName = 'GetDiscoGamesList';
    $.ajax({
        type: "POST",
        url: "../ws/ViewService.asmx/" + servName,
        data: "{'id': '" + gn + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var tourns = JSON.parse(data.d);
            var x = 1;
            $("#jsGrid").jsGrid({
                width: "100%",
                height: "480px",

                inserting: false,
                editing: false,
                sorting: true,
                paging: false,
                pageSize: 10,
                selecting: true,
                data: tourns,

                fields: [

                     { name: "convtype", title: "Type", type: "select", items: gameTypes, valueField: "Id", textField: "Name", width: 70, align: "center" },

                    { name: "WhiteName", title: "White", type: "text", width: 90 },
                    { name: "BlackName", title: "Black", type: "text", width: 90 },

                     { name: "WhiteEName", title: "W Ename", type: "text", width: 80 },


                              
                       { name: "BlackEName", title: "B Ename", type: "text", width: 80 },

                          { name: "RoundNum", title: "Rou nd", type: "number", width: 30, align: "center" },
                     { name: "convnum", title: "Num", type: "number", width: 60, align: "center" },
                       { name: "gameViewersCount", title: "View ers", type: "number", width: 50, align: "center" },

                     { name: "LastTimeStr", title: "Last Game start", type: "text", width: 110 },
                     { name: "wb", title: "wb", type: "number", width: 50, align: "center" },
                      { name: "wbToMove", title: "wb move", type: "number", width: 50, align: "center" },

                      { name: "restype", title: "Result type", type: "select", items: resTypes, valueField: "Id", textField: "Name", width: 70, align: "center" },

                      { name: "movenum", title: "HMove num", type: "number", width: 60, align: "center" },
                      { name: "LastMoveTimeStr", title: "Last Move time", type: "text", width: 110 },
                     



                      { name: "WhiteScore", title: "White Score", type: "number", width: 60, align: "center" },
                      { name: "BlackScore", title: "Black Score", type: "number", width: 60, align: "center" },




                ],
                rowClick: function (args) {
                    console.log(args);

                    var getData = args.item;
                    var keys = Object.keys(getData);
                    var text = [];

                    $.each(keys, function (idx, value) {
                        text.push(value + " : " + getData[value])
                        if (value == 'convnum') {
                            $("#gameId").val(getData[value]);
                            $("#histplay").val('play');
                            if (value == 'WhiteName') {
                                $("#UserName").val(getData[value]);
                            }
                            if (value == 'BlackName') {
                                $("#UserName2").val(getData[value]);
                            }
                                    
                        }

                    });

                    $("#label").text(text.join(", "))
                }
            });
            if (refgridt) clearTimeout(refgridt);
            if (!Modernizr.touch)
                refgridt = setTimeout(getDiscoGamesList, 10000);
        },
        error: function (result) {
            if (refgridt) clearTimeout(refgridt);
            if (!Modernizr.touch)
                refgridt = setTimeout(getDiscoGamesList, 10000);

        }
    });
}
        
    // from simultan memory list    
function getSimulGamesList() {
    gn = 1;
    var LastPgn = '';
    if (refgridt) clearTimeout(refgridt);
    servName = 'GetSimulGamesList';
    $.ajax({
        type: "POST",
        url: "../ws/ViewService.asmx/" + servName,
        data: "{'id': '" + gn + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var tourns = JSON.parse(data.d);
            var x = 1;
            $("#jsGrid").jsGrid({
                width: "100%",
                height: "480px",

                inserting: false,
                editing: false,
                sorting: true,
                paging: false,
                pageSize: 10,
                selecting: true,
                data: tourns,

                fields: [
 
                     { name: "Name", title: "Name", type: "text", width: 90 },
                      { name: "GrpMaster", title: "Grp Master", type: "text", width: 60 },
                                         
                                         

                     { name: "StartTimeStr", title: "Start Time", type: "text", width: 110 },
                             
                    { name: "Status", title: "Status", type: "number", width: 50, align: "center" },
                     { name: "gamesCount", title: "Games", type: "number", width: 50, align: "center" },
                      { name: "wb", title: "Master wb", type: "number", width: 50, align: "center" },

                      { name: "ActiveGameIndex", title: "Active Index", type: "number", width: 50, align: "center" },


                ],
                rowClick: function (args) {
                    console.log(args);

                    var getData = args.item;
                    var keys = Object.keys(getData);
                    var text = [];

                    $.each(keys, function (idx, value) {
                        text.push(value + " : " + getData[value])
                        if (value == 'convnum') {
                            $("#gameId").val(getData[value]);
                            $("#histplay").val('play');
                            if (value == 'WhiteName') {
                                $("#UserName").val(getData[value]);
                            }
                            if (value == 'BlackName') {
                                $("#UserName2").val(getData[value]);
                            }
                        }

                    });

                    $("#label").text(text.join(", "))
                }
            });
            if (refgridt) clearTimeout(refgridt);
            if (!Modernizr.touch)
                refgridt = setTimeout(function () {
                    getSimulGamesList();
                }, 30000)
        },
        error: function (result) {
            if (refgridt) clearTimeout(refgridt);
            if (!Modernizr.touch)
                refgridt = setTimeout(function () {
                    getSimulGamesList();
                }, 30000)
                

        }
    });
}

function getAdjGamesList() {
    gn = 1;
    var LastPgn = '';
    if (refgridt) clearTimeout(refgridt);
    servName = 'GetAdjGamesList';
    $.ajax({
        type: "POST",
        url: "../ws/ViewService.asmx/" + servName,
        data: "{'id': '" + gn + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var tourns = JSON.parse(data.d);
            var x = 1;
            $("#jsGrid").jsGrid({
                width: "100%",
                height: "480px",

                inserting: false,
                editing: false,
                sorting: true,
                paging: false,
                pageSize: 10,
                selecting: true,
                data: tourns,

                fields: [

                   //  { name: "convtype", title: "Type", type: "select", items: gameTypes, valueField: "Id", textField: "Name", width: 70, align: "center" },

                    { name: "WhiteName", title: "White", type: "text", width: 90 },
                     { name: "BlackName", title: "Black", type: "text", width: 90 },

                     //{ name: "WhiteEName", title: "W Ename", type: "text", width: 80 },

                     //  { name: "BlackEName", title: "B Ename", type: "text", width: 80 },


                   //  { name: "TournId", title: "Tid", type: "number", width: 40, align: "center" },
                   //  { name: "RoundNum", title: "Rou nd", type: "number", width: 30, align: "center" },
                     { name: "convnum", title: "Num", type: "number", width: 60, align: "center" },
                     { name: "LastTimeStr", title: "Last Game start", type: "text", width: 110 },
                     { name: "wb", title: "wb", type: "number", width: 50, align: "center" },
                      { name: "wbToMove", title: "wb move", type: "number", width: 50, align: "center" },


                      { name: "movenum", title: "HMove num", type: "number", width: 60, align: "center" },
                      { name: "LastMoveTimeStr", title: "Last Move time", type: "text", width: 110 },
                       { name: "gameViewersCount", title: "View ers", type: "number", width: 50, align: "center" },

                      { name: "Finished", title: "Fin ish", type: "checkbox", width: 50 },
                      { name: "GameStateW", title: "Stat W", type: "text", width: 50 },
                      { name: "GameStateB", title: "Stat B", type: "text", width: 50 },

                      { name: "ThinkWB", title: "Thnk WB", type: "number", width: 50, align: "center" },
                      { name: "StartThinkTimeStr", title: "Thnk Start", type: "text", width: 90 },
                       { name: "ThinkSec", title: "Thnk Sec", type: "number", width: 70, align: "center" },
                         { name: "TimeLeftStrW", title: "Time LeftW", type: "text", width: 80 },
                       { name: "TimeLeftStrB", title: "Time LeftB", type: "text", width: 80 },
                              
                              
                      { name: "WhiteTimeL", title: "White TimeL", type: "number", width: 70, align: "center" },
                      { name: "BlackTimeL", title: "Black TimeL", type: "number", width: 70, align: "center" }

                      //{ name: "WhiteScore", title: "White Score", type: "number", width: 60, align: "center" },
                      //{ name: "BlackScore", title: "Black Score", type: "number", width: 60, align: "center" },




                ],
                rowClick: function (args) {
                    console.log(args);

                    var getData = args.item;
                    var keys = Object.keys(getData);
                    var text = [];

                    $.each(keys, function (idx, value) {
                        text.push(value + " : " + getData[value])
                        if (value == 'convnum') {
                            $("#gameId").val(getData[value]);
                            $("#histplay").val('play');
                            if (value == 'WhiteName') {
                                $("#UserName").val(getData[value]);
                            }
                            if (value == 'BlackName') {
                                $("#UserName2").val(getData[value]);
                            }
                        }

                    });

                    $("#label").text(text.join(", "))
                }
            });
            if (refgridt) clearTimeout(refgridt);
            if (!Modernizr.touch)
                refgridt = setTimeout(getAdjGamesList, 30000);
        },
        error: function (result) {
            if (refgridt) clearTimeout(refgridt);
            if (!Modernizr.touch)
                refgridt = setTimeout(getAdjGamesList, 30000);

        }
    });
}
function getAdjGamesListFromDB() {
    gn = 1;
    var LastPgn = '';
    if (refgridt) clearTimeout(refgridt);
    servName = 'GetAdjGamesListFromDB';
    $.ajax({
        type: "POST",
        url: "../ws/ViewService.asmx/" + servName,
        data: "{'id': '" + gn + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var tourns = JSON.parse(data.d);
            var x = 1;
            $("#jsGrid").jsGrid({
                width: "100%",
                height: "480px",

                inserting: false,
                editing: false,
                sorting: true,
                paging: false,
                pageSize: 10,
                selecting: true,
                data: tourns,

                fields: [

                    // { name: "convtype", title: "Type", type: "select", items: gameTypes, valueField: "Id", textField: "Name", width: 70, align: "center" },

                    { name: "WhiteName", title: "White", type: "text", width: 90 },
                     { name: "BlackName", title: "Black", type: "text", width: 90 },

                     //StartTime
                      { name: "Times", title: "Times", type: "text", width: 60 },
                  //   { name: "WhiteEName", title: "W Ename", type: "text", width: 80 },

                   //    { name: "BlackEName", title: "B Ename", type: "text", width: 80 },


                    // { name: "TournId", title: "Tid", type: "number", width: 40, align: "center" },
                    // { name: "RoundNum", title: "Rou nd", type: "number", width: 30, align: "center" },
                     { name: "convnum", title: "Num", type: "number", width: 60, align: "center" },
                     { name: "LastTimeStr", title: "Last Game start", type: "text", width: 110 },
                     { name: "wb", title: "wb", type: "number", width: 50, align: "center" },
                      { name: "wbToMove", title: "wb move", type: "number", width: 50, align: "center" },


                      { name: "movenum", title: "HMove num", type: "number", width: 60, align: "center" },
                      { name: "LastMoveTimeStr", title: "Last Move time", type: "text", width: 110 },
                      // { name: "gameViewersCount", title: "View ers", type: "number", width: 50, align: "center" },



                      //{ name: "WhiteScore", title: "White Score", type: "number", width: 60, align: "center" },
                      //{ name: "BlackScore", title: "Black Score", type: "number", width: 60, align: "center" },
                      { name: "Finished", title: "Fin ish", type: "checkbox", width: 50 },
                      { name: "GameStateW", title: "Stat W", type: "text", width: 50 },
                      { name: "GameStateB", title: "Stat B", type: "text", width: 50 },

                        { name: "ThinkWB", title: "Thnk WB", type: "number", width: 50, align: "center" },
                      { name: "StartThinkTimeStr", title: "Thnk Start", type: "text", width: 90 },
                       { name: "ThinkSec", title: "Thnk Sec", type: "number", width: 70, align: "center" },
                         { name: "TimeLeftStrW", title: "Time LeftW", type: "text", width: 80 },
                       { name: "TimeLeftStrB", title: "Time LeftB", type: "text", width: 80 },

                       { name: "WhiteTimeL", title: "White TimeL", type: "number", width: 70, align: "center" },
                        { name: "BlackTimeL", title: "Black TimeL", type: "number", width: 70, align: "center" } 
                                



                ],
                rowClick: function (args) {
                    console.log(args);

                    var getData = args.item;
                    var keys = Object.keys(getData);
                    var text = [];

                    $.each(keys, function (idx, value) {
                        text.push(value + " : " + getData[value])
                        if (value == 'convnum') {
                            $("#gameId").val(getData[value]);
                            $("#histplay").val('play');
                            if (value == 'WhiteName') {
                                $("#UserName").val(getData[value]);
                            }
                            if (value == 'BlackName') {
                                $("#UserName2").val(getData[value]);
                            }
                        }

                    });

                    $("#label").text(text.join(", "))
                }
            });
            if (refgridt) clearTimeout(refgridt);
            if (!Modernizr.touch)
                refgridt = setTimeout(getAdjGamesListFromDB, 30000);
        },
        error: function (result) {
            if (refgridt) clearTimeout(refgridt);
            if (!Modernizr.touch)
                refgridt = setTimeout(getAdjGamesListFromDB, 30000);

        }
    });
}


function getGamesList() {
    gn = 1;
    var LastPgn = '';
    if (refgridt) clearTimeout(refgridt);
    servName = 'GetGamesList';
    $.ajax({
        type: "POST",
        url: "../ws/ViewService.asmx/" + servName,
        data: "{'id': '" + gn + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var tourns = JSON.parse(data.d);
            var obj = tourns[0];
            if (obj && obj.convnum == clickedViewGame) {
                setFenAndColor(obj,2,obj.CurrentFEN, obj.wbToMove, obj.TimeLeftStrW, obj.TimeLeftStrB, obj.BlackScore, obj.WhiteScore);
                //board2.setFen(obj.CurrentFEN);
            }
            //var fen = tourns.CurrentFEN;
            var x = 1;
            $("#jsGrid").jsGrid({
                width: "100%",
                height: "480px",

                inserting: false,
                editing: false,
                sorting: true,
                paging: false,
                pageSize: 10,
                selecting: true,
                data: tourns,

                fields: [
                            
                     { name: "convtype", title: "Type", type: "select", items: gameTypes, valueField: "Id", textField: "Name", width: 70, align: "center" },

                    { name: "WhiteName", title: "White", type: "text", width: 90 },
                     { name: "BlackName", title: "Black", type: "text", width: 90 },

                     { name: "WhiteEName", title: "W Ename", type: "text", width: 80 },                          
                             
                       { name: "BlackEName", title: "B Ename", type: "text", width: 80 },

                               
                      { name: "TournId", title: "Tid", type: "number", width: 40, align: "center" },
                     { name: "RoundNum", title: "Rou nd", type: "number", width: 30, align: "center" },
                     { name: "convnum", title: "Num", type: "number", width: 60, align: "center" },
                    { name: "gameViewersCount", title: "View ers", type: "number", width: 50, align: "center" },

                     { name: "gameincrW", title: "Incr Wh", type: "number", width: 60, align: "center" },
                      { name: "gameincrB", title: "Incr Bl", type: "number", width: 60, align: "center" },

                     { name: "GameState", title: "Game State", type: "text", width: 40 },
                      { name: "GameStateW", title: "GW State", type: "text", width: 40 },
                      { name: "GameStateB", title: "GB State", type: "text", width: 40 },

                     { name: "LastTimeStr", title: "Last Game start", type: "text", width: 110 },
                     { name: "wb", title: "wb", type: "number", width: 50, align: "center" },
                      { name: "wbToMove", title: "wb move", type: "number", width: 50, align: "center" },
                              

                      { name: "movenum", title: "HMove num", type: "number", width: 60, align: "center" },
                      { name: "LastMoveTimeStr", title: "Last Move time", type: "text", width: 110 },

                       { name: "ThinkSec", title: "Thnk Sec", type: "number", width: 60, align: "center" },
                        { name: "TimeLeftStrW", title: "Time LeftW", type: "text", width: 60 },
                       { name: "TimeLeftStrB", title: "Time LeftB", type: "text", width: 60 },
                         { name: "StartThinkTimeStr", title: "Start Thnk time", type: "text", width: 110 },
                         // next 2 must be updated every move - time left before last move
                         { name: "WhiteTimeL", title: "Time LeftW befr", type: "number", width: 60, align: "center" },
                        { name: "BlackTimeL", title: "Time LeftB befr", type: "number", width: 60, align: "center" },


                                

 
                      { name: "WhiteScore", title: "White Score", type: "number", width: 60, align: "center" },
                      { name: "BlackScore", title: "Black Score", type: "number", width: 60, align: "center" },
                            
                             
                            
                             
                ],
                rowClick: function (args) {
                    console.log(args);
                   
                    var getData = args.item;

                    setFenAndColor(getData,2, getData.CurrentFEN, getData.wbToMove);
                    var keys = Object.keys(getData);
                    var text = [];
                    clickedViewGame = getData.convnum;
                    $.each(keys, function (idx, value) {
                        text.push(value + " : " + getData[value])
                        if (value == 'CurrentFEN') {
                            board2.setFen(getData[value]);
                        }
                        if (value == 'convnum') {
                            $("#gameId").val(getData[value]);
                            $("#histplay").val('play');
                            if (value == 'WhiteName') {
                                $("#UserName").val(getData[value]);
                            }
                            if (value == 'BlackName') {
                                $("#UserName2").val(getData[value]);
                            }
                        }

                    });

                    $("#label").text(text.join(", "))
                }
            });
            if (refgridt) clearTimeout(refgridt);
            if (!Modernizr.touch)
                refgridt = setTimeout(getGamesList, 4000);
        },
        error: function (result) {
            if (refgridt) clearTimeout(refgridt);
            if (!Modernizr.touch)
                refgridt = setTimeout(getGamesList, 4000);

        }
    });
}



function getFinishedGamesList(num) {
    var gn = 1;
    var LastPgn = '';
    if (refgridt) clearTimeout(refgridt);
    servName = 'GetHistoryGamesList';
    $.ajax({
        type: "POST",
        url: "../ws/ViewService.asmx/" + servName,
        data: "{'id': '" + num + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var tourns = JSON.parse(data.d);
            var x = 1;
            $("#jsGrid").jsGrid({
                width: "100%",
                height: "480px",

                inserting: false,
                editing: false,
                sorting: true,
                paging: false,
                pageSize: 10,

                //editButton: false,
                modeSwitchButton: false,
                selecting: true,
                data: tourns,

                fields: [

                     { name: "convtype", title: "Type", type: "select", items: gameTypes, valueField: "Id", textField: "Name", width: 70, align: "center" },

                     { name: "WhiteName", title: "White", type: "text", width: 90 },
                     { name: "BlackName", title: "Black", type: "text", width: 90 },

                     { name: "WhiteEName", title: "W Ename", type: "text", width: 80 },


                              
                       { name: "BlackEName", title: "B Ename", type: "text", width: 80 },

                         { name: "TournId", title: "Tid", type: "number", width: 40, align: "center" },
                        { name: "RoundNum", title: "Rou nd", type: "number", width: 30, align: "center" },
                     { name: "convnum", title: "Num", type: "number", width: 60, align: "center" },
                     { name: "LastTimeStr", title: "Last Game", type: "text", width: 110 },

                      { name: "movenum", title: "HMove num", type: "number", width: 60, align: "center" },
                      { name: "LastMoveTimeStr", title: "Last Move", type: "text", width: 110 },

                      // { name: "result", title: "result", type: "number", width: 60, align: "center" },
                       // { name: "restype", title: "restype", type: "number", width: 60, align: "center" },

                        { name: "result", title: "Result", type: "select", items: gResults, valueField: "Id", textField: "Name", width: 80, align: "center" },
                        { name: "restype", title: "Result type", type: "select", items: resTypes, valueField: "Id", textField: "Name", width: 70, align: "center" },

                              
                       //   { name: "restype", title: "btn", type: "control", width: 70, align: "center" },


                ],
                rowClick: function (args) {
                    console.log(args);
                           
                    var getData = args.item;
                    setFenAndColor(getData,1, getData.FinalFEN, getData.wbToMove);
                    var keys = Object.keys(getData);
                    var text = [];

                    $.each(keys, function (idx, value) {
                        if (value == 'FinalFEN') {
                            board2.setFen(getData[value]);
                        }
                        text.push(value + " : " + getData[value])
                        if (value == 'convnum') {
                            $("#gameId").val(getData[value]);
                            $("#histplay").val('hist');
                            if (value == 'WhiteName') {
                                $("#UserName").val(getData[value]);
                            }
                            if (value == 'BlackName') {
                                $("#UserName2").val(getData[value]);
                            }
                        }
                                    
                    });

                    $("#label").text(text.join(", "))
                }
            });
            if (refgridt) clearTimeout(refgridt);
            if (!Modernizr.touch)
                refgridt = setTimeout(function () {
                    getFinishedGamesList(num);
                }, 20000)
                    
        },
        error: function (result) {
            if (refgridt) clearTimeout(refgridt);
            if (!Modernizr.touch)
                refgridt = setTimeout(function () {
                    getFinishedGamesList(num);
                }, 20000)

        }
    });
}

function getFinishedAnalList() {
    gn = 1;
    var LastPgn = '';
    if (refgridt) clearTimeout(refgridt);
    servName = 'GetAnalysisList';
    $.ajax({
        type: "POST",
        url: "../ws/ViewService.asmx/" + servName,
        data: "{'id': '" + gn + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var tourns = JSON.parse(data.d);
            var x = 1;
            $("#jsGrid").jsGrid({
                width: "100%",
                height: "480px",

                inserting: false,
                editing: true,
                sorting: true,
                paging: false,
                pageSize: 10,

                editButton: true,
                modeSwitchButton: true,
                selecting: true,
                data: tourns,

                fields: [

                     { name: "convtype", title: "Type", type: "select", items: gameTypes, valueField: "Id", textField: "Name", width: 70, align: "center" },

                     { name: "WhiteName", title: "White", type: "text", width: 90 },
                     { name: "BlackName", title: "Black", type: "text", width: 90 },

                     { name: "WhiteEName", title: "W Ename", type: "text", width: 80 },


                              
                       { name: "BlackEName", title: "B Ename", type: "text", width: 80 },

                     { name: "convnum", title: "Num", type: "number", width: 60, align: "center" },
                     { name: "LastTimeStr", title: "Last Game", type: "text", width: 110 },

                      { name: "movenum", title: "Movenum", type: "number", width: 60, align: "center" },
                      { name: "LastMoveTimeStr", title: "Last Move", type: "text", width: 110 },

                             

                        { name: "result", title: "Result", type: "select", items: gResults, valueField: "Id", textField: "Name", width: 80, align: "center" },
                        { name: "restype", title: "Restype", type: "select", items: resTypes, valueField: "Id", textField: "Name", width: 70, align: "center" },


                        //  { name: "restype", title: "btn", type: "control", width: 70, align: "center" },


                ]
            });
            if (refgridt) clearTimeout(refgridt);
            if (!Modernizr.touch)
                refgridt = setTimeout(getFinishedGamesList, 16000);
        },
        error: function (result) {
            if (refgridt) clearTimeout(refgridt);
            if (!Modernizr.touch)
                refgridt = setTimeout(getFinishedGamesList, 16000);

        }
    });
}




function getEnginesTable() {
    if (refgridt) clearTimeout(refgridt);
    gn = 1;
    var LastPgn = '';
    servName = 'GetEnginesTable';
    $.ajax({
        type: "POST",
        url: "../ws/ViewService.asmx/" + servName,
        data: "{'id': '" + gn + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var users = JSON.parse(data.d);
            $("#jsGrid").jsGrid({
                width: "100%",
                height: "480px",

                inserting: false,
                editing: false,
                sorting: true,
                paging: false,
                pageSize: 10,
                selecting: true,
                data: users,

                fields: [
                    { name: "Name", type: "text", width: 100, validate: "required" },
                    { name: "eName", type: "text", title: "eName", sorting: false, width: 110 },
                    { name: "dName", type: "text", title: "dName", sorting: false, width: 120 },
                     { name: "eGroup", type: "text", title: "group", sorting: false, width: 60 },
                    //{ name: "isComp", title: "Comp", type: "checkbox", width: 50 },
                    //{ name: "isRemote", title: "Rem", type: "checkbox", width: 50 },
                    //{ name: "ConnectionStatus", title: "ConStat", type: "number", width: 70, align: "center" },
                     { name: "ConnectionStatus", title: "CStatus", type: "select", items: connTypes, valueField: "Id", textField: "Name", width: 100, align: "center" },

                      // { name: "eGameState", title: "GState", type: "number", width: 70, align: "center" },
               // { name: "eGameState", title: "GState", type: "select", items: eGameStates, valueField: "Id", textField: "Name", width: 90, align: "center" },


                    //{ name: "GameProblemType", title: "GPType", type: "number", width: 70, align: "center" },
                    { name: "GameProblemType", title: "GPType", type: "select", items: GPTypes, valueField: "Id", textField: "Name", width: 110, align: "center" },

                    { name: "convnum", title: "Game", type: "number", width: 60, align: "center" },
                     { name: "StatusSynchronized", title: "Sta Syn", type: "checkbox", width: 40 },

                { name: "engineStopped", title: "Stop ped", type: "checkbox", width: 50 },
                        { name: "inTourn", title: "Tou rn", type: "checkbox", width: 50 },
              { name: "tournId", title: "Tid", type: "number", width: 40, align: "center" },
              { name: "wb", title: "wb", type: "number", width: 40, align: "center" },

                 { name: "Elo", title: "Elo", type: "number", width: 60, align: "center" },
                  { name: "ISO", title: "ISO", type: "number", width: 50, align: "center" },


                    //  { name: "CanBeInvited", title: "Invit", type: "checkbox", width: 50 },

               // { name: "isFree", title: "Free", type: "checkbox", width: 50 },
                  //  { name: "IP", type: "text", title: "IP", sorting: false, width: 90 },

                     { name: "remoteConnectionId", title: "Rem ConnId", type: "number", width: 60,align: "left" },

            // { name: "Elo", title: "Elo", type: "number", width: 100 },


                ],
                rowClick: function (args) {
                    console.log(args);

                    var getData = args.item;
                    var keys = Object.keys(getData);
                    var text = [];

                    $.each(keys, function (idx, value) {
                        if (value == 'Name') {
                            $("#UserName").val(getData[value]);
                        }
                        text.push(value + " : " + getData[value])

                    });

                    $("#label").text(text.join(", "))
                }

            });
            if (refgridt) clearTimeout(refgridt);
            if (!Modernizr.touch)
                refgridt = setTimeout(getEnginesTable, 3500);
        },
        error: function (result) {
            //tempdata = null;
            if (refgridt) clearTimeout(refgridt);
            if (!Modernizr.touch)
                refgridt = setTimeout(getEnginesTable, 3500);
        }
    });
}
function clearLogs() {
    gn = 1;
    var LastPgn = '';
    if (refgridt) clearTimeout(refgridt);
    servName = 'ClearLogs';
    $.ajax({
        type: "POST",
        url: "../ws/ViewService.asmx/" + servName,
        data: "{'id': '" + gn + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var logsrc = JSON.parse(data.d);
            alert('OK');
                   
        },
        error: function (result) {
            alert('Error');

        }
    });
}
        
function getLogs() {
    gn = 1;
    var LastPgn = '';
    if (refgridt) clearTimeout(refgridt);
    servName = 'GetLogs';
    $.ajax({
        type: "POST",
        url: "../ws/ViewService.asmx/" + servName,
        data: "{'id': '" + gn + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var logs = JSON.parse(data.d);
            var x = 1;
            $("#jsGrid").jsGrid({
                width: "100%",
                height: "700px",

                inserting: false,
                editing: false,
                sorting: true,
                paging: true,
                pageSize:14,
                data: logs,
                selecting: true,
                fields: [
                    { name: "MsgType", title: "Type", type: "select", items: logTypes, valueField: "Id", textField: "Name", width: 70, align: "center" },
                   // { name: "MsgTimeStr", type: "date", myCustomProperty: "foo", width: 200, validate: "required" },
                    { name: "MsgTimeStr", title: "Time", type: "text", width: 110 },
                    { name: "Msg", title: "Msg", type: "text", sorting: false, width: 460 },
                      { name: "GameNum", title: "Game", type: "number", width: 40, align: "center" },

 
                ]
            });
            if (refgridt) clearTimeout(refgridt);
            //if (!Modernizr.touch)
            //refgridt = setTimeout(getLogs, 24000);
        },
        error: function (result) {
            tempdata = null;

        }
    });
}

function getLastLogs(num, typ) {          
    var LastPgn = '';
    if (refgridt) clearTimeout(refgridt);
    servName = 'GetLastLogs';
    $.ajax({
        type: "POST",
        url: "../ws/ViewService.asmx/" + servName,
        data: "{'id': '" + num + "','typ':'" + typ+ "'}",
        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var logs = JSON.parse(data.d);
            var x = 1;
            $("#jsGrid").jsGrid({
                width: "100%",
                height: "700px",

                inserting: false,
                editing: false,
                sorting: true,
                paging: true,
                pageSize: 14,
                data: logs,
                selecting: true,
                fields: [
                    { name: "MsgType", title: "Type", type: "select", items: logTypes, valueField: "Id", textField: "Name", width: 70, align: "center" },
                          
                    { name: "MsgTimeStr", title: "Time", type: "text", width: 110 },
                    { name: "Msg", title: "Msg", type: "text", sorting: false, width: 460 },

                      { name: "GameNum", title: "Game", type: "number", width: 40, align: "center" },

                ]
            });
            if (refgridt) clearTimeout(refgridt);
            //if (!Modernizr.touch) 
            //refgridt = setTimeout(function () {
            //    getLastLogs(num, typ);
            //}, 24000)
                   
        },
        error: function (result) {
            if (refgridt) clearTimeout(refgridt);
            //if (!Modernizr.touch)
            //refgridt = setTimeout(function () {
            //    getLastLogs(num, typ);
            //}, 24000)

        }
    });
}


function getUserLogs(num, namenum) {
    var LastPgn = '';
    var name = '';
    if (refgridt) clearTimeout(refgridt);
    if (namenum == 1)
        name = $("#UserName").val();
    else
        name = $("#UserName2").val();
    servName = 'GetUserLogs';
    $.ajax({
        type: "POST",
        url: "../ws/ViewService.asmx/" + servName,
        data: "{'id': '" + num + "','user':'" + name + "'}",
        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var logs = JSON.parse(data.d);
            var x = 1;
            $("#jsGrid").jsGrid({
                width: "100%",
                height: "700px",

                inserting: false,
                editing: false,
                sorting: true,
                paging: true,
                pageSize: 14,
                data: logs,
                selecting: true,
                fields: [
                    { name: "MsgType", title: "Type", type: "select", items: logTypes, valueField: "Id", textField: "Name", width: 70, align: "center" },

                    { name: "MsgTimeStr", title: "Time", type: "text", width: 110 },
                    { name: "Msg", title: "Msg", type: "text", sorting: false, width: 460 },
                    { name: "GameNum", title: "Game", type: "number", width: 40, align: "center" },
                     { name: "UserName", title: "Name", type: "text", sorting: false, width: 60 },


                ]
            });
            if (refgridt) clearTimeout(refgridt);
            //if (!Modernizr.touch)
            //    refgridt = setTimeout(function () {
            //        getLastLogs(num, typ);
            //    }, 24000)

        },
        error: function (result) {
            if (refgridt) clearTimeout(refgridt);
            //if (!Modernizr.touch)
            //    refgridt = setTimeout(function () {
            //        getLastLogs(num, typ);
            //    }, 24000)

        }
    });
}

function getGameLogs(num, gn) {
    var LastPgn = '';
    if (refgridt) clearTimeout(refgridt);
    gn = $("#gameId").val();
    servName = 'GetGameLogs';
    $.ajax({
        type: "POST",
        url: "../ws/ViewService.asmx/" + servName,
        data: "{'id': '" + num + "','gn':'" + gn + "'}",
        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var logs = JSON.parse(data.d);
            var x = 1;
            $("#jsGrid").jsGrid({
                width: "100%",
                height: "700px",

                inserting: false,
                editing: false,
                sorting: true,
                paging: true,
                pageSize: 14,
                data: logs,
                selecting: true,
                fields: [
                    { name: "MsgType", title: "Type", type: "select", items: logTypes, valueField: "Id", textField: "Name", width: 70, align: "center" },

                    { name: "MsgTimeStr", title: "Time", type: "text", width: 110 },
                    { name: "Msg", title: "Msg", type: "text", sorting: false, width: 460 },
                    { name: "GameNum", title: "Game", type: "number", width: 40, align: "center" },


                ]
            });
            if (refgridt) clearTimeout(refgridt);
            //if (!Modernizr.touch)
            //    refgridt = setTimeout(function () {
            //        getLastLogs(num, typ);
            //    }, 24000)

        },
        error: function (result) {
            if (refgridt) clearTimeout(refgridt);
            //if (!Modernizr.touch)
            //    refgridt = setTimeout(function () {
            //        getLastLogs(num, typ);
            //    }, 24000)

        }
    });
}

function getGamePgn(num, gn, score) {
    var LastPgn = '';
    if (refgridt) clearTimeout(refgridt);
    gn = $("#gameId").val();
    servName = 'GetGameListFromPlayingOrHistoryPgn';
    $.ajax({
        type: "POST",
        url: "../ws/ViewService.asmx/" + servName,
        data: "{'id': '" + num + "','gamenum':'" + gn + "','addscore':'" + score + "'}",
        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var games = JSON.parse(data.d);
            var x = 1;
            $("#jsGrid").jsGrid({
                width: "100%",
                height: "700px",

                inserting: false,
                editing: false,
                sorting: false,
                paging: false,
                pageSize: 2,
                data: games,
                selecting: true,
                fields: [
                    { name: "WhiteName", title: "White", type: "text", width: 110 },
                    { name: "BlackName", title: "Black", type: "text", width: 110 },
                    { name: "GamePGN", title: "PGN", type: "text", width: 800 },

                           

                ]
            });
            if (refgridt) clearTimeout(refgridt);
                  

        },
        error: function (result) {
            if (refgridt) clearTimeout(refgridt);
                  

        }
    });
}
        
 

