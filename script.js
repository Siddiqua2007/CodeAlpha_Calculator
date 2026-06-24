
const ClickSound = new Audio("click.wav");
ClickSound.preload = "auto";
ClickSound.volume = 0.1;

const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let expression = "";

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.innerText;


    ClickSound.pause();
    ClickSound.currentTime = 0;
    ClickSound.play();

    if (value === "C") {
      expression = "";
      display.value = "";
    } 
    else if (value === "⌫") {
      expression = expression.slice(0, -1);
      display.value = expression;
    } 
    else if (value === "=") {
      try {
        expression = expression
          .replace(/×/g, "*")
          .replace(/÷/g, "/");

        const result = eval(expression);

        if (!isFinite(result)) {
          display.value = "Error";
          expression = "";
        } else {
          display.value = result;
          expression = result.toString();
        }
      } catch {
        display.value = "Error";
        expression = "";
      }
    } 
    else {
      expression += value;
      display.value = expression;
    }
  });
});
document.body.addEventListener("click", () => {
  ClickSound.play();
});
document.addEventListener("keydown", (e) => {
  if (!isNaN(e.key)) {
    expression += e.key;
    display.value = expression;
  }

  if (e.key === "+") expression += "+";
  if (e.key === "-") expression += "-";
  if (e.key === "*") expression += "×";
  if (e.key === "/") expression += "÷";
  if (e.key === ".") expression += ".";

  if (e.key === "Backspace") {
    expression = expression.slice(0, -1);
    display.value = expression;
  }

  if (e.key === "Escape") {
    expression = "";
    display.value = "";
  }

  if (e.key === "Enter") {
    try {
      const result = eval(
        expression.replace(/×/g, "*").replace(/÷/g, "/")
      );
      display.value = result;
      expression = result.toString();
    } catch {
      display.value = "Error";
      expression = "";
    }
  }
});
