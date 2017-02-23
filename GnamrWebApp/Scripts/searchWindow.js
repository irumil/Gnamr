/**
 * Окно поиска людей в Гнамре
 * @param {} obj  - имя
 * @param {} countWindow - счетчик окга
 * @param {} openWindowSysid - калбэк функция открытия анкеты
 * @returns {} 
 */

function SearchWindow(obj, countWindow, openWindowSysid) {
    var self = this;

    this.urlSearch = '/api/search';
    this.urlLast50 = '/api/last50';

    this.SearchGrid = null;
    this.idFormWindow = "FindWindow_" + countWindow;
    this.idSearchGrid = "jqg_" + countWindow;
    this.idSearchPager = "jpager_" + countWindow;

    this.title = "Поиск " + countWindow;

    this.windowWidth = 850;
    this.minWindowWidth = 850;
    this.windowHeight = 600;
    this.minWindowheight = 600;

    this.offsetGridHeight = 200; //высота смещения
    this.offsetGridWidth = 30; //ширина смещения


    this.init = function (name) {
        console.log("Инициализация окна поиска " + name);

        $('#MainWindow').append(
         '<div id="' + this.idFormWindow + '" class="dialog_window" title="">\
             <input type="text" id="searchText" value="Измайлов" width="1350">\
             <input type="button" class="ui-button ui-widget ui-corner-all" id="searchBtn" value="Поиск" onclick="searchWindow.Find()">\
             <input type="button" class="ui-button ui-widget ui-corner-all" id="last50Btn" value="Последние 50" onclick="searchWindow.GetLast50()">\
             <br>\
             <label for="checkbox-nested-3"><input type="checkbox" name="checkbox-nested-3" id="MatchEndings">Совпадение окончаний</label>\
             <label for="checkbox-nested-3"><input type="checkbox" name="checkbox-nested-3" id="CharacterSelection">Подбор символов</label>\
             <table id="'+ this.idSearchGrid + '"></table> \
             <div id="'+ this.idSearchPager + '"></div></div>'
        );

        $("#FindWindow_" + countWindow).dialog({
            autoOpen: true,
            title: this.title,

            width: this.windowWidth,
            minWidth: this.minWindowWidth,
            height: this.windowHeight,
            minHeight: this.minWindowheight,

            resize: function (event, ui) {
                self.windowWidth = $('#' + self.idFormWindow).width();
                self.windowHeight = $('#' + self.idFormWindow).height(); //self.windowHeight =ui.size.height;//self.windowWidth =ui.size.width;

                $("#" + self.idSearchGrid).jqGrid('setGridWidth', self.windowWidth - self.offsetGridWidth);
                $("#" + self.idSearchGrid).jqGrid('setGridHeight', self.windowHeight - self.offsetGridHeight);
            }
        });

        this.SearchGrid = $("#" + self.idSearchGrid).jqGrid({
            datatype: "local",
            mtype: 'GET',
            caption: "Результат поиска",
            colNames: ['sysid', 'Пол', 'Источник', 'ИИН', 'Фамилия', 'Имя', 'Отчество', 'Дата рождения'],
            colModel: [
                { name: 'sysid', index: 'sysid', width: 80, stype: 'text' },
                { name: 'gender', index: 'gender', width: 20, formatter: function (cellValue) { return "<img src='/Content/images/" + cellValue + ".png' >"; } },
                { name: 'stat_src', index: 'stat_src', width: 40, stype: 'text' },
                { name: 'iin', index: 'iin', width: 80, stype: 'text' },
                { name: 'lastname', index: 'lastname', width: 130, sortable: true },
                { name: 'firstname', index: 'firstname', width: 130, sortable: true },
                { name: 'midlname', index: 'midlname', width: 130, sortable: false },
                {
                    name: 'birthdt', index: 'birthdt', width: 80, align: "right", sortable: true,
                    formatter: "date", formatoptions: { newformat: 'd.m.Y' }
                }
            ],
            showHeader: false,
            showTop: false,
            viewrecords: true,
            rowNum: 250,
            height: self.windowHeight - self.offsetGridHeight,
            width: self.windowWidth - self.offsetGridWidth,

            shrinkToFit: true,
            loadonce: true,

            rowList: [10, 20, 30],
            pager: '#jpager_' + countWindow,

            sortname: 'sysid', // сортировка по умолчанию по столбцу Id
            sortorder: "desc", // порядок сортировки
            sortable: true,
            footerrow: true,
            userDataOnFooter: true,
            rownumbers: true, 
            rownumWidth: 25,
            ondblClickRow: function (rowId) {
                var rowData = jQuery(this).getRowData(rowId);
                var sysid = rowData['sysid'];

                openWindowSysid(sysid);
            }
        });

        this.GetLast50 = function () {
            this.SearchGrid
                .setGridParam({
                    url: this.urlLast50,
                    datatype: "json"
                })
                .trigger("reloadGrid");
        }

        this.Find = function () {
            var searchText = $("#FindWindow_" + countWindow+"  #searchText").val();
            var searchParams = {
                MatchEndings: $("#FindWindow_" + countWindow+ " #MatchEndings").prop("checked"),
                CharacterSelection: $("#FindWindow_" + countWindow + " #CharacterSelection").prop("checked")
            };

            this.SearchGrid.setGridParam({
                url: this.urlSearch,
                datatype: "json",
                postData: {
                    searchText: searchText,
                    param: JSON.stringify(searchParams)
                }
            })
            .trigger("reloadGrid");
        }
    };
};