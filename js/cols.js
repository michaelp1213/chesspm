let sqcolors = [
  { id: 0, name: "Brown", white: "faf1e4", black: "b58863", whited: "fdf4e7", blackd: "b58863", bgr: "d5a883", bgr2: "c59873" },
  { id: 1, name: "Darker Brown", white: "faf1e4", black: "994b1d", whited: "faf1e4", blackd: "994b1d", bgr: "b97b4d", bgr2: "a95b2d" },
  { id: 2, name: "Gray", white: "f1f1f1", black: "adadad", whited: "fdfdfd", blackd: "a6a6a6", bgr: "b6b6b6", bgr2: "b6b6b6" },
  { id: 3, name: "Green", white: "eafaea", black: "769656", whited: "f2fff2", blackd: "769656", bgr: "96b686", bgr2: "86a666" },
  { id: 4, name: "Brown-Yellow", white: "ffdaa6", black: "a86320", whited: "ffe3ad", blackd: "a5601c", bgr: "c5804c", bgr2: "b5702c" },
  { id: 5, name: "Blue", white: "e5e5fc", black: "7c8fbc", whited: "f7f7ff", blackd: "7c8fbc", bgr: "a0b2dc", bgr2: "8c9fcc" },
  { id: 6, name: "Darker Blue", white: "e5e5fc", black: "7185b7", whited: "f4f4ff", blackd: "7185b7", bgr: "9ab0d7", bgr2: "8195c7" },

  { id: 7, name: "Mustard", white: "faf1e4", black: "b09050", whited: "fdf5e8", blackd: "ac8c4c", bgr: "ccac75", bgr2: "bc9c5c" },
  { id: 8, name: "Beige", white: "e8cac2", black: "b18270", whited: "f7dfd8", blackd: "b18270", bgr: "c99c93", bgr2: "c19280" }, //"e8cac2", black: "b18270" 
  { id: 9, name: "Green Light", white: "f1faec", black: "b7c182", whited: "fbfff7", blackd: "b2b97a", bgr: "c2c98f", bgr2: "c2c98a" },  // white: "f1faec", black: "b7c182" 
  { id: 10, name: "Gray-Blue", white: "e8eff4", black: "a5afb4", whited: "ecf3f7", blackd: "959fa4", bgr: "b0b8c0", bgr2: "a5afb4" }, //white: "e8eff4", black: "a5afb4"
  { id: 11, name: "Turquoise", white: "e4edf6", black: "4c90b3", whited: "e7f1f8", blackd: "4c90b3", bgr: "6cb0d3", bgr2: "5ca0c3" },

  { id: 12, name: "Dark Gray", white: "cdcdcd", black: "666666", whited: "dddddd", blackd: "666666", bgr: "868686", bgr2: "767676" }, //  "cdcdcd", black: "666666"
  { id: 13, name: "Light Blue", white: "d5e2e8", black: "77b5e1", whited: "e4f0f6", blackd: "67a5d1", bgr: "8ac1e8", bgr2: "77b5e1" },  //"d5e2e8" "77b5e1"
  { id: 14, name: "Brown Yellow", white: "fadaa8", black: "d29355", whited: "ffe2b8", blackd: "c28345", bgr: "d4a065", bgr2: "d29355" }, // "fadaa8", black: "d29355"
  { id: 15, name: "Blue All", white: "c6d6eb", black: "91b2d1", whited: "dfeffd", blackd: "81a2c1", bgr: "9ab8d8", bgr2: "91b2d1" }, //"c6d6eb", black: "91b2d1" 
  { id: 16, name: "Blue Green", white: "d3f2f4", black: "93d0d1", whited: "efffff", blackd: "73c0b1", bgr: "9fdcdd", bgr2: "83d0c1" }, // d3f2f4  93d0d1
  { id: 17, name: "Blue Light", white: "dee6ea", black: "88a7b9", whited: "ecf4f8", blackd: "7897a9", bgr: "9ab7c9", bgr2: "88a7b9" },

];

fillDialogColorsToCombo = function (id, defsq) {
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
fillDialogColorsToCombo1 = function (id, defsq) {
    $('#' + id).empty();
    var sel = '';
    $.each(sqcolors, function (index, el) {
        if (defsq != '' && defsq != null && index == defsq)
            sel = 'selected ';
        else sel = '';
        var str = "<option " + sel + "value='" + el.id + "," + el.white + "," + el.black + "'>" + el.id + "=" + el.name + "</option>";
        //var str = "<option " + sel + "value='" + el.id + "," + el.white + "," + el.black + "," + el.whited + "," + el.blackd + "'>" + el.id + "=" + el.name + "</option>";
        $("#" + id).append(str);
    });


}
fillDialogColorsToComboForCanvas = function (id, defsq) {
    $('#' + id).empty();
    var sel = '';
    $.each(sqcolors, function (index, el) {
        if (defsq != '' && defsq != null && index == defsq)
            sel = 'selected ';
        else sel = '';
        var str = "<option " + sel + "value='" + el.id + "," + el.whited + "," + el.blackd + "'>" + el.id + "=" + el.name + "</option>";
        $("#" + id).append(str);
    });
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}