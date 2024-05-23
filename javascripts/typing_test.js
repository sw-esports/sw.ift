const typingText = document.querySelector('.typing-text p');
const inputField = document.createElement('input');
document.body.appendChild(inputField);
inputField.style.position = 'fixed';
inputField.style.opacity = '0';

const mistakeTag = document.querySelector('#mistake-value');
const timerTag = document.querySelector('#time-value');
const wpmTag = document.querySelector('#wpm');
const accuracyTag = document.querySelector('#acc-value');
const minInterval = 100;
const selectedTime = localStorage.getItem('selectedTime');
const selectedParagraph = localStorage.getItem('selectedParagraph');



let lastSoundTime = 0;
let maxTime = (selectedTime !== null) ? parseInt(selectedTime) * 60 : maxTime;
let timeLeft = maxTime;
let timer; // Variable to store the timer interval
let startTime; // Variable to store the start time of typing
let isTyping = false; // Flag to check if the typing has started
let totalCharactersTyped = 0;
let totalWordsTyped = 0;
let totalCorrectCharacters = 0;
let totalMistakes = 0;

const sounds = {
    typewriter: new Audio('/assets/sounds/typewriter.mp3'),
    error: new Audio('/assets/sounds/error.mp3')
};

function playSound(sound) {
    const currentTime = Date.now();
    if (!isMuted && currentTime - lastSoundTime > minInterval) {
        lastSoundTime = currentTime;
        sound.currentTime = 0;
        sound.play();
    }
}

function randomParagraph() {
    typingText.innerHTML = ''; // Clear previous paragraph
    let Text =''
   if(selectedParagraph !=="random"){
    Text = paragraphs[selectedParagraph];
    
   }else{
    Text = paragraphs[Math.floor(Math.random() * paragraphs.length)];
   
   }
    Text.split('').forEach((char) => {
        let spanTag = `<span>${char}</span>`;
        typingText.innerHTML += spanTag;
    });
    setActiveCharacter(0); // Set the first character as active initially
    inputField.focus();
    document.querySelector('.left-upper').scrollTop = 0;
}


function setActiveCharacter(index) {
    const spanTags = typingText.querySelectorAll('span');
    spanTags.forEach((char, charIndex) => {
        if (charIndex === index) {
            char.classList.add('active');
            const activeCharacter = document.querySelector('.active').innerText;
            const imageSource = `/assets/images/${activeCharacter}.png`;
            let keyboardImage = document.querySelector('.keyboard-image');
            keyboardImage.src = imageSource;
        } else {
            char.classList.remove('active');
        }
    });
}

function resetStats() {
    totalCharactersTyped = 0;
    totalWordsTyped = 0;
    totalCorrectCharacters = 0;
    totalMistakes = 0;
    mistakeTag.innerHTML = totalMistakes;
    wpmTag.innerHTML = 0;
    accuracyTag.innerHTML = '100%';
    timeLeft = maxTime;
    timerTag.innerHTML = `${timeLeft}s`;
    clearInterval(timer);
    isTyping = false;
}

function changeDash() {
    const root = document.documentElement;
    root.style.setProperty('--dash', `${472 - (472 * (calculateWPM() / 100))}`);
}

function calculateWPM() {
    const elapsedTime = (maxTime - timeLeft) / 60; // Convert seconds to minutes
    return Math.round((totalWordsTyped / elapsedTime) || 0); // Calculate WPM
}

function calculateAccuracy() {
    if (totalCharactersTyped === 0) {
        return 100;
    }
    const accuracy = (totalCorrectCharacters / totalCharactersTyped) * 100;
    return Math.max(Math.min(accuracy, 100), 0).toFixed(2); // Ensure accuracy is between 0% and 100%
}

function updateStats() {
    const wpm = calculateWPM();
    const accuracy = calculateAccuracy();
    
    wpmTag.innerHTML = wpm;
    accuracyTag.innerHTML = `${accuracy}%`;
    changeDash(); // Update the dash
    scrollIfNeeded()
}

