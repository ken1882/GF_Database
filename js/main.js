
SelfDisciplineFilename = "data/self_discipline.json"
DataBase = {}
window.lastResoultion = [1,1]

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
    width: getPageResoultion()[0] - 24,
    height: getPageResoultion()[1] - 100,
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

  window.tableContent = document.getElementsByClassName("htCore")[0];
  window.tableY = 0;
  setTimeout(()=>{
    window.tableY = getElementRect(tableContent)[1];
    resize_table();
  }, 500);
}

FlagColored = false

function cancel_color(){
  let pa = tableContent.children[2];
  let len = pa.children.length;
  for(let i=0;i<len;++i){
    cancel_node_color(pa.children[i])
  }
  let col_pa = document.getElementsByClassName("htCore")[3].children[2];
  len = col_pa.children.length;
  for(let i=0;i<len;++i){
    cancel_node_color(col_pa.children[i])
  }
}

function color_node(node){
  let ele = node.children[0];
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
    let clen = node.children.length;
    for(let j=0;j<clen;++j){
      node.children[j].style.backgroundColor = bgcolor;
    }
  }
}

function cancel_node_color(node){
  let ele = node.children[0]
  let bgcolor = "#1e1e1e"
  let clen = node.children.length;
  ele.classList.add('htDimmed')
  for(let j=0;j<clen;++j){
    node.children[j].style.backgroundColor = bgcolor;
  }
}

function getPageResoultion(){
  return [parseInt(window.visualViewport.width), parseInt(window.visualViewport.height)]
}

function getElementRect(ele){
  let rect = ele.getBoundingClientRect();
  return [rect.left, rect.top, parseInt(rect.width), parseInt(rect.height)]
}

function resize_table(){
  let _width = window.lastResoultion[0] - 20;
  let _height = window.lastResoultion[1] - tableY - 8;
  window.table.updateSettings({
    width: _width,
    height: _height
  });
  window.tableSize = [_width, _height]
}

function color_updater(){
  let wrect = getPageResoultion();
  if(!isArrayalike(wrect, window.lastResoultion) || tableSize[1] > wrect[1]){
    window.lastResoultion = wrect;
    resize_table();
  }
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
    color_node(row_pa.children[i]);
  }
  let col_pa = document.getElementsByClassName("htCore")[3].children[2];
  len = col_pa.children.length;
  for(let i=0;i<len;++i){
    color_node(col_pa.children[i]);
  }
}

function start(){
  load_dataset();
}

start();