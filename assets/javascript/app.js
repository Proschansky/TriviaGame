var userPick;

var correctAnswer = 0;

var incorrectAnswer = 0;

var unAnswer = 0;

var question = 0;

var images;

var counter=30;

var disneyQuestion = [{
    question: "In Aladdin, what is the name of Jasmine's pet tiger?",
    choices: ["Rajah", "Bo", "Iago", "Jack" ],
    images:  ["../images/Rajah.gif"],
    validAnswer: 0
    }, {
    question:"In Peter Pan, Captain Hook had a hook on which part of his     body?",
    choices: ["Right Foot", "Left Hand", "Left Foot", "Right Hand"],
    validAnswer: 1
    
    }, {
    question:"In the Lion King, where does Mufasa and his family live?",
    choices: ["Rocky Mountain", "Forest", "Desert", "Pride Rock"],
    validAnswer: 3
    
    }, {
    question:"In Beauty and the Beast, how many eggs does Gaston eat for breakfast?",
    choices: ["2 Dozen", "5 Dozen", "5000", "0"],
    validAnswer: 1
    
    }, {
    question:"In Alice in Wonderland, what is the name of Alice’s kitten?",
    choices: ["Dinah", "Sammie", "Kat", "Luna"],
    validAnswer: 0
    
     }, {
    question:"After being on earth, where did Hercules first meet his   father Zeus?",
    choices: ["Mount Olympus", "Greece", "In the Temple of Zeus", "Elysian   Fields"],
    validAnswer: 2
    
    }, {
    question:"During the ballroom scene of Beauty & the Beast, what color is Belle’s Gown?",
    choices: ["Yellow", "Blue", "Gold", "White"],
    validAnswer: 2
    
    }, {
    question:"In Bambi, what word does the owl use to describe falling in love?",
    choices: ["Whimsical", "Miserable", "Joyful", "Twitterpatted"],
    validAnswer: 3
    
    }
    
    ];

    console.log(disneyQuestion.length);

function shuffle(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
    };

var number = 30; //  Set our number counter to 100.

var intervalId; //  Variable that will hold our interval ID when we execute the "run" function

$("#startButton").on("click", run); //  When the resume button gets clicked, execute the run function.
$("#startOver").on("click", reset); // write a reset function

function reset() {
   $("startOver").attr("id", "startButton");
   $("#startButton").text("Start Over");
   number = 30;
   shuffle(disneyQuestion)
   intervalId;
};

//  The run function sets an interval that runs the decrement function once a second.
function run() {
    disneyQuestion = shuffle(disneyQuestion)
   $("#startButton").attr('id', 'startOver');
   $("startOver").text("Start Over");
   $("#spaceTitle").empty();
   $(".button").hide();
   $("#showNumber").html("<h2>"+ shuffle(disneyQuestion[0].question))
   clearInterval(intervalId);
   intervalId = setInterval(decrement, 1000);
}

//  The decrement function.
function decrement() {

   //  Decrease number by one.
   number--;

   //  Show the number in the #show-number tag.
   $("#showNumber").html("<h2>" + "Time Left: " + number + " Seconds" + "</h2>");

   //  Once number hits zero...
   if (number == -1) {
       //  ...run the stop function.
       reset();
       //  Alert the user that time is up.
       alert("Time Up! How did you do?");
   }
}

// function timer(){
//     counter--;
//     if (counter > 0) {
//      clearInterval(counter);
//      return;
//     }
    
//      $("#timer").html("Time remaining: " + "00:" + counter + " secs");
//     }

    
    
//     function displayTrivia() {
//     $("#questionDiv").html(disneyQuestion[0].question);
//     question++;
    
//       var choicesArr = disneyQuestion[0].choices;
//       var buttonsArr = [];
    
//       for (let i = 0; i < choicesArr.length; i++) {
//         var button = $('<button>');
//         button.text(choicesArr[i]);
//         button.attr('data-id', i);
//         $('#choicesDiv').append(button);
//        }
    
//       } 

// $("#startButton").click(function(){
// $(this).hide();
// counter = setInterval(timer, 1000); 
// displayTrivia();
// }); 

//  $('#choicesDiv').on('click', 'button', function(){
//  userPick = $(this).data("id");
//  disneyQuestion[0].validAnswer;
//  if(userPick != disneyQuestion[0].validAnswer) {

//  $('#choicesDiv').text("Wrong Answer! The correct answer is Rajah.");
//  incorrectAnswer++;

// } else if (userPick === disneyQuestion[0].validAnswer) {
// $('#choicesDiv').text("Correct!!! The pet tiger name is Rajah");
// correctAnswer++;

// }

// });