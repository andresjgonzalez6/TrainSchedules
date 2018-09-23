// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
// Initialize Firebase
var config = {
  apiKey: "AIzaSyDE9B46KM0SPLMODGpuk_LLrcx9lKWQ82E",
  authDomain: "trainassignment2.firebaseapp.com",
  databaseURL: "https://trainassignment2.firebaseio.com",
  projectId: "trainassignment2",
  storageBucket: "trainassignment2.appspot.com",
  messagingSenderId: "94077473790"
};
firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees

var train = "";
var destination = "";
var frequency = 0;
var firstTime = "";
var tfrequency = 0;
var firstTime = 0;

$('#add-train').on("click", function (event){
  event.preventDefault();
  train = $("#train-input").val().trim();
  console.log(train);
  destination = $("#destination-input").val().trim();
  console.log(destination);
  frequency = $("#frequency-input").val().trim();
  console.log(frequency);
  firstTime = $("#time-input").val().trim();
  console.log(firstTime);
  database.ref().push({
    train: train,
    destination: destination,
    frequency: frequency,
    firstTime: firstTime,
  });
  
});

database.ref().on("child_added", function (childSnapshot){
  tfrequency = childSnapshot.val().frequency;
  tfirstTime = childSnapshot.val().firstTime;

  var firstTimeConverted = moment(tfirstTime, "HH:mm").subtract(1, "year");
  
  var currentTime = moment();
       //console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
       var diffTime = moment().diff(moment(firstTimeConverted),
        "minutes");
       //console.log("DIFFERENCE IN TIME: " + diffTime);
       var tRemainder = diffTime % tfrequency;
       //console.log(tRemainder);
       var minutesAway = tfrequency - tRemainder;
       //console.log("MINUTES TILL TRAIN: " + minutesAway);
       var nextTrain = moment().add(minutesAway, "minutes");
       //console.log("ARRIVAL TIME: " + moment(nextTrain)
       //.format("hh:mm"));

       $('.trains').append('<tr>'+'<td>' + childSnapshot.val().train + '</td>' +
           '<td>' + childSnapshot.val().destination + '</td>' +
           '<td>' + tfrequency + '</td>' +
           '<td>' + moment(nextTrain).format("hh:mm") + '</td>' +
           '<td>' + minutesAway + '</td>'+'</tr>');
});