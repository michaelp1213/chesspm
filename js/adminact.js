
var myname = '';
var board2;
var qsSq = 17;
$(function () {

    board2 = ChessBoard('board2', {
        draggable: true,
        dropOffBoard: 'snapback',
        onMove: moveDone,
        onDragStart: dragStart,
        onDragMove: dragMove,

        onPromote: promotePiece,
        onBadMove: moveBadDone,
        onReplayFinished: replayFinished,
        onMoveEnd: onMoveEnd,
        checkLegal: true,
        checkTurn: true,
        playOneColor: true,
        showNotation: true,
        sparePieces: false,
        square: qsSq

    });
    board2.start();
}
);

function doStopTournamentAndCancelShedule() {
    bootbox.confirm("Are you sure you want to stop all tournaments and cancel sheduled?", function (result) {
        if (result == true) {
            servName = 'StopTournamentAndShedule';
            $.ajax({
                type: "POST",
                url: "../ws/ActService.asmx/" + servName,
                data: "{'name':'" + myname  + "'}",

                contentType: 'application/json',
                dataType: "json",
                success: function (data) {
                    var ans = data.d;       
                    showAnswer(ans);
                },
                error: function (result) {
                    tempdata = null;

                }
            });
            return true;
        }
    });
}
function stopTournament(tid,finindb) {
    var LastPgn = '';
    if (refgridt) clearTimeout(refgridt);
    var fname = '';
    servName = 'StopTournament';
    $.ajax({
        type: "POST",
        url: "../ws/ActService.asmx/" + servName,      
        data: "{'name':'" + myname + "', 'tournId': '" + tid + "', 'finindb': '" + finindb + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var ans = data.d; //JSON.parse(data.d);     
            if (finindb == 1) {

            }
            showAnswer(ans);
        },
        error: function (result) {
            tempdata = null;

        }
    });
}
function reStartTournamentFromDB(tid,ttype) {
    var LastPgn = '';
    if (refgridt) clearTimeout(refgridt);
    var fname = '';
    servName = 'ReStartTournamentFromDB';
    if (ttype == 3)
        servName = 'ReStartEngineTournamentFromDB';
    $.ajax({
        type: "POST",
        url: "../ws/ActService.asmx/" + servName,        
        data: "{'name':'" + myname + "', 'tournId': '" + tid + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var ans = data.d; //JSON.parse(data.d);
            showAnswer(ans);
        },
        error: function (result) {
            tempdata = null;

        }
    });
}

//function reStartTournament(tid) {
//    var LastPgn = '';
//    if (refgridt) clearTimeout(refgridt);
//    var fname = '';
//    servName = 'ReStartTournament';
//    $.ajax({
//        type: "POST",
//        url: "../ws/ActService.asmx/" + servName,
//        data: "{'name':'" + myname + "', 'tournId': '" + tid + "'}",

//        contentType: 'application/json',
//        dataType: "json",
//        success: function (data) {
//            var ans = data.d; //JSON.parse(data.d);
//            showAnswer(ans);
//        },
//        error: function (result) {
//            tempdata = null;

//        }
//    });
//}

function loadTournamentsFromDB(ttype,act) {
    var LastPgn = '';
    if (refgridt) clearTimeout(refgridt);
    var fname = '';
    if (!act)
        act = 0;
    servName = 'LoadTournamentsFromDB';
    $.ajax({
        type: "POST",
        url: "../ws/ActService.asmx/" + servName,
        data: "{'name':'" + myname + "', 'ttype': '" + ttype  + "', 'act': '" + act + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var ans = data.d;  
            showAnswer(ans);
        },
        error: function (result) {
            tempdata = null;

        }
    });
}

// changes DB and memory also if is memory !
function changeDbState(tournId, ttype,state) {
    var LastPgn = '';
    if (refgridt) clearTimeout(refgridt);
    var fname = '';
    servName = 'ChangeDbState';
    $.ajax({
        type: "POST",
        url: "../ws/ActService.asmx/" + servName,
        data: "{'tournId':'" + tournId  +"', 'ttype': '" + ttype+ "', 'state': '" + state + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var ans = data.d; //JSON.parse(data.d);
            showAnswer(ans);
        },
        error: function (result) {
            tempdata = null;

        }
    });
}

function doChatMessageCommand(id, msg, imp, act) {
    var LastPgn = '';
    if (refgridt) clearTimeout(refgridt);
    var fname = '';
    servName = 'ChatMessageCommand';
    $.ajax({
        type: "POST",
        url: "../ws/ActService.asmx/" + servName,
        data: "{'userOrTourn':'" + id + "', 'msg': '" + msg + "', 'imp': '" + imp + "', 'act': '" + act + "'}",
        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var ans = data.d;
            showAnswer(ans);
        },
        error: function (result) {
            tempdata = null;

        }
    });
}


