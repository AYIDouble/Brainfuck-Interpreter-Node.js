// API Einbindungen

var readline = require('readline');
var readlineModul = readline.createInterface({input: process.stdin,output: process.stdout});

var BrainFuckInterpreter = function() {
	//private 
	var cells = [];
	var cellLength = 30000;
	var userInput = null;
	var actualCellPosition = 0;
	var isOptionalInput = false;
	var optionalInput = "";
	var loopCount = new Array();
	var globalInkrement = 0;
	//cells abfüllen (normal : 30000)
	for (var i = 0 ; i < cellLength; i++) {
		cells[i] = 0;
	};
	//Check Methode damit eine Zelle nicht negativ sein kann oder drüber
	function checkCell(cell){
		try{
			if (cell < 0){
				cell = 255;
			}
			else if(cell > 255){
				cell = 0;
			}
			return cell;
		}catch(e){
			console.log("checkCell : " + e);
		}
	}
	//Check Methode für actualCell,damit sie nicht negativ sein kann oder drüber
	function checkActualCellPosition(){
		try{
			if (actualCellPosition < 0){
				actualCellPosition = cellLength - 1;
			}
			else if(actualCellPosition > cellLength - 1){
				actualCellPosition = 0;
			}
		}catch(e){
			console.log("checkActualCellPosition : " + e);
		}
	}
	//Holt die User Eingabe
	function makeInput(){
		try{
			readlineModul.question("", function(answer) {
				userInput = answer;
				checkInput();
				readlineModul.close();
			});
		}catch(e){
			console.log("makeInput : " + e);
		}
	}
	//überprüft die User Eingabe
	function checkInput(){
		try{
			while(globalInkrement < userInput.length){
				globalInkrement = checkChar(globalInkrement);
				//console.log("act: " + globalInkrement);
			}
			makeInput();
		}catch(e){
			console.log("checkInput : " + e);
		}
	}
	// überprüft ob bestimmte Bedingungen zutreffen,wegen den Schleifen
	function checkChar(position){
		try{
			var chr = userInput.charAt(position);
			if(chr == '['){
				position++;
				loopCount.push(position); // Position wird gemerkt
			}
			else if(chr == ']'){
				if(cells[actualCellPosition] == 0){
					loopCount.pop();  // Letzte Position wird vom array loopCount entfernt
					position++;
				}else{
					position = loopCount[loopCount.length-1];
				}
			}else{
				charKeyword(chr);
				position++;
			}
			return position;
		}catch(e){
			console.log("checkChar : " + e);
		}
	}
	// überprüft jedes einzelne Char auf Brainfuck Keywords
	function charKeyword(kchr){
		try{
			if(isOptionalInput == true){
				cells[actualCellPosition] = checkCell(kchr.charCodeAt(0));
				isOptionalInput = false;
			}
			else if(kchr == '+'){
				cells[actualCellPosition]++;
			}
			else if(kchr == '-'){
				cells[actualCellPosition]--;
			}
			else if(kchr == '>'){
				actualCellPosition++;
				checkActualCellPosition();
			}
			else if(kchr == '<'){
				actualCellPosition--;
				checkActualCellPosition();
			}
			else if(kchr == '.'){
				console.log(String.fromCharCode(cells[actualCellPosition]));
			}
			else if(kchr == ','){  // Modifiziert (Der Input muss nach dem Komma geschrieben werden)
				isOptionalInput = true;
			}
			cells[actualCellPosition] = checkCell(cells[actualCellPosition]);
		}catch(e){
			console.log("charKeyword : " + e);
		}
	}
	// Setzt alle Variablen wieder auf die Ursprungswerte,ist für einen Neustart erforderlich
	function clearVariables(){
		try{
			cells = [];
			cellLength = 30000;
			userInput = null;
			actualCellPosition = 0;
			isOptionalInput = false;
			optionalInput = "";
			loopCount = new Array();
			globalInkrement = 0;
		}catch(e){
			console.log("clearVariables : " + e);
		}
	}

	//public
	var retObj = {};

	retObj.start = start;

	function start (){
		makeInput();
	}
	return retObj;
}

var bfi = new BrainFuckInterpreter();
bfi.start();