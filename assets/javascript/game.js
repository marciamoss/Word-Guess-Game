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
  
  console.log("outcome = "+outCome
  );
        
  //make the words array to lowercase
  for (var i=0;i<wordList.length;i++){
    wordList[i]=wordList[i].toLowerCase();
  }

  var wordPick=Math.floor(Math.random() * wordList.length);
  //getting one word from the array
  res = wordList[wordPick].split("");
  console.log("actual word "+res);
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
    console.log("loop1 "+"w:"+wins+" "+"l: "+los);
  }
  if (outCome==="W"){
    wins=wins+1;
    oct= "Wins: "+wins+" "+"Loses: "+los;
    console.log("loop2 "+"w:"+wins+" "+"l: "+los);
  }
  if (outCome==="L"){
    los=los+1;
    oct= "Wins: "+wins+" "+"Loses: "+los;
    console.log("loop3 "+"w:"+wins+" "+"l: "+los);
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
              pids(emptyWord,"word");
              var a = emptyWord.indexOf("_");
              if (a===-1){console.log("all guessed");
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
              pids(emptyWord,"word");
              if (a===-1){
                getword(outcome="W");
              }
            }
          }
        }
      
       
      }
      
    }
    console.log("letter array "+letterGuessed.length+" "+letterGuessed);
    //gets the new word
    if (letterGuessed.length===10){
      getword(outcome="L");
    }

  }
};
};










// window.onload = function(){
//   //Array to hold th word values
//   wgvalues=[];
  
//   //populate the Array with our Strings 
//   wgvalues.push(emptyWord);
//   wgvalues.push(letter);
//   console.log("value of letter"+letter);
//   console.log("value of wgvalues"+wgvalues);
//   // create an array containing all the p tags on the page 
//   // (which is this case is only one, would be better to assign an id)
//   pArray = document.getElementsByTagName('p');
//   console.log("value of parray"+pArray);
//   // create a text node in the document, this is the proper DOM method
//   var wg1TextNode = document.createTextNode(wgvalues[0]);
//   var wg2TextNode = document.createTextNode(wgvalues[1]);
  
//   // append our new text node to the element in question
//   pArray[0].appendChild(wg1TextNode);
//   pArray[0].appendChild(wg2TextNode);
  
// };