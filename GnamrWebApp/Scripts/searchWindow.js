/**
 * Окно поиска людей в Гнамре
 * @param {} obj  - имя
 * @param {} countWindow - счетчик окга
 * @param {} openWindowSysid - калбэк функция открытия анкеты
 * @returns {} 
 */

function SearchWindow(obj, countWindow, openWindowSysid, findText) {
    
    //апи урлы
    var urlSearch = '/api/search';
    var urlLast50 = '/api/last50';

    //элементы  формы
    var searchGrid = null;
    var idSearchWindow = "FindWindow_" + countWindow;
    var idSearchGrid = "jqgrid_" + countWindow;
    var idSearchPager = "jpager_" + countWindow;
    
    //элементы поиска
    var idFindButton = "findButton_" + countWindow;
    var idLast50Button = "last50Button_" + countWindow;
    var idSearchText = "searchText_" + countWindow;
    var idMatchEndings = "matchEndings_" + countWindow;
    var idCharacterSelection = "characterSelection_" + countWindow;

    var title = "Поиск " + countWindow;

    //размеры окна
    var windowWidth = 850;
    var minWindowWidth = 850;
    var windowHeight = 600;
    var minWindowheight = 600;

    //смещение сетки
    var offsetGridHeight = 180; //высота смещения
    var offsetGridWidth = 30; //ширина смещения


    this.init = function (name) {
        console.log("Инициализация окна поиска " + name);

        $('body').append(
         '<div id="' + idSearchWindow + '" class="dialog_window" title="">\
             <input type="text" id="'+idSearchText+'" value="'+findText+'" width="1350">\
             <input type="button" class="ui-button ui-widget ui-corner-all" id="'+ idFindButton+'" value="Поиск">\
             <input type="button" class="ui-button ui-widget ui-corner-all" id="' + idLast50Button + '" value="Последние 50"">\
             <br>\
             <label for="checkbox-nested-3"><input type="checkbox" name="checkbox-nested-3" id="'+idMatchEndings+'">Совпадение окончаний</label>\
             <label for="checkbox-nested-3"><input type="checkbox" name="checkbox-nested-3" id="' + idCharacterSelection + '">Подбор символов (Ә|А) (Ң|Н) (Ғ|Г) (Ұ|Ү|У) (Қ|К|Х|Һ) (Ө|О)</label>\
             <table id="' + idSearchGrid + '"></table>\
             <div id="'+ idSearchPager + '"></div></div>'
        );

        $("#"+idSearchWindow).dialog({
            autoOpen: true,
            title: title,

            width: windowWidth,
            minWidth: minWindowWidth,
            height: windowHeight,
            minHeight: minWindowheight,

            resize: function (event, ui) {
                windowWidth = $('#' + idSearchWindow).width();
                windowHeight = $('#' + idSearchWindow).height(); //self.windowHeight =ui.size.height;//self.windowWidth =ui.size.width;

                $("#" + idSearchGrid).jqGrid('setGridWidth', windowWidth - offsetGridWidth+30);
                $("#" + idSearchGrid).jqGrid('setGridHeight', windowHeight - offsetGridHeight+30);
            }
        });

        searchGrid = $("#" + idSearchGrid).jqGrid({
            datatype: "local",
            mtype: 'GET',
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
            showHeader: false, showTop: false, viewrecords: true, rowNum: 250,
            height: windowHeight - offsetGridHeight,
            width: windowWidth - offsetGridWidth,
            loadonce: true,rowList: [10, 20, 30],pager: idSearchPager,
            sortname: 'sysid', sortorder: "desc", sortable: true,
            footerrow: true, userDataOnFooter: true, rownumbers: true, rownumWidth: 25,
            autowidth: true, shrinkToFit: false,
            //jsonReader: { root: "rows", page: "page", total: "total", records: "records", cell: "", repeatitems: false },

            ondblClickRow: function (rowId) {
                var rowData = jQuery(this).getRowData(rowId);
                var sysid = rowData['sysid'];
                openWindowSysid(sysid); //вызываем callback открытие окна анкеты
            }
        });

        
        $("#" + idLast50Button).click(function() {
            searchGrid.setGridParam({
                    url: urlLast50,
                    datatype: "json"
            })
            .trigger("reloadGrid");
        });

        $("#" + idSearchText).keypress(function(event) {
            if (event.which == 13) {
                var searchText = $("#" + idSearchText).val();
                var searchParams = {
                    MatchEndings: $("#" + idMatchEndings).prop("checked"),
                    CharacterSelection: $("#" + idCharacterSelection).prop("checked")
                };

                searchGrid.setGridParam({
                    url: urlSearch,
                    datatype: "json",
                    postData: {
                        searchText: searchText,
                        param: JSON.stringify(searchParams)
                    }
                })
                .trigger("reloadGrid");
            };
        });

        $("#" + idFindButton).click(function () {
            var searchText = $("#"+idSearchText).val();
            var searchParams = {
                MatchEndings: $("#"+idMatchEndings).prop("checked"),
                CharacterSelection: $("#"+idCharacterSelection).prop("checked")
            };

            searchGrid.setGridParam({
                url: urlSearch,
                datatype: "json",
                postData: {
                    searchText: searchText,
                    param: JSON.stringify(searchParams)
                }
            })
            .trigger("reloadGrid");
        });
        
    };
};