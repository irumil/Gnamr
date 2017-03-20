

function SearchWindow(obj, countWindow, openWindowSysid, findText) {

    var searchWindow;

    this.init = function(name) {
        searchWindow.show({ x: 300, y: 50 }); //$$("searchWindow").show({ x: 300, y: 50 });
    };

    var searchGridId = "searchGrid" + countWindow;
    var searchToolId = "searchTool" + countWindow;
    var searchWindowId = "searchWindow" + countWindow;
    var searchTextId = "searchText" + countWindow;
    var matchEndings = "matchEndings" + countWindow;
    var characterSelection = "characterSelection" + countWindow;

    var searchGrid = {
        view: "datatable",
        id: searchGridId,
        css: "my_style",
        footer: true,
        resizeColumn: true,
        leftSplit: 2,
        rowHeight: 22,
        rowLineHeight: 25,
        columns: [
            { id: "index", header: "", sort: "int", width: 30 },
            { id: "sysid", editor: "text", header: { height: 22, text: "sysid" }, width: 80, sort: "int", footer: { height: 25, text: "Total:", colspan: 3 } },
            { id: "gender", editor: "text", header: "Пол", width: 30, sort: "int", template: function (obj, common, value, config) { return "<img src='/Content/images/" + value + ".png' >"; } },
            { id: "stat_src", editor: "text", header: "Исчтоник", width: 35, sort: "string" },
            { id: "iin", editor: "text", header: "ИИН", width: 120, sort: "string"},
            { id: "lastname", editor: "text", header: "Фамилия", width: 150, sort: "string", fillspace: 2 },
            { id: "firstname", editor: "text", header: "Имя", width: 150, sort: "string", fillspace: 2 }, 
            { id: "midlname", editor: "text", header: "Отчество", width: 150, sort: "string", fillspace: 2 },

            { id: "birthdt", editor: "text", header: "Дата рождения", width: 150, format: webix.i18n.dateFormatStr, footer: { content: "summColumn" } }
        ],
        select: "row",
        editable: false, //editaction: "dblclick",
        on: {
            onBeforeLoad: function () { this.showOverlay("Поиск..."); },
            onAfterLoad: function () { this.hideOverlay(); },
            "data->onStoreUpdated": function() { this.data.each(function(obj, i) { obj.index = i + 1; }) },
            onItemDblClick: function (id, e, node) {
                var item = this.getItem(id);
                openWindowSysid(item.sysid);
            }
        }
    };

    var search = function () {
        var searchTextValue = $$(searchTextId).getValue();
        var matchEndingsValue = $$(matchEndings).getValue();
        var characterSelectionValue = $$(characterSelection).getValue();

        webix.ajax().get("api/search", { TextSearch: searchTextValue, "MatchEndings": matchEndingsValue, "CharacterSelection": characterSelectionValue },
        {
            error: function(text) { webix.message("Ошибка получения данных"); },
            success: function(text) {
                $$(searchGridId).clearAll();
                $$(searchGridId).parse(text);
                webix.message("Данные получены");
            }
        });
    };

    var load50 = function() {
        $$(searchGridId).clearAll();
        $$(searchGridId).load("api/last50");
    }

    var searchTool = {
        view: "fieldset", label: "ИИН/sysid/фамилия/имя/список sysid через запятую",
        id:searchToolId,
        body: {
            rows: [
                { cols: [
                        { view: "text", id: searchTextId, value: findText, placeholder: "ИИН/sysid/фамилия/имя/список sysid через запятую...", width: 350 },
                        { view: "button", value: "Поиск", width: 100, click:search },
                        { view: "button", width: 100, value: "Последние 50", click: load50 },{}
                    ]
                },
                { cols: [
                    
                    {
                        view: "checkbox",id: matchEndings, labelRight: "Совпадение окончаний", checkValue: "true", uncheckValue: "false"
                    },
                        { view: "checkbox", id: characterSelection, labelRight: "Подбор символов (Ә|А) (Ң|Н) (Ғ|Г) (Ұ|Ү|У) (Қ|К|Х|Һ) (Ө|О)", checkValue: "true", uncheckValue: "false" },
                        {}
                    ]
                }
            ]
        }
    };

   
    searchWindow = webix.ui({
        view: "window",
        id: searchWindowId,
        resize: true,
        width: 900,
        height: 700,
        move: true,
        head: {
            height: 25,
            view: "toolbar",
            cols: [
                { view: "label", label: "Поиск" },
                { view: "icon", icon: "cog", css: "alter", click: "webix.message('Cog pressed')"},
                { view: "icon", icon: "times-circle",  click: function () { $$(searchWindowId).close(); }}
            ]
        },

        body: { rows: [searchTool, searchGrid] }
    });
    
};