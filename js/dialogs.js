 
fillDialogColorsToCombo = function (id,defsq) {
    $('#' + id).empty();
    var sel = '';
    $.each(sqcolors, function (index, el) {
        if (defsq != '' && defsq != null && index == defsq)
            sel = 'selected ';
        else sel = '';
        var str = "<option " + sel + "value='" + el.id + "," + el.white + "," + el.black + "," + el.whited + "," + el.blackd + "," + el.bgr + "'>" + el.id + "=" + el.name + "</option>";
        $("#" + id).append(str);
    });
    
   
}
fillSaveColorsToCombo = function (id, defsq) {
    $('#' + id).empty();
    var sel = '';
    var str = "<option " + sel + "value='" + '-1' + "'>" + 'Default Color' + "</option>";
    $("#" + id).append(str);
    $.each(sqcolors, function (index, el) {
        if (defsq != '' && defsq != null && index == defsq)
            sel = 'selected ';
        else sel = '';
        var str = "<option " + sel + "value='" + el.id + "'>" + el.id + "=" + el.name + "</option>";
        $("#" + id).append(str);
    });


}
showFenDialog = function () {
    $('#modalTextHidden').val(1);
    $('#myModalSetFen').modal('show');

}
showFenGameDialog = function () {

    $('#myModalSetFenGame').modal('show');
    // $('#btnDoSetFenGame').on('click', setFenAndGameOnBoard);
}
showImgSaveDialog = function (wsave) {

    $("#gameId").val(p_gn);
    $("#imageType").val('1');
    $("#imageText").val('ChessPM');
    if (!p_gn || p_gn == 0)
        $("#title1Text").val('ChessPM ' + '{0}' + ": ");
    else
        $("#title1Text").val('ChessPM ' + p_gn + ": ");
    $("#hidsavetoo").html(wsave);

    if(p_psw && p_psw!=null)
        $("#savePassword").val(p_psw);
   
    

    $("#title2Text").val('Click the diagram to view the position/game/puzzle/study'); // desc

    if (wsave && wsave > 0) {
        $("#gameIdG").hide();
        $("#gameId").val(0);
        $("#imageTextG").hide();
        $("#imageSizeG").hide();
        $("#title1TextL").html('Title win/mate/..');
        $("#title1Text").val('');


    }
    else {
        $("#gameIdG").show();
        $("#imageTextG").show();
        $("#imageSizeG").show();
        $("#title1TextL").html('Title 1(35ch)');
    }
    fillDialogColorsToCombo('imageBgr',g_sq);
    //$("#imageBgr").val(g_sq);

    $('#myModalSaveBoard').modal('show');

}
showImgSaveListDialog = function (wsave) {
    //$("#glistId").val('xxx');

    
    
    $("#glistId").val(p_glist); //'WeekPuzzles');
    $("#glistIdgame").val(p_gn);
    $("#imageType").val('10');
    $("#glistIdPref").val('g');
    
    $("#hidsavetooList").html(wsave);
    if (p_psw && p_psw != null)
        $("#savePasswordList").val(p_psw);
    

  
        $("#glistId").show();
        $("#glistIdgame").show();
        $("#glistIdPref").show();


        fillDialogColorsToCombo('imageBgrList', g_sq);
    $('#myModalSaveBoardList').modal('show');

}

disp_game_save_panel = function (saveText, areaText, newselval) {
    $('#game_dosave_btn').html(saveText);
    var selval = '';
    if (newselval && newselval != null)
        selval = newselval;
    else if (lastGame && lastGame != null) {
        if (lastGame.PgnType == 0) lastGame.PgnType = 1;
        selval = '' + lastGame.PgnType;
    }
    else
        selval = '1';
    $('#pgn_type').val(selval).change();
    var hidem = 0;
    if (lastGame && lastGame != null) {
        hidem = lastGame.HideMov;
    }
    if (!hidem) hidem = '0';
    $('#hidem').val(''+hidem).change();
    //$("#hidem option[value=" + hidem + "]").attr('selected', 'selected');

    if (!g_sq ) g_sq = -1;
    $('#b_col').val(''+g_sq).change();
    //if (hidem)
    //    $('#hidem').attr('checked', 'checked');
    //else
    //    $('#hidem').removeAttr('checked');
    
    areaText = getPgnLastOrRecordedAndPut(areaText, $('#pgn_text_area'));

}
