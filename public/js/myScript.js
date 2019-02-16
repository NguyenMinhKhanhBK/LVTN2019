/*
***********************************************************************************************
                                Document ready 
***********************************************************************************************
*/
$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();

  $('body').keyup(function (e) {
    if (e.keyCode == 27) {
      stopDraw(true);
    }
  });
});

/*
***********************************************************************************************
                                Global variables and functions
***********************************************************************************************
*/
//SVG global variable
const draw = SVG('mainPage1');
const shapes = [];
let index = 0;
let shape;
let selectedItemId;

//Default option for basic objects except LINE
const defaultOption = {
  stroke: 'black',
  'stroke-width': 3,
  'fill-opacity': 0,
};

//Line default option
const defaultLineOption = {
  stroke: 'black',
  'stroke-width': 5,
  'stroke-linecap': 'round'
};

//Add context menu
function addContextMenu(){
  $('.contextMenu').on('contextmenu', function (e) {
    
    selectedItemId = e.target.id;
    while(!selectedItemId){
      selectedItemId = e.target.parentNode.id;
    }
    

    //console.log(e.target.parentNode);

    var top = e.pageY + 10;
    var left = e.pageX + 10;
    $("#context-menu").css({
      display: "block",
      top: top,
      left: left
    }).addClass("show");
    return false; //blocks default Webbrowser right click menu
  });
  $('#mainPage1').on("click", function () {
    $("#context-menu").removeClass("show").hide();
    selectedItemId = '';
  });
  
  $("#context-menu a").on("click", function () {
    $(this).parent().removeClass("show").hide();
  });

}

//Delete element
function removeItem(){
  if (selectedItemId){
    var item = document.getElementById(selectedItemId);
    item.parentNode.removeChild(item);
    selectedItemId = '';
  }
  
  
}

/*
***********************************************************************************************
                                Create object functions 
***********************************************************************************************
*/

//startDraw function: Start drawing object depending on the parameter
//Input: shape (except POLYGON)
var startDraw = function (shape) {
  //Stop the previous draw
  stopDraw(false);

  //Subscribe mouse down event
  draw.on('mousedown', function (event) {
    switch (shape) {
      case 'line': {
        shapes[index] = draw.line().attr(defaultLineOption);
        break;
      }
      case 'ellipse': {
        shapes[index] = draw.ellipse().attr(defaultOption);
        console.log('ellipse');
        break;
      }
      case 'circle': {
        shapes[index] = draw.circle(10).attr(defaultOption);
        console.log('Circle');
        break;
      }
      case 'rect': {
        shapes[index] = draw.rect().attr(defaultOption);
        break;
      }
      case 'roundRect': {
        shapes[index] = draw.rect().attr(defaultOption);
        shapes[index].radius(10);
        break;
      }
    }
    shapes[index].draw(event);
  }, false);

  //Subscribe mouse up event
  draw.on('mouseup', function (event) {
    shapes[index].draw(event);

    console.log(shapes);

    //Subscribe click event for each object
    shapes[index].on('click', function (event) {
      alert('Click on item ' + event.target.id);
    });
    //Subscribe mouse over event for each object
    shapes[index].on('mouseover', function (event) {
      event.target.style.opacity = 0.4;
      //event.target.style.cursor = 'move';
    });
    //Subscribe mouse out event for each object
    shapes[index].on('mouseout', function (event) {
      event.target.style.opacity = 1;
    })

    //Add draggable feature
    var element = document.getElementById(shapes[index].node.id);
    draggable = new PlainDraggable(element);
    draggable.autoScroll = true;
    draggable.containment = document.getElementById('mainPage1');
   
    //Add contextMenu class
    $(element).addClass('contextMenu');

    //Increase index to append the array
    index++;
  }, false);
}

