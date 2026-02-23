function getRemObject() {
    var remvar = {};
    remvar.ItemType = 2; // default
    var mov = {};
    remvar.Move = mov;
    remvar.Text = '';
    remvar.SubVariantList = [];
    return remvar;
    //getPgnFromMovObjRemSubLis
}

function getRemMoveObject(MoveNum, IsWhite, MType, fenAfter, StartPos, EndPos, Helper, OriginalPiece) {
    var remvar = {};
    remvar.ItemType = 1;

    var mov = getMoveObject(MoveNum, IsWhite, MType, fenAfter, StartPos, EndPos, Helper, OriginalPiece);
    remvar.SubVariantList = null;
    remvar.Move = mov;
    return remvar;
}
function getMoveObject(MoveNum, IsWhite, MType, fenAfter, StartPos, EndPos, Helper, OriginalPiece) {
    var mov = {};
    mov.MType = MType;
    mov.Type = MType;
    mov.EndPos = EndPos;
    mov.StartPos = StartPos;
    mov.Helper = Helper;
    mov.OriginalPiece = OriginalPiece;
    mov.MoveNum = MoveNum;
    mov.IsWhite = IsWhite;
    mov.MColorWhite = IsWhite;
    mov.fenAfter = fenAfter;
    mov.engScore = 0;
    mov.startCord = null;
    mov.endCord = null;
    mov.Text = '';
    return mov;
}
function getTextRemObject(txt, typ) {
    if (!typ)
        typ = 0;
    var remvar = {};
    remvar.ItemType = typ;
    var mov = {};
    remvar.Move = mov;
    remvar.Text = txt;
    remvar.SubVariantList = null;
    return remvar;
}
function getRemListByMoveNum(mnum, setCurrent) {
    if (!setCurrent && (!recording.lastGame || recording.lastGame == null))
        recording.lastGame = lastGame;
    if (recording.lastGame && recording.lastGame != null) {
        var remList = recording.lastGame.RemarkVariationsList[mnum + 1];
        var remVar = {};
        if (remList == null) {
            remList = [];
            recording.lastGame.RemarkVariationsList[recording.remId + 1] = remList;
        }
        else {

        }
        if (setCurrent) {
            recording.currentRemVarList = remList;
            var remObj = getRemObject();
            recording.currentRemVarList.push(remObj);
            recording.currentRemVarSubList = remObj.SubVariantList;
        }
        else {
             
        }
        return remList;
    }
    else
        return null;
}


stopRecording = function () {

    clearAllTimeouts();
    //recording.updated = false;
    recording.active = false;
    recording.col = 'w'; recording.mnum = 1; recording.wb = 1;
    recording.lastmoveidtoaddtext = '';
    lastmove = {};
    lastmove.mnumstr = '';
    lastmove.lastFen = '';
    lastmove.mnum = 1; //p_hmnum;
    lastmove.wb = 1;
    lastmove.varid = '';
    lastmove.id = '';




    recording.problemList = {};

    $('#PlayerBlackInMove').hide(); $('#PlayerWhiteInMove').hide();
    $('#btn_insert_line').show();
    $('#btn_stop_edit').hide();

    $('#board_canvas').show(); // this is bad for dragging
    $('#btn_refresh_1').show(); 
    board.setDraggable(false);
}

