

function PlaceWindow(obj, idadres, itemAdres, SavePlaceId) {

    var placeWindow;

    this.init = function (name) {
        placeWindow.show({ x: 300, y: 50 }); //$$("searchWindow").show({ x: 300, y: 50 });
        return 'init';
    };

    var placeWindowId = "placeWindow";
    var searchToolId = "searchTool";


    var tree = ({
        view: "treetable",
        columns: [
            { id: "value", header: "Населенный пункт", width: 300,template: "{common.treetable()} #value#" },
            { id: "d_max", header: "Зона"}
        ],
        select: "row",scroll:true,
        url: "api/places",
        on: {
            onItemDblClick: function(id, e, node) {
                var item = this.getItem(id);
                //PlaceWindow = item;
                SavePlaceId(idadres, item.id, itemAdres);
                //$$(placeWindowId).close();
                console.log('PlaceWindow onItemDblClick ' + item.id);
            }
        }
    });
    
    placeWindow = webix.ui({
        view: "window",id: placeWindowId,resize: true,
        width: 450,height: 600,modal: true,move: true,
        head: {
            height: 25,view: "toolbar",
            cols: [
                { view: "label", label: "Выбор населенного пункта" },
                { view: "icon", icon: "cog", css: "alter", click: "webix.message('Cog pressed')" },
                { view: "icon", icon: "times-circle", click: function() { $$(placeWindowId).close(); } }
            ]
        },
        on: {
            onHide: function(){console.log('onHide');},
            onShow: function() {console.log('onShow');},
            onDestruct: function() {console.log('onDesctct');
            }
        },

        body: {
            rows: [
                {
                    cols: [
                        { view: "text", id: "searchPlace", placeholder: "(текст для поиска)", width: 250 },
                        { view: "button", value: "Поиск", width: 50 /*, click: search */},
                        {}
                    ]
                },
                tree
            ]
        }
    });

};