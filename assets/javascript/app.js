// JavaScript Document
$(document).ready(function(){
  
  var questions = [{
    question: "Who is the NBA's all-time assist leader?",
    choices: ['Jason Kidd', 'Magic Johnson', 'John Stockton', 'Steve Nash'],
    correctAnswer: 2
  }, {
    question: "Who won the 2000 Slam Dunk Contest?",
    choices: ["Steve Francis", "Tracy McGrady", "Larry Hughes", "Vince Carter"],
    correctAnswer: 3
  }, {
    question: "Who is the current NBA Commissioner",
    choices: ['David Stern', 'Adam Silver', 'Red Auerbach', 'Jerry West'],
    correctAnswer: 1
  }, {
    question: "Who is the NBA's all-time scoring leader?",
    choices: ["Kareem Abdul-Jabbar", "Kobe Bryant", "Michael Jordan", "Wilt Chamberlain"],
    correctAnswer: 0
  }, {
    question: "Which NBA franchise has won the most Championships?",
    choices: ["Boston Celtics", "Los Angeles Lakers", "Philadelphia 76ers", "Chicago Bulls"],
    correctAnswer: 0
  }, {
    question: "Who is the shortest person to play in the NBA?",
    choices: ["Earl Boykins", "Dana Barros", "Spud Webb", "Mugsy Bogues"],
    correctAnswer: 3
  }, {
    question: "Who has the highest career free throw percentage of all-time?",
    choices: ["Rick Barry", "Steve Nash", "Steph Curry", "Reggie Miller"],
    correctAnswer: 1
  }, {
    question: "In feet', how far is the NBA free throw line from the basket?",
    choices: [18, 22, 15, 12],
    correctAnswer: 2
  }, {
    question: "Who owns the Charlotte Hornets?",
    choices: ['Michael Jordan', 'Mark Cuban', 'Baron Davis', 'Larry Johnson'],
    correctAnswer: 0
  }, {
    question: "Who is the tallest person to play in the NBA?",
    choices: ['Manute Bol', "Gheorghe Muresan", 'Shawn Bradley', 'Yao Ming'],
    correctAnswer: 1
  }
  ];
  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('.content'); //Quiz div object
  
  // Display initial question
  displayNext();
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      $('#warning').text('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
	  $('#warning').text('');
    }
  });
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
    $("#timer").html(count)
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
	// this is new
	var warningText = $('<p id="warning">');
	qElement.append(warningText);
	
	return qElement;



  }

  // Creates 1 minute countdown
  

  var count=60;

  $("#timer").html(count)

	var counter=setInterval(timer, 1000); //1000 will  run it every 1 second

	function timer()
	{
  	count=count-1;
  	if (count <= 0)
  	{
     clearInterval(counter);
     //counter ended, do something here
     alert("Time's up! Refresh the page and try again!")
     return;
  }

  document.getElementById("timer").innerHTML=count



  //$("#timer").text("count")


}
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
       }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<h3>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
	// Calculate score and display relevant message
	var percentage = numCorrect / questions.length;
	if (percentage >= 0.9){
    	score.append('Incredible! You got ' + numCorrect + ' out of ' +
                 questions.length + ' questions right!');
	}
	
	else if (percentage >= 0.7){
    	score.append('Good job! You got ' + numCorrect + ' out of ' +
                 questions.length + ' questions right!');
	}
	
	else if (percentage >= 0.5){
    	score.append('You got ' + numCorrect + ' out of ' +
                 questions.length + ' questions right.');
	}
	
	else {
    	score.append('You only got ' + numCorrect + ' out of ' +
                 questions.length + ' right. Want to try again?');
	}
    return score;
  }
});