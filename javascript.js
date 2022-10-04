var playing = false;
var score,action;
var time_rem;
var correctAns;

//if we click on the start/reset
document.getElementById("startreset").onclick = function(){
	//if we are playing
	if(playing == true){
		location.reload(); //reload page
	}else{//if we are not playing
		//change mode to playing
		playing = true;
		//set score to 0
		score = 0;
		
document.getElementById("scorevalue").innerHTML = score;
		
		//show countdown
show("timeup");
		time_rem = 60;
document.getElementById("timeupvalue").innerHTML = time_rem;
		
hide("gameover");

		
		//change button to reset
document.getElementById("startreset").innerHTML = "Reset Game";
		
		//start countdown
		startCountDown();
		
		//Generate a new Q&A
		generateQA();
	}
	
}
//clicking on an answer box
for(i=1;i<5;i++){
	document.getElementById("box"+i).onclick = function(){
	//check if we are playing
	if(playing == true){//yes
		if(this.innerHTML == correctAns){
			//correct ans
			//increase score by 1
			score++;
			document.getElementById("scorevalue").innerHTML = score;
			
			//hide wrong box and show correct box
			hide("wrong");
			show("correct");
			setTimeout(function(){
				hide("correct");
			}, 1000);
			
			//Generate new QA
			generateQA();
		}
		else{
			//wrong ans
			show("wrong");
			hide("correct");
			setTimeout(function(){
				hide("wrong");
			}, 1000);
			
		}
	}
}

}




//functions
//start counter
function startCountDown(){
	action = setInterval(function(){
		time_rem -= 1;
document.getElementById("timeupvalue").innerHTML = time_rem;
		if(time_rem == 0){
			//Game over
			stopCountDown();
			show("gameover");
document.getElementById("gameover").innerHTML ="<p>Game Over;</p><p>Your score is "+ score +".</p>";
			hide("timeup");
			hide("correct");
			hide("wrong");
			playing = false;
			document.getElementById("startreset").innerHTML = "start game";
		}
		 },1000)
}
//stop counter
function stopCountDown(){
	clearInterval(action);
}
// hide an element
function hide(Id){
	document.getElementById(Id).style.display = "none";
}
//show an element
function show(Id){
	document.getElementById(Id).style.display = "block";
}

//generate questions and multiple answers
function generateQA(){
	var x = 1+ Math.round(9*Math.random());
	var y = 1+ Math.round(9*Math.random());
	correctAns = x*y;
	document.getElementById("question").innerHTML = x + "x" + y;
	var correctPos = 1+Math.round(3*Math.random());
	document.getElementById("box"+correctPos).innerHTML = correctAns; //fill one box with the correct answer.
	
	//fill other with wrong answers
	var answers = [correctAns];
	for(i=1; i<5; i++){
		if(i != correctPos){
			var wrongAns;
			do{
				
				wrongAns = (1+ Math.round(9*Math.random()))*(1+ Math.round(9*Math.random()));
			}while(answers.indexOf(wrongAns)>-1)
				document.getElementById("box"+i).innerHTML = wrongAns;
			answers.push(wrongAns);
		}
	}

}