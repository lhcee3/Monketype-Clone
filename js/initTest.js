import { testConfig } from "./testConfig.js";

// Queries
const typingTest = document.querySelector(".typing-test");
const testContainer = document.querySelector(".test");
const testText = document.querySelector(".test-text");
const textOverlay = document.querySelector(".overlay");
const startingTextContainer = document.querySelector(".starting-text");
const testConfiguration = document.querySelector(".test-config");
const testResult = document.querySelector(".test-results");
const testInfo = document.querySelector(".time-word-info");

// Globals
const punctuation = `+",.-'"&!?:;#~=/$^()_<>`;
const letters = "abcdefghijklmnopqrstuvwxyz";
let testWords = [];
export let testLetters = [];

export function initTest() {
  // hide test configuration
  testConfiguration.classList.add("hide");

  // hide test result
  testResult.classList.remove("show");

  // Show test info
  testInfo.innerHTML = "";
  testInfo.classList.remove("hide");

  // Handle test shadow and start test text
  testContainer.classList.remove("shadow");
  textOverlay.classList.add("hide");
  startingTextContainer.classList.add("hide");

  // Prevent clicking
  typingTest.classList.add("no-click");

  // Generate Test Text
  testWords = generateTestText();

  // Create test words and letters
  createWords();
}

// function generateTestText() {
//   const numberOfWords = decideNumberOfWords();
//   const includeToTest = testConfig["include-to-test"];
//   const words = [];

//   for (let i = 0; i < numberOfWords; i++) {
//     let wordLength = random(8) + 1;
//     let word = "";

//     for (let j = 0; j < wordLength; j++) {
//       let randomLetter = letters[random(letters.length)];
//       if (random(8) === 4) {
//         word += randomLetter.toLocaleUpperCase();
//       } else {
//         word += randomLetter;
//       }
//     }

//     if (includeToTest.includes("punctuation")) {
//       if (random(8) % 2 === 0) {
//         word += punctuation[random(punctuation.length)];
//       }
//     }

//     if (includeToTest.includes("numbers")) {
//       if (random(8) % 2 === 0) {
//         word += " " + random(10);
//       }
//     }

//     words.push(word);
//   }
//   return words;
// }
function generateTestText() {
  const numberOfWords = decideNumberOfWords();
  const includeToTest = testConfig["include-to-test"];

  const wordList = [
    // Common nouns
    "apple", "banana", "cherry", "date", "elephant", "fox", "grape", "house", "igloo", "jacket", 
    "kangaroo", "lion", "mountain", "notebook", "ocean", "penguin", "quilt", "river", "sunflower", 
    "tiger", "umbrella", "violin", "whale", "xylophone", "yacht", "zebra",
    
    // Common verbs
    "accept", "believe", "create", "decide", "explore", "forget", "grow", "help", "imagine", "jump", 
    "know", "listen", "move", "notice", "observe", "paint", "question", "run", "speak", "think", 
    "understand", "validate", "walk", "xerox", "yell", "zoom",
    
    // Common adjectives
    "angry", "brave", "calm", "delightful", "eager", "fancy", "gentle", "happy", "intelligent", 
    "jolly", "kind", "lively", "mighty", "nervous", "optimistic", "proud", "quick", "rude", "shy", 
    "thankful", "ugly", "vast", "wise", "xenophobic", "young", "zealous",
    
    // Common adverbs
    "abruptly", "boldly", "calmly", "diligently", "eagerly", "foolishly", "gracefully", "happily", 
    "innocently", "justly", "kindly", "lazily", "merrily", "neatly", "openly", "politely", "quickly", 
    "rudely", "swiftly", "thankfully", "urgently", "vividly", "wisely", "xeroxically", "youthfully", 
    "zealously",
    
    // Technical terms
    "algorithm", "binary", "compiler", "data", "encryption", "function", "gradient", "hash", 
    "interface", "javascript", "kernel", "library", "matrix", "neural", "object", "protocol", 
    "query", "recursion", "syntax", "thread", "unicode", "variable", "websocket", "xml", "yaml", 
    "zip",
  
    // Random everyday objects
    "backpack", "camera", "drum", "earphone", "furniture", "glove", "hat", "ink", "jewelry", 
    "key", "lamp", "mirror", "notebook", "oven", "phone", "quill", "ring", "shoe", "table", 
    "umbrella", "vase", "wallet", "xylophone", "yarn", "zipper",
  
    // Common animals
    "ant", "bear", "cat", "dog", "eagle", "frog", "goat", "horse", "iguana", "jellyfish", 
    "koala", "lemur", "monkey", "narwhal", "octopus", "panda", "quail", "rabbit", "snake", 
    "tortoise", "urchin", "vulture", "wolf", "xerus", "yak", "zebra",
  
    // Colors
    "amber", "blue", "crimson", "denim", "emerald", "fuchsia", "gold", "hazel", "indigo", 
    "jade", "khaki", "lavender", "magenta", "navy", "ochre", "pearl", "quartz", "red", "silver", 
    "teal", "ultramarine", "violet", "white", "xanthic", "yellow", "zinnia",
    
    // Emotions
    "anger", "bliss", "calm", "delight", "envy", "fear", "grief", "hope", "inspiration", "joy", 
    "kindness", "love", "melancholy", "nervousness", "optimism", "pride", "quizzical", "rage", 
    "sadness", "trust", "uncertainty", "vexation", "wonder", "xenial", "yearning", "zeal",
    
    // Miscellaneous
    "adventure", "balance", "courage", "dream", "energy", "freedom", "growth", "harmony", 
    "innovation", "justice", "knowledge", "legacy", "motivation", "network", "opportunity", 
    "progress", "quality", "resilience", "strength", "teamwork", "unity", "vision", "wisdom", 
    "xenon", "youth", "zenith"
  ];
  
  const words = [];

  for (let i = 0; i < numberOfWords; i++) {
    // Choose a random word from the word list
    let word = wordList[random(wordList.length)];

    // // Randomly capitalize letters if needed
    // if (random(8) === 4) {
    //   word = word.split('').map(letter => random(2) ? letter.toUpperCase() : letter).join('');
    // }

    // Optionally include punctuation
    if (includeToTest.includes("punctuation")) {
      if (random(8) % 2 === 0) {
        word += punctuation[random(punctuation.length)];
      }
    }

    // Optionally include numbers
    if (includeToTest.includes("numbers")) {
      if (random(8) % 2 === 0) {
        word += " " + random(10);
      }
    }

    words.push(word);
  }
  
  return words;
}


function createLetter(letter, parentContainer, i, j) {
  const letterSpan = document.createElement("span");
  letterSpan.innerText = letter;
  letterSpan.className = "letter";
  letterSpan.id = `${i}:${j}`;
  parentContainer.appendChild(letterSpan);
  testLetters.push(letterSpan);
}

function createWords() {
  for (let i = 0; i < testWords.length; i++) {
    const wordDiv = document.createElement("div");
    wordDiv.id = i + 1;
    wordDiv.className = "word";

    [...testWords[i]].forEach((letter, j) => {
      createLetter(letter, wordDiv, i + 1, j + 1);
    });

    if (i < testWords.length - 1) {
      // space between words
      createLetter(" ", wordDiv, i + 1, testWords[i].length + 1);
    }

    testText.appendChild(wordDiv);
  }
}

function decideNumberOfWords() {
  return testConfig["test-by"] === "words"
    ? testConfig["time-word-config"]
    : 40;
}

function random(limit) {
  return Math.floor(Math.random() * limit);
}

export function resetTestWordsAndLetters(params) {
  testWords = [];
  testLetters = [];
}
