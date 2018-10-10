
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

function appendValue(val) {
	var currentValue = getValue();
	
	if (currentValue.trim() === "0") 
		clearValue();
	
	document.getElementById("result").value += val;
}