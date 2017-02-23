function AnketWindow(sysid) {
    var self = this;

    this.SearchGrid = null;
    this.idFormWindow = "FindWindow_" + countWindow;
    this.idSearchGrid = "jqg_" + countWindow;
    this.idSearchPager = "jpager_" + countWindow;

    this.title = "Анкета " + sysid;

    this.windowWidth = 850;
    this.minWindowWidth = 850;
    this.windowHeight = 600;
    this.minWindowheight = 600;

    this.offsetGridHeight = 200; //высота смещения
    this.offsetGridWidth = 30; //ширина смещения


    this.init = function(name) {
        console.log("Инициализация окна анкеты" + sysid);

        $('#MainWindow').append(
            '<div id="' + this.idFormWindow + '" class="dialog_window" title="">\
             <input type="text" id="searchText" value="Измайлов" width="1350">\
             <input type="button" class="ui-button ui-widget ui-corner-all" id="searchBtn" value="Поиск" onclick="searchWindow.Find()">\
             <input type="button" class="ui-button ui-widget ui-corner-all" id="last50Btn" value="Последние 50" onclick="searchWindow.GetLast50()">\
             <br>\
             <label for="checkbox-nested-3"><input type="checkbox" name="checkbox-nested-3" id="MatchEndings">Совпадение окончаний</label>\
             <label for="checkbox-nested-3"><input type="checkbox" name="checkbox-nested-3" id="CharacterSelection">Подбор символов</label>\
             <table id="' + this.idSearchGrid + '"></table> \
             <div id="' + this.idSearchPager + '"></div></div>'
        );

        $("#FindWindow_" + countWindow).dialog({
            autoOpen: true,
            title: this.title,

            width: this.windowWidth,
            minWidth: this.minWindowWidth,
            height: this.windowHeight,
            minHeight: this.minWindowheight,

            resize: function(event, ui) {
                self.windowWidth = $('#' + self.idFormWindow).width();
                self.windowHeight = $('#' + self.idFormWindow).height(); //self.windowHeight =ui.size.height;//self.windowWidth =ui.size.width;

                $("#" + self.idSearchGrid).jqGrid('setGridWidth', self.windowWidth - self.offsetGridWidth);
                $("#" + self.idSearchGrid).jqGrid('setGridHeight', self.windowHeight - self.offsetGridHeight);
            }
        });
    }
};