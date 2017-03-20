var searchWindowId = 0;
var anketWindowId = 0;

var searchWindow;
var anketWindow;

var placeWindow;


var mainToolbar = {
    view: "toolbar",
    elements: [
        { view: "button", value: "Поиск", height: 25, width: 100, click: function () { CreateSearchWindow(); } },
        { view: "button", value: "Анкета", height: 25, width: 100, click: function () { OpenWindowSysid(321991); }},
        { view: "button", value: "Населенный пункт", height: 25, width: 100, click: function () { openPlaceWindow(415); } }
    ]
};

function CreateSearchWindow() {
    searchWindowId += 1;
    searchWindow = new SearchWindow("Поиск", searchWindowId, OpenWindowSysid, "Измайлов");
    searchWindow.init("MyCart");

}

function OpenWindowSysid(sysid) {
    console.log("Откровем окно " + sysid);
    anketWindowId += 1;
    anketWindow = new AnketWindow(sysid, anketWindowId, openPlaceWindow);
    anketWindow.init();
}

function openPlaceWindow(idplace) {
    console.log("Откровем окно нас.пунктов");
    placeWindow = new PlaceWindow(idplace);
    placeWindow.init()
    //nsole.log(placeWindow);
}

webix.i18n.setLocale("ru-RU");
webix.Date.startOnMonday = true;

/*  Загрузка справчоных данных */
var urlDirectories = '/api/directories';
var directories;


webix.ajax().get(urlDirectories,
    {
        error: function (text) { webix.message({ type: "error", text:"Ошибка получения справочных данных"+text }); },
        success: function (text) { directories = eval('(' + text + ')'); webix.message("Справочные данные получены");}
    });


/*  -              ------ */

/*
var newTab= {     view: "toolbar",     cols: buttons(48) };
function buttons(size) {     return [     {         view: "button", type: "image" + size,         image: "../common/imgs/" + size + "/save.gif", width: size + 7     },     {         view: "button", type: "image" + size,         image: "../common/imgs/" + size + "/copy.gif", width: size + 7    }     ]; }
*/

webix.ready(function () {
    grida = webix.ui({
        container: "testA",
        rows: [
            mainToolbar
        ]
    });
});