function doMessageToOneUser(id, msg, imp, wt) {
    var LastPgn = '';
    if (refgridt) clearTimeout(refgridt);
    var fname = '';
    servName = 'MessageToOneUser';
    $.ajax({
        type: "POST",
        url: "../ws/ActService.asmx/" + servName,
        data: "{'userName':'" + id + "', 'msg': '" + msg + "', 'imp': '" + imp + "', 'wt': '" + wt + "'}",
        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var ans = data.d;
            showAnswer(ans);
        },
        error: function (result) {
            tempdata = null;

        }
    });
}
function doMessageToUsers( msg, imp, wt) {
    var LastPgn = '';
    if (refgridt) clearTimeout(refgridt);
    var fname = '';
    servName = 'MessageToUsers';
    $.ajax({
        type: "POST",
        url: "../ws/ActService.asmx/" + servName,
        data: "{'msg': '" + msg + "', 'imp': '" + imp + "', 'wt': '" + wt + "'}",
        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var ans = data.d;
            showAnswer(ans);
        },
        error: function (result) {
            tempdata = null;

        }
    });
}
// roundst, int stat
function doMessageToTournamentPlayers(id, msg, stat, imp, wt) {
    var LastPgn = '';    
    if (refgridt) clearTimeout(refgridt);
    var fname = '';
    servName = 'MessageToTournamentPlayers';
    $.ajax({
        type: "POST",
        url: "../ws/ActService.asmx/" + servName,
        data: "{'tournId':'" + id + "', 'msg': '" + msg + "', 'stat': '" + stat + "', 'imp': '" + imp + "', 'wt': '" + wt + "'}",
        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var ans = data.d;
            showAnswer(ans);
        },
        error: function (result) {
            tempdata = null;

        }
    });
}




// startTimeSt is string transferred on server

function doChangeTournamentStartTime(tournId, startTimeSt) {
    var LastPgn = '';
    if (refgridt) clearTimeout(refgridt);
    var fname = '';
    servName = 'ChangeTournamentStartTime';
    $.ajax({
        type: "POST",
        url: "../ws/ActService.asmx/" + servName,
        data: "{'tournId':'" + tournId + "', 'startTimeSt': '" + startTimeSt + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var ans = data.d;
            showAnswer(ans.Result);
        },
        error: function (result) {
            tempdata = null;

        }
    });
}


registerUpdateUser = function (act) {
    // AddUserToTournamentWithElo
    //var act = $('#modalTournTextHidden5').val();
    var tournId = $('#inputTournId5').val();
    var user = $('#inputUserId5').val();

    var psw = $('#inputPsw5').val();
    var disp = $('#dispName5').val();
    var elo = $('#elo5').val();
    var ielo = parseInt(elo);
    if (!ielo) ielo = 0;
    var ps = 0; // false -> no psw
    switch (act) {
        case 2: // update 
            servName = 'UpdUserToTournamentWithElo';
            break;
        case 3: //  remove
            servName = 'DelUserToTournamentWithElo';
            break;
        case 1:
            servName = 'AddUserToTournamentWithElo';
            break;
    }

    //var LastPgn = '';
    //if (refgridt) clearTimeout(refgridt);
    //if (!elo || elo == null || elo == '')
    //    elo = 0;
    //if (!disp)
    //    disp = '';
    //var fname = '';
    //var ielo = parseInt(elo);
    //if (!ielo) ielo = 0;
   
    $.ajax({
        type: "POST",
        url: "../ws/ActService.asmx/" + servName,
        data: "{'tournId':'" + tournId + "', 'userName': '" + user + "', 'psw': '" + psw + "', 'disp': '" + disp + "', 'elo': '" + ielo  + "', 'ps': '" + ps + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var ans = data.d;
            showAnswer(ans);
        },
        error: function (result) {
            tempdata = null;

        }
    });


}

function doAddUserToTournamentWithElo(tournId, user, psw, disp, elo) {
    var LastPgn = '';
    if (refgridt) clearTimeout(refgridt);
    if (!elo || elo == null || elo == '')
        elo = 0;
    if (!disp)
        disp = '';
    var fname = '';
    var ielo = parseInt(elo);
    if (!ielo) ielo = 0;
    servName = 'AddUpdUserToTournamentWithEloWithPsw';
    $.ajax({
        type: "POST",
        url: "../ws/ActService.asmx/" + servName,
        data: "{'tournId':'" + tournId + "', 'userName': '" + user + "', 'psw': '" + psw + "', 'disp': '" + disp + "', 'elo': '" + ielo + "', 'insUpdDel': '" + '1' + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var ans = data.d;
            showAnswer(ans);
        },
        error: function (result) {
            tempdata = null;

        }
    });
}


function doAddUsersPathToTournament(tournId, user) {
    var LastPgn = '';
    if (refgridt) clearTimeout(refgridt);
    var fname = '';
    servName = 'AddUserPathToTournament';
    $.ajax({
        type: "POST",
        url: "../ws/ActService.asmx/" + servName,
        data: "{'tournId':'" + tournId + "', 'userPath': '" + user + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var ans = data.d;
            showAnswer(ans);
        },
        error: function (result) {
            tempdata = null;

        }
    });
}

function doAddUserToTournament(tournId, user) {
    var LastPgn = '';
    if (refgridt) clearTimeout(refgridt);
    var fname = '';
    servName = 'AddUserToTournament';
    $.ajax({
        type: "POST",
        url: "../ws/ActService.asmx/" + servName,
        data: "{'tournId':'" + tournId + "', 'userName': '" + user + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var ans = data.d;  
            showAnswer(ans);
        },
        error: function (result) {
            tempdata = null;

        }
    });
}
function doAddUsersListToTournament(tournId, users) {
    var LastPgn = '';
    if (refgridt) clearTimeout(refgridt);
    var fname = '';
    servName = 'AddUsersListToTournament';
    $.ajax({
        type: "POST",
        url: "../ws/ActService.asmx/" + servName,
        data: "{'tournId':'" + tournId + "', 'usersName': '" + users + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var ans = data.d;
            showAnswer(ans);
        },
        error: function (result) {
            tempdata = null;

        }
    });
}

