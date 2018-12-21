window.onload = function(){

  //initializing global variables
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
  var mus;
  

  // Creating guessword object.
  var gword = {

    playAudio: function() { 
      mus.play(); 
    } ,

    reset: function(){
      letterGuessed=[];
      guessCount=10;
      letter="";
      guessed=0;
      //initialize place holder for the word
      emptyWord="";
    }, 

    //function create ids for html
    pids: function(dashes,tagnum){
      document.getElementById(tagnum).textContent = dashes;
    },

    //function to pick random word
    getword: function(outCome){
      this.reset();
      //List of random words for the game
      var wordList=["cloud","bite","nervous","split","before","wire","night","saw","cause","be","describe","among",
        "fact","letter","fear","yet","bright","minute","problem","ice","highest","present","highway","dog",
        "distant","command","familiar","manner","introduced","ten","unless","itself","volume","enemy","sat",
        "solar","environment","element","none","halfway","scared","lips","day","against","thing","setting",
        "cut","check","foreign","exchange","toy","along","sale","layers","blind","cave","save","goose",
        "written","feathers","guide","riding","regular","pleasure","consonant","hunter","case","ourselves",
        "probably","research","pride","bow","building","sitting","proper","throw","board","broad","desk",
        "involved","period","several","either","tight","class","has","driven","produce","wild","instance",
        "slept","wide","type","army","pay","them","flower","major","herd","piano","stranger","appearance",
        "cannot","pressure","hall","sure","office","successful","wind","matter","top","grass","entirely",
        "pick","combination","shorter","appearance","middle","perfectly","map","red","wheat","silk",
        "themselves","potatoes","affect","tongue","travel","pretty","difficult","put","cake","through",
        "this","talk","score","lead","shelf","square","local","third","tie","diagram","won","fairly",
        "porch","symbol","although","throat","food","classroom","greatest","triangle","oldest","lamp",
        "development","volume","war","high","house","after","longer","learn","hung","explanation","balance",
        "gun","opposite","mirror","plant","mouth","shoe","if","uncle","disease","on","boat","touch",
        "series","industrial","good","cake","welcome","flight","common","function","raw"];
      //make the words array to lowercase
      for (var i=0;i<wordList.length;i++){
        wordList[i]=wordList[i].toLowerCase();
      }

      var wordPick=Math.floor(Math.random() * wordList.length);
      //getting one word from the array
      res = wordList[wordPick].split("");
      //length of the word
      var wordLength = res.length;
      console.log("word "+res);
    
      //create a string of -- for the length of the word
      for( var i = 0; i < wordLength; i++){
        emptyWord=" _"+emptyWord;
      }
    
      //creating a copy of empty word without spaces to be used later 
      resEmpty = emptyWord;
      resEmpty = (resEmpty.replace(/ +/g, "")).split("");
      var gct= "Guesses Left "+guessCount;
      this.pids(emptyWord,"word");
      this.pids(gct,"num");
      this.pids(letterGuessed,"lguess");
    
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
      this.pids(oct,"outcome");
    }//end of getword function
  };

  gword.getword(outcome="O");

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
                gword.pids(emptyWord.join(" "),"word");
                var a = emptyWord.indexOf("_");
                if (a===-1){
                  gword.getword(outcome="W");
                  mus = document.getElementById("winAudio"); 
                  gword.playAudio();
                }
              }
            }
          }
        //
        guessCount=guessCount-1;
        if(guessCount<=10 && guessCount>=0){
          var gct= "Guesses Left "+guessCount;
          gword.pids(gct,"num");
          gword.pids(letterGuessed,"lguess");
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
            gword.pids(gct,"num");
            gword.pids(letterGuessed,"lguess");
          }
          
          //Check if the letters guessed is part of the word for rest of the letter entered
          for( var x = 1; x < letterGuessed.length; x++){
            for( var y = 0; y < res.length; y++){
              if (letterGuessed[x]===res[y]){
                resEmpty[y]=res[y];
                emptyWord=resEmpty;
                var a = emptyWord.indexOf("_");
                gword.pids(emptyWord.join(" "),"word");
                if (a===-1){
                  gword.getword(outcome="W");
                  mus = document.getElementById("winAudio"); 
                  gword.playAudio();
                }
              }
            }
          }
        
        
        }
        
      }
      //gets the new word
      if (letterGuessed.length===10){
        gword.getword(outcome="L");
        mus = document.getElementById("losAudio"); 
        gword.playAudio();
      }

    }
  };
};