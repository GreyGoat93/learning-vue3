<template>
  <div class="cont">
    <h1>Calculator</h1>
    <div class="calculator-outer">
      <div class="calculator">
        <div class="display">
          {{ operator == "" ? calculatorData1 : calculatorData2 }}
          <small class="small-info">{{
            operator != "" ? operator + " " + calculatorData1 : ""
          }}</small>
        </div>
        <button @click="press('1')" class="number button-style">1</button>
        <button @click="press('2')" class="number button-style">2</button>
        <button @click="press('3')" class="number button-style">3</button>
        <button @click="press('+')" class="number button-style">+</button>
        <button @click="press('4')" class="number button-style">4</button>
        <button @click="press('5')" class="number button-style">5</button>
        <button @click="press('6')" class="number button-style">6</button>
        <button @click="press('-')" class="number button-style">-</button>
        <button @click="press('7')" class="number button-style">7</button>
        <button @click="press('8')" class="number button-style">8</button>
        <button @click="press('9')" class="number button-style">9</button>
        <button @click="press('*')" class="number button-style">*</button>
        <button @click="press('0')" class="number button-style">0</button>
        <button @click="press('C')" class="number button-style">C</button>
        <button @click="press('=')" class="number button-style">=</button>
        <button @click="press('/')" class="number button-style">/</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import useWindowEvent from "../utilities/composition/useWindowEvent";
export default {
  setup() {
    const calculatorData1 = ref("0");
    const calculatorData2 = ref("0");
    const numbers = ref(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
    const operators = ref(["+", "-", "*", "/"]);
    const operator = ref("");

    function press(key) {
      if (numbers.value.includes(key)) {
        appendNum(key);
      } else if (operators.value.includes(key)) {
        selectOperator(key);
      } else if (key == "C") {
        clearCalc();
      } else if (key == "=" || key == "ENTER") {
        calculate();
      }
    }

    function appendNum(key) {
      if (operator.value == "") {
        if (calculatorData1.value != 0) {
          calculatorData1.value += key;
        } else {
          calculatorData1.value = key;
        }
      } else {
        if (calculatorData2.value != 0) {
          calculatorData2.value += key;
        } else {
          calculatorData2.value = key;
        }
      }
    }

    function selectOperator(key) {
      operator.value = key;
    }

    function clearCalc() {
      operator.value = "";
      calculatorData1.value = "0";
      calculatorData2.value = "0";
    }

    function calculate() {
      switch (operator.value) {
        case "+":
          calculatorData1.value =
            parseFloat(calculatorData1.value) +
            parseFloat(calculatorData2.value);
          operator.value = "";
          break;
        case "-":
          calculatorData1.value =
            parseFloat(calculatorData1.value) -
            parseFloat(calculatorData2.value);
          operator.value = "";
          break;
        case "*":
          calculatorData1.value =
            parseFloat(calculatorData1.value) *
            parseFloat(calculatorData2.value);
          operator.value = "";
          break;
        case "/":
          calculatorData1.value =
            parseFloat(calculatorData1.value) /
            parseFloat(calculatorData2.value);
          operator.value = "";
          break;
      }
      calculatorData2.value = 0;
    }

    function handleKeydown(e) {
      console.log("sex");
      press(e.key.toUpperCase());
    }

    useWindowEvent("keydown", handleKeydown);

    return {
      calculatorData1,
      press,
      calculatorData2,
      operator,
      numbers,
      operators
    };
  }
};
</script>

<style scoped>
h1 {
  margin: 0.5em 0;
}

.cont {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.calculator-outer {
  width: 400px;
}

.calculator {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.25rem;
}

.display {
  grid-column: span 4 / span 4;
  font-size: 2.5em;
  width: initial;
  background-color: #eee;
  box-shadow: 0 0 5px #888;
  border: 5px #222 solid;
  text-align: right;
  overflow-x: hidden;
  direction: ltr;
  position: relative;
}

.small-info {
  position: absolute;
  right: 3px;
  bottom: 0;
  font-size: 0.25em;
}

.button-style {
  box-shadow: 0 0 5px #888;
  font-size: 3em;
  height: auto;
  border: 5px #222 solid;
}

.number {
  width: 2em;
}

.zero {
  grid-column: span 2 / span 2;
}
</style>
