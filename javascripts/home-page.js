document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const left = document.querySelector('.left');
    const lessonBtn = document.querySelector('#lesson-btn');
    const testBtn = document.querySelector('#test-btn');

    const helpBtn = document.querySelector('#help-btn');
    // Function to create paragraph boxes
    function createParagraphBoxes() {
        left.innerHTML = '';
        paragraphs.forEach((paragraph, index) => {
            const paraBox = document.createElement('div');
            paraBox.classList.add('box');
            paraBox.id = index;
            paraBox.textContent = index + 1;
            left.appendChild(paraBox);
        });
    }

    // Function to handle lesson button click
    function handleLessonButtonClick() {
        createParagraphBoxes();
        left.classList.add('left-temp');
        lessonBtn.classList.add('active1');
        testBtn.classList.remove('active2');
        helpBtn.classList.remove('active4');
        left.classList.remove('test-box-centre');
    }

    // Function to handle test button click
    function handleTestButtonClick() {
        left.innerHTML = `
            <div class="test-box">
                <div class="selectPara">
                    <label for="selectPara">Select Paragraph:</label>
                    <select id="selectPara">
                        <option value="random">Random</option>
                        <option value="0">The quick brown fox jumps over the lazy dog...</option>
                        <option value="1">The autumn leaves fell gracefully from the trees...</option>
                        <option value="2">In the heart of the bustling city, a street musician played....</option>
                        <option value="3">On a quiet beach, waves gently lapped at the shore, leaving...</option>
                        <option value="4">In a small village nestled in the hills, life moved at a slower...</option>
                    </select>
                </div>
                <div class="selectTime">
                    <label for="timeSelect">Select Time:</label>
                    <select id="timeSelect">
                        <option value="1">1 min</option>
                        <option value="5">5 min</option>
                        <option value="10">10 min</option>
                        <option value="15">15 min</option>
                        <option value="20">20 min</option>
                    </select>
                    <button id="start-test-btn" class="start-test-btn">Start Test</button>
                </div>
            </div>`;
        left.classList.remove('left-temp');
        left.classList.add('test-box-centre');
        lessonBtn.classList.remove('active1');
        testBtn.classList.add('active2');
        helpBtn.classList.remove('active4');
    }

    // Event listeners
    lessonBtn.addEventListener('click', handleLessonButtonClick);
    testBtn.addEventListener('click', handleTestButtonClick);

    // Event listener for start test button
    document.addEventListener('click', function(event) {
        if (event.target && event.target.id === 'start-test-btn') {
            const selectedParagraph = document.getElementById('selectPara').value;
            const selectedTime = document.getElementById('timeSelect').value;
            localStorage.setItem('selectedParagraph', selectedParagraph);
            localStorage.setItem('selectedTime', selectedTime);
            window.location.href = '/html/typing_test.html';
        }
    });
});
