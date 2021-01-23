// 문제 객체(생성자 함수)
function Question(text, choice, answer) {
   this.text = text; // 질문 텍스트
   this.choice = choice; // 선택할 답들(배열)
   this.answer = answer; // 정답 정보
}

// 퀴즈 정보 객체
function Quiz(questions) {
   this.score = 0; // 점수
   this.questions = questions; // 문제
   this.questionIndex = 0; // 문제 번호
}

// 정답 확인 메서드
Quiz.prototype.correctAnswer = function(answer) {
   return answer == this.questions[this.questionIndex].answer;
}

var questions = [
   new Question('다음 중 최초의 상용 웹 브라우저는?', ['모자이크', '인터넷 익스플로러', '구글 크롬', '넷스케이프 네비게이터'], '넷스케이프 네비게이터'),
   new Question('웹 문서에서 스타일을 작성하는 언어는?', ['HTML', 'jQuery', 'CSS', 'XML'], 'CSS'),
   new Question('명령어 기반의 인퍼페이스를 의미하는 용어는?', ['GUI', 'CLI', 'HUD', 'SI'], 'CLI'),
   new Question('CSS 속성 중 글자의 굵기를 변경하는 속성은?', ['font-size', 'font-style', 'font-weight', 'font-variant'], 'font-weight')
];

// 퀴즈 객체 생성
var quiz = new Quiz(questions);

// 문제 출력 함수
function updateQuiz() {
   var question = document.getElementById('question');
   var idx = quiz.questionIndex + 1;
   var choice = document.querySelectorAll('.btn');

   // 문제 출력
   question.innerHTML = '문제' + idx + ') ' + quiz.questions[quiz.questionIndex].text;

   // 선택 출력
   for (var i = 0; i < 4; i++) {
      choice[i].innerHTML = quiz.questions[quiz.questionIndex].choice[i];
   }

   progress();
}

function progress() {
   var progress = document.getElementById('progress');
   progress.innerHTML = "문제 " + (quiz.questionIndex + 1) + "/ " + quiz.questions.length;
}

var btn = document.querySelectorAll('.btn');

// 입력 및 정답 확인 함수
function checkAnswer(i) {
   btn[i].addEventListener('click', function() {
      var answer = btn[i].innerText;

      if (quiz.correctAnswer(answer)) {
         quiz.score++;
      }
      if (quiz.questionIndex < quiz.questions.length - 1) {
         quiz.questionIndex++;
         updateQuiz();
      } else {
         result();
      }
   });
}

function result() {
   var quizDiv = document.getElementById('quiz');
   var per = parseInt((quiz.score * 100) / quiz.questions.length);
   var txt = '<h1>결과</h1>' + '<h2 id="score">당신의 점수: ' + quiz.score + '/' + quiz.questions.length + '<br><br>' + per + '점' + '</h2>';

   quizDiv.innerHTML = txt;

   // 점수별 결과 텍스트
   if (per < 60) {
      txt += '<h2>호감도가 감소하였습니다</h2>';
      quizDiv.innerHTML = txt;
   } else if (per >= 60 && per < 80) {
      txt += '<h2>호감도가 소폭 상승하였습니다</h2>'
      quizDiv.innerHTML = txt;
   } else if (per >= 80) {
      txt += '<h2>호감도가 대폭 상승하였습니다</h2>'
      quizDiv.innerHTML = txt;
   }
}

for (var i = 0; i < btn.length; i++) {
   checkAnswer(i);
}

updateQuiz();