startRecording = function () {
    $('#btn_insert_line').hide();
    $('#btn_stop_edit').show();
    $('#btn_refresh_1').show(); // ???
    
    clearAllTimeouts();
    board.setDraggable(true);
    $('#board_canvas').hide(); // this is bad for dragging
    var mainLine = false;
    recording.active = true;
    recording.playState = 1;
    recording.col = 'w'; recording.mnum = 1; recording.wb = 1;
    recording.lastmoveidtoaddtext = '';
    if (lastFen == '')
        lastFen = start_Board_Fen;
    if (!lastGame || lastGame == null || !lastFen || !lastmove || lastmove == null || lastmove.id == "") {
        // from start mainLine
        mainLine = true;
        if (!lastmove || lastmove == null) {
            lastmove = {};
            lastmove.mnumstr = '';
            lastmove.lastFen = lastFen;
            lastmove.mnum = 1; //p_hmnum;
            lastmove.wb = 1;
            lastmove.varid = '';
            lastmove.id = '';
        }
        recording.lastFen = lastFen;
        recording.lastGame = lastGame;
    }
    else {
        mainLine = false;
        recording.lastFen = lastFen;
        recording.lastGame = lastGame;
    }
    recording.lastmove = lastmove;
    recording.mainLine = mainLine;
    if (lastFen && lastFen != '') {
        var fenarr = lastFen.split(' ');
        if (fenarr != null && fenarr.length > 1)
            recording.col = fenarr[1];
    }
    if (lastmove && lastmove.mnumstr != null) {
        var numcol = lastmove.mnumstr.split('_');
        if (numcol.length > 1) {
            recording.mnum = parseInt(numcol[0]);
            recording.wb = parseInt(numcol[1]);
        }
        else {
            recording.mnum = 1;
            recording.wb = 1;
        }
    }
    else {
        recording.mnum = 1;
        recording.wb = 1;
    }
    // the id is to next move
    var id = recording.lastmove.id;
    recording.remId = 0;

    if (id == '') {
        recording.remId = 0;
        var nmn = recording.remId + 1;
        id = 'mnum' + nmn;
    }
    else if (id.indexOf('x') > 0) {

    }
    else {
        var mn = id.replace('mnum', '');
        recording.remId = parseInt(mn);
        var nmn = recording.remId + 1;
        id = 'mnum' + nmn;
    }
    // recording.currentRemVarList = [];

    recording.problemList = {};
    if (recording.mainLine) {
        recording.currentRemVarList = null;
        if (!recording.lastGame || recording.lastGame == null) {

            setEmptyBoard();
            setEmptyGame();
            recording.lastGame = lastGame;
            recording.currentRemVarList = null;
            recording.currentRemVarSubList = null;

        }
        recording.problemList = listOfMovesForRec(lastGame);// lastGame.problemList;
    }
    else
    {
        getRemListByMoveNum(recording.remId, true);
    }

    var ncol = 'w';
    if (!recording.mainLine)
        ncol = recording.wb == 1 ? 'b' : 'w';
    board.setPlayColor(ncol);
    if (ncol == 'w') { $('#PlayerBlackInMove').hide(); $('#PlayerWhiteInMove').show(); }
    else { $('#PlayerBlackInMove').show(); $('#PlayerWhiteInMove').hide(); }
    // get next move                
    //recording.wb = recording.wb == 1 ? 2 : 1;
    //if (recording.wb == 1) recording.mnum++;
    recording.lastdivid = id;
    recording.fatherid = recording.lastmove.id;
    recording.startvar = true;
    recording.varlevel = 0;
    recording.lastvaridnum = 0;
    var previd = recording.lastdivid;
    if (recording.mainLine) {
        previd = 'game_moves_html';
        recording.fatherid = previd;
        recording.lastdivid = previd;
    }

    // add not brackets
    var mstr = '';
    //if (recording.startvar) {
    if (!recording.mainLine) {
        recording.lastvaridnum = 1;
        var newid = recording.fatherid + 'brc1';
        recording.lastdivid = newid;
        mstr += '<div class="variant">' + '<span id="' + newid + '">(</span>';
        mstr += '<span> )</span></div>';
        if (previd == 'game_moves_html')
            $("#" + previd).html(mstr); // inside
        else
            $("#" + previd).after(mstr);
    }
    //}

    //recording.startvar = false;

    //recording.mnum = recording.lastmove.mnum;
    //if (fenarr != null && fenarr.length > 5)
    //   recording.movenum = parseInt(fenarr[5]);
    recording.line = '';
    chess.load(lastFen);
}

function sDolar(id) {
    insertDolarRemark(id);
}
function insertDolarRemark(id) {
    if (!id) id = '1';
    if (!recording.lastmoveidtoaddtext || recording.lastmoveidtoaddtext == '') {
        recording.lastmoveidtoaddtext = 'mnum0';
        recording.lastvaridnum = 0;
        recording.fatherid = recording.lastmoveidtoaddtext + 'xx1';
    }
    if (recording.lastmoveidtoaddtext && recording.lastmoveidtoaddtext != '') {
        recording.updated = true;
        recording.startvar = false;
        previd = recording.lastmoveidtoaddtext;
        var mstr = previd.replace('mnum', '');
        var hmnum = previd.replace('mnum', '');
        if (previd.indexOf('v') > 0) {
            var p1 = previd.indexOf('x');
            hmnum = previd.substr(0, p1 + 1).replace('mnum', '');
        }
        mnum = parseInt(hmnum);
        recording.lastvaridnum++;
        var newid = recording.lastmoveidtoaddtext + 'rxx' + recording.lastvaridnum;
        var txt = '$'+id; // ....
       
     
        var remList = getRemListByMoveNum(mnum, false);
        var remvar = getTextRemObject(txt, 5);

        remList.push(remvar);
      
        // dom
        //var fatherDiv = '<div id="' + newid + '" class="" style="display:inline;"><span class="comment">' + txt + '</span></div>';
        var signid = 'sign15'; // // was sign10 'sign20'; // ????
        var fatherDiv = $('<span />').attr('class', signid + add_lang).html(getDolarSign(txt));
        recording.lastdivid = newid;

        //recording.startvar = false;
        //recording.varlevel = 0;

        if (previd == 'game_moves_html')
            $("#" + previd).html(fatherDiv); // inside
        else if (previd == 'mnum0') {
            var firstafterc = $("#game_moves_html").children();
            var firstafter;
            if (firstafterc != null)
                firstafter = $(firstafterc).first();
            if (firstafter == null)
                $("#" + 'game_moves_html').html(fatherdiv);
            else {
                previd = firstafter.attr('id');
                if (previd == null || previd == 'undefined')
                    $("#" + 'game_moves_html').prepend(fatherdiv);
                else
                  $("#" + previd).before(fatherdiv);
            }
            // $("#" + 'game_moves_html').html(fatherdiv + $("#" + 'game_moves_html').html()); // inside
        }
        else
            $("#" + previd).after(fatherDiv);
    }

}

