$(window).on("load",function () {
    $('[data-toggle="tooltip"]').tooltip({
        animation: true,
        delay: { show: 100, hide: 300 }
    });
    $('button').on('mousedown', function () {
        $('[data-toggle="tooltip"]').tooltip('hide');
    });
    $('[data-toggle="tooltip"]').on('mouseleave', function () {
        $('[data-toggle="tooltip"]').tooltip('hide');
    });  
    $('[data-toggle="tooltip"]').focus(function () {
        $('[data-toggle="tooltip"]').tooltip('hide');
    });
    $('#btnUserLogin').click(function () { doUserLogin(); });
    $('#btnModalLogin').click(function () { doModalLogin(); });
    $('#tologoff').click(function () { doLogoff(); });
    $('#exit_chesspm').click(function () { gotoChessPm(); });
    

    $('#solvHintBtn').on('click', hintOneMove);
    $('#solvPlayBtn').on('click', hintAllGame); // doReplayFromHere(lastTim * playVel));
    $('#solvShowBtn').on('click', showAllNotation);
   

    $('#btnDoSetFen').on('click', setFenOrOtherText);
    $('#btnDoSetFenGame').on('click', setFenAndGameOnBoard);
    $('#btnSaveImgServer').on('click', saveImgOnServer);
    $('#btnSaveImgListServer').on('click', saveImgListOnServer);

    $('#btn_next_move').click(function () {
        clearAllTimeouts();
        next_move();

    });

    $('#btn_prev_move').click(function () {
        clearAllTimeouts();
        prev_move();

    });

    $('#btn_final_position').click(function () {
        clearAllTimeouts();
        final_position();

    });

    $('#btn_initial_position').click(function () {
        clearAllTimeouts();
        //make_move($('#mnum' + 1));
        initial_position();
    });

    $('#btn_flip_board').click(function () {
        clearAllTimeouts();
        remove_arrows();
        remove_squares();

        board.flip();

    });
    $('#btn_flip_board_1').click(function () {
        clearAllTimeouts();
        remove_arrows();
        remove_squares();

        board.flip();

    });
    $('#btn_colors').click(function () {
        //clearAllTimeouts();
        remove_arrows();
        remove_squares();
        var prevsq = g_sq;
        var sq = parseInt(g_sq) + 1;
        if (sq > 17)
            sq = 0;
        p_sq = sq; // ... for many games
        changeImagesColor(sq, prevsq);
        setGameColors(null);

    });


    $('#btn_save_board').click(function () {
        clearAllTimeouts();
        saveTheBoardImage('CPMBoard.png');

    });
    $('#btn_save_board_server').click(function () {
        clearAllTimeouts();
        showImgSaveDialog(0);


    });

    $('#btn_save_board_serverG').click(function () {
        clearAllTimeouts();
        showImgSaveListDialog(0);


    });

    
    $('#plhide').click(function () {

        $('#timerhdr1').hide();
        var h = $('#game_moves_html_wrap').height() + 56;
        $('#game_moves_html_wrap').css("height", h + "px");
    });



    $('#btn_get_fen').click(function () {

        clearAllTimeouts();
        var fen1 = setFenCastleEmpty(lastFen); //.replace('KQkq', '-');
        bootbox.alert
        ({
            message: "" + fen1,
            centerVertical: true
        });
    });
    $('#btn_get_fen_1').click(function () {

        clearAllTimeouts();
        var fen1 = setFenCastleEmpty(lastFen); //lastFen.replace('KQkq', '-');
        bootbox.alert
     ({
         message: "" + fen1,
         centerVertical: true
     });
    });

    $('#btn_refresh_1').click(function () {

        clearAllTimeouts();
        setNewGame(lastGame);
    });

    $('#btn_ins_dolar').click(function () {
        insertDolarRemark();
    });
    $('#btn_ins_diag').click(function () {
        insertDiagram();
    });
    $('#btn_ins_text').click(function () {
        $('#modalTextHidden').val(2);
        $('#SetFenHdr').text('Insert Text');
        $('#SetFenLab').text('Text');

        $('#myModalSetFen').modal('show');
    });
 

    $('#btn_stop_edit').click(function () {


        stopRecording();
     
    });

    $('#btn_insert_line').click(function () {
        startRecording();

    });
    $('#btn_get_pos_link').click(function () {

        clearAllTimeouts();
        var lnk = getBaseLink(1);
        bootbox.alert(lnk);
    });
    $('#btn_get_pos_link_p').click(function () {

        clearAllTimeouts();
        var lnk = getBaseLink(1, 1);
        lnk += '&play=2';
        bootbox.alert(lnk);
    });
    $('#btn_get_pgn').click(function () {

        clearAllTimeouts();
        // getGamePgn();
        if (LastPgn && LastPgn!=null)
            bootbox.alert(LastPgn);
        else
            bootbox.alert('Not active pgn');
    });
    $('#btn_get_pgn_1').click(function () {

        clearAllTimeouts();
        if (lastGame && (lastGame.PgnType == 7 || lastGame.PgnType == 8)) { // allow for comps
            var pgn = createPgnByPgnTypeOfGame(lastGame);
            bootbox.alert(pgn);
            return;
        }
        if (LastPgn && LastPgn != null)
            bootbox.alert(LastPgn);
        else
            bootbox.alert('Not active pgn');
    });
    $('#btn_create_pgn').click(function () {

        clearAllTimeouts();
        clearAllTimeouts();
        if (lastGame && lastGame.PgnType == 7) { // allow for comps
            var pgn = createPgnByPgnTypeOfGame(lastGame);
            bootbox.alert(pgn);
            return;
        }
        var pgn = gameToPgn();
        if (LastPgn && LastPgn != null)
            bootbox.alert(LastPgn); // also
        else
            bootbox.alert('Not active pgn');
    });
    $('#btn_create_pgn1').click(function () {
        var pgn = createPgnByPgnTypeOfGame(lastGame);
        bootbox.alert(pgn);
    });

    $('#btn_analyze').click(function () {
        p_eng = '1';
        $('#engdiv').show();
        clearAllTimeouts();
        setByHboard(3);
        $('#engdiv').removeClass('engdiv_mob_hidden');
        IfNoActiveMoveGotoEnd();
        doAnalyze();
    });
    $('#btn_full_analyze').click(function () {
        p_eng = '1';
        $('#engdiv').show();
        clearAllTimeouts();
        setByHboard(3);
        var scoretype = 1; // 0 = regular , 1=all ??
        $('#engdiv').removeClass('engdiv_mob_hidden');
        doFullAnalysis(initial_fen, getMovesList(), scoretype);
    });
    $('#btn_man_analyze').click(function () {
        p_eng = '1';
        $('#engdiv').show();
        clearAllTimeouts();
        var link1 = 'Chess/?state=3&fen=' + lastFen;
        location.href = link1;
        //var uri_enc = encodeURIComponent(link2);

    });

    $('#btn_full_analyze_sc_5').click(function () { // not all scores
        p_eng = '1';
        $('#engdiv').show();
        clearAllTimeouts();
        setByHboard(3);
        var scoretype = 0; // 0 = regular , 1=all ??
        $('#engdiv').removeClass('engdiv_mob_hidden');
        doFullAnalysis(initial_fen, getMovesList(), scoretype);
    });
    $('#btn_full_analyze_pos').click(function () { // not all scores
        p_eng = '1';
        $('#engdiv').show();
        clearAllTimeouts();
        var scoretype = 10; // 0 = regular , 1=all ?? 10=pos
        $('#engdiv').removeClass('engdiv_mob_hidden');
        doPositionAnalysis(lastFen, scoretype, 0); //getMovesList(), scoretype);
    });

    $('#btn_full_analyze_posfull').click(function () { // not all scores
        p_eng = '1';
        $('#engdiv').show();
        clearAllTimeouts();
        var scoretype = 10; // 0 = regular , 1=all ?? 10=pos
        $('#engdiv').removeClass('engdiv_mob_hidden');
        doPositionAnalysis(lastFen, scoretype, 1); //getMovesList(), scoretype);
    });
    $('#btn_save_game').click(function () {

        clearAllTimeouts();
        setByHboard(4);
        //$('#pgn_type').val('1');
        disp_game_save_panel('Save', LastPgn);
        //$('#pgn_text_area').val(LastPgn);
        SaveUpd = 1;

    });
    $('#btn_new_puzzle').click(function () {

        newPuzzle();

    });


    $('#btn_save_list').click(function () {
        //$('#game_dosave_btn').html('SaveList');
        clearAllTimeouts();
        setByHboard(4);
        //$('#pgn_type').val('1');
        disp_game_save_panel('SaveList', LastPgn);
        //$('#pgn_text_area').val(LastPgn);
        SaveUpd = 3;

    });
    $('#btn_show_game').click(function () {
        //$('#game_dosave_btn').html('Show');
        clearAllTimeouts();
        setByHboard(4);
        //$('#pgn_type').val('1');
        disp_game_save_panel('Show', '');
        //$('#pgn_text_area').val('');
        //$('#pgn_text_area').val(LastPgn);
        SaveUpd = 10;

    });
    $('#btn_set_position').click(function () {
        doSetPosition();


    });
    $('#btn_new_position_game').click(function () {
        //doNewPositionGame();
        showFenGameDialog();

    });


    $('#btn_slower').click(function () {
        if (playVel == 0) playVel = 1;
        playVel = playVel * 1.2;
        clearAllTimeouts();
        doReplayFromHere(lastTim * playVel);

    });
    $('#btn_faster').click(function () {
        if (playVel == 0) playVel = 1;
        playVel = playVel * 0.8;
        clearAllTimeouts();
        doReplayFromHere(lastTim * playVel);
    });
    $('#btn_vel_reg').click(function () {
        playVel = 1.0;
        clearAllTimeouts();
        doReplayFromHere(lastTim * playVel);
    });

    $('#btn_stop_anal').click(function () {
        if (ws.engid == '' && ws.wsnum == -1) {
            //$('#engdiv').removeClass('engdiv_mob_hidden');
            doPositionAnalysis(lastFen, 10, 0);
        }
        else {
            //$('#engdiv').addClass('engdiv_mob_hidden');
            stopAnalysis();
        }
    });

    $('#btnModalForgot').click(function () {
        $('#myModalLogin').modal('hide');
        doUserForgot();
    });
    $('#btnModalToRegister').click(function () {
        $('#myModalLogin').modal('hide');
        doUserRegister();
    });
    $('#btnDoTreatTournId8_add').click(function () {
        registerChessPMUser(1);
    });


    $('#btn_mute').click(function () {
        p_voice = p_voice > 0 ? 0 : 1;
        //if (p_voice > 0) {// change timeout
        if (lastTim < 3000 && p_voice > 0) {
            lastTim = 7000;
            playVel = 1.0;
            clearAllTimeouts();
            doReplayFromHere(lastTim * playVel);
        }
        else if (lastTim > 3000 && p_voice == 0) {
            lastTim = 1200;
            playVel = 1.0;
            clearAllTimeouts();
            doReplayFromHere(lastTim * playVel);
        }
        //}
    });
    $('#btn_limitmoves').click(function () {
        limitMoves = limitMoves > 0 ? 0 : 20;
    });

    $('#btn_stop').click(function () {
        clearAllTimeouts();
        playFromStart = 1;
    });
    $('#btn_pause').click(function () {
        clearAllTimeouts();
        playFromStart = 0;
    });

 
    $('#btn_nextgame').click(function () {
        nextGame();

    });
    $('#btn_prevgame').click(function () {
        prevGame();
    });

    $('#btn_update_game').click(function () {
        //$('#game_dosave_btn').html('Update');
        clearAllTimeouts();
        setByHboard(4);
        //$('#pgn_type').val('1');
        disp_game_save_panel('Update', LastPgn);
        //$('#pgn_text_area').val(LastPgn);
        SaveUpd = 2;

    });


    $('#game_dosave_btn').click(function () {

        if ($('#pgn_text_area').val() == '') {
            bootbox.alert('Please paste the game !');
        }
        else {

            var hidem = $('#hidem').val(); //.is(":checked");
            if (hidem < 0) hidem = 0;

            var bcol = $('#b_col').val();
          if (bcol < 0) bcol = 0;
          var keys = $('#keysval').val();
          if (!keys)
            keys = '';
          DoSendGameToServer($('#pgn_text_area').val(), SaveUpd, LastId, $('#pgn_type').val(), hidem, bcol, keys);

        }


    });

    $('#game_doclear_btn').click(function () {

        $('#pgn_text_area').val('');


    });
    $('#pgn_prepare').click(function () {

        pgnPrepare();


    });


    $('#game_doclose_btn').click(function () {

        setByHboard(5);


    });

    
    //$('#btn_capture').click(function () {
    //    startCapture();       

    //});
    //$('#btn_capture_stop').click(function () {       
    //    stopCapture();
    //});
    


    $('#btn_replay_stop').click(function () {
        clearAllTimeouts();
        $('#btn_replay').hide(); $('#btn_replay_here').show();
        $('#btn_replay_stop').hide();
        //..
    });
    
    $('#btn_replay_here').click(function () {
        $('#btn_replay').hide(); $('#btn_replay_here').hide();
        $('#btn_replay_stop').show();
        clearAllTimeouts();
        //if (p_voice > 0) tellfast('NEWGAME', 2.0);
        var tim = 2000;
        if (p_voice > 0)
            tim = 7000;
        lastTim = tim;
        tim = tim * playVel;
        setTimeout(function () {
            doReplayFromHere(tim);
        }, 2000);
    });

    $('#btn_replay').click(function () {
     
        var tim = 800;
        if (p_voice > 0)
            tim = 7000;        
        tim = tim * playVel;

        callReplay(tim);

    });

    callReplay = function (tim, cmdArr) {
        if (recordscreen) {
            $('#plhide').hide();
            
        }
        $('#btn_replay').hide(); $('#btn_replay_here').hide();
        $('#btn_replay_stop').show();
        lastTim = tim;
        clearAllTimeouts();
        if (!playFromStart) {
            doReplayFromHere(tim, cmdArr); return;
        }
        if (p_voice > 0) tellfast('NEWGAME', 2.0);
        //if (captureOn)
        //    doReplay(tim);
        //else
        
        setTimeout(function () {
            doReplay(tim, cmdArr);
        }, 1200);
    }
    $('#btn_replay1').click(function () {
        $('#btn_replay').hide(); $('#btn_replay_here').hide();
        $('#btn_replay_stop').show();
        clearAllTimeouts();

        var tim = 2000;
        if (p_voice > 0)
            tim = 9000;
        lastTim = tim;
        tim = tim * playVel;
        if (!playFromStart) { doReplayFromHere(tim); return; }
        if (p_voice > 0) tellfast('NEWGAME', 2.0);
        setTimeout(function () {
            doReplay(tim);
        }, 2000);
    });
    $('#btn_removearr').click(function () {
        remove_arrows();

    });
    $('#btn_replayAll').click(function () {
    });

    $('#btn_replayHere').click(function () {
        $('#btn_replay').hide(); $('#btn_replay_here').hide();
        $('#btn_replay_stop').show();
        clearAllTimeouts();
        //if (p_voice > 0) tellfast('NEWGAME', 2.0);
        var tim = 2000;
        if (p_voice > 0)
            tim = 7000;
        lastTim = tim;
        tim = tim * playVel;
        setTimeout(function () {
            doReplayFromHere(tim);
        }, 2000);
    });

    $('#next_move').keyup(function (e) {
        if (e.keyCode == 13) {
            sendMoveToEngine();
        }
    });
    $('#next_move_btn').click(function () {
        sendMoveToEngine();
    });
    $('#eng_set_btn').click(function () {
        clearAllTimeouts();

        engwb = $('#eng_color_chooser').val();
        mywb = 3 - engwb;
        if (mywb == 3) mywb = 0;
        engtime = $('#eng_time').val();

        initial_fen = $('#eng_start_fen').val();
        initial_position();
        if (initial_fen != '' || initial_fen == '') {
            // clear the game - may be any case ??
            remove_arrows();
            remove_squares();
            setEmptyGame();
        }

        $('#analyze_fen').html('Set values, Fen: ' + lastFen);
    });
    $('#showhide_btn').click(function () {
        clearAllTimeouts();
        withoutBoard = 3 - withoutBoard;
        if (withoutBoard == 3)
            withoutBoard = 0;
        if (withoutBoard == 1) {
            $('#board_html').hide();
            changeColumnsNumber(2);
        }
        else if (withoutBoard == 2) {
            $('#board_html').show();
            changeColumnsNumber(3);
        }
        else if (withoutBoard == 0) {
            $('#board_html').hide();
            changeColumnsNumber(2);
        }
    });
    $('#anal_to_game_btn').change(function () {
        var ob = $(this);

        if (ob[0].value == '2') {
            TransferGameOnAnalysis = 2;
        }
        else
            TransferGameOnAnalysis = 1;
        var pgn = getPgnHeader(lastGame, 1, lastAnalFen) + $('#gameanalyze_res').html();
        pgn = pgn.replace(/<br>/gi, '\n');
        game_pgn_load(pgn,1);
    });
    $('#btn_show_hide_notation').click(function (e) {

        e.preventDefault();
        var btn = $(this);
        clearAllTimeouts();
        if ($('#board .notation-322f9').hasClass('notation_visible')) {

            $('#board .notation-322f9').removeClass('notation_visible');
            btn.find('span').text('Show Notation');

        } else {

            $('#board .notation-322f9').addClass('notation_visible');
            btn.find('span').text('Hide Notation');

        }

    });

    //var ti1 = 1000; if (lastGame && lastGame != null && lastGame.GamePGN && lastGame.GamePGN != null) {
    //    var ll1 = lastGame.GamePGN.length;
    //    if (ll1 > 400) ti1 = 3000; else if (ll1 > 250) ti1 = 2000;
    //}
    //setTimeout(function () {
        $("#game_moves_html .move").on('click', function (event) {
            event.stopPropagation();
            event.stopImmediatePropagation();
            clearAllTimeouts();
            make_move($(this), event);
            $('#analyze_res5').html('');
            stopAnalysisIfNeeded();
        });
        $("#game_moves_html .move").on('mousemove', function (event) {
            //dispMoveBoard
        });
    //}, ti1);

        $("#game_moves_html").on('click', function (event) {
            if(locked)
                unlockScreen();
        });
        $("#board_html").on('click', function (event) {
            if (recording.active) {
                if (!locked)
                    lockScreen();
            }
      });
        $("#board_html").on('tap', function (event) {
            if (recording.active) {
                if (!locked)
                    lockScreen();
            }
      });
        $("#solvediv").on('click', function (event) {
            if (recording.active) {
                if (!locked)
                    lockScreen();
            }
        });

    // capturer
        //set_one_command
        $("#set_one_command").on('click', function (event) {
            if (recordscreen && commandBuilder) {
                var str = setOneCommand();

            }
        });
        $("#save_commands").on('click', function (event) {
            if (recordscreen && commandBuilder && lastGame && lastGame!=null) {
                var str = getCommandString();
                DoReplaceCommand(lastGame.GameId, 1, p_psw, str);
            }
        });
        

    //
        $('#rechmnum').on('click', function (e) {
            var optionSelected = $("option:selected", this);
            p_hmnum = this.value;
            move_by_hnum(p_hmnum);
            //setCommand(p_hmnum);
        });
        $('#rec_add').on('click', function (e) {
            var optionSelected = $("option:selected", this);
            var txt = this.value;
            $('#rectext').val(txt);
        });
        
        inFrame = inframe();
        if (inFrame<2) { // not in gen 
            if ($('#noframehdr'))
                $('#noframehdr').show();
        }
    try {
        if (inFrame) frameTop = window.parent.document.getElementById("framewrap").offsetTop;
    } catch (e) { }
      //  adjustFrameHeight();
        //if (board)
    //    board.resize();

});

$(document).keydown(function (e) {
    clearAllTimeouts();
    if (e.which == 37) {

        e.preventDefault();
        prev_move();

    } else if (e.which == 39) {

        e.preventDefault();
        next_move();

    }

});

$(window).resize(function () {
    adjustFrameHeight();
    //adjustBoard();
});

//$('body').on('click', '#game_moves_html .move', function () {
//    clearAllTimeouts();
//    make_move($(this));
//    $('#analyze_res5').html('');
//    stopAnalysisIfNeeded();
//});