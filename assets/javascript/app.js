$(document).ready(function() {
    
    var questionCounter = 0;
    
   
    var ansTimeout = 2000;
    
    
    var correct = 0;
    var incorrect = 0;
    var missed = 0;
    
    
    var userAns = [];
    
    
    var questions = [
    {
        question: "What is the name of the Nissan R34 Skyline engine?",
        choices: ["RB26DETT", "2JZ-GTE", "13B", "4A-GE"],
        choicesAnswer: 0
    },
    {
        question: "What is the name of the Mazda RX7 FD engine?",
        choices: ["RB26DETT", "2JZ-GTE", "13B", "4A-GE"],
        choicesAnswer: 2
    },
    {
        question: "What is the name of the Toyota Supra MK IV engine?",
        choices: ["RB26DETT", "2JZ-GTE", "13B", "4A-GE"],
        choicesAnswer: 1
    },
    {
        question: "What is the name of the Toyota AE86 Trueno engine?",
        choices: ["RB26DETT", "2JZ-GTE", "13B", "4A-GE"],
        choicesAnswer: 3
    }];
    
    
    function submitAns() {
        $("#submit").on("click", function(e) {
            e.preventDefault();
            userAns.length = 0;
                
            
            var userSelection = $("#responses input:radio[name=optionsRadios]:checked").val();
            userAns.push(userSelection);
            console.log(userAns);
            nextQ();
        });
    };
        
    
    var timeLeft = 10;
    var increment;
    
    function runTimer() {
        increment = setInterval(decrement, 1000);
    };
    
    function decrement() {
        timeLeft--;
        $("#time-left").html("Time remaining: " + timeLeft + " seconds");
        if (timeLeft === 0) {
            stopTimer();
            userAns.length = 0;		
            
            var userSelection = $("#responses input:radio[name=optionsRadios]:checked").val();
            userAns.push(userSelection);
            console.log(userAns);
            nextQ();
        };
    };
    
    function resetTimer() {
        timeLeft = 10;
        $("#time-left").html("Time remaining: " + timeLeft + " seconds");
    };
    
    function displayTimer() {
        $("#time-left").html("Answer Review");
    };
    
    function stopTimer() {
        clearInterval(increment);
    };
    
    
    function createRadios() {
        var responseOptions = $("#responses");
        
        responseOptions.empty();
            
        for (var i = 0; i < questions[questionCounter].choices.length; i++) {
            responseOptions.append('<label><input type="radio" name="optionsRadios" id="optionsRadios2" value="' + [i] +'"><div class="jdm-opt">' + questions[questionCounter].choices[i] + '</div></input><br></label>');
        };
    };
    
    
    function displayQ() {
        clearQ();
        resetTimer();
        $(".questionX").html(questions[questionCounter].question);
        
        createRadios();
        
        $("#submit-div").append('<button type="submit" class="btn btn-default" id="submit">' + "Submit" + '</button>');
        runTimer()
        submitAns();
    };
    
    
    function displayStart() {
        $("#content").append('<a href="#" class="btn btn-primary btn-lg" id="start-button">' + "Start" + '</a>');
        
        $("#start-button").on("click", function(event) {
            event.preventDefault();
            
            firstQ();
            resetTimer();
        });
    };
    
    
    function reset() {
        questionCounter = 0;
        correct = 0;
        incorrect = 0;
        missed = 0;
        userAns = [];
        resetTimer();
    };
    
    
    function displayEnd() {
        clearQ();
        $("#content").append('<h3>' + "Correct answers: " + correct + '</h3><br><h3>' + "Incorrect answers: " + incorrect + '</h3><br><h3>' + "Skipped questions: " + missed + '</h3><br><br><a href="#" class="btn btn-primary btn-lg" id="restart-button">' + "Restart Game" + '</a>');
        //Restart game
        $("#restart-button").on("click", function(event) {
            event.preventDefault();
            
            reset();
            clearQ();
            displayStart();
        });
    };
    
    
    function clearQ() {
        var questionDiv = $(".questionX");
        questionDiv.empty();
    
        var responsesDiv = $("#responses");
        responsesDiv.empty();
    
        var submitDiv = $("#submit-div");
        submitDiv.empty();
    
        var contentDiv = $("#content");
        contentDiv.empty();
    
        stopTimer();
    };
    
    
    function checkQ() {
        clearQ();
        var correctAnswer = questions[questionCounter].choicesAnswer;
        if (userAns[0] == questions[questionCounter].choicesAnswer) {
            $("#content").append('<h3>'+"Congratulations! You chose the right answer!" + '</h3>');
            correct++;
            displayTimer();
        }
        else if (userAns[0] === undefined) {
            $("#content").append('<h3>'+"Time's up!" + '</h3><br><br><h3>' + "The correct answer was: " + questions[questionCounter].choices[correctAnswer] + '</h3>');
            missed++;
            displayTimer();
        }
        else {
            $("#content").append('<h3>'+"You chose the wrong answer." + '</h3><br><br><h3>' + "The correct answer was: " + questions[questionCounter].choices[correctAnswer] + '</h3>');
            incorrect++;
            displayTimer();
        };
    };
    
    
    function nextQ() {
        checkQ();
        
        questionCounter++;
        
        if (questionCounter === questions.length) {
            setTimeout(displayEnd, ansTimeout);
        } 
        else {
            setTimeout(displayQ, ansTimeout);
        };
    };
    
    
    function firstQ() {
        var startContent = $("#content");
        startContent.empty(); 
        displayQ();
    };
    
    
    displayStart();
    
    });