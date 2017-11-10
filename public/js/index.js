var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {

  var formattedTime = moment(message.createdAt).format("h:mm a")  

  var template = jQuery("#message-template").html()
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  })
  jQuery("#messages").append(html)
});

socket.emit("createMessage",{
    from: "index.js",
    text: "createMessage"
}, function(data){
    console.log("got it", data)
})

socket.on("newLocationMessage", function(message){
  var formattedTime = moment(message.createdAt).format("h:mm a")  
  console.log(message)
    var template = jQuery("#location-template").html()
    var html = Mustache.render(template, {
      from: message.from,
      url: message.url,
      createdAt: formattedTime
    })
    console.log(html);
    jQuery("#messages").append(html)
})

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextbox = jQuery("[name=message]")

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {
      messageTextbox.val("anything you like")
  });
});

var locationButton = jQuery("#send-location")

locationButton.on("click",function(e){
  if(!navigator.geolocation) {
    return alert("geolocation not supported by your browser")
  }

  locationButton.attr("disabled","disabled").text("Send location...")


  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr("disabled").text("Send location")
    socket.emit("createLocationMessage", {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function(){
    alert("unable to fetch lcoation.")
  })
});