function doRemoveUserFromTournament(tournId, user) {
    var LastPgn = '';
    if (refgridt) clearTimeout(refgridt);
    var fname = '';
    servName = 'RemoveUserFromTournament';
    $.ajax({
        type: "POST",
        url: "../ws/ActService.asmx/" + servName,
        data: "{'tournId':'" + tournId + "', 'userName': '" + user + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var ans = data.d;
            showAnswer(ans);
        },
        error: function (result) {
            tempdata = null;

        }
    });
}

function pauseTournament(tid) {
    var LastPgn = '';
    if (refgridt) clearTimeout(refgridt);
    var fname = '';
    servName = 'pauseTournament';
    $.ajax({
        type: "POST",
        url: "../ws/ActService.asmx/" + servName,
        data: "{'name':'" + myname + "', 'tournId': '" + tid + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var ans = data.d; //JSON.parse(data.d);
            showAnswer(ans);
        },
        error: function (result) {
            tempdata = null;

        }
    });
}

function showAnswer(ans) {
    $('#Remark').text(ans);
}

showTournEngUserDialog = function (act) {
    $('#modalTournEngUserTextHidden').val(act);
    $('#myModalEngineId').modal('show');

}
showTournUserDialog = function (act) {
    $('#modalTournTextHidden1').val(act);
    $('#myModalTournIdUser').modal('show');
}


sendBulkMail = function (act) {
    $('#modalTournEngUserTextHidden9').val(act);
    $('#myModalUsersMail').modal('show');
}

showStopGameDialog = function (act) {
    $('#modalGameTextHidden1').val(act);
    $('#myModalGameStop').modal('show');
}
showTournRegisterDialog = function (act, qsTourn, myName) {
    //$('#modalTournTextHidden').val(act);

    $('#inputTournId5').val(qsTourn);
    $('#inputUserId5').val(myName);
    $('#modalTournTextHidden5').val(act);

    if (act == 1) {
        $('#btnDoTreatTournId5_upd').hide();
        $('#btnDoTreatTournId5_rem').hide();
        $('#btnDoTreatTournId5_add').show();
    }
    else { // upd/del
        $('#btnDoTreatTournId5_upd').show();
        $('#btnDoTreatTournId5_rem').show();
        $('#btnDoTreatTournId5_add').hide();
    }

    $('#myModalTournIdUserForUser').modal('show');

}


//showTournUserWithEloDialog = function (act) {
//    $('#modalTournTextHidden5').val(act);
//    $('#myModalTournIdUserForUser').modal('show');

//}
showTournStatusDialog = function (act) {
    $('#modalTournTextHidden7').val(act);
    $('#myModalTournStatusId').modal('show');

}
showTournDialog = function (act) {
    $('#modalTournTextHidden').val(act);
    $('#myModalTournId').modal('show');

}
showMessageDialog = function (act) {
    $('#modalTextHidden1').val(act);
    $('#myModalTextUser').modal('show');

}
showTournTimeDialog = function (act) {
    $('#modalTournTextHidden8').val(act);
    $('#myModalTournIdTime').modal('show');

}
 
doLoadForUpdateTournament = function (tournId) {
    
    var LastPgn = '';
    if (refgridt) clearTimeout(refgridt);
    var fname = '';
    var myName = '';
    servName = 'LoadForUpdateTournament';    
    $.ajax({
        type: "POST",
        url: "../ws/ActService.asmx/" + servName,
        data: "{'name':'" + myName + "', 'tournId': '" + tournId + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var ans = JSON.parse(data.d);
            if (ans && ans != null) {
                $('#tourneyId2Div').show();
                $('#tourneyId2').val(ans.TournId);
                $('#tourneyName2').val(ans.Name);
                $('#groupName2').val(ans.GroupStr);
                $('#startTime2').val(ans.TournamentStartedTimeStr);
                $('#tournManage2').val(ans.ManageType);
                $('#tournElo2').val(ans.UpdElo);
                $('#timeSelect2').val(ans.TimeType);
                $('#timeSelecteng2').val(ans.TimeTypeEng);
                $('#tourneyUsers2').val(ans.UsersList);
                $('#PairType2').val(ans.PairingType);
                $('#replays2').val(ans.Replays);
                $('#rounds2').val(ans.SwissRounds);

                $('#tourneyStat2').val(ans.tournStatus);

                $('#savegames2').val(ans.SwissRounds);
                $('#secsbeforeact2').val(ans.secsbeforeact);
                $('#secsbeforestart2').val(ans.secsbeforestart);
                $('#beforerounds2').val(ans.beforeround);

              



                $('#btnhumantourneyHidSaveUpd').val(2); // saveUpd
                
                $('#myModalHumanTourney').modal('show');
            }
            //showAnswer(ans);
        },
        error: function (result) {
            tempdata = null;

        }
    });
}

