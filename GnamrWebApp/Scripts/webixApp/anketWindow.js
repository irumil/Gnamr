
function AnketWindow(sysid, anketWindowId, openPlaceSysid) {

    //апи урлы
    var urlId = '/api/id?sysid=' + sysid;
    var urlNames = '/api/names/';
    var urlAdres = '/api/adreses';
    var urlDiagnos = '/api/diagnoses/';
    
    var anketWindow;

    this.init = function (name) {
        anketWindow.show({ x: 300, y: 50 }); //$$("searchWindow").show({ x: 300, y: 50 });
    };

    var idTable = "idDatatable" + anketWindowId;
    var namesTable = "namesDatatable" + anketWindowId;
    var adresTable = "adresDatatable" + anketWindowId;
    var diagnosTable = "diagnosDatatable" + anketWindowId;

    var idGrid = {
        view: "datatable",  id: idTable, resizeColumn: true, height: 70,
        leftSplit: 2, rowHeight: 22, rowLineHeight: 25,  scroll:false,
        columns: [
            { id: "sysid", header: { height: 22, text: "sysid" }, width: 10, hidden: true },
            { id: "iin", editor: "text", header: "ИИН", width: 120},
            { id: "stat_src", editor: "combo", options: directories.Dbsourses, header: "Исчтоник", width: 100 },
            { id: "gender", editor: "combo", options: directories.Genders, header: "Пол", width: 100, template: function (obj, common, value, config) { return "<img src='/Content/images/" + value + ".png' >"; } },
            { id: "birthdt", editor: "date", header: "Дата рождения", width: 150, format: webix.i18n.dateFormatStr },
            { id: "idnational", editor: "combo", options: directories.Nationals, header: "Национальность", width: 150 }
        ],
        editable: true,
        url: urlId, 
        save:{ "update": urlId}  
    };

    var idTool = {
        view: "fieldset", label: "Основные данные",
        body: { rows: [idGrid] }
    };

    var namesGrid = {
        view: "datatable", id: namesTable, resizeColumn: true, height: 120, leftSplit: 2, rowHeight: 22, rowLineHeight: 25, select: "cell", editable: true,
        url: urlNames + '/?sysid=' + sysid,  save:"rest->"+urlNames,
        columns: [
            { id: "id", editor: "text", header: "id", hidden: true, sort: "int" },
            { id: "sysid", editor: "text", header: { height: 22, text: "sysid" }, hidden: true },
            { id: "lastname", editor: "text", header: "Фамилия", width: 120 },
            { id: "firstname", editor: "text", header: "Имя", width: 120 },
            { id: "midlname", editor: "text", header: "Отчество", width: 120 },
            { id: "ind", header: "Дост.", width: 40, template: "{common.checkbox()}" },
            {
                id: "type_doc", editor: "combo", options: directories.DocTypes,
                header: "Тип документа", width: 150
            },
            { id: "updt", header: "Обновление", width: 150},
            { id: "usr", header: "Изменил", width: 40},
            { id: "usr_add",  header: "Добавил", width: 40}, {}
        ]
    };
   
    
    var namesTool = {
        view: "fieldset", label: "Инициалы",
        body: {
            rows: [namesGrid, toolbarForGrid(namesTable)]
        }
    };

    
    var mainTab = {
        view: "tabview", borderless: true,
        height: 250,
        cells:[
            {
                header: "Адреса", width: 50,
                body: {
                    view: "fieldset",
                    label: "",
                    body: {
                        rows: [
                            {
                                view: "datatable", id: adresTable, resizeColumn: true, height: 120,   leftSplit: 2,  rowHeight: 22, rowLineHeight: 25, select: "row", editable: true, scroll: true,
                                url: urlAdres + '/?sysid=' + sysid,
                                save: "rest->" + urlAdres,
                                columns: [
                                    { id: "id", editor: "text", header: "id", hidden: true, sort: "int" },
                                    { id: "sysid", editor: "text", header: { height: 22, text: "sysid" }, hidden: true },
                                    { id: "idplace", editor: "text", header: "idplace", width: 120 },
                                    { id: "indt", header: "indt", width: 70, editor: "date", format: webix.i18n.dateFormatStr },
                                    { id: "outdt", header: "outdt", width: 70, editor: "date", format: webix.i18n.dateFormatStr },
                                    { id: "src", editor: "combo", options: directories.Dbsourses, header: "Исчтоник", width: 100 },
                                    { id: "doc_type", editor: "combo", options: directories.DocTypes, header: "Тип документа", width: 150 },
                                    { id: "ind", header: "Дост.", width: 40, template: "{common.checkbox()}" },
                                    { id: "street", editor: "text", header: "street", width: 120 },
                                    { id: "box", editor: "text", header: "box", width: 120 },
                                    { id: "housenmb", editor: "text", header: "housenmb", width: 120 },
                                    
                                    { id: "postalindex", header: "postalindex", width: 150 },
                                    { id: "numbertel", header: "numbertel", width: 150 },
                                    
                                    { id: "updt", header: "Обновление", width: 150 },
                                    { id: "usr", header: "Изменил", width: 40 },
                                    { id: "usr_add", header: "Добавил", width: 40 }, {}
                                ],
                                on: {
                                    onItemDblClick: function(id, e, node) {
                                        console.log("2 rkbr");
                                        var item = this.getItem(id);
                                        openPlaceSysid(item.idplace);
                                    }
                                }
                            }, toolbarForGrid(adresTable)
                        ]
                    }
                }
            },
            { header: "Документы", width: 50, body: {} },
            { header: "Дозы/Сич", width: 150, body: {} },
            { header: "Диагнозы", width: 200, body: {} },
            { header: "Родители", width: 100, body: {} },
            { header: "Семья", width: 50, body: {} },
            { header: "Профессии", width: 200, body: {} },
            { header: "Родственники", width: 50, body: {} },
        ]
    };

    //namesTable
    function toolbarForGrid(gridName) {
        console.log(gridName);
        return {
            view: "toolbar",
            height: 30,
            elements: [
                { view: "button", value: "+", width: 20, click: function() { $$(gridName).add({ sysid: sysid }); } },
                { view: "button", value: "-", width: 20, click: function () {
                        webix.confirm({title: "Сообщение", ok: "Да", cancel: "Отмена", type: "confirm-warning", text: "Подтвердите удаление!",
                            callback: function(result) { if (result) { var id = $$(gridName).getSelectedId(); if (id) $$(gridName).remove(id); } }
                        });}},
                { view: "button", value: "o", width: 20, click: function() { $$(gridName).load($$(gridName).config.url); } }, {}
            ]
        }
    };


    anketWindow = webix.ui({
        view: "window",
        id: anketWindowId,
        resize: true,
        width: 900,
        height: 700,
        move: true,
        head: {
            height: 25,
            view: "toolbar",
            cols: [
                { view: "label", label: "Анкета "+sysid },
                { view: "icon", icon: "cog", css: "alter", click: "webix.message('Cog pressed')" },
                { view: "icon", icon: "car", width: 10, css: "alter", click: "webix.message('Cog pressed')" },
                { view: "icon", icon: "times-circle", click: function () { $$(anketWindowId).close(); } }
            ]
        },

        body: { rows: [idTool, namesTool, mainTab] }
    });

};