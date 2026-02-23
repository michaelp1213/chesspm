


$(document).ready(function () {
    $("#gameShow").click(function () {
        var histplay = $("#histplay").val();
        var id = $("#gameId").val();
        showGame(id, histplay,0);
    });
    $("#gameScoreShow").click(function () {
        var histplay = $("#histplay").val();
        var id = $("#gameId").val();
        showGame(id, histplay,1);
    });

    $('#newsimultan').click(function () {
        $('#myModalSimultan').modal('show');
    });
    $('#newhumantourn').click(function () {
        $('#tourneyId2Div').hide();
        $('#btnhumantourneyHidSaveUpd').val(1); // saveUpd
        $('#myModalHumanTourney').modal('show');
    });
    //$('#updhumantourn').click(function () {
    //    $('#myModalHumanTourney').modal('show');
    //});
    

    $('#btnsimultan').click(function () { dosimultan(); });
    $('#btnhumantourney').click(function () {
       
        var sapEupd=$('#btnhumantourneyHidSaveUpd').val(); 
        
        doHumanTourney(sapEupd);
    });

    $('#btnhumantourneybefstart').click(function () {

        

        doHumanTourneyBefStart(1);
    });

    



    $('#btnhumanplayingtourney').click(function () {

        var sapEupd = $('#btnhumanplayingtourneyHidSaveUpd').val();

        doHumanPlayingTourneyUpdate(sapEupd);
    });


    $('#compstournament').click(function () {
        $('#myModalcompstournament').modal('show');
    });
   

    

    
    $('#btnDoWriteMessage').click(function () {
        var act = $('#modalTextHidden1').val();
        var id = $('#inputUserId2').val(); // inputUserId2
        var msg = $('#inputMessage').val();
        var imp = $("#messageImp2").val();
        var wt = $("#inputWaitTime2").val();
        if (!wt || wt == null)
            wt = 0;
        switch (act) {
            case '0':
                // all users
                doMessageToUsers(msg, imp, wt);
                break;
            case '1':
                // specific user
                doMessageToOneUser(id, msg, imp, wt);
                break;
            case '41':
                // specific tourn -> add params !
                doMessageToTournamentPlayers(id, msg, 0, imp, wt);
                break;

            case '100':
                // openChat
                doChatMessageCommand(id, msg, imp, act);
                break;
            case '200':
                // openChat
                doChatMessageCommand(id, msg, imp, act);
                break;
            case '101':
                // reg message to chat
                doChatMessageCommand(id, msg, imp, act);
                break;
            case '201':
                // reg message to chat of tourn id
                doChatMessageCommand(id, msg, imp, act);
                break;
            case '110':
                // closeChat
                doChatMessageCommand(id, msg, imp, act);
                break;
            case '210':
                // closeChat
                doChatMessageCommand(id, msg, imp, act);
                break;
            default:
                
                break;
        }

    });

    $('#btncompstournament').click(function () { docompstournament(); });

    $('#btnDoTreatMailId9').click(function () { doTreatMail(); });

    
    // generic state
    $('#btnDoTreatTournId7').click(function () {
        var act = $('#modalTournTextHidden7').val();
        var id = $('#inputTournId7').val();
        var stat = $('#inputStatus7').val();
        switch (act) {
            
            default: 
                var stat = parseInt(stat);                
                changeDbState(id, 0, stat)
                
                break;
        }

    });

    
    $('#btnhumanplayingtourneyref').click(function () {
        var id = $('#tourneyId12').val();
        
        doLoadForUpdatePlayingTournament(id);
    });
    $('#btnDoTreatTournId').click(function () {
        var act = $('#modalTournTextHidden').val();
        var id = $('#inputTournId').val();
        switch (act) {
            case '1':
                alert('Restarting Tournament '+id+'!');
                doRestartTournamentDB(id,1);
                break;
            case '3':
                alert('Restarting Tournament '+id+'!');
                doRestartTournamentDB(id,3);
                break;
            case '20':            
                doLoadForUpdateTournament(id);
                break;
            case '40': // playing
                doLoadForUpdatePlayingTournament(id);
                break;
            case '50': // be start
                doLoadForUpdateTournamentBefStart(id);
                break;
            default: // 100+  118=restore
                alert('Invalid option !');
                //var act = parseInt(act);
                //if (act > 100) {
                //    act = act - 100;
                //    changeDbState(id, 0, act)
                //}
                //else 
                //    doRestartTournamentDB(id);
                break;
        }

    });


    
    
    $('#btnDoTreatTournId8').click(function () { 
        var act = $('#modalTournTextHidden8').val();
        var id = $('#inputTournId8').val();
        // DD/MM/YYYY format !!
        var timest = $('#inputTime8').val();
        //var time = new Date(timest); //Date.parse($('#inputTime8').val());
        
        doChangeTournamentStartTime(id, timest);
    });

    $('#btnDoTreatTournId1').click(function () { // add user
        var act = $('#modalTournTextHidden1').val();
        var id = $('#inputTournId1').val();
        var user = $('#inputUserId1').val();
        switch (act) {
            case '1':
                doAddUserToTournament(id, user);
                break;
            case '10':
                doAddUsersListToTournament(id, user);
                break;
            case '20'://Add User Path data 
                doAddUsersPathToTournament(id, user);
                break;
            case '30':
                doRemoveUserFromTournament(id, user);
                break;

            case '2':
                doRemoveUserFromTournament(id, user);
                break;
            default:
                doAddUserToTournament(id, user);
                break;
        }

    });
       
    $('#btnDoTreatGameId1').click(function () { // add user
        var act = $('#modalGameTextHidden1').val();
        var id = $('#inputGameId1').val();
        var res = $('#inputResult1').val();
        var restype = $('#inputResultType1').val();
        doStopGameByAdmin(id, res, restype);
    });


    $('#btnFindTournId').click(function () {

    });

    $('#btnDoTreatTournId5_add').click(function () { registerUpdateUser(1); });
    $('#btnDoTreatTournId5_upd').click(function () { registerUpdateUser(2); });
    $('#btnDoTreatTournId5_rem').click(function () { registerUpdateUser(3); });
    //$('#showPlayersBtn5').click(function () { showResults(); });
    //$('#tournRegister5').click(function () { showTournRegisterDialog(1); });
    //$('#tournUpdate5').click(function () { showTournRegisterDialog(2); });

    $('#btnDoTreatTournId5').click(function () { // add user with elo
        var act = $('#modalTournTextHidden5').val();
        var id = $('#inputTournId5').val();
        var user = $('#inputUserId5').val();

        var psw = $('#inputPsw5').val();
        var disp = $('#dispName5').val();
        var elo = $('#elo5').val();
        elo = parseInt(elo);
        if (!elo) elo = 0;
        switch (act) {
        
            default:
                doAddUserToTournamentWithElo(id, user, psw, disp, elo);
                break;
        }

    });
    $('#btnDoTreatEngineId').click(function () { // add engine user
        var grp = $('#inputGroupId3').val();
        var engid = $('#inputEngine3').val();
        var masterid = $('#inputMasterId3').val();
        var id = $('#inputTournId3').val();
        var act = $('#modalTournEngUserTextHidden').val();
        var elo = $('#elo3').val();
        elo = parseInt(elo);
        if (!elo) elo = 0;
        var user = grp + '/' + engid + '/' + 'C_' + engid + '/' + masterid;
        if (elo > 0)
            user += ':' + elo;
        switch (act) {
           
            default:
                doAddUserToTournament(id, user);
                break;
        }

    });
    
    
    $('#startMovesToFen').click(function () {
        //var optionSelected = $(this).find("option:selected");
        //var valueSelected = optionSelected.val();
        var allmoves = $('#startMoves').val();
        var textSelected = allmoves; //"Dynamic line";
        $('#tournName').val('ChessPM ET ' + textSelected);
        var fen = '';
        //var valueSelectedArr = valueSelected.split(',');
     
        //var game = new Chess();
        var chess = new Chess();
        chess.reset();
        // var move1 = chess.move('e4'); chess.move('c5');
        var allpgn = '[Event ""]\n\r' + allmoves;
        chess.load_pgn(allpgn);
        fen = chess.fen(); //getfen();
        $('#inviteFen2').val(fen);
    });
    $('#InvFenSelect').change(function () {
        var optionSelected = $(this).find("option:selected");
        var valueSelected = optionSelected.val();
        var textSelected = optionSelected.text();
        $('#tournName').val('ChessPM ET ' + textSelected);
        var valueSelectedArr = valueSelected.split(',');
        $('#startMoves').val(valueSelectedArr[1]);
        $('#inviteFen2').val(valueSelectedArr[0]);
    });


    $('#torestartengine').click(function () { doRestartEngine(); });
    $('#torestartallengines').click(function () { doRestartAllEngines(); });
    $('#tokillengine').click(function () { doKillEngine(); });
    $('#tokillallengines').click(function () { doKillAllEngines(); });
    $('#tomsgtoengine').click(function () { doMessageEngine(); });

    $('#tocleanlogs').click(function () { doCleanLogs(); });



    $('#tocleanengine').click(function () { doCleanEngine(); });
    $('#tocleanallengines').click(function () { doCleanAllEngines(); });

    $('#btnCCSend').click(function () { doSendCCCommand(); });

});

