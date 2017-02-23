var countWindow = 0;

var searchWindow;
var anketWindow;

$(document).ready(function () {

    $('#showFindWindow').on('click', function () {
        countWindow += 1;
        searchWindow = new SearchWindow("Поиск", countWindow, OpenWindowSysid);
        searchWindow.init("MyCart");
    });
});

function OpenWindowSysid(sysid) {
    anketWindow = new AnketWindow(sysid);
    anketWindow.init("sysid ");
}