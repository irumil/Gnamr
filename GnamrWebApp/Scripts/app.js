var searchWindowId = 0;
var anketWindowId = 0;

var searchWindow;
var anketWindow;

$(document).ready(function () {

    $('#showFindWindow').on('click', function () {
        searchWindowId += 1;
        searchWindow = new SearchWindow("Поиск", searchWindowId, OpenWindowSysid, "Измайлова");
        searchWindow.init("MyCart");
    });
});

function OpenWindowSysid(sysid) {
    anketWindowId += 1;
    anketWindow = new AnketWindow(sysid, anketWindowId);
    anketWindow.init();
}