//drawPolygon function: Draw polygon
var drawPolygon = function () {
  stopDraw(false);
  shapes[index] = draw.polygon().draw();

  //Polygon attribute
  shapes[index].attr({
    'fill-opacity': 0,
    'stroke-width': 3,
  })

  //Subscribe drawstart event 
  shapes[index].on('drawstart', function (e) {
    shapes[index].on('click', function (event) {
      alert('Click on item ' + event.target.id);
    });
    //Subscribe mouseover event for each polygon
    shapes[index].on('mouseover', function (event) {
      event.target.style.opacity = 0.4;
      //event.target.style.cursor = 'move';
    });
    //Subscribe mouseout event for each polygon
    shapes[index].on('mouseout', function (event) {
      event.target.style.opacity = 1;
    });

    //Add draggable feature
    var element = document.getElementById(shapes[index].node.id);
    draggable = new PlainDraggable(element);
    draggable.autoScroll = true;
    draggable.containment = document.getElementById('mainPage1');

    //Add contextMenu class
    $(element).addClass('contextMenu');
    

    //Subscribe keydown event to detect ENTER key
    document.addEventListener('keydown', keyEnterDownHandler);
  });

  //Subscribe drawstop event: This event fires when <object>.draw('done') executes 
  shapes[index].on('drawstop', function () {
    console.log(shapes);
    //Remove enter key event
    document.removeEventListener('keydown', keyEnterDownHandler);
  });
}

//drawPolyline function: Draw polyline
var drawPolyline = function () {
  stopDraw(false);
  shapes[index] = draw.polyline().draw();

  //Polygon attribute
  shapes[index].attr({
    'fill-opacity':0,
    'stroke-width': 3,
  })

  //Subscribe drawstart event 
  shapes[index].on('drawstart', function (e) {
    shapes[index].on('click', function (event) {
      alert('Click on item ' + event.target.id);
    });
    //Subscribe mouseover event for each polygon
    shapes[index].on('mouseover', function (event) {
      event.target.style.opacity = 0.4;
      //event.target.style.cursor = 'move';
    });
    //Subscribe mouseout event for each polygon
    shapes[index].on('mouseout', function (event) {
      event.target.style.opacity = 1;
    });

    //Add draggable feature
    var element = document.getElementById(shapes[index].node.id);
    draggable = new PlainDraggable(element);
    draggable.autoScroll = true;
    draggable.containment = document.getElementById('mainPage1');

    //Add contextMenu class
    $(element).addClass('contextMenu');

    //Subscribe keydown event to detect ENTER key
    document.addEventListener('keydown', keyEnterDownHandler);
  });

  //Subscribe drawstop event: This event fires when <object>.draw('done') executes 
  shapes[index].on('drawstop', function () {
    console.log(shapes);
    //Remove enter key event
    document.removeEventListener('keydown', keyEnterDownHandler);
  });
}

//Add new image
function addNewImage() {
  stopDraw(false);
  $('#mainPage1').on('mousedown', imageMouseDownEventHandler);
}

//Add new textblock
function addNewText() {
  stopDraw(false);
  $('#mainPage1').on('mousedown', textMouseDownEventHandler);
}

//Add new display value
function addNewDisplayValue() {
  stopDraw(false);
  $('#mainPage1').on('mousedown', displayValueMouseDownEventHandler);
}

//Add new button
function addNewButton() {
  stopDraw(false);
  $('#mainPage1').on('mousedown', buttonMouseDownEventHandler);
}

//Add new switch
function addNewSwitch() {
  stopDraw(false);
  $('#mainPage1').on('mousedown', switchMouseDownEventHandler);
}

//Add new input
function addNewInput() {
  stopDraw(false);
  $('#mainPage1').on('mousedown', inputMouseDownEventHandler);
}

//Add new checkbox
function addNewCheckbox() {
  stopDraw(false);
  $('#mainPage1').on('mousedown', checkboxMouseDownEventHandler);
}

//Add new slider
function addNewSlider() {
  stopDraw(false);
  $('#mainPage1').on('mousedown', sliderMouseDownEventHandler);
}

//Add new process bar
function addNewProcessbar() {
  stopDraw(false);
  $('#mainPage1').on('mousedown', processbarMouseDownEventHandler);
}

//Add new symbol set
function addNewSymbolSet() {
  stopDraw(false);
  $('#mainPage1').on('mousedown', symbolsetMouseDownEventHandler);
}

/*
***********************************************************************************************
                                Stop drawing function 
***********************************************************************************************
*/

