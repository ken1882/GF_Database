
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
    fixedColumnsLeft: 1,
    multiColumnSorting: true,
  };
  window.table = new Handsontable(element, settings);
  setInterval(() => {
    color_updater()
  }, 50);
}

FlagColored = false

function cancel_color(){
  let pa = document.getElementsByClassName("htCore")[0].children[2];
  let len = pa.children.length;
  for(let i=0;i<len;++i){
    let row = pa.children[i]
    let ele = row.children[0]
    let bgcolor = "#1e1e1e"
    let clen = row.children.length;
    ele.classList.add('htDimmed')
    for(let j=0;j<clen;++j){
      row.children[j].style.backgroundColor = bgcolor;
    }
  }
}

function color_row(row){
  let ele = row.children[0];
  let name = ele.innerText;
  let bgcolor = "#1e1e1e";
  if(ele.classList.contains('htDimmed')){
    ele.classList.remove("htDimmed");
    key = name.split('-')[1][0];
    if(key == '1'){bgcolor = "#4B38BE";}
    else if(key == '2'){bgcolor = "#9C650F";}
    else if(key == '3'){bgcolor = "#0E5B27";}
    else if(key == '4'){bgcolor = "#5B0000";}
    else if(key == '5'){bgcolor = "#1B0052";}
    else if(key == '6'){bgcolor = "#4A7D02";}
    let clen = row.children.length;
    for(let j=0;j<clen;++j){
      row.children[j].style.backgroundColor = bgcolor;
    }
  }
}

function color_col(col){
  let ele = col.children[0].children[0];
  let name = ele.innerText;
  let bgcolor = "#1e1e1e";
  if(ele.classList.contains('htDimmed')){
    ele.classList.remove("htDimmed");
    key = name.split('-')[1][0];
    if(key == '1'){bgcolor = "#4B38BE";}
    else if(key == '2'){bgcolor = "#9C650F";}
    else if(key == '3'){bgcolor = "#0E5B27";}
    else if(key == '4'){bgcolor = "#5B0000";}
    else if(key == '5'){bgcolor = "#1B0052";}
    else if(key == '6'){bgcolor = "#4A7D02";}
    let clen = col.children.length;
    for(let j=0;j<clen;++j){
      col.children[j].children[0].style.backgroundColor = bgcolor;
    }
  }
}

function color_updater(){
  if(!document.getElementById("coloring").checked){
    if(FlagColored){
      FlagColored = false;
      cancel_color()
    }
    return
  }
  FlagColored = true;
  let row_pa = document.getElementsByClassName("htCore")[0].children[2];
  let len = row_pa.children.length;
  for(let i=0;i<len;++i){
    color_row(row_pa.children[i]);
  }
  let col_pa = document.getElementsByClassName("htCore")[3].children[2];
  len = col_pa.children.length;
  for(let i=0;i<len;++i){
    color_row(col_pa.children[i]);
  }
}

function start(){
  load_dataset();
}

start();