//function getRemVarList() {
//    var remObj = getRemObject();
//    return remObj;
//    recording.currentRemVarList.push(remObj);
//    recording.currentRemVarSubList = remObj.SubVariantList;
//}
function insertDiagram() {
    if (!recording.lastmoveidtoaddtext || recording.lastmoveidtoaddtext == '') {
        recording.lastmoveidtoaddtext = 'mnum0';
        recording.lastvaridnum = 0;
        recording.fatherid = recording.lastmoveidtoaddtext + 'xx1';
    }
    if (recording.lastmoveidtoaddtext && recording.lastmoveidtoaddtext != '') {
        recording.updated = true;
        recording.startvar = false;
        previd = recording.lastmoveidtoaddtext;
        var mstr = previd.replace('mnum', '');
        var hmnum = previd.replace('mnum', '');
        if (previd.indexOf('v') > 0) {
            var p1 = previd.indexOf('x');
            hmnum = previd.substr(0, p1 + 1).replace('mnum', '');
        }
        mnum = parseInt(hmnum);
        recording.lastvaridnum++;
        var newid = recording.lastmoveidtoaddtext + 'rxx' + recording.lastvaridnum;
        
        var txt = '[#]';

        var remList = getRemListByMoveNum(mnum, false);
        var remvar = getTextRemObject(txt,5);
     
        remList.push(remvar);
        
        // insert in dom 
        var fatherdiv = $('<div />');
        if (previd == 'game_moves_html')
            $("#" + previd).html(fatherdiv); // inside
        else if (previd == 'mnum0') {
            var firstafterc = $("#game_moves_html").children();
            var firstafter;
            if (firstafterc != null)
                firstafter = $(firstafterc).first();
            if (firstafter == null)
                $("#" + 'game_moves_html').html(fatherdiv);
            else {
                previd = firstafter.attr('id');
                if(previd==null || previd=='undefined')
                    $("#" + 'game_moves_html').prepend(fatherdiv);
                else 
                    $("#" + previd).before(fatherdiv);
            }
           // $("#" + 'game_moves_html').html(fatherdiv + $("#" + 'game_moves_html').html()); // inside
        }
        else
            $("#" + previd).after(fatherdiv);
        insertSmallDiagramDiv(fatherdiv);
    
       
      
    }
}

// text as default after clicked move
function setRemarkText(txt) {
    recording.updated = true;
    var previd = recording.lastdivid;
    var mnum = -1;
    if (!recording.lastmoveidtoaddtext || recording.lastmoveidtoaddtext == '') {
        recording.lastmoveidtoaddtext = 'mnum0';
        recording.lastvaridnum = 0;
        recording.fatherid = recording.lastmoveidtoaddtext + 'xx1';
    }
    if (recording.lastmoveidtoaddtext != '') {
        previd = recording.lastmoveidtoaddtext;
        var mstr = previd.replace('mnum', '');
        var hmnum = previd.replace('mnum', '');
        if (previd.indexOf('v') > 0) {
            var p1 = previd.indexOf('x');
            hmnum = previd.substr(0, p1 + 1).replace('mnum', '');
        }
        mnum = parseInt(hmnum);
    }
    var mstr = '';

    recording.lastvaridnum++;

    var newid = recording.fatherid + 'rx' + recording.lastvaridnum;
  

    mstr += '<div id="' + newid + '" class="" style="display:inline;"><span class="comment">' + txt + '</span></div>';

    recording.lastdivid = newid;

    recording.startvar = false;
    recording.varlevel = 0;

    if (previd == 'game_moves_html')
        $("#" + previd).html(mstr); // inside
    else if (previd == 'mnum0') {
        var firstafterc = $("#game_moves_html").children();
        var firstafter;
        if (firstafterc != null)
            firstafter = $(firstafterc).first();
        if (firstafter == null)
            $("#" + 'game_moves_html').html(mstr);
        else {
            previd = firstafter.attr('id');
            if (previd == null || previd == 'undefined')
                $("#" + 'game_moves_html').prepend(mstr);
            else
              $("#" + previd).before(mstr);
        }
        // $("#" + 'game_moves_html').html(fatherdiv + $("#" + 'game_moves_html').html()); // inside
    }
    else
        $("#" + previd).after(mstr);


    var remvar = getTextRemObject(txt);

    // change !!! to mnum
    if (recording.mainLine) {
        //recording.problemList.push(remvar);
        recording.currentRemVarSubList.push(remvar);
    }
    else {
        recording.currentRemVarSubList.push(remvar);
    }
}