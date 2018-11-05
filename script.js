
var historyArray = [];
var memoryArray = [];

function getValue() {
	return document.getElementById("result").value;
}

function setValue(val) {
	document.getElementById("result").value = val;
}

function resetValue() {
	setValue("0");
}

function clearValue() {
	setValue("");
}

function isValue(val) {
	return getValue().trim() === val;
}

function isValueZero() {
	return isValue("0");
}

function isValueError() {
	return isValue("#Error");
}

function isValueEmpty() {
	return isValue("");
}

function isValueSingleCharacter() {
	return getValue().trim().length == 1;
}

function isValueInfinity() {
	return getValue().trim().indexOf("Infinity") != -1;
}

function calculate() {
	var val = getValue();
	var evaluation = evaluate(val);
	clearValue();
	setValue(evaluation);
	appendHistoryEntry(val + " = " + evaluation);
	refreshHistory();
}

function appendValue(val) {
	var currentValue = getValue();
	
	if (isValueZero() || isValueError()) 
		clearValue();
	
	document.getElementById("result").value += val;
}

function backspace() {
	if (isValueZero())
		return;

	if (isValueError() || isValueSingleCharacter() || isValueInfinity()) {
		resetValue();
		return;
	}

	var currentValue = getValue();
	clearValue();
	appendValue(currentValue.substr(0, currentValue.length - 1));
}

function replaceFunction(value, func, replacement) {
	if (value.indexOf(func) != -1)
		return value.replace(new RegExp(func, "g"), replacement);
	else
		return value;
}

function factorial(n) {
	if (n == 0) return 1;

	return n * factorial(n - 1);
}

function evaluate(val) {
	var functions = ["pow", "sin", "cos", "tan", "sqrt", "log", "exp", "mod"];
	var currentValue = val;
	for (var f of functions) {
		currentValue = replaceFunction(currentValue, f, "Math." + f);
	}

	currentValue = replaceFunction(currentValue, "\u03A0", "Math.PI");
	currentValue = replaceFunction(currentValue, "fact", "factorial");

	try {
		return eval(currentValue);
	}
	catch (e) {
		return "#Error";
	}
}

function notYetImplemented() {
	alert("Sorry, not yet implemented!");
}

function hidePanelContent(val) {
	document.getElementById(val).style.display = "none";
}

function showPanelContent(val) {
	document.getElementById(val).style.display = "grid";
}

function hideMenu(menuID) {
	document.getElementById(menuID).setAttribute("class", "side-panel-hidden-menu")
} 

function showMenu(menuID) {
	document.getElementById(menuID).removeAttribute("class");
}

function hideHistoryPanel() {
	hidePanelContent("hist");
	hideMenu("history-panel");
	showMenu("memory-panel");
	showPanelContent("mem");
}

function hideMemoryPanel() {
	hidePanelContent("mem");
	hideMenu("memory-panel");
	showMenu("history-panel");
	showPanelContent("hist");
}

function displayMemoryPanel() {
	hideHistoryPanel();
}

function displayHistoryPanel() {
	hideMemoryPanel();
	refreshHistory();
}

function appendHistoryEntry(entry) {
	historyArray.push(entry);
}

function cleanHistory() {
	document.getElementById("hist").innerHTML = "";
}

function refreshHistory() {
	cleanHistory();

	if (historyArray.length > 0) {
		document.getElementById("history-panel").innerText = "History (" + historyArray.length + ")";

		var counter = 0;
		for (var h of historyArray) {
			document.getElementById("hist").innerHTML += "<p class='history-entry'>" + ++counter + ": " + h + "</p>\n";
		}
	} 
	else {
		document.getElementById("history-panel").innerText = "History"
	}
}

function clearMemory() {
	delete memoryArray;
}