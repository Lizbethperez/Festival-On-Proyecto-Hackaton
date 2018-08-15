$(document).ready(function(){
  $("#logout").click(function(){
   console.log("Boton logout clickeado");
   firebase.auth().signOut();
    window.location.href = "../index.html";
 });
 $('.modal').modal();
 $('.sidenav').sidenav();
 $('select').formSelect();
});

var data={};
 $(document).ready(function(){
   $('.sidenav').sidenav();
 });

 $(document).ready(function(){
   $('select').formSelect();
 });
 var selectOption= document.getElementById('optionSelect')
 selectOption.addEventListener("change", rescueValue);

 function rescueValue(){
   console.log(selectOption);
   var selectedValue = selectOption.options[selectOption.selectedIndex].text;
   console.log(selectedValue);

   $.ajax({
       type:"GET",
       url:"http://app.ticketmaster.com/discovery/v2/events.json?apikey=Or5al7f1CgXYK7AwGfbpH9sFH0viHQs6&city=" + selectedValue,
       async:true,
       dataType: "json",
       success: function(json) {
           console.log(json);
           var template = document.getElementById("template-content").innerHTML;
           console.log(template);
           var $eventsgeneral= $("#eventsgenerals");
           $eventsgeneral.html("");
           json._embedded.events.forEach(function(event){
               var data= {
                   eventName:event.name,
                   eventId:event.id,
                   date:event.dates.start.localDate,
                   img: event.images[0].url,
                   eventPlace:event._embedded.venues[0].name
               }
               console.log(data.eventId);
           console.log(data);
           var filledTemplate=fillTemplate(template, data);
                  console.log(filledTemplate);
                  $eventsgeneral.append(filledTemplate);
           });

       }

  });
}


 function rescueValueModal(){

 //console.log(selectOption);
 //var selectedValue = selectOption.options[selectOption.selectedIndex].text;
   //console.log(selectedValue);
   var namesEvents=$("#nameEventsButton").html();
   console.log(namesEvents);

   $.ajax({
       type:"GET",
       url:"http://app.ticketmaster.com/discovery/v2/events.json?apikey=Or5al7f1CgXYK7AwGfbpH9sFH0viHQs6&id=" + namesEvents,
       async:true,
       dataType: "json",
       success: function(json) {
           //console.log(json);
           var template = document.getElementById("template-modal2").innerHTML;
          // console.log(template);
           var $modalEvents= $("#modal1");
           $modalEvents.html("");
           json._embedded.events.forEach(function(event){
                console.log(event._embedded.venues[0]);
               data= {
                   eventId:event.id,
                   eventName:event.name,
                   date:event.dates.start.localDate,
                   time:event.dates.start.localTime,
                   img: event.images[0].url,
                   eventPlace:event._embedded.venues[0].name,
                   info:event.info,
                   url: event.url,
                   direction:event._embedded.venues[0].address.line1,
               }

               console.log(data.info)
           //console.log(data);
           var filledTemplate=fillTemplate(template, data);
               // console.log(filledTemplate);
                  $modalEvents.append(filledTemplate);
           });
       }

  });
}


function fillTemplate(template, data) {
   for(var index in data){
       var value = data[index];
       template = template.replace(new RegExp('{{'+index+'}}', 'g'), escapeHtml(value) );
   };
   return template;
}

function escapeHtml(str) {
   var div = document.createElement('div');
   div.appendChild(document.createTextNode(str));
   return div.innerHTML;
}

function videos(){
    var artista = $("#artista").html();
   //console.log(artista);
    window.location.href = 'video.html?artista='+ artista;

  };
  var config = {
    apiKey: "AIzaSyASkwROebckBu2yW6srOPlmpiks8C11TgM",
    authDomain: "festivalon-fa3c0.firebaseapp.com",
    databaseURL: "https://festivalon-fa3c0.firebaseio.com",
    projectId: "festivalon-fa3c0",
    storageBucket: "",
    messagingSenderId: "76448080174"
  };
  firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user) {//callback
    if (user) {
      //console.log("Loggedin");
      //console.log(user);
      $("#chicacool").attr("src", user.photoURL);
      $("#email-perfil").text(user.email);
    }else{
      console.log("desloguedo");
      window.location="../index.html";
    }
  });

  function logOut (){
    firebase.auth().signOut().then(function() {
}, function(error) {
  // An error happened.
});
  }