doLoadForUpdateTournamentBefStart = function (tournId) {

    var LastPgn = '';
    if (refgridt) clearTimeout(refgridt);
    var fname = '';
    var myName = '';
    servName = 'LoadForUpdateTournament';
    $.ajax({
        type: "POST",
        url: "../ws/ActService.asmx/" + servName,
        data: "{'name':'" + myName + "', 'tournId': '" + tournId + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var ans = JSON.parse(data.d);
            if (ans && ans != null) {
                $('#tourneyId22Div').show();
                $('#tourneyId22').val(ans.TournId);
                $('#tourneyName22').val(ans.Name);
                
                $('#startTime22').val(ans.TournamentStartedTimeStr);
               
                $('#tourneyUsers22').val(ans.UsersList);
               
                $('#rounds22').val(ans.SwissRounds);
             
 


                $('#tourneyStat22').val(ans.tournStatus);
            
                $('#btnhumantourneyHidSaveUpdBS').val(2); // saveUpd


                $('#tourneyName22Cbx').prop("checked", false);
                $('#tourneyName22Cbx').removeAttr('checked');

                $('#startTime22Cbx').prop("checked", false);
                $('#startTime22Cbx').removeAttr('checked');

                $('#tourneyUsers22Cbx').prop("checked", false);
                $('#tourneyUsers22Cbx').removeAttr('checked');

                $('#rounds22Cbx').prop("checked", false);
                $('#rounds22Cbx').removeAttr('checked');

                // next not in use yet
                $('#tourneyState22Cbx').prop("checked", false);
                $('#tourneyState22Cbx').removeAttr('checked');



                $('#myModalHumanTourneyBefStart').modal('show');
            }
            //showAnswer(ans);
        },
        error: function (result) {
            tempdata = null;

        }
    });
}

doLoadForUpdatePlayingTournament = function (tournId) {

    var LastPgn = '';
    if (refgridt) clearTimeout(refgridt);
    var fname = '';
    var myName = '';
    servName = 'LoadForUpdatePlayingTournament';
    $.ajax({
        type: "POST",
        url: "../ws/ActService.asmx/" + servName,
        data: "{'name':'" + myName + "', 'tournId': '" + tournId + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var ans = JSON.parse(data.d);
            if (ans && ans != null) {
                $('#tourneyId12Div').show();
                $('#tourneyId12').val(ans.TournId);
                $('#tourneyName12').val(ans.Name);
                $('#groupName12').val(ans.GroupStr);
                $('#startTime12').val(ans.TournamentStartedTimeStr);
                $('#tournManage12').val(ans.ManageType);
                $('#tournElo12').val(ans.UpdElo);
                $('#timeSelect12').val(ans.TimeType);
                $('#timeSelecteng12').val(ans.TimeTypeEng);
                $('#tourneyUsers12').val(ans.UsersList);
                $('#PairType12').val(ans.PairingType);
                $('#replays12').val(ans.Replays);
                $('#rounds12').val(ans.SwissRounds);
                $('#curround12').val(ans.CurrentRound);
                

                $('#savegames12').val(ans.SwissRounds);
                $('#secsbeforeact12').val(ans.secsbeforeact);
                $('#secsbeforestart12').val(ans.secsbeforestart);
                $('#beforerounds12').val(ans.beforeround);

                
                $('#tourneyStat12').val(ans.tournStatus);
                $('#tournGameState12').val(ans.tournGameStatus);
                $('#tournGameStateTime12').val(ans.tournGameStatusTimeStr);
                $('#tournPlayingGames12').val(ans.CountOfPlayingNowGames);
                $('#tournWaitingPairs12').val(ans.WaitingRoundGamePairs);

                $('#tournPairingList12').val(ans.LastPairingListCount);
                $('#tournFinishedGames12').val(ans.FinishedGames);

                $('#stopAllGames12').prop("checked", false);
                $('#changeGameStatus12').prop("checked", false);
                $('#stopAllGames12').removeAttr('checked');
                $('#changeGameStatus12').removeAttr('checked');

                //var ntime = new Date();
                var ntime = new Date(new Date() + 1 * 60000); // add 1 minute
               // var ntimed = ntime.toLocaleDateString();
               // var ntimet = ntime.toLocaleTimeString(); // "en-CA");
                // var ntimes = ntimed + ' ' + ntimet;
                var mins = ntime.getMinutes();
                if (mins < 10) mins = '0' + mins;
                var hrs = ntime.getHours();
                if (hrs < 10) hrs = '0' + hrs;
                var ntimes = ntime.getDate() + '/' + (ntime.getMonth() + 1) + '/' + ntime.getFullYear() + ' ' + hrs + ':' + mins;
                $('#roundstartTime12').val(ntimes);

              
                $('#roundstartTime12Cbx').prop("checked", false);
                $('#roundstartTime12Cbx').removeAttr('checked');


                $('#btnhumanplayingtourneyHidSaveUpd').val(2); // saveUpd

                $('#myModalHumanPlayingTourney').modal('show');
            }
            //showAnswer(ans);
        },
        error: function (result) {
            tempdata = null;

        }
    });
}

