function loadQuiz() {
  
  //Building Question database with object prototype
  
  function Question(title, answers, correctAnswerIndex) {
    this.title = title;
    this.answers = answers;
    this.correctAnswer = answers[correctAnswerIndex];
  }
  
  function Page(title, img, paragraph, button) {
    this.title = title;
    this.img = img;
    this.paragraph = paragraph;
    this.button = button;
  }
  
  function Feedback(gif, alt, response) {
    this.gif = gif;
    this.alt = alt;
    this.response = response;
  }
  
  function questionCreator() {
    //avoids making 16 global objects
    const q01 = new Question("Who is Mr. Robot?", ["Mr. Anderson", "Elliot Alderson", "Portia Doubleday", "Christian Slater"], 1);
    const q02 = new Question('Who directs the TV series "Mr. Robot?"', ["Sam Sepiol", "Steven Spielberg", "JJ Abrams", "Sam Esmail"], 3);
    const q03 = new Question("Which OS is Elliot running at AllSafe in season 1?", ["GNOME Linux", "KDE", "Windows 7", "Mac OS X"], 0);
    const q04 = new Question("What is the name of Tyrell Wellick's wife?", ["Eileen", "Stephanie", "Joanna", "Sharon"], 2);
    const q05 = new Question("Who is the CEO of E(vil) corp?", ["Phillip Price", "Scott Knowles", "Tyrell Wellick", "Terry Kolby"], 0);
    const q06 = new Question("What is Elliot and Angela's favorite movie?", ["The Matrix", "Back to the Future", "2001: A Space Odyssey", "Comet"], 1);
    const q07 = new Question("Where is F.Society's headquarters in season 1?", ["An Allsafe meeting room", "The basement of E-Corp", "An arcade at Coney Island", "Darlene's apartment"], 2);
    const q08 = new Question("What is the name of the hack executed at the end of season 1?", ["Blackout", "Operation Mayhem", "Operation Payback", "The Five/Nine Hack"], 3);
    const q09 = new Question("How does Elliot end up in jail during season 2?", ["He gets arrested for hacking someone and stealing his dog.", "The FBI find out he's connected to fsociety.", "He gets arrested for drug possession.", "He's turned in by the man he hacks in episode 1."], 0);
    const q10 = new Question("Which of Elliot's albums contains Shayla's data?", ["Blur - Blur", "The Cure - Disintegration", "Pink Floyd - Wish You Were Here", "Boston - Don't Look Back"], 1);
    const q11 = new Question("What do Angela and Darlene have in common?", ["They're both in love with Elliot.", "They both work at Allsafe.", "They both do ballet.", "They both do yoga."], 2);
    const q12 = new Question("What TV show is Leon obsessed with during season 2?", ["Family Matters", "ALF", "Friends", "Seinfeld"], 3);
    const q13 = new Question("What movie do Darlene and Elliot watch on Halloween?", ["The Careful Massacre of the Bourgeoisie", "Friday the 13th", "Hackers", "Revenge of the Proletariat"], 0);
    const q14 = new Question("Is the key in the room?", ["There is no key.", "The key was in my fist, my fist was in my pocket.", "The key lies in a red wheelbarrow glazed with rain water.", "Whiterose holds the key."], 1);
    const q15 = new Question("What is Darlene's IRC handle?", ["samsepi0l", "wh1t3Ros3", "D0loresH4ze", "th3g3ntl3man"], 2);
    const q16 = new Question("Who leads the dark army?", ["Phillip Price", "Blackswan", "Mr. Robot", "Whiterose"], 3);
    const allQuizQuestions = [q01, q02, q03, q04, q05, q06, q07, q08, q09, q10, q11, q12, q13, q14, q16];
    questionRandomizer(allQuizQuestions);
  }
  
  
  //multiple options for feedback 
  const positive1 = new Feedback("https://media.giphy.com/media/GLVGjkjECy2oo/giphy.gif", "Darlene Smiling", "Okay, okay. Don't get all mushy on me now.");
  const positive2 = new Feedback("https://media.giphy.com/media/mQG644PY8O7rG/giphy.gif", "Elliot Celebrating", "It's happening, it's happening, it's happening, it's happening...");
  const positive3 = new Feedback("https://media.giphy.com/media/8fmYtJXEmfF96/giphy.gif", "Angela Laughing", "No matter what happens, we'll be okay.");
  
  const negative1 = new Feedback("https://media.giphy.com/media/FtKFwZU0T0CPu/giphy.gif", "Elliot Angry", "I never want to be right about my hacks, but people always find a way to disappoint.");
  const negative2 = new Feedback("https://media.giphy.com/media/jSYWyZafpmSWs/giphy.gif", "Whiterose Frowning", "Stop wasting my time.");
  const negative3 = new Feedback("https://media.giphy.com/media/tlbY7nPytEPUk/giphy.gif", "Mr. Robot Frowning", "I'm only supposed to be your prophet; you're supposed to be my God.");
  
  //organizing globals
  
  let thisQuizQuestions = [];
  
  const positiveFeedback = [positive1, positive2, positive3];
  const negativeFeedback = [negative1, negative2, negative3];
  
  let questionNumber = 0; //will be set to one when 'start quiz' is clicked
  let score = 0;
  
  //let the FUNctions begin
  
  //Run this first
  function questionRandomizer(quizQuestionArray) {
    let qqLength = quizQuestionArray.length;
    for (i=0; i <= 10; i++) {
      let randomQuestion = quizQuestionArray[Math.floor(Math.random() * Math.floor(qqLength))];
      let itsAlreadyThere = thisQuizQuestions.indexOf(randomQuestion) !== -1;
      if (itsAlreadyThere) {
        i -= 1;
      } else {
        thisQuizQuestions.push(randomQuestion);
      }
    }
    console.log("Questions randomized");
  }
  
  function clearPage() {
    $('body').html("");
    console.log("Page cleared");
  }
  
  function renderPage(title, img, paragraph, button) {
    let myHTML = `<section class="start-page">
      <header role="banner">
        <h1>${title}</h1>
      </header>
      <main role="main">
        <img src="${img[0]}" alt="${img[1]}"/>
        <p>${paragraph}</p>
        <button class="continue">${button}</button>
      </main>
    </section>`;
    $('body').append(myHTML);
    console.log("Page rendered");
  }
  
  function renderQuestion(title, answerArray) {
    let A = answerArray[0];
    let B = answerArray[1];
    let C = answerArray[2];
    let D = answerArray[3];
    
    let myHTML = `<section class="question-page">
      <header role="banner">
        <div class="row">
            <div class="col-3 question-counter">
              <p>Question:<br>${questionNumber}/10</p>
            </div>
            
            <div class="col-6 question title">
              <h2>${title}</h2>
            </div>
            
            <div class="col-3 score-counter">
              <p>Score: ${score}</p>
            </div>
        </div>
      </header>
      
      <main role="main">
        <form id="js-answer-buttons">
          <div class="row">
            <div class="col-3 empty">invisible text</div>
            <button type="button" class="col-6 answer">${A}</button>
            <div class="col-3 empty">invisible text</div>
          </div>
          <div class="row">
            <div class="col-3 empty">invisible text</div>
            <button type="button" class="col-6 answer">${B}</button>
            <div class="col-3 empty">invisible text</div>
          </div>
          <div class="row">
            <div class="col-3 empty">invisible text</div>
            <button type="button" class="col-6 answer">${C}</button>
            <div class="col-3 empty">invisible text</div>
          </div>
          <div class="row">
            <div class="col-3 empty">invisible text</div>
            <button type="button" class="col-6 answer">${D}</button>
            <div class="col-3 empty">invisible text</div>
          </div>
        </form>
      </main>
    </section>`;
    $('body').append(myHTML);
    console.log("Question rendered");
  }
  
  function readyQuestion() {
    let currentQuestion = thisQuizQuestions[questionNumber];
    let cqt = currentQuestion.title;
    let cqa = currentQuestion.answers;
    renderQuestion(cqt, cqa);
    console.log("Loading question...");
  }
  
  function giveFeedback(correctAnswer, selectedAnswer) {
    if (correctAnswer === selectedAnswer) {
      let goodFeedback = positiveFeedback[Math.floor(Math.random() * Math.floor(3))];
      renderPage("succ3ss.gif", [goodFeedback.gif, goodFeedback.alt], goodFeedback.response, "Next");
      score += 1;
    } else {
      let badFeedback = negativeFeedback[Math.floor(Math.random() * Math.floor(3))];
      const revealAnswer = `<br><br>The right answer was:\n<p>${correctAnswer}</p>`;
      renderPage("ERROR: ", [badFeedback.gif, badFeedback.alt], badFeedback.response + revealAnswer, "Next");
    }
  }
  
  function newGame() {
    console.log("New game started");
    questionCreator();
    const titlePage = new Page('MR. ROBOT QUIZ', ["https://psmag.com/.image/c_limit%2Ccs_srgb%2Cq_80%2Cw_960/MTUxNzI3ODczNDU4MTg1NDAw/robot.webp", "Rami Malek as Elliot"], "What I\'m about to tell you is top secret...", "node start-qu1z.js");
    renderPage(titlePage.title, titlePage.img, titlePage.paragraph, titlePage.button);
  }
  
  function endGame() {
    let endScreenPage = new Page('g4m3-ov3r.js', ["", ""], `Final Score: ${score}/10<br>`, "sudo reboot");
    switch(score) {
      case 0:
      case 1:
      case 2:
      case 3:
        endScreenPage.img = ['https://i.ytimg.com/vi/gRCAR6qxvF4/maxresdefault.jpg', 'fsociety logo'];
        endScreenPage.paragraph += `So this is what a revolution looks like? 
        People in expensive clothing running around? Not how I pictured it.`;
        break;
      case 4:
      case 5:
      case 6:
      case 7:
        endScreenPage.img = ['http://img2.tvtome.com/i/u/0f374935bf894bcacb726a469a12eccf.jpg', 'Mr. Robot in crowd'];
        endScreenPage.paragraph += `Sure, there are grays... but when you come right down to it, 
        at its core, beneath every choice, there's either a one or a zero. You either do something 
        or you don't. So, I'll ask you again: are you a one or a zero?`;
        break;
      case 8:
      case 9:
      case 10:
        endScreenPage.img = ['https://ksassets.timeincuk.net/wp/uploads/sites/55/2017/08/mrrobot-920x584.jpg', 'Elliot without hoodie'];
        endScreenPage.paragraph += `I'm doing this for me. I can't live with what I did anymore. 
        You're wrong. They won't win. Because one good thing came out of all of this; they showed themselves. 
        The top one percent of the one percent, the ones in control, the ones who play God without permission, 
        and now I'm gonna take them down. All of them.`;
        break;
    }
    renderPage(endScreenPage.title, endScreenPage.img, endScreenPage.paragraph, endScreenPage.button);
    $('button').removeClass('continue').addClass('js-reset');
    console.log("End screen loaded");
  }
  
  function resetQuiz() {
    thisQuizQuestions = [];
    score = 0;
    questionNumber = 0;
    clearPage();
    newGame();
    console.log("Quiz reset");
  }
  
  $('body').on('click', '.js-reset', event => {
    resetQuiz();
  });
  
  $('body').on('click', '.continue', event => {
    if(questionNumber === 10) {
      clearPage();
      endGame();
    } else {
      questionNumber += 1;
      clearPage();
      readyQuestion();
    }
  });
  
  $('body').on( 'click', 'form :button', event => {
    let clickedAnswer = $(event.currentTarget).text();
    let correctAnswer = thisQuizQuestions[questionNumber].correctAnswer;
    clearPage();
    giveFeedback(correctAnswer, clickedAnswer);
  });
  
  newGame();

}

$(loadQuiz);