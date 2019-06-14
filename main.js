
var wordList = ["HELLO", "JAVASCRIPT", "DECODEUR", "CHEMINEE", "PENDU", "ALLIGATOR", "BONBON", "DEJEUNER",
	"YOUPI", "ZEBRE", "RADHWA", "YOUNES", "DIMITRI", "ANTOINE", "TIM", "ANTHONY", "MARIANA", "ISABELLE",
	"ABDELLATIF", "MAGALI", "JIM", "DILYANA", "JONATHAN", "SOPHIE", "ALEXIS", "REMI", "MARIE", "SEBASTIEN",
	"MAXENCE", "ANAELLE", "DAMIEN", "PROGRAMMATION", "SANDWICH", "TELEPHONE"];

var secretWord = wordList[Math.floor(Math.random()*(wordList.length))];

var alphabet = [ ["A",false], ["B",false], ["C",false], ["D",false], ["E",false], ["F",false], ["G",false],
		["H",false], ["I",false], ["J",false], ["K",false], ["L",false], ["M",false], ["N",false], ["O",false],
		["P",false], ["Q",false], ["R",false], ["S",false], ["T",false], ["U",false], ["V",false], ["W",false],
		["X",false], ["Y",false], ["Z",false] ];

var fails = 0;

var isDiscovered = function(letter) {
	for (var i=0;i<alphabet.length;i++) {
		if (letter==alphabet[i][0]) {
			return alphabet[i][1];
		}
	}
	return false;
}

var displaySecretWord = function() {

	var toDisplay = "",
		toCheck = "",
		divMot = document.getElementById("mot"),
		found = true;

	for (var i=0;i<secretWord.length;i++) {

		toCheck = secretWord.substr(i,1);

		if (isDiscovered(toCheck)) {
			toDisplay += toCheck;
		} else {
			toDisplay += "_";
			found = false;
		}

	}

	divMot.innerHTML = toDisplay;

	if (found && fails < 6) {
		for (var i=0;i<alphabet.length;i++) {
			alphabet[i][1] = true;
		}
		displayAlphabet();
		document.getElementById("gagne").style.display = "block";
	}

}

var displayAlphabet = function() {

	var divAlphabet = document.getElementById("alphabet");

	divAlphabet.innerHTML = "";

	for (var i=0;i<alphabet.length;i++) {

		if (!alphabet[i][1]) {
			divAlphabet.innerHTML += "<span onclick=\"guess('" + alphabet[i][0] + "');\">" + alphabet[i][0] + "</span>";
		} else {
			divAlphabet.innerHTML += "<span class=\"disabled\">" + alphabet[i][0] + "</span>";

		}

		if (i==12) {
			divAlphabet.innerHTML += "<br\>";
		}

	}

}

var displayHangman = function() {

	if (fails==1) {
		document.getElementById("head").style.display = "block";
	} else if (fails==2) {
		document.getElementById("body").style.display = "block";
	} else if (fails==3) {
		document.getElementById("leftarm").style.display = "block";
	} else if (fails==4) {
		document.getElementById("rightarm").style.display = "block";
	} else if (fails==5) {
		document.getElementById("leftleg").style.display = "block";
	} else if (fails==6) {
		document.getElementById("rightleg").style.display = "block";
		document.getElementById("perdu").style.display = "block";
		for (var i=0;i<alphabet.length;i++) {
			alphabet[i][1] = true;
		}
		displaySecretWord();
		displayAlphabet();
	}

}

var guess = function(letter) {

	if (!secretWord.includes(letter)) {
		fails++;
		displayHangman();
	}

	for (var i=0;i<alphabet.length;i++) {

		if (alphabet[i][0] == letter) {
			alphabet[i][1] = true;
 		}

	}

	displaySecretWord();
	displayAlphabet();

}

displaySecretWord();

displayAlphabet();

displayHangman();