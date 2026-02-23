DoSendGameToServer = function (pgn_text_area, SaveUpd, LastId, pgn_type, hidem, bcol,keys) {
    var totemp = p_dbsrc == 'temp'; // now only for regular save ??
    LastPgn = pgn_text_area; // ..
    if (!hidem || hidem == null) hidem = 0; //false;
  var hidemov = hidem; // ? 1 : 0;
  if (!keys)
    keys = '';
  //keys = keys || ""; // if null or undef
  keys = keys.replace(/'/g, "");
    if (SaveUpd == 2)
      DoReplace(pgn_text_area, LastId, pgn_type, hidemov, 1, p_psw, '', bcol, '', '', totemp, '', keys);
    else if (SaveUpd == 3)
      DoSave(pgn_text_area, pgn_type, hidemov, 0, 0, p_psw, bcol, 0, '', '', 1, '', keys);
    else if (SaveUpd == 10)
        DoShow(pgn_text_area, pgn_type, hidemov, 0, 0, p_psw);
    else if (SaveUpd == 11)
        DoShow(pgn_text_area, pgn_type, hidemov);
    else if (SaveUpd == 15) {
        DoShow(pgn_text_area, pgn_type, hidemov, 1);
        clearAllTimeouts();
        p_gn = 0;
        showImgSaveDialog(1);
    }

    else
      DoSave(pgn_text_area, pgn_type, hidemov, 0, 0, p_psw, bcol, totemp, '', '', 1, '', keys);
}

saveImgOnServer = function () {
    saveTheBoardImageToServer();
    $("#myModalSaveBoard").modal('hide');
}

saveImgListOnServer = function () {
    saveTheBoardImageListToServer();
    $("#myModalSaveBoardList").modal('hide');
}

saveTheBoardImage = function (nam) {
    //board  cboard11
    var el1 = $("#board21"); //$('#frame1').contents().find('#board21');  

    if (el1[0])
        el1 = el1[0];
    html2canvas(el1).then(  
    
        function (canvas) { 
        //(el1, {
        //onrendered: function (canvas) {
            var myImage = canvas.toDataURL("image/png");
            //myImage = myImage.replace('data:image/png;base64,', '');
            myImage = myImage.replace("image/png", "image/octet-stream");
            var link = document.createElement("a");
            link.download = nam;
            link.href = myImage;
            link.click();



            //bootbox.alert('File ' + nam + ' saved  !');
        }
   
     
   )
   
}

//    });
//}

tryLogin = function (name, pass) { 
    $.ajax({
        type: "POST",
        url: "ws/ViewService.asmx/LoginAuth",
        data: "{'name': '" + name + "', 'pass': '" + pass + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var passauth = data.d; // JSON.parse(data.d);
            var parr = passauth.split(',');
            if (parr != null && parr.length > 1) {
                p_psw = parr[0];
                p_auth = parr[1];
            }
          
             
            setCookie('psw', p_psw, 7);
            setCookie('auth', p_auth, 7);
            setMenuByPsw();
           
        },
        error: function (result) {
            var x = 1;
        }
    });
}
saveTheBoardImageToServer = function () {
    var fcode = $("#gameId").val(); //p_gn; //'xxx';
    var pgn_type = $('#pgn_type').val()
    var tosave = $("#hidsavetoo").html();
    //alert(tosave);
    var hidemov = 0;
    if (tosave && tosave > 0) {
        var psw = $("#savePassword").val();
        DoSave(LastPgn, pgn_type, hidemov, 1, 1, psw, '', 0, '', '', 1, '');
        p_psw = psw;
    }
    else
        saveTheBoardImageToServerDo(fcode, 0);
}
saveTheBoardImageListToServer = function () {
  

    var lcode = $("#glistId").val();

    var fcode = $("#glistIdgame").val(); //p_gn; //'xxx';
    var pref = $("#glistIdPref").val();
    


    //var pgn_type = $('#pgn_type').val()
    //var tosave = $("#hidsavetooList").html();
   
    //var hidemov = 0;
   
    
    saveTheBoardImageToServerListDo(lcode,fcode,pref, 0,0);
}

