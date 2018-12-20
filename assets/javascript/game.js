window.onload = function(){
  //initializing variables
  var letterGuessed=[];
  var guessCount;
  var dashes;
  var letter="";
  var guessed=0;
  var emptyWord="";
  var res;
  var resEmpty;
  var wins;
  var los;


  function reset(){
    letterGuessed=[];
    guessCount=10;
    letter="";
    guessed=0;
    //initialize place holder for the word
    emptyWord="";
  }

  //function create ids for html
  function pids(dashes,tagnum) {
    document.getElementById(tagnum).textContent = dashes;
  }

  //function to pick random word
  function getword(outCome){
    reset();
    //List of random words for the game
    var wordList=["mailbox","mysterious","panicky","skin","aquatic","inconclusive","many","window","foregoing",
                  "glistening","unwritten","thirsty"];     
          
    //make the words array to lowercase
    for (var i=0;i<wordList.length;i++){
      wordList[i]=wordList[i].toLowerCase();
    }

    var wordPick=Math.floor(Math.random() * wordList.length);
    //getting one word from the array
    res = wordList[wordPick].split("");
    //length of the word
    var wordLength = res.length;

    
    //create a string of -- for the length of the word
    for( var i = 0; i < wordLength; i++){
      emptyWord=" _"+emptyWord;
    }
    
    //creating a copy of empty word without spaces to be used later 
    resEmpty = emptyWord;
    resEmpty = (resEmpty.replace(/ +/g, "")).split("");
    var gct= "Guesses Left "+guessCount;
    pids(emptyWord,"word");
    pids(gct,"num");
    
    if (outCome==="O"){
      var oct= "Wins: 0 "+"Loses: 0 ";
      wins=0;
      los=0;
    }
    if (outCome==="W"){
      wins=wins+1;
      oct= "Wins: "+wins+" "+"Loses: "+los;
    }
    if (outCome==="L"){
      los=los+1;
      oct= "Wins: "+wins+" "+"Loses: "+los;
    }
    pids(oct,"outcome");
  }//end of getword function

  getword(outcome="O");

  //Press any letter key to get started..
  document.onkeyup = function(evt) {

    evt = evt || window.event;
    var charCode = evt.which || evt.keyCode;
    var charStr = String.fromCharCode(charCode);
            
    /////Begin when letter key are pressed/////////
    if (/[a-z]/i.test(charStr)) {

      var letter = event.key.toLowerCase();   
      //letterGuessed holds the guessed letters
      letterGuessed.push(letter); 
      
      if(letterGuessed.length===1){
        //
          //Check if the letters guessed is part of the word for first letter entered
          for( var x = 0; x < letterGuessed.length; x++){
            for( var y = 0; y < res.length; y++){
              if (letterGuessed[x]===res[y]){
                resEmpty[y]=res[y];
                emptyWord=resEmpty;
                pids(emptyWord.join(" "),"word");
                var a = emptyWord.indexOf("_");
                if (a===-1){
                  getword(outcome="W");
                }
              }
            }
          }
        //
        guessCount=guessCount-1;
        if(guessCount<=10 && guessCount>=0){
          var gct= "Guesses Left "+guessCount;
          pids(gct,"num");
        }
      }

      //check if the letter was already guessed
      if(letterGuessed.length>1){
        for( var z = 0; z < letterGuessed.length-1; z++){
          if (letter!==letterGuessed[z]) {
            guessed = 0;
          } else{
            guessed = 1;
            z=letterGuessed.length;
          }
        }
        if(guessed===1){
          letterGuessed.pop();
        }else{
          guessCount=guessCount-1; 
          if(guessCount<=10 && guessCount>=0){
            var gct= "Guesses Left "+guessCount;
            pids(gct,"num");
          }
          
          //Check if the letters guessed is part of the word for rest of the letter entered
          for( var x = 1; x < letterGuessed.length; x++){
            for( var y = 0; y < res.length; y++){
              if (letterGuessed[x]===res[y]){
                resEmpty[y]=res[y];
                emptyWord=resEmpty;
                var a = emptyWord.indexOf("_");
                pids(emptyWord.join(" "),"word");
                if (a===-1){
                  getword(outcome="W");
                }
              }
            }
          }
        
        
        }
        
      }
      //gets the new word
      if (letterGuessed.length===10){
        getword(outcome="L");
      }

    }
  };
};