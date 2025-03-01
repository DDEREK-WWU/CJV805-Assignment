console.log ('👋 Welcome to the test file!');


function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  console.log(getRandomInteger(1, 10)-0.01); // Output: Random number between 1 and 10