//stopDraw function: Stop all draw action
var stopDraw = function (addContext) {
  draw.off();
  $('#mainPage1').off('mousedown', imageMouseDownEventHandler);
  $('#mainPage1').off('mousedown', textMouseDownEventHandler);
  $('#mainPage1').off('mousedown', displayValueMouseDownEventHandler);
  $('#mainPage1').off('mousedown', buttonMouseDownEventHandler);
  $('#mainPage1').off('mousedown', switchMouseDownEventHandler);
  $('#mainPage1').off('mousedown', inputMouseDownEventHandler);
  $('#mainPage1').off('mousedown', checkboxMouseDownEventHandler);
  $('#mainPage1').off('mousedown', sliderMouseDownEventHandler);
  $('#mainPage1').off('mousedown', processbarMouseDownEventHandler);
  $('#mainPage1').off('mousedown', symbolsetMouseDownEventHandler);

  if(addContext) addContextMenu();
}

/*
***********************************************************************************************
                                Event handlers
***********************************************************************************************
*/

//Keydown ENTER event handler: To stop drawing polygon
function keyEnterDownHandler(e) {
  console.log('Enter');
  if (e.keyCode == 13) {
    shapes[index].draw('done');
    shapes[index].off('drawstart');
    index++;
    stopDraw();
  }
}

//Image mouse down event handler: To create new image
function imageMouseDownEventHandler(event) {
  var leftOffset = document.getElementById('mainPage1').getBoundingClientRect().left;
  var topOffset = document.getElementById('mainPage1').getBoundingClientRect().top;

  var left = event.pageX - leftOffset + 'px';
  var top = event.pageY - topOffset + 'px';

  //Declare new image
  var defaultImageSrc = '../public/img/png/default-image.png';
  var img = document.createElement('img');
  img.id = 'img' + index;
  img.className += ' contextMenu '


  //Image css style
  img.src = defaultImageSrc;
  img.style.height = '150px';
  img.style.width = '200px';
  img.style.position = 'absolute';
  img.style.top = top;
  img.style.left = left;
  img.style.border = '2px solid black';

  //Image mouse events
  $(img).on('mouseover', function (event) {
    event.target.style.opacity = 0.4;
    //event.target.style.cursor = 'move';
  });
  //Subscribe mouseout event for each polygon
  $(img).on('mouseout', function (event) {
    event.target.style.opacity = 1;
  });


  $('#mainPage1').append(img);
  shapes[index] = img;
  index++;

  //Add draggable feature
  draggable = new PlainDraggable(img);
  draggable.autoScroll = true;
  draggable.containment = document.getElementById('mainPage1');


}

//Text mouse down event handler: To create new text
function textMouseDownEventHandler(event) {
  var leftOffset = document.getElementById('mainPage1').getBoundingClientRect().left;
  var topOffset = document.getElementById('mainPage1').getBoundingClientRect().top;

  var left = event.pageX - leftOffset + 'px';
  var top = event.pageY - topOffset + 'px';

  //Declare new paragrap
  var para = document.createElement('p');
  var text = document.createTextNode('Textblock');
  para.appendChild(text);
  para.id = 'text' + index;
  para.className += ' contextMenu ';

  //Image css style
  para.style.fontSize = '30px';
  para.style.position = 'absolute';
  para.style.top = top;
  para.style.left = left;


  //Image mouse events
  $(para).on('mouseover', function (event) {
    event.target.style.opacity = 0.4;
    //event.target.style.cursor = 'move';
  });
  //Subscribe mouseout event for each polygon
  $(para).on('mouseout', function (event) {
    event.target.style.opacity = 1;
  });

  $('#mainPage1').append(para);
  shapes[index] = para;
  index++;

  //Add draggable feature
  draggable = new PlainDraggable(para);
  draggable.autoScroll = true;
  draggable.containment = document.getElementById('mainPage1');

  //console.log(shapes);
}

