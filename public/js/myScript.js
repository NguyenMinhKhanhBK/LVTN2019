// Document ready
$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();

  $('body').keyup(function (e) {
    if (e.keyCode == 27) {
      stopDraw();
    }
  });
});

//SVG global variable
const draw = SVG('mainPage1');
const shapes = [];
let index = 0;
let shape;

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

//startDraw function: Start drawing object depending on the parameter
//Input: shape (except POLYGON)
var startDraw = function (shape) {
  //Stop the previous draw
  stopDraw();

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
      event.target.style.cursor = 'move';
    });
    //Subscribe mouse out event for each object
    shapes[index].on('mouseout', function (event) {
      event.target.style.opacity = 1;
    })

    //Increase index to append the array
    index++;
  }, false);
}

//drawPoly function: Draw polygon
var drawPoly = function () {
  stopDraw();
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
      event.target.style.cursor = 'move';
    });
    //Subscribe mouseout event for each polygon
    shapes[index].on('mouseout', function (event) {
      event.target.style.opacity = 1;
    });
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

//stopDraw function: Stop all draw action
var stopDraw = function () {
  draw.off();
  $('#mainPage1').off('mousedown', imageMouseDownEventHandler);
  $('#mainPage1').off('mousedown', textMouseDownEventHandler);
  $('#mainPage1').off('mousedown', displayValueMouseDownEventHandler);
  $('#mainPage1').off('mousedown', buttonMouseDownEventHandler);
}

//Add new image
function addNewImage() {
  stopDraw();
  $('#mainPage1').on('mousedown', imageMouseDownEventHandler);
}

//Add new textblock
function addNewText() {
  stopDraw();
  $('#mainPage1').on('mousedown', textMouseDownEventHandler);
}

//Add new display value
function addNewDisplayValue() {
  stopDraw();
  $('#mainPage1').on('mousedown', displayValueMouseDownEventHandler);
}

//Add new button
function addNewButton() {
  stopDraw();
  $('#mainPage1').on('mousedown', buttonMouseDownEventHandler);
}

//Keydown ENTER event handler: To stop drawing polygon
function keyEnterDownHandler(e) {
  console.log('Enter');
  if (e.keyCode == 13) {
    shapes[index].draw('done');
    shapes[index].off('drawstart');
    index++;
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
    event.target.style.cursor = 'move';
  });
  //Subscribe mouseout event for each polygon
  $(img).on('mouseout', function (event) {
    event.target.style.opacity = 1;
  });

  $('#mainPage1').append(img);
  shapes[index] = img;
  index++;
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

  //Image css style
  para.style.fontSize = '30px';
  para.style.position = 'absolute';
  para.style.top = top;
  para.style.left = left;
  

  //Image mouse events
  $(para).on('mouseover', function (event) {
    event.target.style.opacity = 0.4;
    event.target.style.cursor = 'move';
  });
  //Subscribe mouseout event for each polygon
  $(para).on('mouseout', function (event) {
    event.target.style.opacity = 1;
  });

  $('#mainPage1').append(para);
  shapes[index] = para;
  index++;

  console.log(shapes);
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

  //Image css style
  para.style.fontSize = '40px';
  para.style.position = 'absolute';
  para.style.top = top;
  para.style.left = left;
  

  //Image mouse events
  $(para).on('mouseover', function (event) {
    event.target.style.opacity = 0.4;
    event.target.style.cursor = 'move';
  });
  //Subscribe mouseout event for each polygon
  $(para).on('mouseout', function (event) {
    event.target.style.opacity = 1;
  });

  $('#mainPage1').append(para);
  shapes[index] = para;
  index++;

  console.log(shapes);
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
  btn.className = 'btn btn-primary';
  btn.style.position = 'absolute';
  btn.style.top = top;
  btn.style.left = left;
  

  //Image mouse events
  $(btn).on('mouseover', function (event) {
    event.target.style.opacity = 0.4;
    event.target.style.cursor = 'move';
  });
  //Subscribe mouseout event for each polygon
  $(btn).on('mouseout', function (event) {
    event.target.style.opacity = 1;
  });

  $('#mainPage1').append(btn);
  shapes[index] = btn;
  index++;

  console.log(shapes);
}



