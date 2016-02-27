var url = 'ws://' + location.host + '/ts';
var socket = new WebSocket(url);
var retry_attempts = 0;
var max_retry_attempts = 120;
var $message = $('#message');
var $iframe = $('#iframe');

console.log(url);

function sendAction(message) {

  var message = {
    message: message
  };

  socket.send(JSON.stringify(message));
}

// onopen
// When tablet page opened.
socket.onopen = function() {
  console.log('onopen');

  $message.attr('class', 'label label-success');
  $message.text('open');
  $iframe.attr('src', null)

};

// onmessage
// When invoked from robot and page reload.
socket.onmessage = function(event) {
  console.log('onmessage');

  var json = JSON.parse(event.data);
  console.log(json);
  var mode = json.mode
  var image = json.image

  $message.attr('class', 'label label-primary');
  $message.text('recieved');

  if (mode == "show_image") {
      $iframe.attr('src', '/iframe?mode=' + mode + '&image=' + image)
  } else {
      $iframe.attr('src', '/iframe?mode=' + mode)
  }

  // reset the tries back to 0 since we have a new connection opened.
  retry_attempts = 0;

};

// onclose
// When tablet page closed.
socket.onclose = function(event) {
  console.log('onclose. reason: %s', event.reason);

  $message.attr('class', 'label label-important');
  $message.text('closed');

  if (retry_attempts < max_retry_attempts) {
    // Connection has closed so try to reconnect.
    retry_attempts++;
    socket = null;
    // start();
    console.log("retry_attempts: ", retry_attempts);

  } else {
    console.log("websocket closed by over max_retry_attempts: ", retry_attempts);

  }

};

// onerror
// When error occurred.
socket.onerror = function(event) {
  console.log('onerror');

  $message.attr('class', 'label label-warning');
  $message.text('error occurred');
};