function initTyping() {
    inputField.addEventListener('input', (event) => {


        
        if (!isTyping) { // Start the timer when typing starts
            startTime = Date.now();
            timer = setInterval(initTimer, 1000);
            setInterval(updateStats, 500); // Update stats every 0.5 seconds
            isTyping = true;
           
            updateStats(); // Update stats when typing starts
        }
        
        const inputText = inputField.value;
        const spanTags = typingText.querySelectorAll('span');

        if (event.inputType === 'deleteContentBackward') {
            const activeIndex = inputText.length;
            setActiveCharacter(activeIndex); // Set the previous character as active
            if (activeIndex < spanTags.length) {
                if (spanTags[activeIndex].classList.contains('incorrect')) {
                    totalMistakes--;
                    mistakeTag.innerHTML = totalMistakes;
                }
                spanTags[activeIndex].classList.add('undo');
                spanTags[activeIndex].classList.remove('correct', 'incorrect')
              
            }
            totalCharactersTyped = inputText.length; // Update total characters typed
            updateStats(); // Update stats after backspace
            return; // Exit the event listener as no further processing is needed
        } else {
            totalCharactersTyped = inputText.length; // Update total characters typed
            totalCorrectCharacters = 0;
            totalMistakes = 0;

            spanTags.forEach((char, index) => {
                const character = inputText[index];

                if (character == null) {
                    char.classList.remove('correct', 'incorrect', 'active', 'undo');
                } else if (character === char.innerText) {
                    if (!char.classList.contains('correct')) {
                        playSound(sounds.typewriter); // Play sound only for correct characters
                    }
                    char.classList.add('correct');
                    char.classList.remove('incorrect', 'undo', 'active');
                    totalCorrectCharacters++;
                    if (character === ' ' && !char.classList.contains('word-counted')) {
                        totalWordsTyped++;
                        char.classList.add('word-counted');
                    }
                } else {
                    if (!char.classList.contains('incorrect')) {
                        playSound(sounds.error); // Play sound only for incorrect characters
                    }
                    char.classList.add('incorrect');
                    char.classList.remove('correct', 'undo');
                    totalMistakes++;
                }
            });

            mistakeTag.innerHTML = totalMistakes;
        }

        const activeIndex = inputText.length;
        if (activeIndex < spanTags.length) {
            setActiveCharacter(activeIndex); // Set the next character as active
        } else {
            randomParagraph();
            inputField.value = '';
        }

        updateStats();
    });
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timerTag.innerHTML = `${timeLeft}s`;
    } else {
        clearInterval(timer);
        inputField.disabled = true; // Disable input field when time is up
        showTimeUpPopup();
    }
}

function showTimeUpPopup() {
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '0';
    popup.style.left = '0';
    popup.style.width = '100%';
    popup.style.height = '100%';
    popup.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    popup.style.zIndex = '99';
    popup.style.display = 'flex';
    popup.style.justifyContent = 'center';
    popup.style.alignItems = 'center';
    popup.style.color = '#fff';
    popup.style.flexDirection = 'column';
    popup.innerHTML = `
        <h1>Time Up!</h1>
        <button class="result-btn" onclick="showResult()">Show Result</button>
    `;
    document.body.appendChild(popup); // Append to body for full screen coverage
}

let isMuted = false;

function restartAction() {
    location.reload();
}

function stopTimer() {
    clearInterval(timer);
}

function pauseAction() {
    stopTimer();
    document.querySelector('.ri-pause-fill').style.display = 'none';
    document.querySelector('.ri-play-fill').style.display = 'inline';
}

function startTimer() {
    timer = setInterval(initTimer, 1000);
}

function playAction() {
    startTimer();
    document.querySelector('.ri-play-fill').style.display = 'none';
    document.querySelector('.ri-pause-fill').style.display = 'inline';
}

function muteAction() {
    isMuted = true;
    document.querySelector('.ri-volume-mute-fill').style.display = 'none';
    document.querySelector('.ri-volume-up-fill').style.display = 'inline';
    // Mute all audio elements
    const audios = document.querySelectorAll('audio');
    audios.forEach(audio => audio.muted = true);
}

function unmuteAction() {
    isMuted = false;
    document.querySelector('.ri-volume-up-fill').style.display = 'none';
    document.querySelector('.ri-volume-mute-fill').style.display = 'inline';
    // Unmute all audio elements
    const audios = document.querySelectorAll('audio');
    audios.forEach(audio => audio.muted = false);
}
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  function showResult() {
    const wpm = calculateWPM();
    const accuracy = calculateAccuracy();
    const timeTaken = maxTime - timeLeft;

    const mistakenWords = {}; // Object to store mistaken words and their frequencies
    document.querySelectorAll('.incorrect').forEach(span => {
        const word = span.innerText;
        mistakenWords[word] = (mistakenWords[word] || 0) + 1;
    });

    const mostMistakenWords = Object.entries(mistakenWords)
        .sort((a, b) => b[1] - a[1]) // Sort by frequency in descending order
        .slice(0, 5) // Take the top 5 most mistaken words
        .map(entry => ({ word: entry[0], mistakes: entry[1] }));

    const result = {
        wpm: wpm,
        accuracy: accuracy,
        timeTaken: timeTaken,
        mostMistakenWords: mostMistakenWords
    };

    localStorage.setItem('typingTestResult', JSON.stringify(result));

    // Redirect to result page
    window.location.href = 'result.html';
}


function home() {
    window.location.href = '/html/home-page.html';
}
// Initial setup
randomParagraph();
initTyping();

// Ensure the input field is focused when clicking on the document
document.addEventListener('click', () => {
    inputField.focus();
});

function scrollIfNeeded() {
  
    var leftUpperDiv = document.querySelector('.left-upper');
    var activeSpan = document.querySelector('.typing-text span.active');

    // Get the y-coordinate of the bottom of the active span
    var activeSpanBottom = activeSpan.getBoundingClientRect().bottom;

    // Get the y-coordinate of the bottom of the left-upper div
    var leftUpperDivBottom = leftUpperDiv.getBoundingClientRect().bottom;
    var leftUpperDivHeight = leftUpperDiv.clientHeight;
    // Check if the active span is positioned lower than the left-upper div
    if (activeSpanBottom > leftUpperDivBottom) {
        // Scroll down to show the active span
        leftUpperDiv.scrollTop += leftUpperDivHeight;
    }
}
