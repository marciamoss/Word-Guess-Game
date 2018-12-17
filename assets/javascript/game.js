//List of random words for the game
var wordList=["mailbox","mysterious","panicky","skin","aquatic","inconclusive","many","window","foregoing",
               "glistening","unwritten","thirsty"];        
//initializing variables
var dashes;
var guessCount=10;
var letter="";
letterGuessed=[];
var guessed=0;
var text2 = "";

//"Empty Word", # of Guesses Left, "counter down","Letters Guessed"
//function create ids for html
function pids(dashes,tagnum) {
  if(tagnum === "counter down"){
    text2 = "";
    text2 += "Guesses left "+dashes+":"+letterGuessed;
    console.log("wazzup1 "+text2);
    document.getElementById("num").innerHTML = text2;
    console.log("wazzup1 tag"+num);
  }
  if(tagnum === "Empty Word" ){
    text2 += tagnum+"<br>"+dashes+"<br>";
    console.log("wazzup2"+text2);
  }
  if(tagnum === "Total Number of Guesses" ){
    console.log("wazzup3"+text2);
    text2 += tagnum+" "+dashes+"<br>";
  }
  if(tagnum !== "counter down"){
    document.getElementById("ptag1").innerHTML = text2;
  }
}

function reset(){
  letterGuessed=[];
  guessCount=10;
}


wordPick=Math.floor(Math.random() * wordList.length);
//getting one word from the array
var res = wordList[wordPick].split("");
//length of the word
var wordLength = res.length;


//initialize place holder for the word
var emptyWord="";
//create a string of -- for the length of the word
 for( var i = 0; i < wordLength; i++){
var emptyWord="_ "+emptyWord;
}

 pids(emptyWord,"Empty Word");
 
 pids(guessCount,"Total Number of Guesses");

document.onkeyup = function(evt) {
    evt = evt || window.event;
    var charCode = evt.which || evt.keyCode;
    var charStr = String.fromCharCode(charCode);
    if (/[a-z]/i.test(charStr)) {
      var letter = event.key.toUpperCase();   
      //letterGuessed holds the guessed letters
      letterGuessed.push(letter); 
      if(letterGuessed.length===1){
        guessCount=guessCount-1;
        pids(guessCount,"counter down");
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
          console.log("letter array ",letterGuessed);
          console.log("counter ",guessCount);
          
          pids(guessCount,"counter down");
          
        }
         
      }
      //once we have 10 gueses call the function
      if (guessCount === 0) {
          reset();
          // pids(letterGuessed,"Letters Guessed");
          // letterGuessed=[];
          // guessCount=10;
      }
    }
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