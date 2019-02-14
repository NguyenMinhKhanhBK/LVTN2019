$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();

  $('body').keyup(function (e) {
    if (e.keyCode == 27) {
      stopDraw();
    }
  });
});


const draw = SVG('mainPage1');
const shapes = [];
let index = 0;
let shape;

const defaultOption = {
  stroke: 'black',
  'stroke-width': 3,
  'fill-opacity': 0,
};

const defaultLineOption = {
  stroke: 'black',
  'stroke-width': 5,
  'stroke-linecap': 'round'
};




var startDraw = function (shape) {
  stopDraw();

  isEnable = true;
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
  draw.on('mouseup', function (event) {
    shapes[index].draw(event);
    console.log(shapes);
    shapes[index].on('click', function (event) {
      alert('Click on item ' + event.target.id);
    });

    shapes[index].on('mouseover', function (event) {
      event.target.style.opacity = 0.4;
    });

    shapes[index].on('mouseout', function (event) {
      event.target.style.opacity = 1;
    })
    index++;
  }, false);
}

var drawPoly = function () {
  stopDraw();
  shapes[index] = draw.polygon().draw();
  shapes[index].attr({
    'fill-opacity': 0,
    'stroke-width': 3,
  })

  shapes[index].on('drawstart', function (e) {
    console.log('draw start');
    document.addEventListener('keydown', function (e) {
      if (e.keyCode == 13) {
        shapes[index].draw('done');
        shapes[index].off('drawstart');
        index++;
      }
    });
  });

  shapes[index].on('drawstop', function () {
    console.log('draw end');
  });
}

var stopDraw = function () {
  draw.off();
}

function keyEnterDownHandler(e) {
  console.log('Enter');
  if (e.keyCode == 13) {

    draw.draw('done');
    draw.off('drawstart');
  }
}


