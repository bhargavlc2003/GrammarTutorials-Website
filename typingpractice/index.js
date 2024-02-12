const charval = document.getElementById("textarea");
let totalcounter = document.getElementById("total-counter");
let remainingcounter = document.getElementById("remaining-counter");

let userChar = 0;

// to update the character on screen
const updateCounter = () => {
  userChar = charval.value.length;

  totalcounter.innerText = userChar;

  remainingcounter.innerText = 500 - userChar;
};

charval.addEventListener("keyup", () => updateCounter());

// to copy the text
const copyText = () => {
 
 charval.select();
  charval.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(charval.value);
};
function eraseText() {
    document.getElementById("textarea").value = "";
}
