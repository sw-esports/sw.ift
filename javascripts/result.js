document.addEventListener("DOMContentLoaded", function() {
    // Retrieve the typing test result data from local storage
    const result = JSON.parse(localStorage.getItem('typingTestResult'));
  
  

    mistakenWords(result.mostMistakenWords)
  
    if (result) {
        // Update WPM value
        const wpmElement = document.querySelector('.wpm-box #wpm');
        if (wpmElement) {
          
            wpmElement.textContent = result.wpm;
            changeDash(result.wpm,'dash1');
        }

        // Update Accuracy value
        const accuracyElement = document.querySelector('.accuracy #wpm');
        if (accuracyElement) {
            accuracyElement.textContent = result.accuracy + '%';
            changeDash(result.accuracy,'dash2');
        }

        // Update Time Taken value
        const timeTakenElement = document.querySelector('.timeTaken #wpm');
        if (timeTakenElement) {
            timeTakenElement.textContent = result.timeTaken + 's';
            changeDash(result.timeTaken,'dash3');
        }
    } else {
        console.error('No typing test result found in local storage.');
    }
    displayStars(result.wpm)
   
});
function changeDash(result,dash) {
    const root = document.documentElement;
    root.style.setProperty(`--${dash}`, `${472 - (472 * (Number(result )/ 100))}`);
}

function displayStars(wpm){
    const stars = document.querySelector('.stars')
    stars.innerHTML = ''
    starhalf =`<div class="star"><img src="/assets/images/half star.png" alt=""></div>`
    starfull =`<div class="star"><img src="/assets/images/Star.png" alt=""></div>`
  
    if(wpm>100){
        stars.innerHTML = starfull.repeat(5);
    }else if (wpm>90){
        stars.innerHTML = starfull.repeat(4)+starhalf;
    }else if(wpm>80){
        stars.innerHTML = starfull.repeat(4);
    }
    else if(wpm>70){
        stars.innerHTML = starfull.repeat(3)+starhalf;
    }
    else if (wpm>60){
        stars.innerHTML = starfull.repeat(3);
    }
    else if (wpm > 50){
        stars.innerHTML = starfull.repeat(2)+starhalf;
    }
    else if (wpm >= 40){
        stars.innerHTML = starfull.repeat(2);
    }
    else if (wpm >= 30){
        stars.innerHTML = starfull.repeat(2)+starhalf;
    }
    else if (wpm >= 20){
        stars.innerHTML = starfull.repeat(2);
    }
    else if (wpm >= 10){
        stars.innerHTML = starhalf;
    }else{
        stars.innerHTML = 'itna slow kese'
    }
}



function mistakenWords(mostMistakenWords){
   
    const canvas = document.getElementById('bar');
    canvas.width = 350;  // Set width to 400 pixels
    canvas.height = 350; // Set height to 400 pixels
    // Extract labels (words) and data (mistakes) from the mostMistakenWords array
    const labels = mostMistakenWords.map(entry => entry.word);
    const data = mostMistakenWords.map(entry => entry.mistakes);

    const ctx = document.getElementById('bar').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Most Mistaken Words',
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
function home() {
    // Get the current domain and protocol
    var currentURL = window.location.href;
    var domain = currentURL.split("/")[2];
    var protocol = currentURL.split("/")[0];

    // Construct the URL for index.html
    var indexURL = "/html/home-page.html";

    // Redirect the user to index.html
    window.location.href = indexURL;
}

function redo() {
    var currentURL = window.location.href;
    var domain = currentURL.split("/")[2];
    var protocol = currentURL.split("/")[0];

    // Construct the URL for index.html
    var indexURL = "/html/typing_test.html";

    // Redirect the user to index.html
    window.location.href = indexURL;
}

function counter(wpm){
   
    
}