//Display Value mouse down event handler: To create new DisplayValue
function displayValueMouseDownEventHandler(event) {
  var leftOffset = document.getElementById('mainPage1').getBoundingClientRect().left;
  var topOffset = document.getElementById('mainPage1').getBoundingClientRect().top;

  var left = event.pageX - leftOffset + 'px';
  var top = event.pageY - topOffset + 'px';

  //Declare new paragrap
  var para = document.createElement('p');
  var text = document.createTextNode('##.##');
  para.appendChild(text);
  para.id = 'displayValue' + index;
  para.className += ' contextMenu '

  //Image css style
  para.style.fontSize = '40px';
  para.style.position = 'absolute';
  para.style.top = top;
  para.style.left = left;


  //Image mouse events
  $(para).on('mouseover', function (event) {
    event.target.style.opacity = 0.4;
    //event.target.style.cursor = 'move';
  });
  //Subscribe mouseout event for each polygon
  $(para).on('mouseout', function (event) {
    event.target.style.opacity = 1;
  });

  $('#mainPage1').append(para);
  shapes[index] = para;
  index++;

  //Add draggable feature
  draggable = new PlainDraggable(para);
  draggable.autoScroll = true;
  draggable.containment = document.getElementById('mainPage1');

  //console.log(shapes);
}

//Button mouse down event handler: To create new button
function buttonMouseDownEventHandler(event) {
  var leftOffset = document.getElementById('mainPage1').getBoundingClientRect().left;
  var topOffset = document.getElementById('mainPage1').getBoundingClientRect().top;

  var left = event.pageX - leftOffset + 'px';
  var top = event.pageY - topOffset + 'px';

  //Declare new paragrap
  var btn = document.createElement('button');
  var text = document.createTextNode('Button');
  btn.appendChild(text);
  btn.id = 'button' + index;

  //Image css style
  btn.className = 'btn btn-primary contextMenu ';
  btn.style.position = 'absolute';
  btn.style.top = top;
  btn.style.left = left;



  //Image mouse events
  $(btn).on('mouseover', function (event) {
    event.target.style.opacity = 0.4;
    //event.target.style.cursor = 'move';
  });
  //Subscribe mouseout event for each polygon
  $(btn).on('mouseout', function (event) {
    event.target.style.opacity = 1;
  });

  $('#mainPage1').append(btn);
  shapes[index] = btn;
  index++;

  //Add draggable feature
  draggable = new PlainDraggable(btn);
  draggable.autoScroll = true;
  draggable.containment = document.getElementById('mainPage1');

 // console.log(shapes);
}

//Switch mouse down event handler: To create new switch
function switchMouseDownEventHandler(event) {
  var leftOffset = document.getElementById('mainPage1').getBoundingClientRect().left;
  var topOffset = document.getElementById('mainPage1').getBoundingClientRect().top;

  var left = event.pageX - leftOffset + 'px';
  var top = event.pageY - topOffset + 'px';

  //Declare new paragrap
  var sw = document.createElement('label');
  sw.className = 'switch contextMenu ';

  var inputsw = document.createElement('input');
  inputsw.setAttribute('type', 'checkbox');
  inputsw.className = 'primary';

  var spansw = document.createElement('span');
  spansw.className = 'slider round';

  sw.appendChild(inputsw);
  sw.appendChild(spansw);

  sw.id = 'switch' + index;

  //Image css style
  sw.style.position = 'absolute';
  sw.style.top = top;
  sw.style.left = left;


  //Image mouse events
  $(sw).on('mouseover', function (event) {
    event.target.style.opacity = 0.65;
    //event.target.style.cursor = 'move';
  });
  //Subscribe mouseout event for each polygon
  $(sw).on('mouseout', function (event) {
    event.target.style.opacity = 1;
  });

  $('#mainPage1').append(sw);
  shapes[index] = sw;
  index++;

//Add draggable feature
draggable = new PlainDraggable(sw);
draggable.autoScroll = true;
draggable.containment = document.getElementById('mainPage1');

  //console.log(shapes);
}

// function switchMouseDownEventHandler(event) {
//   var leftOffset = document.getElementById('mainPage1').getBoundingClientRect().left;
//   var topOffset = document.getElementById('mainPage1').getBoundingClientRect().top;

//   var left = event.pageX - leftOffset + 'px';
//   var top = event.pageY - topOffset + 'px';

//   //Declare new paragrap
//   var sw = document.createElement('div');
//   sw.className = 'custom-control custom-switch';

