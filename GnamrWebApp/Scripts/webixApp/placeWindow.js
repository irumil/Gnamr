

function PlaceWindow(obj, countWindow, openWindowSysid, findText) {

    var placeWindow;

    this.init = function (name) {
        placeWindow.show({ x: 300, y: 50 }); //$$("searchWindow").show({ x: 300, y: 50 });
    };

    var placeWindowId = "placeWindow";
    var searchToolId = "searchTool";


    var treedata = [
  { id: "1", value: "Book 1", data: [
    { id: "1.1", value: "Part 1" },
    { id: "1.2", value: "Part 2" }
  ]},
  { id: "2", value: "Book 2", data: [
    { id: "2.1", value: "Part 1" }
  ]}
    ];
 
    //var tree = ({ view: "tree", data: treedata });

    var tree = ({
        view: "treetable",
        columns: [
            { id: "id", header: "", css: { "text-align": "right" } },
            { id: "descrip", header: "descrip", template: "{common.treetable()} #descrip#" },
            { id: "id_parent", header: "id_parent" },
            { id: "d_max", header: "d_max"},
            
        ],
        autoheight: true,
        autowidth: true,

        url: "api/places"
    });

    
    var searchTool = {
        view: "fieldset", label: "ИИН/sysid/фамилия/имя/список sysid через запятую",
        id: searchToolId,
        body: {
            rows: [
                {
                    cols: [
                          { view: "text", id: "ss", value: findText, placeholder: "ИИН/sysid/фамилия/имя/список sysid через запятую...", width: 350 },
                          { view: "button", value: "Поиск", width: 100 /*, click: search */},
                          { view: "button", width: 100, value: "Последние 50"}, {}
                    ]
                },
            ]
        }
    };


    placeWindow = webix.ui({
        view: "window",
        id: placeWindowId,
        resize: true,
        width: 450,
        height: 600,
        modal:true,
        move: true,
        head: {
            height: 25,
            view: "toolbar",
            cols: [
                { view: "label", label: "Выбор населенного пункта" },
                { view: "icon", icon: "cog", css: "alter", click: "webix.message('Cog pressed')" },
                { view: "icon", icon: "times-circle", click: function () { $$(placeWindowId).close(); } }
            ]
        },

        body: { rows: [searchTool, tree] }
    });

};