function dosimultan() {
    //toChat("Starting simultan.");
    var masterName='';
    $("#myModalSimultan").modal('hide');
    var times = $("#timeSelect1").val();
    var stime = $("#startTime1").val();
    var grp = $("#groupName1").val();
    var elo = $("#tournElo1").val();
   
    if (!grp) grp = ''; // ask ????
    grp=grp.replace(/\'/gi, "");
    var tname = $("#simulName").val().replace(/\'/gi, "");
    var manage = $("#tournManage1").val();
    createSimultan(masterName, times, tname, grp, manage,elo);   
}

function doHumanPlayingTourneyUpdate(saveUpd) {
    var myName = '';
    var masterName = '';
   
    $("#myModalHumanPlayingTourney").modal('hide');
    var times = $("#timeSelect12").val();
    var timeseng = $("#timeSelecteng12").val();



    var stime = $("#startTime12").val();
    var elo = $("#tournElo12").val()

    var tname = $("#tourneyName12").val().replace(/\'/gi, "");

    var manage = $("#tournManage12").val();

    var tourneyUsers = $("#tourneyUsers12").val();
    var PairType = $("#PairType12").val();
    var rounds = $("#rounds12").val();
    var cround = $("#curround12").val();

    var replays = $("#replays12").val();
    var tournid = $("#tourneyId12").val();

    var savegames = $("#savegames12").val();
    var secsbeforeact = $("#secsbeforeact12").val();
    var secsbeforestart = $("#secsbeforestart12").val();
    var beforeround = $("#beforerounds12").val();
    var tourneyStat = $("#tourneyStat12").val();


    var tourneyGameStat = $("#tournGameState12").val();
    var tourneyGameStatTime = $("#tournGameStateTime12").val();
    var tourneyPlayGames = $("#tournPlayingGames12").val();
    var tourneyWaitPairs = $("#tournWaitingPairs12").val();
    var tourneyPairList = $("#tournPairingList12").val();
    var tourneyFinishedGames = $("#tournFinishedGames12").val();

     
    var stopAllGames = $('#stopAllGames12').is(":checked");
    var changeGameStatus = $('#changeGameStatus12').is(":checked");
    
    var roundstartTime = $("#roundstartTime12").val();
    var roundstartTimeCbx = $('#roundstartTime12Cbx').is(":checked");

    //createUpdateHumanTourney(saveUpd, tournid, masterName, times, timeseng, tname, manage, elo, tourneyUsers, PairType,
    //    replays, rounds, savegames, secsbeforeact, secsbeforestart, beforeround, tourneyStat);
    if (refgridt) clearTimeout(refgridt);
    var fname = '';
    var replaysI = parseInt(replays);
    var roundsI = parseInt(rounds);
    var PairTypeI = parseInt(PairType);
    if (!PairTypeI) PairTypeI = 0;
    if (!replaysI) replaysI = 0;
    if (!roundsI) roundsI = 0;

    var croundI = parseInt(rounds);
    if (!croundI) croundI = 0;


    var savegamesI = parseInt(savegames);
    var secsbeforeactI = parseInt(secsbeforeact);
    var secsbeforestartI = parseInt(secsbeforestart);
    var beforeroundI = parseInt(beforeround);
    if (!savegamesI) savegamesI = 0;
    if (!secsbeforeactI) secsbeforeactI = 0;
    if (!secsbeforestartI) secsbeforestartI = 0;
    if (!beforeroundI) beforeroundI = 0;
    // next not updating from here yet
    var tourneyStatI = parseInt(tourneyStat); if (!tourneyStatI) tourneyStatI = 0;
    

    var servName = '';
    var idStr = '';
  
        servName = "UpdatePlayingHumanTourney";
        idStr = "'tournid':'" + tournid + "',";
    
    $.ajax({
        type: "POST",
        url: "../ws/ActService.asmx/" + servName,
        data: "{" + idStr + "'myName':'" + myName + "', 'times': '" + times + "', 'timeseng': '" + timeseng + "', 'tournName': '" + tname + "', 'manage': '" + manage + "', 'updElo': '" + elo + "', 'tourneyUsers': '" + tourneyUsers + "', 'pairType': '" + PairTypeI +
          "', 'secsbeforeact': '" + secsbeforeactI + "', 'secsbeforestart': '" + secsbeforestartI + "', 'beforeround': '" + beforeroundI + 
          "', 'cround': '" + croundI + "', 'tourneyGameStat': '" + tourneyGameStat + "', 'stopAllGames': '" + stopAllGames + "', 'changeGameStatus': '" + changeGameStatus +
          "', 'roundstartTime': '" + roundstartTime + "', 'roundstartTimeCbx': '" + roundstartTimeCbx +
            "'}",
        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var ans = data.d;
            showAnswer(ans);
        },
        error: function (result) {
        }
    });
}



function doHumanTourneyBefStart(saveUpd) {
    var myName = '';
    $("#myModalHumanTourneyBefStart").modal('hide');
    

    var startTime = $("#startTime22").val();
   

    var tname = $("#tourneyName22").val().replace(/\'/gi, "");

     

    var tourneyUsers = $("#tourneyUsers22").val();
   
    var rounds = $("#rounds22").val();

    
    var tournid = $("#tourneyId22").val();

   // not in use now
    var tourneyStat = $("#tourneyStat22").val();
     

    var roundsI = parseInt(rounds);   
    if (!roundsI) roundsI = 0;

    var tnameCbx = $('#tourneyName22Cbx').is(":checked")?1:0;
    var stimeCbx = $('#startTime22Cbx').is(":checked") ? 1 : 0;
    var tourneyUsersCbx = $('#tourneyUsers22Cbx').is(":checked") ? 1 : 0;
    var roundsCbx = $('#rounds22Cbx').is(":checked") ? 1 : 0;
    // not in use
    var tourneyStatCbx = 0;

    var servName = '';
    var idStr = ''; idStr = "'tournid':'" + tournid + "',";
    var data1 = "{" + idStr + "'myName':'" + myName + "', 'tournName': '" + tname + "', 'tourneyUsers': '" + tourneyUsers +
               "', 'rounds': '" + roundsI + "', 'tournState': '" + tourneyStat + "', 'startTime': '" + startTime  +
               "', 'tournNameCbx': '" + tnameCbx + "', 'tourneyUsersCbx': '" + tourneyUsersCbx + "', 'roundsCbx': '" + roundsCbx + "', 'tournStateCbx': '" + tourneyStatCbx + "', 'startTimeCbx': '" + stimeCbx +
               "'}";
        servName = "UpdateHumanTourneyBefStart";
      
    
    $.ajax({
        type: "POST",
        url: "../ws/ActService.asmx/" + servName,
        data: data1,
        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var ans = data.d;
            showAnswer(ans);
        },
        error: function (result) {
        }
    });
}


function doHumanTourney(saveUpd) {
    //toChat("Starting simultan.");
    var masterName = '';
   // var saveUpd=$('#btnhumantourneyHidSaveUpd').val();
    $("#myModalHumanTourney").modal('hide');
    var times = $("#timeSelect2").val();
    var timeseng = $("#timeSelecteng2").val();
    


    var stime = $("#startTime2").val();
    var elo = $("#tournElo2").val()
   
    var tname = $("#tourneyName2").val().replace(/\'/gi, "");

    var manage = $("#tournManage2").val();

    var tourneyUsers = $("#tourneyUsers2").val();
    var PairType = $("#PairType2").val();
    var rounds = $("#rounds2").val();
        
    var replays = $("#replays2").val();
    var tournid = $("#tourneyId2").val();

    var savegames = $("#savegames2").val();
    var secsbeforeact = $("#secsbeforeact2").val();
    var secsbeforestart = $("#secsbeforestart2").val();
    var beforeround = $("#beforerounds2").val();
    var tourneyStat = $("#tourneyStat2").val();
    

    createUpdateHumanTourney(saveUpd, tournid, masterName, times, timeseng, tname, manage, elo, tourneyUsers, PairType,
        replays, rounds, savegames, secsbeforeact, secsbeforestart, beforeround,tourneyStat);
}

function doTreatMail() {
    var act = $('#modalTournEngUserTextHidden9').val();
    var tid = $('#inputTournId9').val();
    var to1 = $('#inputTo9').val();
    var subj = $('#inputSubject9').val();
    var text = $('#inputText9').val();
    var lang = $('#inputLang9').val();
    var templ = $('#Template9').val();
    var thdr = $('#inputTournHdr9').val();
    var days = $('#inputDays9').val();
    
    

    servName = 'SendMail';
    if (act == 2)
        servName = 'SendMailByUsers';
    $.ajax({
        type: "POST",
        url: "../ws/ActService.asmx/" + servName,
        data: "{'tournId':'" + tid + "', 'thdr': '" + thdr + "', 'to1': '" + to1 + "', 'subj': '" + subj + "', 'text': '" + text + "', 'lang': '" + lang + "', 'templ': '" + templ + "', 'days': '" + days + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var ans = data.d; //JSON.parse(data.d);
            showAnswer(ans);
        },
        error: function (result) {
            tempdata = null;

        }
    });
}


function docompstournament() {
    var val1 = $('#oppFindselect2').val();
    var val2 = $('#oppCompTimeSelect').val();


    //toChat("Starting tournament.");
    if (!val1 || val1 == '') val1 = '5_2';
    if (!val2 || val2 == '') val2 = '5_2';
    var fen = $("#InvFenSelect").val();
    var startMoves = '';
    var StartMoveNum = 0; //1; ??
    //var fenWithMovArr = fen.split(',');
    // new
    startMoves = $("#startMoves").val();
    fen = $("#inviteFen2").val();
    /*
    if (fenWithMovArr.length > 2) {
        fen = fenWithMovArr[0];
        startMoves = fenWithMovArr[1];
        StartMoveNum = parseInt(fenWithMovArr[2]);
    }
    else if (fenWithMovArr.length > 1) {
        fen = fenWithMovArr[0];
        if (fenWithMovArr[1].length < 4) {
            startMoves = '';
            StartMoveNum = parseInt(fenWithMovArr[1]);
        }
        else {
            fen = fenWithMovArr[0];
            startMoves = fenWithMovArr[1];
            var fenArr = fen.split(' ');
            if (fenArr.length > 4)
                StartMoveNum = parseInt(fenArr[5]);
        }
    }
    else if (fenWithMovArr.length == 1) { // from fen
        fen = fenWithMovArr[0];
        var fenArr = fen.split(' ');
        if (fenArr.length > 4)
            StartMoveNum = parseInt(fenArr[5]);
    }
    */
    if (!StartMoveNum) StartMoveNum = 0;
    if (fen == 'Manual')
        fen = $("#inviteFen2").val();
    var tname = $("#tournName").val().replace(/\'/gi, "");
    if (tname == null) tname = '';
    var elist = $("#EngList").val();
    var newElist = '';
    if (elist == 'Manual')
        newElist = $("#ManualEngList").val();
    else
        newElist = elist;
    var maxGames = $("#maxGames").val();
    var startTime = $("#startTime").val();
    var replays = $("#treplays").val();
    var prep = $('#prepareBefore').val();
    var evalMov = $('#evalMoves').val();
    var evalMovForce = $('#evalMovesForce').val();



    var manage = $('#tournManage').val();
    if (!manage) manage = 1;
    var allowPar = $('#allowParallel').is(":checked");
    $("#myModalcompstournament").modal('hide');
    playState = 14;
    gameStarted = 0;
    viewStarted = 1;

    // test elist
    if (newElist && newElist != null && newElist != '') {
        var partArr = newElist.split(',');
        var grp = ''; var eName; var dName;
        if (partArr.Length > 1) {
            newElist = '';
            for (i = 0; i < partArr.Length; i++) {
                if (i > 0)
                    newElist += ',';
                dName = '';
                var arr = partArr[i].split('/');
                if (arr.Length == 1) {
                    eName = arr[0];
                    grp = 'CC';
                }
                else {
                    if (arr.Length >= 2) {
                        grp = arr[0];
                        eName = arr[1];
                    }
                    if (arr.Length >= 3) {
                        dName = arr[2];
                    }
                    else
                        dName = 'C_' + eName;
                }
                newElist += grp + '/' + eName + '/' + dName;
            }
        }
    }
   
    servName = 'StartNewEngTournament';
    $.ajax({
        type: "POST",
        url: "../ws/ActService.asmx/" + servName,
        data: "{'myName':'" + myname + "', 'times': '" + val1 + "', 'tournName': '" + tname + "', 'startFen': '" + fen + "', 'addView': '" + true + "', 'elist': '" + newElist + "', 'maxgames': '" + maxGames +              "', 'startTime': '" + startTime + "', 'replays': '" + replays + "', 'prepBefore': '" + prep + "', 'allowParallel': '" + allowPar + "', 'manage': '" + manage + "', 'evalMov': '" + evalMov + "', 'evalMovForce': '" + evalMovForce + "', 'startMoves': '" + startMoves + "', 'StartMoveNum': '" + StartMoveNum + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var ans = data.d; //JSON.parse(data.d);
            showAnswer(ans);
        },
        error: function (result) {
            tempdata = null;

        }
    });

}


function doStopGameByAdmin(id, res, restype) {
    var LastPgn = '';
    if (refgridt) clearTimeout(refgridt);
    var fname = '';
    var myName = '';
    servName = 'StopGameByAdmin';
     
    $.ajax({
        type: "POST",
        url: "../ws/ActService.asmx/" + servName,
        data: "{'name':'" + myName + "', 'gameid': '" + id + "', 'res': '" + res + "', 'restype': '" + restype + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var ans = data.d;
            showAnswer(ans);
        },
        error: function (result) {
            tempdata = null;

        }
    });
}

//function startTournament(tid) {

//    var LastPgn = '';
//    if (refgridt) clearTimeout(refgridt);
//    var fname = '';
//    servName = 'StopTournament';
//    $.ajax({
//        type: "POST",
//        url: "../ws/ActService.asmx/" + servName,
//        //data: "{'id': '" + gn + "'}",
//        data: "{'name':'" + myname + "', 'tournId': '" + tid + "'}",

//        contentType: 'application/json',
//        dataType: "json",
//        success: function (data) {
//            var ans = JSON.parse(data.d);

//        },
//        error: function (result) {
//            tempdata = null;

//        }
//    });
//}


//
function doRestartTournamentDB(tournId,ttype) {
    var LastPgn = '';
    if (refgridt) clearTimeout(refgridt);
    var fname = '';
    var myName = '';
    servName = 'ReStartTournamentFromDB';
    if (ttype == 1)
        servName = 'ReStartEngineTournamentFromDB';
    $.ajax({
        type: "POST",
        url: "../ws/ActService.asmx/" + servName,
        data: "{'name':'" + myName + "', 'tournId': '" + tournId + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var ans = data.d;
            showAnswer(ans);
        },
        error: function (result) {
            tempdata = null;

        }
    });
}

