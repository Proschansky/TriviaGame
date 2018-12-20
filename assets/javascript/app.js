//Creates a shuffle function based on the Fisher-Yates shuffle algorithm.
function shuffle(o) {
  for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
};

// Creates a prototype function containing a counter for the user's choice, counters for correct and incorrect answers, a counter
// for the current question, the count of the timer for answered questions and an object with the questions, choices, an image for each question and the correct 
// answer.

$.fn.trivia = function() {
  var t = this;
  t.userPick = null;

  t.answers = {
      correct: 0,
      incorrect: 0
  };

  t.images = null;
  t.count = 30;
  t.current = 0;
  t.questions = [{
      question: "What type of galaxy is the most common type of galaxy found in the universe?",
      choices: ["Elliptical Galaxies", "Spiral Galaxies", "Irregular Galaxies", "Note Galaxies"],
      image: "assets/images/galaxy.jpg",
      correct: 0
  }, {
      question: "How old is the universe in light years?",
      choices: ["1.8 billion light years old", "13.8 million light years old", "13.8 billion light years old", "7.8 billion light years old"],
      image: "assets/images/lightspeed.jpg",
      correct: 2,

  }, {
      question: "What is the name of the matter that we can't see?",
      choices: ["antineutrinos", "antiheroes", "antimatter", "dark matter"],
      image:"assets/images/matter",
      correct: 3,

  }, {
      question: "What is the most common type of star found in the Milky Way galaxy?",
      choices: ["Red Giants", "Neutron Stars", "Red Dwarfs", "Supergiant Stars"],
      image: "assets/images/star.jpg",
      correct: 1

  }, {
      question: "Who was the first woman in space?",
      choices: ["Maggie Gylenhaal", "Tara Lipinski", "Valentina Terechkova", "Sally Ride"],
      image: "assets/images/woman.jpg",
      correct: 2

  }, {
      question: "What was the name of the Russian astronaut, who stayed in space for more than 437 days?",
      choices: ["Anatoly Berezovoy", "Oleg Atkov", "Valeri Polyakov", "Ivan Korshukov"],
      image: "assets/images/russian.jpg",
      correct: 2,

  }, {
      question: "Which of these planets does not have any moons?",
      choices: ["Mars", "Neptune", "Saturn", "Venus"],
      image: "assets/images/pluto.png",
      correct: 3,

  }, {
      question: "How long is a light year in miles?",
      choices: ["5.88 trillion miles", "400 billion miles", "1.867 million miles", "327.5 billion miles"],
      image: "assets/images/leia.png",
      correct: 0,
  }];

  t.questions = shuffle(t.questions)

  t.ask = function() {
    if (t.questions[t.current]) {
        $("#timer").html("Time remaining: " + "00:" + t.count + " secs");
        $("#question").html(t.questions[t.current].question);
        var choicesArr = t.questions[t.current].choices;
        var picture = t.questions[t.current].image;
        var buttonsArr = [];

        $("photo").attr("src", picture)

        for (var i = 0; i < choicesArr.length; i++) {
            var button = $('<button>');
            button.text(choicesArr[i]);
            button.attr('data-id', i);
            $('#choices').append(button);
        }
          window.triviaCounter = setInterval(t.timer, 1000);
      } else {
          $('body').append($('<div />', {
              text: 'Unanswered: ' + (
                  t.questions.length - (t.answers.correct + t.answers.incorrect)),
              class: 'result'
          }));
          $('#start_button').text('Restart').appendTo('body').show();
      }
  };
  t.timer = function() {
      t.count--;
      if (t.count <= 0) {
          setTimeout(function() {
              t.nextQ();
          });

      } else {
          $("#timer").html("Time remaining: " + "00:" + t.count + " secs");
      }
  };
  t.nextQ = function() {
      t.current++;
      clearInterval(window.triviaCounter);
      t.count = 30;
      $('#timer').html("");
      setTimeout(function() {
          t.cleanUp();
          t.ask();
      }, 1000)
  };
  t.cleanUp = function() {
      $('div[id]').each(function(item) {
          $(this).html('');
      });
      $('.correct').html('Correct answers: ' + t.answers.correct);
      $('.incorrect').html('Incorrect answers: ' + t.answers.incorrect);
  };
  t.answer = function(correct) {
      var string = correct ? 'correct' : 'incorrect';
      t.answers[string]++;
      $('.' + string).html(string + ' answers: ' + t.answers[string]);
  };
  return t;
};

var Trivia;

$("#start_button").click(function() {
  $(this).hide();
  $('.result').remove();
  $('div').html('');
  Trivia = new $(window).trivia();
  Trivia.ask();
});

$('#choices').on('click', 'button', function(e) {
  var userPick = $(this).data("id"),
      t = Trivia || $(window).trivia(),
      index = t.questions[t.current].correct,
      correct = t.questions[t.current].choices[index];

  if (userPick !== index) {
      $('#choices').text("Wrong Answer! The correct answer was: " + correct);
      t.answer(false);
  } else {
      $('#choices').text("Correct!!! The correct answer was: " + correct);
      t.answer(true);
  }
  t.nextQ();
});