
SelfDisciplineFilename = "data/self_discipline.json"
DataBase = {}

function load_dataset(){
  processJSON(SelfDisciplineFilename, (dat)=>{
      DataBase.SD_Data = JSON.parse(dat);
      create_table();
    });
}

function create_table(){
  let element = document.getElementById("table");
  let settings = {
    data: DataBase.SD_Data.dataset,
    licenseKey: 'non-commercial-and-evaluation',
    columns: DataBase.SD_Data.columns,
    
    colHeaders: DataBase.SD_Data.colHeaders,

    stretchH: 'all',
    autoWrapRow: true,
    readOnly: true,               // make table cells read-only
    contextMenu: false,           // disable context menu to change things
    disableVisualSelection: true, // prevent user from visually selecting
    manualColumnResize: false,    // prevent dragging to resize columns
    manualRowResize: false,       // prevent dragging to resize rows
    comments: false,              // prevent editing of comments
    columnSorting: true,
  };
  window.table = new Handsontable(element, settings);
}

function start(){
  load_dataset();
}

start();