//   var input = document.createElement('input');
//   input.setAttribute('type', 'checkbox');
//   input.className = 'custom-control-input';
//   input.id = 'input' + index;

//   var label = document.createElement('label');
//   label.className = 'custom-control-label';
//   label.htmlFor = 'input'+index;
//   label.innerText = 'Switch';

//   sw.appendChild(input);
//   sw.appendChild(label);

//   sw.id = 'switch' + index;

//   //Image css style
//   sw.style.position = 'absolute';
//   sw.style.top = top;
//   sw.style.left = left;


//   //Image mouse events
//   $(sw).on('mouseover', function (event) {
//     event.target.style.opacity = 0.65;
//     event.target.style.cursor = 'move';
//   });
//   //Subscribe mouseout event for each polygon
//   $(sw).on('mouseout', function (event) {
//     event.target.style.opacity = 1;
//   });

//   $('#mainPage1').append(sw);
//   shapes[index] = sw;
//   index++;

//   console.log(shapes);
// }

//Input mouse down event handler: To create new input

function inputMouseDownEventHandler(event) {
  var leftOffset = document.getElementById('mainPage1').getBoundingClientRect().left;
  var topOffset = document.getElementById('mainPage1').getBoundingClientRect().top;

  var left = event.pageX - leftOffset + 'px';
  var top = event.pageY - topOffset + 'px';

  //Declare new paragrap
  var input = document.createElement('input');
  input.type = 'text';
  input.id = 'input' + index;
  input.placeholder = 'Add text ...';

  //Image css style
  input.className = 'form-control contextMenu ';
  input.style.width = '200px';
  input.style.position = 'absolute';
  input.style.top = top;
  input.style.left = left;


  //Image mouse events
  $(input).on('mouseover', function (event) {
    event.target.style.opacity = 0.4;
    //event.target.style.cursor = 'move';
  });
  //Subscribe mouseout event for each polygon
  $(input).on('mouseout', function (event) {
    event.target.style.opacity = 1;
  });

  $('#mainPage1').append(input);
  shapes[index] = input;
  index++;

  //Add draggable feature
  draggable = new PlainDraggable(input);
  draggable.autoScroll = true;
  draggable.containment = document.getElementById('mainPage1');
  
  //console.log(shapes);
}

//Checkbox mouse down event handler: To create new Checkbox
function checkboxMouseDownEventHandler(event) {
  var leftOffset = document.getElementById('mainPage1').getBoundingClientRect().left;
  var topOffset = document.getElementById('mainPage1').getBoundingClientRect().top;

  var left = event.pageX - leftOffset + 'px';
  var top = event.pageY - topOffset + 'px';

  //Declare new paragrap
  var checkbox = document.createElement('div');
  checkbox.className = 'custom-control custom-checkbox contextMenu ';
  checkbox.id = 'checkbox' + index;

  var cbInput = document.createElement('input');
  cbInput.type = 'checkbox';
  cbInput.className = 'custom-control-input';
  cbInput.id = 'cbInput'+index;

  var cbLabel = document.createElement('label');
  cbLabel.className = 'custom-control-label';
  cbLabel.htmlFor = 'cbInput'+index;
  cbLabel.innerText = 'Checkbox';

  checkbox.appendChild(cbInput);
  checkbox.appendChild(cbLabel);


  //Image css style
  checkbox.style.position = 'absolute';
  checkbox.style.top = top;
  checkbox.style.left = left;


  //Image mouse events
  $(checkbox).on('mouseover', function (event) {
    event.target.style.opacity = 0.4;
    //event.target.style.cursor = 'move';
  });
  //Subscribe mouseout event for each polygon
  $(checkbox).on('mouseout', function (event) {
    event.target.style.opacity = 1;
  });

  $('#mainPage1').append(checkbox);
  shapes[index] = checkbox;
  index++;

  //Add draggable feature
  draggable = new PlainDraggable(checkbox);
  draggable.autoScroll = true;
  draggable.containment = document.getElementById('mainPage1');

  //console.log(shapes);
}