saveTheBoardImageToServerListDo = function (lcode,fcode,pref, withim,index) {
    
    if (gameList != null && index < gameList.length) {
        var game = gameList[index];
        setNewGame(game, 0);
        fcode = game.GameId;
    }
    else
        return;
    
    var imtype = $("#imageTypeList").val();
    var imtext = '';
    
    var text1 = '';
    var text2 = '';
    var psw = $("#savePasswordList").val();
    p_psw = psw;
    var siz = '814x426';
    var bgr12 = $("#imageBgrList").val();
    var bgrarr = bgr12.split(',');
    var bgr = bgrarr[1];
    var sq = bgrarr[0];
    var bgrb = bgrarr[2];
    if (bgrarr.length > 2) {
        bgr = bgrarr[3];
        bgrb = bgrarr[4];
    }
    //if (withim) {
     //   text1 = 'ChessPM ' + fcode + ' : ' + text1;
    // !! Change image color
       var prevsq = g_sq;
       changeImagesColor(sq, prevsq);
        //saveTheBoardImage('CPMBoard.png');
        setTimeout(function () {
            sendCanvasToServerWithParams(2, pref + fcode, imtype, imtext, lcode, text2, siz, bgr, psw, bgrb, index, pref);
        }, 5000);
        
}


saveTheBoardImageToServerDo = function (fcode, withim) {

    var imtype = $("#imageType").val();
    var imtext = $("#imageText").val();
    imtext = imtext.replace('{0}', fcode);
    var text1 = $("#title1Text").val();
    var text2 = $("#title2Text").val();
    var psw = $("#savePassword").val();
    p_psw = psw;
    var siz = $("#imageSize").val();
    var bgr12 = $("#imageBgr").val();
    var bgrarr = bgr12.split(',');
    var bgr = bgrarr[1];
    var sq = bgrarr[0];
    var bgrb = bgrarr[2];
    if (bgrarr.length > 2) {
        bgr = bgrarr[3];
        bgrb = bgrarr[4];
    }
    if (withim) {
        text1 = 'ChessPM ' + fcode + ' : ' + text1;
        // !! Change image color
        var prevsq = g_sq;
        changeImagesColor(sq, prevsq);
        //saveTheBoardImage('CPMBoard.png');
    }
    sendCanvasToServerWithParams(withim,fcode, imtype, imtext, text1, text2, siz, bgr, psw, bgrb,0);
}



