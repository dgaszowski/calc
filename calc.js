function Calc() {
    this.valuesStack = new Array();
    this.operandsStack = new Array();
    this.register = 0;

    this.pushValue = function(val) {
        this.valuesStack.push(val);
    };

    this.popValue = function() {
        return this.valuesStack.pop();
    };

    this.pushOperand = function(val) {
        this.operandsStack.push(val);
    };

    this.popOperand = function() {
        return this.operandsStack.pop();
    };

    this.calculate = function(val, operand) {
        
    }
};