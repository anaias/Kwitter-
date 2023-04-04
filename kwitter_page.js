const config = {
apiKey: "AIzaSyAL9V5cGt2CtEYrtD19TIe1JDoqbuchEBk",
  authDomain: "twitter-5b076.firebaseapp.com",
  databaseURL: "https://twitter-5b076-default-rtdb.firebaseio.com",
  projectId: "twitter-5b076",
  storageBucket: "twitter-5b076.appspot.com",
  messagingSenderId: "354102679353",
  appId: "1:354102679353:web:9bca6967c280ece6b5fae8"
};

firebase.initializeApp(config);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name:user_name,
            message:msg,
            like:0
      });

document.getElementById("msg").value = "";
}

function getData() 
{ firebase.database().ref("/"+room_name).on('value', function(snapshot) 
{ document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) 
{ childKey  = childSnapshot.key; childData = childSnapshot.val(); 
      if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
console.log(firebase_message_id);
console.log(message_data);
name = message_data['name'];
message = message_data['message'];
like = message_data['like'];
name_with_tag = "<h4>" + name + "<img class='user_tick' src='tick.png'></h4>";
message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value = "+like + " onclick='updateLike(this.id)'>";
span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'> like:"+ like +" </span></button><hr>";
row = name_with_tag + message_with_tag + like_button + span_with_tag;
document.getElementById("output").innerHTML += row;
      } });  }); }
getData();

function logOut() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
 }

 function updateLike(message_id) {
console.log("Clicked on the like button:-" + message_id);
button_id = message_id;
likes = document.getElementById(button_id).value;
updatedlikes = Number(likes) + 1;
console.log(updatedlikes);
firebase.database().ref(room_name).child(message_id).update({
      like: updatedlikes
      });
 }