sendCanvasToServerWithParams = function (withim, fcode, imtype, imtext, text1, text2, siz, bgr, psw, bgrb, index, pref) {
    var el1 = $("#board21"); //$('#frame1').contents().find('#board21');  
   
    if (el1[0])
        el1 = el1[0];
    html2canvas(el1).then(  
    
        function (canvas) { 
       // onrendered: function (canvas) {
            var image = canvas.toDataURL("image/png");
            image = image.replace('data:image/png;base64,', '');
            $.ajax({
                type: 'POST',
                url: 'Diagram.aspx/UploadImage',
                data: "{'imageData':'" + image + "', 'fcode':'" + fcode + "', 'imtype':" + imtype + ", 'imtext':'" + imtext + "'" + ", 'text1':'" + text1 + "'" + ", 'text2':'" + text2 + "'" + ", 'siz':'" + siz + "'" + ", 'bgr':'" + bgr + "'" + ", 'psw':'" + psw + "'" + ", 'bgrb':'" + bgrb + "'" + "}",
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (msg) {
                    if (withim && withim == 2) { // list
                        saveTheBoardImageToServerListDo('',fcode,pref, 0,index + 1); // rep for fen
                    }
                    //else if (boardscreen && boardscreen == 1) {
                    //    afterSaveBoard
                    //}
                    else if (withim)
                        SaveOrReplaceMessage(12, fcode, 'saved successfully', 0, g_sq, 1, 1);
                    else {
                        var link = "//www.chesspm.com/Boards/p" + fcode.replace(/\//g, "_") + ".png";
                        alert('Diagram ' + fcode + ' saved successfully  on Server ! Link : ' + link);
                        setTimeout(function () {
                            window.open(link, '_blank', 'location=yes,scrollbars=yes,status=yes,fullscreen=yes,menubar=yes');
                        }, 2000);

                    }
                    // refresh with new colors
                },
                error: function (result) {
                    var x = result;
                }
            });
        }
     
   )
   
}
 

gotoChessPm = function () {
    var link1 = 'http://www.chesspm.com/Default.aspx?lang=en';   
    if (inFrame) 
        parent.location.href = link1;
    else 
        location.href = link1;
}


SaveOrReplaceMessage = function (ltnum, gnum, saverep, gnumto, sq, redir, sdiag) {
    var params = '?gn=' + gnum; // + '&dbsrc=dbpgn';
 
    if (lt != 12 && lt!=11) // not default
        params += '&lt=' + ltnum;
    var paramsDiag = '?gn=' + gnum;
    gnumtoStr = '';
    if (gnumto && gnumto != null && gnumto != 'undefined') {
        params += '&gnto=' + gnumto;
        gnumtoStr = ' - ' + gnumto;
    }
    else
        gnumto = '';
    if (sq && sq > 0) {
        //params += '&sq=' + sq;
        paramsDiag += '&sq=' + sq;
    }
    var src = '';
    if (p_dbsrc && p_dbsrc != null) src = '&src=' + p_dbsrc;
    var link1 = 'PgnViewer.htm' + params + src;
    var link2 = 'http://www.chesspm.com/ShowGames/en/ShowGames/' + params + '&act=mob1' + src;
    var link3 = 'http://www.chesspm.com/chesschat/Diagram.aspx' + paramsDiag + src;
    var uri_enc = encodeURIComponent(link2);
    var link3_enc = encodeURIComponent(link3);

    var paramsP = '?state=2&level=3&probind=0&dbsrc=2&probid=' + gnum + '&noprev=1';
    var href='location.href';
    if (inFrame) {
        link1 = 'Diagram.aspx' + params + src;
        href='parent.location.href';
    }

    var linkP = 'http://www.chesspm.com/chesschat/' + paramsP;

    if (boardscreen && boardscreen == 1) {
        //paramsDiag = '?gn=' + gnum + '&dbsrc=temp';
        //if (p_solve > 0)
        //    paramsDiag += '&solve=' + p_solve;
        //link3 = 'http://www.chesspm.com/chesschat/Diagram.aspx' + paramsDiag;
        //var dd = $('#dText').val();
        //var di = $('#dinvert').is(':checked') ? 1 : 0;
        //if (dd == 'd2' || dd == 'd3' || dd == 'd4' || dd == 'd5') {
        //    link3 += '&d=' + dd;
        //    if (di) link3 += '&di=' + di;
        //    //var hdr = getParamFromHdr($('#Header').val());
        //    //var aut = getParamFromHdr($('#Author').val());
        //    //link3 += '&hdr=' + hdr;
        //    //if (dd == 'd4')
        //    //    link3 += '&aut=' + aut;
        //}
        //else {
        //    link3 += '&d=d';
        //    if (di) link3 += '&di=' + di;
        //}
        ////link3 += '&d=d';
        //$('#fenLink').val(link3);


   


        //$('#timerhdr').hide();
        //if(p_solve>0)
        //    bootbox.alert('The link saved successfully ! Copy the link to share the puzzle in comments. ');
        //else 
        //    bootbox.alert('The link saved successfully ! Copy the solution link to share in comments. ');
       
        //return;
    }

    $('#save_res1').html(saverep + '. Id = ' + gnum + gnumtoStr + '&nbsp;' +
        '<button style="width:60px;" onclick="'+href+'=\'' + link1 + '\';' + '">GO</button>' +
        '<button style="width:70px;" onclick="' + href + '=\'' + link2 + '\';' + '">ChessPM</button>' +
        '<button style="width:70px;" onclick="' + href + '=\'' + linkP + '\';' + '">Problem</button>' +
        '<button style="width:50px;" onclick="alert(\'' + link1 + ' \\n\\n ' + link2 + '\')">Links</button>' +
        '<br/>');
    $('#after_save_res').html(getSocialDiv(uri_enc, 'Game', 'www.chesspm.com', 1));

    var link = "//www.chesspm.com/Boards/p" + gnum + ".png";



    if (sdiag > 0) {

        //alert('Diagram ' + fcode + ' saved successfully  on Server ! Link : ' + link);
        setTimeout(function () {
            window.open(link, '_blank', 'location=yes,scrollbars=yes,status=yes,fullscreen=yes,menubar=yes');
        }, 1000);
        if (redir && redir > 0) {
            setTimeout(function () {
                location.href = link1 + "&link=" + link3_enc;
            }, 1500);
        }
    }
    else {
        if (redir && redir > 0)
            location.href = link1 + "&link=" + link3_enc;
    }
}
function DoShow(pgn, pgn_type, hidemov, tostart) {

    game_pgn_load(pgn, pgn_type, tostart);
    setByHboard(5);
}

//game_pgn_load
function DoSave(pgn, pgn_type, hidemov, saveim, pswreq, psw, bcol, totemp, fen, hdr, sethdr, pri, keys) {
   
    if (!pgn || pgn == null) {
        alert('Invalid pgn');
        return;
    }
    if (sethdr && sethdr > 0) {
        if (pgn_type == 3 || pgn_type == 2) {
            //displaySpecTextAfterLoad(game, 2);
        }
        else {
            if (!fen || fen == '') {
                var game1 = {};
                fen = fenOfPgn1(pgn);
                setAutoHeaderInGameFenAndPgn(game1, fen, pgn,1);
                hdr=game1.hdr;
                var aut = game1.Authors;
                hdr = hdr + ' : ' + aut;
                var trn = game1.TournName;
                hdr = hdr + ' : ' + trn;
            }
        }
    }

    if (!pswreq || pswreq == null) pswreq = 0;
    if (!psw || psw == null) psw = '';
    if (!fen || fen == null) fen = '';
    if (!hdr || hdr == null) hdr = '';
    if (!pri || pri == null) pri = '';
    if (!pgn_type) pgn_type = '0';
    $('#save_res1').html('Wait....');
    if (!hidemov && hidemov == null) hidemov = 0;
    var servName = 'SaveGameIntoChessDbPgn';
   
    if (totemp && totemp != null) {
        if(totemp==1)
            servName = 'SaveGameIntoChessDbPgnTemp';
        else if (totemp == 2) // pgndiag
            servName = 'SaveGameIntoChessDbPgnDiag';
        else if (totemp == 3) // fut
            servName = 'SaveGameIntoChessDbPgnMy';
    }
    else if (p_dbsrc == 'my')
        servName = 'SaveGameIntoChessDbPgnMy';
    var addata = '';
    if (SaveUpd == 3) {// list

        servName = 'SaveGameListIntoChessDbPgn';
        if (totemp == 1 || p_dbsrc=='temp')
            servName = 'SaveGameListIntoChessDbTemp';
        var mafrid = 'Event';  //  + "', 'hdr':'" + hdr
        var maf1 = $("#saveparam").val(); if (maf1.trim() != '') mafrid = maf1;
        addata = "', 'mafrid':'" + mafrid ;
    }
    else if (SaveUpd == 2) {
        servName = 'ReplaceGameInChessDbPgn';
    }
    pgn = pgn.replace(/0-0-0/gi, "O-O-O").replace(/0-0/gi, "O-O");
    pgn = pgn.replace(/\\/gi, "\\\\").replace(/\'/gi, "\\\'").replace(/\//gi, "\\\/");
    
    
    LastPgn = pgn;
    var ibcol = -1;
    if (hdr)
        hdr = hdr.replace(/\\/gi, "\\\\").replace(/\'/gi, "\\\'").replace(/\//gi, "\\\/");
    if (pri)
        pri = pri.replace(/\\/gi, "\\\\").replace(/\'/gi, "\\\'").replace(/\//gi, "\\\/");
    hdr = hdr + ' : ' + pri; // ****
    if (!bcol || bcol == null || bcol == '') { } // -1
    else ibcol = parseInt(bcol);

    var cmd = '';
    $.ajax({
        type: "POST",
        url: "ws/ViewService.asmx/" + servName,
      data: "{'pgn':'" + pgn + "', 'pgntype':" + pgn_type + ", 'hidemov':" + hidemov + ", 'pswreq':" + pswreq + ", 'psw':'" + psw + "', 'Commands':'" + cmd + "', 'bcol':" + bcol + ", 'fen':'" + fen + "', 'hdr':'" + hdr + "', 'keys':'" + keys + addata + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            if (SaveUpd == 3) {// list
                SaveOrReplaceMessage(11, data.d[0], 'Saved', data.d[1], 0, 0, 0);
            }
            else {
                if (saveim && saveim == 1) {
                    if (data.d > 0)
                        saveTheBoardImageToServerDo(data.d, 1);
                    else if (data.d == -2) {
                        alert('Bad password !');
                    }
                }
                else if (boardscreen && boardscreen == 1) {
                    afterSaveBoard(12, data.d, 'Saved', 0, g_sq, 0, 0, 1, totemp);
                }
                else
                    SaveOrReplaceMessage(12, data.d, 'Saved', 0, g_sq, 0, 0);
            }

        },
        error: function (result) {
            tempdata = null;
            $('.timer').hide();
            $('#timerhdr').hide();
            $('#save_res1').html('Error');
        }
    });
}


function LoadPage(url, jqObj) {
    var servName = 'LoadPageSource';
    $.ajax({
        type: "POST",
        url: "ws/ViewService.asmx/" + servName,
        data: "{'url':'" + url + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
             
                jqObj.val(data.d);
                jqObj.trigger("click");

        },
        error: function (result) {
            jqObj.val('Error');
        }
    });
}

function DoReplace(pgn, id, pgn_type, hidemov, pswreq, psw, cmdnew, bcol, fen, hdr, totemp,pri,keys) {
    if (!pgn_type) pgn_type = '0';
    if (!pswreq || pswreq == null) pswreq = 0;
    if (!psw || psw == null) psw = '';


    //if (sethdr && sethdr > 0) {
        if (pgn_type == 3 || pgn_type == 2) {
            //displaySpecTextAfterLoad(game, 2);
        }
        else {
            if (!fen || fen == '') {
                var game1 = {};
                fen = fenOfPgn1(pgn);
                setAutoHeaderInGameFenAndPgn(game1, fen, pgn,1);
                hdr = game1.hdr;
                var aut = game1.Authors;
                hdr = hdr + ' : ' + aut;
                var trn = game1.TournName;
                hdr = hdr + ' : ' + trn;
            }
        }
   // }


    $('#save_res1').html('Wait....');
    //if (!hidemov && hidemov == null) hidemov = 0;
    var servName = 'SaveGameIntoChessDbPgn';
    //if (totemp && totemp != null) {
        if (totemp == 1 || p_dbsrc=='temp')           
            servName = 'ReplaceGameInChessDbPgnTemp';
        else if ( p_dbsrc == 'my')
            servName = 'ReplaceGameInChessDbPgnMy';
        else if (totemp == 2) // pgndiag
            servName = 'ReplaceGameInChessDbPgnDiag';
        else if (totemp == 0)  
            servName = 'ReplaceGameInChessDbPgn';
    //}
    else if (SaveUpd == 2) {
        servName = 'ReplaceGameInChessDbPgn';
    }
    // replace 0-0
    pgn = pgn.replace(/0-0-0/gi, "O-O-O").replace(/0-0/gi, "O-O");
    pgn = pgn.replace(/\\/gi, "\\\\").replace(/\'/gi, "\\\'").replace(/\//gi, "\\\/");
    
    if (!fen || fen == null) fen = '';
    if (!hdr || hdr == null) hdr = '';
    if (!pri || pri == null) pri = '';
    if (hdr)
        hdr = hdr.replace(/\\/gi, "\\\\").replace(/\'/gi, "\\\'").replace(/\//gi, "\\\/");
    if (pri)
        pri = pri.replace(/\\/gi, "\\\\").replace(/\'/gi, "\\\'").replace(/\//gi, "\\\/");
    hdr = hdr + ' : ' + pri; // ****
    var ibcol = -1;
    if (!bcol || bcol == null || bcol == '') { } // -1
    else ibcol = parseInt(bcol);
    var cmd = '';
    if (cmdnew && cmdnew != null && cmdnew != '')
        cmd = cmdnew;
    $.ajax({
        type: "POST",
        url: "ws/ViewService.asmx/" + servName,
      data: "{'pgn':'" + pgn + "', 'id':" + id + ", 'pgntype':" + pgn_type + ", 'hidemov':" + hidemov + ", 'pswreq':" + pswreq + ", 'psw':'" + psw + "', 'Commands':'" + cmd + "', 'bcol':" + bcol + ", 'fen':'" + fen + "', 'hdr':'" + hdr + "', 'keys':'" + keys + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            if (data.d <= 0) {
                $('#save_res1').html('Error '+data.d+' in replacing id : ' + id);
            }
            else if (boardscreen && boardscreen == 1) {
                afterSaveBoard(12, data.d, 'Replaced', 0, g_sq, 0, 0, 2, totemp);
            }
            else {
                SaveOrReplaceMessage(12, data.d, 'Replaced', 0, g_sq, 0, 0);
                
            }

        },
        error: function (result) {
            tempdata = null;
            $('.timer').hide();
            $('#timerhdr').hide();
            $('#save_res1').html('Error');
        }
    });
}

DoReplaceCommand = function (id, pswreq, psw, cmd, totemp) {
    
    if (!pswreq || pswreq == null) pswreq = 0;
    if (!psw || psw == null) psw = '';
    $('#save_res1').html('Wait....');
    
    var servName = 'ReplaceCommandInChessDbPgn';
  
   
    $.ajax({
        type: "POST",
        url: "ws/ViewService.asmx/" + servName,
        data: "{ 'id':" + id + ", 'pswreq':" + pswreq + ", 'psw':'" + psw + "', 'Commands':'" + cmd + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            if (data.d < 0) {
                $('#save_res1').html('Error '+data.d+' in replacing id : ' + id);
            }
            else if (boardscreen && boardscreen == 1) {
                afterSaveBoard(12, data.d, 'Replaced', 0, g_sq, 0, 0, 2, totemp);
            }
            else {
                SaveOrReplaceMessage(12, data.d, 'Replaced', 0, g_sq, 0, 0);
             
            }

        },
        error: function (result) {
            tempdata = null;
            $('.timer').hide();
            $('#timerhdr').hide();
            $('#save_res1').html('Error');
            bootbox.alert('Error saving ! ' );
        }
    });
}


DoReplaceFenHeader = function (id,idto, pswreq, psw,  totemp) {

    if (!pswreq || pswreq == null) pswreq = 0;
    if (!psw || psw == null) psw = '';
    //if (!totemp || totemp == null) totemp = 0;
    $('#save_res1').html('Wait....');

    var servName = 'ReplaceFenAndHeaderInGameList';


    $.ajax({
        type: "POST",
        url: "ws/ViewService.asmx/" + servName,
        data: "{ 'id':" + id + ", 'idto':" + idto + ", 'psw':'" + psw + "', 'temp':" + totemp + "}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            if (data.d < 0) {
                $('#save_res1').html('Error '+data.d+' in replacing id : ' + id);
            }
            else if (boardscreen && boardscreen == 1) {
                boardMessage('Replaced from '+id+" to "+idto);
            }
            else {
                SaveOrReplaceMessage(12, data.d, 'Replaced', 0, g_sq, 0, 0);

            }

        },
        error: function (result) {
            tempdata = null;
            $('.timer').hide();
            $('#timerhdr').hide();
            $('#save_res1').html('Error');
            bootbox.alert('Error replacing ! ');
        }
    });
}

function getEval(res) {
    if (!res.engEval || res.engEval == null)
        return '';
    var val = parseFloat(res.engEval);
    var dep = ' [' + res.engDepth + ']';
    if (val > 100)
        return 'Mate in ' + Math.round((val - 100) * 100) + dep;
    else {
        if (val > 0)
            return '+' + val + dep;
        else
            return val + dep;
    }
}

prepareSave = function (pgntype) {
    clearAllTimeouts();
    setByHboard(4);
    disp_game_save_panel('Save', LastPgn, pgntype);

    SaveUpd = 1;
}