function scroll_into_view_smooth(elem) {
    var FPS = 48; // frames per second
    var DURATION = 0.6; // sec
    var e = elem;
    var left = e.offsetLeft;
    var top = e.offsetTop;
    var width = e.offsetWidth;
    var height = e.offsetHeight;
    var body = document.body;
    var to_scroll = [];
    var p, offset;
    while ((p = e.offsetParent)) {
        var client_width = p.clientWidth;
        var client_height = p != body ? p.clientHeight : Math.min(document.documentElement.clientHeight, window.innerHeight);
        if (client_width < p.scrollWidth - 1 && ((offset = left - p.scrollLeft) < 0 || (offset = left + width - p.scrollLeft - client_width) > 0)) {
            to_scroll.push({ elem: p, prop: 'scrollLeft', from: p.scrollLeft, offset: offset });
        }
        if (client_height < p.scrollHeight - 1 && ((offset = top - p.scrollTop) < 0 || (offset = top + height - p.scrollTop - client_height) > 0)) {
            to_scroll.push({ elem: p, prop: 'scrollTop', from: p.scrollTop, offset: offset });
        }
        e = p;
        left += e.offsetLeft;
        top += e.offsetTop;
    }
    var x = 0;
    function apply() {
        x = Math.min(x + 1 / (DURATION * FPS), 1);
        for (var i = to_scroll.length - 1; i >= 0; i--) {
            to_scroll[i].elem[to_scroll[i].prop] = to_scroll[i].from + to_scroll[i].offset * x * x;
        }
        if (x < 1) {
            setTimeout(apply, 1000 / FPS);
        }
    }
    apply();
}

//setTimeout(function () {
//     var element = document.getElementById("boardwrap");
//    element.scrollIntoView();
//}, 1000);

// Analysis
//$('#analyze_res5').html(getEval(res) + ' ' + res.engDesc + ' ' + res.engLine);
// if (res.engDesc != '')
//     $('#analyze_res5').html(getEval(res) + ' ' + res.engDesc);
//if (!(res.engRc < 0)) {
//    $('#analyze_res5').html(getEval(res) + ' ' + res.engDesc + ' ' + res.engLine);
//    var objDiv = document.getElementById("gameanalyze_res");
//    objDiv.scrollTop = objDiv.scrollHeight;
//if (TransferGameOnAnalysis == 2)
//    game_pgn_load(getPgnHeader(lastGame, 1) + res.engLine);
//}

// soprecording
//    if (recording.lastGame && recording.lastGame != null) {
//    var remList = recording.lastGame.RemarkVariationsList[recording.remId + 1];
//    var remVar = {};
//    if (remList == null) {
//        remList = [];
//        recording.lastGame.RemarkVariationsList[recording.remId + 1] = remList;
//    }
//    else {
//        //var len = RemarkVariationsList[i].length;
//    }
//    recording.currentRemVarList = remList;
//    var remObj = getRemObject();
//    recording.currentRemVarList.push(remObj);
//    recording.currentRemVarSubList = remObj.SubVariantList;
//}