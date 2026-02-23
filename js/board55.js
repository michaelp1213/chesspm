setPositionBoard = function (frboard) {

    var xx = lastFen;
    if (!lastBoardFen || lastBoardFen == null)
        lastBoardFen = lastFen;
    var underid = '#board_html_set'; //'#game_moves_html';
    $(underid).empty();

    var id = 'board55';
    var wid = 310;
    if (!p_ds || p_ds == '') p_ds = '2';
    if (frboard && frboard != null) {
        if (frboard == 1) wid = 260;
    }
    ddiv = $('<div />').attr('id', id).attr('style', 'width:'+wid+'px;height:430px;margin-left:20px;');
    $(underid).append(ddiv);
    board55 = ChessBoard(id, {
        checkLegal:false,
        draggable: true,
        dropOffBoard: 'trash',
        allowPoint: false,
        checkDragColor: false,

        sparePieces: true,
        showNotation: true,
        square: g_sq,
        pieceTheme: 'Images/chesspieces/wikipedia' + p_ds + '/{piece}.png',
        position: lastBoardFen
    });
    //var o = $(nearid).offset();
    //$(underid).append($('<br />')); $(underid).append($('<br />')); $(underid).append($('<br />')); $(underid).append($('<br />'));

    var wMove = true;
    var col1 = board55.getStartFenCol();
    if (col1 == 'b') wMove = false;

    var id = '555'; var name = 'White Move ?';
    var cbx = $('<input />', { type: 'checkbox', id: 'cb' + id, value: name, }).attr('style', 'margin-left:10px;font-weight:300;').appendTo(underid);
    $('<label />', { 'for': 'cb' + id, text: name }).attr('style', 'margin-left:10px;font-weight:300;').appendTo(underid);
    if (wMove)
        $(cbx).attr('checked', 'checked');
    else
        $(cbx).removeAttr('checked');
    finishBtn = $('<button />').attr('id', 'finishBtn').text('Finished').attr('style', 'margin-left:70px;width:100px;font-weight:600;margin-right:40px;');
   // if (frboard && frboard == 1) { }
   // else
       $(underid).append(finishBtn);
    $(underid).append($('<br />'));

    startBtn = $('<button />').attr('id', 'startBtn').text('Start position').attr('style', 'margin-left:10px;font-weight:600;'); //.attr('style', 'position:absolute;width:200px;height:200px;margin-left:10px;');
    clearBtn = $('<button />').attr('id', 'clearBtn').text('Clear Board').attr('style', 'margin-left:10px;font-weight:600;');
    setFenBtn = $('<button />').attr('id', 'setFenBtn').text('Set FEN').attr('style', 'margin-left:10px;min-width:90px;font-weight:600;');


    $(underid).append(startBtn);
    $(underid).append(clearBtn);
    if (frboard && frboard == 1) { }
    else         
        $(underid).append(setFenBtn);
    
    $(startBtn).on('click', board55.start);
    $(clearBtn).on('click', board55.clear);
    $(setFenBtn).on('click', showFenDialog);
    $(finishBtn).on('click', finishedPosition);
    $('.spare-pieces-top-4028b').css('margin-bottom', '10px');
    $('.spare-pieces-bottom-ae20f').css('margin-top', '10px');
    if (frboard && frboard == 1) { }
    else 
    lockScreen();
}

setFenOrOtherText = function () {
    var typ = $('#modalTextHidden').val();
    if (typ < 2)
        setFenOnBoard55();
    else if (typ == 2) {
        // remark text
        var txt = $('#inputFen1').val().trim();
        setRemarkText(txt);
    }
}

setFenOnBoard55 = function () {
    var fen = $('#inputFen1').val().trim();
    if (board55) {
        var col = 'w';
        var fenarr = fen.split(' ');
        if (fenarr != null && fenarr.length > 1)
            col = fenarr[1];
        var prcolwb = (col == 'b') ? 'w' : 'b';
        board55.setFen(fen, prcolwb);
    }
    $("#myModalSetFen").modal('hide');
}
finishedPosition = function () {
    if (board55) {
        var wb = $('#cb555').is(":checked");
        if (wb) board55.setPlayColor('w'); else board55.setPlayColor('b');
        fen = board55.getFen();
        var lf = '\r\n'; // var lf = '<br>';
        LastPgn = '[Event ""]' + lf + '[FEN "' + fen + '"]' + lf;
       
        lastBoardFen = fen;
        if (!boardscreen) {
          $('#pgn_text_area').val(LastPgn);
          $('#keysval').val(LastKeys);
            var underid = '#board_html_set'; //'#game_moves_html';
            $(underid).empty();
            $(underid).hide();
            var gameid = '#board_html_inner';
            $(gameid).show();
            SaveUpd = 11;
            DoSendGameToServer(LastPgn, SaveUpd);
        }
        else {
           // setBoard55Fen(fen);
            $('#fenText').val(fen);
            p_fen = fen;
            display();
        }
    }
    unlockScreen();
}