//Slider mouse down event handler: To create new Checkbox
function sliderMouseDownEventHandler(event) {
  var leftOffset = document.getElementById('mainPage1').getBoundingClientRect().left;
  var topOffset = document.getElementById('mainPage1').getBoundingClientRect().top;

  var left = event.pageX - leftOffset + 'px';
  var top = event.pageY - topOffset + 'px';

  //Declare new paragrap
  var slider = document.createElement('input');
  slider.type = 'range';
  slider.className = 'custom-range contextMenu ';
  slider.id = 'slider' + index;

  //Image css style
  slider.style.position = 'absolute';
  slider.style.top = top;
  slider.style.left = left;
  slider.style.width = '500px';


  //Image mouse events
  $(slider).on('mouseover', function (event) {
    event.target.style.opacity = 0.4;
    //event.target.style.cursor = 'move';
  });
  //Subscribe mouseout event for each polygon
  $(slider).on('mouseout', function (event) {
    event.target.style.opacity = 1;
  });

  $('#mainPage1').append(slider);
  shapes[index] = slider;
  index++;

  //Add draggable feature
  draggable = new PlainDraggable(slider);
  draggable.autoScroll = true;
  draggable.containment = document.getElementById('mainPage1');

  //console.log(shapes);
}

//Process bar mouse down event handler: To create new Checkbox
function processbarMouseDownEventHandler(event) {
  var leftOffset = document.getElementById('mainPage1').getBoundingClientRect().left;
  var topOffset = document.getElementById('mainPage1').getBoundingClientRect().top;

  var left = event.pageX - leftOffset + 'px';
  var top = event.pageY - topOffset + 'px';

  //Declare new paragrap
  var progressbar = document.createElement('div');
  progressbar.className = 'progress contextMenu';
  progressbar.id = 'progressbar' + index;

  var bar = document.createElement('div');
  bar.className = 'progress-bar';
  bar.style.width = '70%';
  //bar.style.height = '20px';
  bar.innerText = '70%';


  progressbar.appendChild(bar);

  //Image css style
  progressbar.style.position = 'absolute';
  progressbar.style.top = top;
  progressbar.style.left = left;
  progressbar.style.width = '600px';
  //progressbar.style.height = '20px';


  //Image mouse events
  $(progressbar).on('mouseover', function (event) {
    event.target.style.opacity = 0.4;
    //event.target.style.cursor = 'move';
  });
  //Subscribe mouseout event for each polygon
  $(progressbar).on('mouseout', function (event) {
    event.target.style.opacity = 1;
  });

  $('#mainPage1').append(progressbar);
  shapes[index] = progressbar;
  index++;

  //Add draggable feature
  draggable = new PlainDraggable(progressbar);
  draggable.autoScroll = true;
  draggable.containment = document.getElementById('mainPage1');

  //console.log(shapes);
}

//Symbol Set mouse down event handler: To create new image
function symbolsetMouseDownEventHandler(event) {
  var leftOffset = document.getElementById('mainPage1').getBoundingClientRect().left;
  var topOffset = document.getElementById('mainPage1').getBoundingClientRect().top;

  var left = event.pageX - leftOffset + 'px';
  var top = event.pageY - topOffset + 'px';

  //Declare new image
  var defaultSymbolSet = '../public/img/symbol-set/light-off.png';
  var symbolSet = document.createElement('img');
  symbolSet.id = 'symbolSet' + index;
  symbolSet.className += ' contextMenu ';


  //Image css style
  symbolSet.src = defaultSymbolSet;
  symbolSet.style.height = '50px';
  symbolSet.style.width = '50px';
  symbolSet.style.position = 'absolute';
  symbolSet.style.top = top;
  symbolSet.style.left = left;

  //Image mouse events
  $(symbolSet).on('mouseover', function (event) {
    event.target.style.opacity = 0.4;
    //event.target.style.cursor = 'move';
  });
  //Subscribe mouseout event for each polygon
  $(symbolSet).on('mouseout', function (event) {
    event.target.style.opacity = 1;
  });

  $('#mainPage1').append(symbolSet);
  shapes[index] = symbolSet;
  index++;
  
  //Add draggable feature
  draggable = new PlainDraggable(symbolSet);
  draggable.autoScroll = true;
  draggable.containment = document.getElementById('mainPage1');

  //console.log(shapes);
}