function startSimultan(masterName) {
    var LastPgn = '';
    if (refgridt) clearTimeout(refgridt);
    var fname = '';
    servName = 'StartSimultan';
    $.ajax({
        type: "POST",
        url: "../ws/ActService.asmx/" + servName,
        data: "{'masterName':'" + masterName  + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var ans = data.d;  
            showAnswer(ans);
        },
        error: function (result) {
            tempdata = null;

        }
    });
}

function finishSimultan(userName) {
    var LastPgn = '';
    if (refgridt) clearTimeout(refgridt);
    var fname = '';
    servName = 'FinishSimultan';
    $.ajax({
        type: "POST",
        url: "../ws/ActService.asmx/" + servName,
        data: "{'userName':'" + userName + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var ans = data.d;
            showAnswer(ans);
        },
        error: function (result) {
            tempdata = null;

        }
    });
}

function activateSimultan(masterGrp) {
    var LastPgn = '';
    if (refgridt) clearTimeout(refgridt);
    var fname = '';
    servName = 'ActivateSimultan';
    //
    $.ajax({
        type: "POST",
        url: "../ws/ActService.asmx/" + servName,
        data: "{'masterGrp': '" + masterGrp + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var ans = data.d;
            showAnswer(ans);
        },
        error: function (result) {
            tempdata = null;

        }
    });
}

