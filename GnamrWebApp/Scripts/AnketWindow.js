

function AnketWindow(sysid, anketWindowId) {
    //апи урлы
    var urlId = '/api/id/';
    var urlNames = '/api/names/';

    //элементы  формы
    var idAnketWindow = "AnketWindow_" + anketWindowId;
    
    var namesGrid;
    var sysidGrid;

    var idSysidGrid = "jqSysidGrid_" + anketWindowId;
    var idSysidPager = "jqSysidPager_" + anketWindowId;

    var idNamesGrid = "jqNamesGrid_" + anketWindowId;
    var idNamesPager = "jqNamesPager_" + anketWindowId;
        
    var title = "Анкета " + sysid;

    var windowWidth = 850;var minWindowWidth = 850;var windowHeight = 600;var minWindowheight = 600;

    var offsetGridHeight = 200; //высота смещения
    var offsetGridWidth = 30; //ширина смещения


    this.init = function () {
        $('body').append(
            '<div id="' + idAnketWindow + '" class="dialog_window jqgrid-fluid-width" title="">\
            <div id="container" class="jqgrid-fluid-width"><table id="' + idSysidGrid + '"></table><div id="' + idSysidPager + '"></div></div><br>\
            <div id="container" class="jqgrid-fluid-width"><table id="' + idNamesGrid + '"></table><div id="' + idNamesPager + '"></div></div>\
            <div id="tabs"><ul> <li><a href="#tabs-1">Nunc tincidunt</a></li><li><a href="#tabs-2">Proin dolor</a></li><li><a href="#tabs-3">Aenean lacinia</a></li>\
            </ul><div id="tabs-1"><p>Proin elit arcu, rutrum commodo, vehicula tempus, commodo a, risus. Curabitur nec arcu. Donec sollicitudin mi sit amet mauris. Nam elementum quam ullamcorper ante. Etiam aliquet massa et lorem. Mauris dapibus lacus auctor risus. Aenean tempor ullamcorper leo. Vivamus sed magna quis ligula eleifend adipiscing. Duis orci. Aliquam sodales tortor vitae ipsum. Aliquam nulla. Duis aliquam molestie erat. Ut et mauris vel pede varius sollicitudin. Sed ut dolor nec orci tincidunt interdum. Phasellus ipsum. Nunc tristique tempus lectus.</p></div>\
            <div id="tabs-2"><p>Morbi tincidunt, dui sit amet facilisis feugiat, odio metus gravida ante, ut pharetra massa metus id nunc. Duis scelerisque molestie turpis. Sed fringilla, massa eget luctus malesuada, metus eros molestie lectus, ut tempus eros massa ut dolor. Aenean aliquet fringilla sem. Suspendisse sed ligula in ligula suscipit aliquam. Praesent in eros vestibulum mi adipiscing adipiscing. Morbi facilisis. Curabitur ornare consequat nunc. Aenean vel metus. Ut posuere viverra nulla. Aliquam erat volutpat. Pellentesque convallis. Maecenas feugiat, tellus pellentesque pretium posuere, felis lorem euismod felis, eu ornare leo nisi vel felis. Mauris consectetur tortor et purus.</p>\
            </div><div id="tabs-3"><p>Mauris eleifend est et turpis. Duis id erat. Suspendisse potenti. Aliquam vulputate, pede vel vehicula accumsan, mi neque rutrum erat, eu congue orci lorem eget lorem. Vestibulum non ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce sodales. Quisque eu urna vel enim commodo pellentesque. Praesent eu risus hendrerit ligula tempus pretium. Curabitur lorem enim, pretium nec, feugiat nec, luctus a, lacus.</p>\
            <p>Duis cursus. Maecenas ligula eros, blandit nec, pharetra at, semper at, magna. Nullam ac lacus. Nulla facilisi. Praesent viverra justo vitae neque. Praesent blandit adipiscing velit. Suspendisse potenti. Donec mattis, pede vel pharetra blandit, magna ligula faucibus eros, id euismod lacus dolor eget odio. Nam scelerisque. Donec non libero sed nulla mattis commodo. Ut sagittis. Donec nisi lectus, feugiat porttitor, tempor ac, tempor vitae, pede. Aenean vehicula velit eu tellus interdum rutrum. Maecenas commodo. Pellentesque nec elit. Fusce in lacus. Vivamus a libero vitae lectus hendrerit hendrerit.</p></div></div>\
            </div>'
        );

        $("#tabs").tabs();

        $("#" + idAnketWindow).dialog({
            autoOpen: true, title: title,
            width:  windowWidth, minWidth: minWindowWidth, height: windowHeight,minHeight: minWindowheight,
            resize: function(event, ui) {},
            close:  function(event, ui) {
                console.log('Закрыли');
                $('#' + idAnketWindow).remove();
            }
        });

        var lastSel;

        sysidGrid = $("#" + idSysidGrid).jqGrid({
            datatype: "json", url: urlId, postData: { sysid: sysid },
            pager: '#' + idSysidPager,
            colNames: ['sysid','ИИН', 'Источник', 'Пол', 'Дата рождения', 'Национальность'],
            colModel: [
                { name: 'sysid', index: 'sysid', width: 60, stype: 'text'},
                { name: 'iin', index: 'iin', width: 90,  stype: 'number', editable: true, editoptions: { maxlength: 12 } },
                { name: 'stat_src', index: 'stat_src', width: 60, stype: 'text', editable: true },
                { name: 'gender', index: 'gender', width: 60, formatter: function (cellValue) { return "<img src='/Content/images/" + cellValue + ".png'>"; } },
                { name: 'birthdt', index: 'birthdt', width: 80, editable: true, formatter: "date", formatoptions: { newformat: 'd.m.Y' } },
                { name: 'idnational', index: 'idnational', width: 130, editable: true }
            ],
            cmTemplate: { sortable: false },
            autowidth: true, shrinkToFit: false,
            editurl: urlId,
            ondblClickRow: function (id) {
                console.log('Двойной клик');
                if (id != lastSel) {
                    sysidGrid.restoreRow(lastSel);
                    sysidGrid.editRow(id,
                    {
                        keys: true,
                        "successfunc": function () { console.log('save ' + sysid) },
                        "extraparam": { sysid: sysid },
                        "mtype": "PUT"
                    });
                    lastSel = id;
                };
            }
            
        });

        var parameters = {
            edit: true,
            editicon: "ui-icon-pencil",
            add: false,
            addicon: "ui-icon-plus",
            save: true,
            saveicon: "ui-icon-disk",
            cancel: true,
            cancelicon: "ui-icon-cancel",
            addParams: { useFormatter: false },
            editParams: {}
        }
        sysidGrid.jqGrid('inlineNav', '#' + idSysidPager, parameters);
        
        namesGrid = $("#" + idNamesGrid).jqGrid({
            datatype: "json", url: urlNames, postData: { sysid: sysid },
            pager: '#' + idNamesPager,
            colNames: ['id','sysid', 'Фамилия', 'Имя', 'Отчество'],
            colModel: [
            { name: 'id', index: 'id', width: 40, stype: 'text' },{ name: 'sysid', index: 'sysid', width: 80, stype: 'text'},
            { name: 'lastname', index: 'lastname', width: 100, editable: true },{ name: 'firstname', index: 'firstname', width: 100, editable: true }, { name: 'midlname', index: 'midlname', width: 100, editable: true }],
            autowidth: true, shrinkToFit: false, //showHeader: false, showTop: false, viewrecords: false,
            //height: 150,
            //onSelectRow: editRow, //editUrl: urlNames,
            cmTemplate: { sortable: false },
            //loadonce: false,// rowNum: 250, rowList: [10, 20, 30], rownumWidth: 25, //rownumbers: true, //footerrow: true, //userDataOnFooter: true
        });

        var updateDialog = function(action) {
            return {
                url: urlNames
                , closeAfterAdd: true
                , closeAfterEdit: true
                , afterShowForm: function (formId) { }
                , modal: true
                , onclickSubmit: function (params, postData) {
                    var selectedRow = namesGrid.getGridParam("selrow");
                    rowData = namesGrid.getRowData(selectedRow);

                    postData.sysid = sysid;
                    if (rowData.id !== undefined)
                        params.url += rowData.id;

                    console.log(postData);
                    params.mtype = action;
                }
                , width: "300"
            };
        }
        
        //namesGrid.jqGrid('navGrid', '#'+idNamesPager, { add: true, edit: true, del: true }, updateDialog('PUT'), updateDialog('POST'), updateDialog('DELETE'));
        

        namesGrid.jqGrid('inlineNav', '#' + idNamesPager);

        var lastSelection;

        function editRow(id) {
            if (id && id !== lastSelection) {
                namesGrid.jqGrid('restoreRow', lastSelection);
                namesGrid.jqGrid('editRow', id, { keys: true });
                lastSelection = id;
                console.log('Сохранили лог ' + id);
            }
        }
    }
};