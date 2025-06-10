// Load the File System module
// const fs = require('fs');

// Define the Arabic character and its corresponding value
const corresponding = {
  ض: "q",
  ص: "w",
  ث: "e",
  ق: "r",
  ف: "t",
  غ: "y",
  ع: "u",
  ه: "i",
  خ: "o",
  ح: "p",
  ج: "{",
  د: "]",
  ط: "'",
  ك: ":",
  م: "l",
  ن: "k",
  ت: "j",
  ا: "h",
  آ: "n",
  ل: "g",
  ب: "f",
  ي: "d",
  س: "s",
  ش: "a",
  ئ: "z",
  أ: "x",
  ؤ: "c",
  ر: "v",
  لا: "b",
  ى: "D",
  ة: "m",
  ذ: "`",
  و: ",",
  ز: ">",
  ظ: "/",
  "٠": "0",
  "١": "1",
  "٢": "2",
  "٣": "3",
  "٤": "4",
  "٥": "5",
  "٦": "6",
  "٧": "7",
  "٨": "8",
  "٩": "9",
  0: "0",
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
  "\n": " ",
  "/": " \\  ",
  "-": " -  ",
  _: "_",
  "–": " - ",
  "%": "%",
  "(": "(",
  " ": " ",
};
const symbolMap = { "{": "[", ":": ";" };
const nonConnectingLetters = ["ا", "أ", "إ", "آ", "د", "ذ", "ر", "ز", "و"];
const alefForms = ["ا", "أ", "إ", "آ"];
const wordEndMark = [" ", "–", "-", "_", "\n"];
const laaForms = ["لإ", "لأ", "لا", "لآ"];

const inputTextArea = document.getElementById("arabic-text-area");
const outputTextArea = document.getElementById("converted-text-area");
const convertButton = document.getElementById("convert-btn");

convertButton.addEventListener("click", convertText);

function convertText() {
  var inputValue = inputTextArea.value;
  inputValue = fixArabicLetters(inputValue);
  var result = "";
  for (var i = 0; i < inputValue.length; i++) {
    var letter = inputValue[i];
    var value = corresponding[letter];
    if (isAlef(letter)) {
      if (
        isFirstWordLetter(inputValue, i) ||
        noConnectPrev(inputValue[i - 1])
      ) 
        value = value.toUpperCase();
      
    } else if (letter === "ة") {
      if (noConnectPrev(inputValue[i - 1])) value = value.toUpperCase();
    } else if (letter === "ل" && !isLastWordLetter(inputValue, i)) {
      if (isLaa(letter, inputValue[i + 1])) {
        letter = letter + "ا"; //  letter = letter+inputValue[i+1]  to know how to write  لآ
        value = corresponding[letter];
        if (noConnectPrev(inputValue[i - 1])) value = value.toUpperCase();
        i++;
      }
    } else if (isLastWordLetter(inputValue, i)) {
      if (value === "{" || value === ":") value = symbolMap[value];
      else {
        value = value.toUpperCase();
      }
    }
    result += value;
  }
  outputTextArea.value = result;
}

function fixArabicLetters(arabicText) {
  return arabicText
    .replace(/[\.\n]/g, " ")
    .replace(/–/g, "-")
    .replace(/ـ/g, "")
    .replace(/\s+/g, " ")
    .replace(/إ/g, "ا");
}
function isLastWordLetter(arabicText, index) {
  if (
    index === arabicText.length - 1 ||
    wordEndMark.includes(arabicText[index + 1])
  )
    return true;
  return false;
}
function isFirstWordLetter(arabicText, index) {
  if (index === 0 || wordEndMark.includes(arabicText[index - 1])) return true;
  return false;
}
function isLaa(letter, nextLetter) {
  const text = letter + nextLetter;
  if (laaForms.includes(text)) return true;
  return false;
}
function isAlef(letter) {
  return alefForms.includes(letter);
}
function noConnectPrev(prevLetter) {
  return nonConnectingLetters.includes(prevLetter);
}

// //ا not correcr لآ space   لا== B  يلا= b  ة   - (ةووا)