function createSimultan(myName, times, tname, grp, manage, updElo) {
    var LastPgn = '';
    if (refgridt) clearTimeout(refgridt);
    var fname = '';
    servName = 'CreateSimultan';
    $.ajax({
        type: "POST",
        url: "../ws/ActService.asmx/" + servName,
        data: "{'myName':'" + myName + "', 'times': '" + times + "', 'tournName': '" + tname + "', 'masterGrp': '" + grp + "', 'manage': '" + manage + "', 'updElo': '" + updElo + "'}",
        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var ans = data.d;
            showAnswer(ans);
        },
        error: function (result) {         
        }
    });
}

function createUpdateHumanTourney(saveUpd, tournid, myName, times, timeseng, tname, manage, updElo, tourneyUsers, PairType,
    replays, rounds, savegames, secsbeforeact, secsbeforestart, beforeround,tourneyStat) {
    var LastPgn = '';
    if (refgridt) clearTimeout(refgridt);
    var fname = '';
    var replaysI = parseInt(replays);
    var roundsI = parseInt(rounds);
    var PairTypeI = parseInt(PairType);
    if (!PairTypeI) PairTypeI = 0;
    if (!replaysI) replaysI = 0;
    if (!roundsI) roundsI = 0;

    var savegamesI = parseInt(savegames);
    var secsbeforeactI = parseInt(secsbeforeact);
    var secsbeforestartI = parseInt(secsbeforestart);
    var beforeroundI = parseInt(beforeround);
    if (!savegamesI) savegamesI = 0;
    if (!secsbeforeactI) secsbeforeactI = 0;
    if (!secsbeforestartI) secsbeforestartI = 0;
    if (!beforeroundI) beforeroundI = 0;
    // next not updating from here yet
    var tourneyStatI = parseInt(tourneyStat); if (!tourneyStatI) tourneyStatI = 0;
    

    var servName = '';
    var idStr = '';
    if (saveUpd == 1)
        servName = 'CreateHumanTourney';
    else // 2=upd
    {
        servName = "UpdateHumanTourney";
        idStr = "'tournid':'" + tournid + "',";
    }
    $.ajax({
        type: "POST",
        url: "../ws/ActService.asmx/" + servName,
        data: "{" + idStr + "'myName':'" + myName + "', 'times': '" + times + "', 'timeseng': '" + timeseng + "', 'tournName': '" + tname + "', 'manage': '" + manage + "', 'updElo': '" + updElo + "', 'tourneyUsers': '" + tourneyUsers + "', 'pairType': '" + PairTypeI +
            "', 'replays': '" + replaysI + "', 'rounds': '" + roundsI + "', 'savegames': '" + savegamesI + "', 'secsbeforeact': '" + secsbeforeactI + "', 'secsbeforestart': '" + secsbeforestartI + "', 'beforeround': '" + beforeroundI + "'}",
        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var ans = data.d;
            showAnswer(ans);
        },
        error: function (result) {
        }
    });
}


