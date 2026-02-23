$().ready(function () {
    if (!p_ds || p_ds == '') p_ds = '2';
    // set mobile size
    var wid = document.documentElement.clientWidth;
    if (wid < 420) {
        var w = wid - 20;//   '236';
        var h8 = Math.floor(w / 8);
        var sh = w % 8;
        var wn = h8*8 + 4;
        $('#board').attr('style', 'max-width:' + wn + 'px !important;width:' + wn + 'px !important;');
    }
  
    board = ChessBoard('board', {

        //draggable: true,
        dropOffBoard: 'snapback',
        onMove: moveDone,
        onDragStart: dragStart,
        onDragMove: dragMove,
        draghighlight: false,
        onPromote: promotePiece,
        onBadMove: moveBadDone,
        onReplayFinished: replayFinished,
        onMoveEnd: onMoveEnd,
        checkLegal: true,
        checkTurn: true,
        playOneColor: true,
        sparePieces: false,

        showNotation: true,
        pieceTheme: 'Images/chesspieces/wikipedia' + p_ds + '/{piece}.png',
        square: g_sq,
        position: chess.fen()

    });
    if (p_hboard == '10' || p_hboard == '11' || p_hboard == '12' || p_hboard == '14') {
        var id = 'hboard10board';
        // 140
        var wh = 140;
        if (p_hboard == '11') wh = 124; else if (p_hboard == '12' || p_hboard == '14') wh = 172;
        ddiv = $('<div />').attr('id', id).attr('style', 'position:absolute;width:' + wh + 'px;height:' + wh + 'px;margin-left:15px;z-index:5000;');
        $('#game_uptomoves_html').append(ddiv);
        if (!p_ds || p_ds == '') p_ds = '2';
        //$('#game_uptomoves_html').attr('style', 'min-width:100px;height:100px;');
        hboard10board = ChessBoard(id, {
            showNotation: false,
            pieceTheme: 'Images/chesspieces/wikipedia' + p_ds + '/{piece}.png',
            square: g_sq, // best 9 or 16
            position: ''
        });
    }
    $('#analyze_res').html(''); $('#analyze_res5').html('');
    $(".belowB").removeClass("belowB").addClass("belowB" + g_sq);
    $(".boardbackc").removeClass("boardbackc").addClass("boardbackc" + g_sq);
    $('#game_html').height($('#board_html').height());
    $('#board').append($('<canvas id="board_canvas" width="' + $('#board').width() + 'px" height="' + $('#board').height() + 'px"></canvas>'));

    if (!p_dbsrc || p_dbsrc == '')
        p_dbsrc = 'pgnd'; // 'dbpgn'; // pgnd

    if (!boardscreen && p_solve && p_solve > 0) lt = 12;
   
     
    if (p_dbsrc == 'temp' || p_dbsrc=='pgnd') lt = 12;
    
    if (p_diag == '' || p_diag == null)
        p_diag = 0;
    else
        p_diag = parseInt(p_diag);

    if (p_lat == '' || p_lat == null)
        p_lat = 0;
    if (!p_src && p_dbsrc && p_dbsrc != '')
        p_src = p_dbsrc;
    if ((p_eng == '' || p_eng == null) && p_auth == 0)
        p_eng = '0';
    if (p_auth > 0 || p_psw!='')
        p_eng = '1';
    if (p_eng == '0') {
        $('#engdiv').hide();

    }
    else if (p_eng == '1') {
        $('#engdiv').show();

    } else $('#engdiv').hide();
    if (p_lang == 'h') {
        $('#game_html').css('direction', 'rtl');
        //$('#game_chooser').css('direction', 'rtl');
    }

    if (p_link && p_link != null) {
        var str = '<a style="cursor:hand;" onclick="window.open(\'' + p_link + '\', \'_blank\', \'location=yes,scrollbars=yes,status=yes,fullscreen=yes,menubar=yes\');"><b>Click to open diagram link in new window : <br/>' + p_link + '</b></a><br/>';
        $('#linkhdr').append(str);
        $('#linkhdr').show();
    }
    else {
        p_link = ''; $('#linkhdr').hide();
    }



    setMenuByPsw();

    //if (matchMaxWidthMedia(370)) // phone !!
    //    alert(370);
    if ((p_glist == '' || ! p_glist) && (p_wday != '' && p_wday != null)) {
        p_glist = 'week_' + p_wday;
    }
    else if ((p_glist == '' || !p_glist) && (p_last != '' && p_last != null)) {
        p_glist = 'last_' + p_last;
    }
    else if ((p_glist == '' || !p_glist) && (p_find != '' && p_find != null)) {
        p_glist = 'find_' + p_find;
    }
    else if ((p_glist == '' || !p_glist) && (p_findfen != '' && p_findfen != null)) {
        p_glist = 'findfen_' + p_findfen;
    }
    else if ((p_glist == '' || !p_glist) && (p_player != '' && p_player != null)) {
        p_glist = 'findplayer_' + p_player;
    }
    else if ((p_glist == '' || !p_glist) && (p_player != '' && p_author != null)) {
        p_glist = 'author_' + p_author;
    }

    if (p_glist != '' && p_glist != null)
        lt = 11;
    if (p_search != '' && p_search != null)
        lt = 11;
    if (lt == null && p_gn > 0) // ???
        lt = 11;
    if (p_gnto && p_gnto > 0)
        lt = 11;
    if (!p_annum)
        p_annum = 1;
    if (!p_chooser || p_chooser == '' || p_chooser == '0')
        p_chooser = 1;
    $('.timer').hide();
    $('#timerhdr').hide();
    if (byfen) {
        game_fen_load(p_fen);
       
    }
    //else if (p_tourn && p_tourn != null && p_tourn != "" && p_glist && p_glist != null && p_glist != "") {
    //    lt = 11;
    //    game_html_db_list_load_by_id(p_hm, p_glist, p_load, p_tourn);
    //}
    else if (p_tourn && p_tourn != null && p_tourn != "") {
        lt = 11;
        game_html_db_list_load_by_id(p_hm, p_glist, p_load, p_tourn, '', p_dbsrc);
    }
    else if (p_dbsrc=='games') {
        lt = 11;
        game_html_db_list_load_by_id(p_hm, p_glist, p_load, p_tourn, p_gn);
    }
    else if (lt == 1)
        game_list_html_load(p_gn, p_annum, p_hm);
    else if (lt == 2)
        game_html_load(p_gn, p_annum, p_hm);
    else if (lt == 3)
        game_temp_html_load(p_gn, p_hm);
    else if (lt == 11) {
        if (!p_gnto || p_gnto == 0) p_gnto = p_gn;
        game_html_db_list_load(p_gn, p_gnto, p_hm, p_glist, p_load,p_search);
    }
    else if (lt == 12)
        game_html_db_load(p_gn, p_hm, p_glist);
    else if (lt == 0 || lt == null) // empty - no load
    {
        $('.timer').hide();
        $('#timerhdr').hide();
        //setEmptyBoard();
    }
    else if (lt == 20) // save game
    {
        $('#board_html_repl').hide();
        $('#board_html').show();
        withoutBoard = 2;
        changeColumnsNumber(3);
        $('#board_anal_repl').hide();
        $('#game_save').show();

        $('#timerhdr').hide();
        $('.timer').hide();
    }
    
    if (p_pos && p_pos != 'undefined' && p_link == '') {
        if (p_pos == 'topbrd' || p_pos == '1') {
            p_top = 1;
            scrollToTop();
        }
    }
    else if (p_top && p_top > 0) {
        scrollToTop();
    }
    if (p_play && p_play != 'undefined') {
        if (p_play == '1') {
            //if (p_voice > 0) tellSentence('NEWGAME');
            var tim = 1000;
            if (p_voice > 0)
                tim = 8000;
            lastTim = tim;
            tim = tim * playVel;
         
            setTimeout(function () {
                doReplay(tim);
            }, 2000);
        }
        else if (p_play == '2') {
            //if (p_voice > 0) tellSentence('NEWGAME');
            var tim = 1000;
            if (p_voice > 0)
                tim = 8000;
            lastTim = tim;
            tim = tim * playVel;
         
            setTimeout(function () {

                doReplayFromLast(tim);
            }, 2000);
        }


    }

    if (p_voice > 0) {

        $("#audio1").trigger('load');
        $("#audio2").trigger('load');
        $("#audio3").trigger('load');
        $("#audio4").trigger('load');
        $("#audio5").trigger('load');
        $("#audio6").trigger('load');
        $("#audio7").trigger('load');
        $("#audio8").trigger('load');
        $("#audio0").trigger('load');
        $("#audioa").trigger('load');
        $("#audiob").trigger('load');
        $("#audioc").trigger('load');
        $("#audiod").trigger('load');
        $("#audioe").trigger('load');
        $("#audiof").trigger('load');
        $("#audiog").trigger('load');
        $("#audioh").trigger('load');
        $("#audiok").trigger('load');
        $("#audioq").trigger('load');
        $("#audior").trigger('load');
        $("#audion").trigger('load');
        $("#audiox").trigger('load');
        $("#audioApplause").trigger('load');
        $("#audioNEWGAME").trigger('load');


        //$("#audio1").trigger('load');
    }

    setByHboard(p_hboard);



    if (p_sres && p_sres == 0)
        $('#result').hide();

    if (p_act && p_act != '') {
        if (p_act == 'setpos')
            doSetPosition();
        else if (p_act == 'newpuzzle')
            newPuzzle();
        else if (p_act == 'savepgn')
            prepareSave(1);
        else if (p_act == 'saveyaml')
            prepareSave(3);
        else if (p_act == 'login')
            doUserLogin();
    }

    fillSaveColorsToCombo('b_col');

   
});