function doCleanEngine() {

    $('#CCMsgType').val('ce');
    $('#CCGroup').val('CC');
    $('#CCSendTo').val('Master1');
    $('#CCTarget').val('Master1');
    $('#CCTargetName').val('Stockfish');

    $('#myModalMsgToCC').modal('show');

}
function doCleanAllEngines() {
    $('#CCMsgType').val('ca');
    $('#CCGroup').val(''); // CC
    $('#CCSendTo').val(''); // Master5
    $('#CCTarget').val('');
    $('#CCTargetName').val('Stockfish');
    $('#myModalMsgToCC').modal('show');

}

function doRestartEngine() {

    $('#CCMsgType').val('re');
    $('#CCGroup').val('CC');
    $('#CCSendTo').val('Master1');
    $('#CCTarget').val('Master1');
    $('#myModalMsgToCC').modal('show');

}
function doRestartAllEngines() {
    $('#CCMsgType').val('ra');
    $('#CCGroup').val('CC');
    $('#CCSendTo').val('Master5');
    $('#CCTarget').val('');
    $('#myModalMsgToCC').modal('show');

}
function doKillEngine() {
    $('#CCMsgType').val('ke');
    $('#CCGroup').val('CC');
    $('#CCSendTo').val('Master1');
    $('#CCTarget').val('Master1');
    $('#myModalMsgToCC').modal('show');

}
function doKillAllEngines() {
    $('#CCMsgType').val('ka');
    $('#CCGroup').val('CC');
    $('#CCSendTo').val('Master5');
    $('#CCTarget').val('');
    $('#myModalMsgToCC').modal('show');
}

function doSendCCCommand() {
    var mtype = $('#CCMsgType').val();
    var grp= $('#CCGroup').val();
    var sendto=$('#CCSendTo').val();
    var target= $('#CCTarget').val();
    var targname=$('#CCTargetName').val();
    var myName = ''; // 
     
    $('#myModalMsgToCC').modal('hide');
  

    servName = 'SendCCCommand';
    $.ajax({
        type: "POST",
        url: "../ws/ActService.asmx/" + servName,
        data: "{'myName':'" + myName + "', 'mtype': '" + mtype + "', 'grp': '" + grp + "', 'sendto': '" + sendto + "', 'target': '" + target + "', 'targname': '" + targname + "'}",
        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var ans = data.d;
            showAnswer(ans);
        },
        error: function (result) {
            tempdata = null;

        }
    });
}
