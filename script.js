// Function to check the answer and redirect accordingly
function checkAnswer(questionNumber, selectedOption) {
    let correctAnswers = {
        1: "option2",  // Correct answer for Question 1
        2: "option3",  // Correct answer for Question 2
        3: "option2"   // Correct answer for Question 3
    };

    if (selectedOption === correctAnswers[questionNumber]) {
        if (questionNumber < 3) {
            window.location.href = `question${questionNumber + 1}.html`; // Go to next question
        } else {
            window.location.href = "gift.html"; // Final win page
        }
    } else {
        window.location.href = `wrong.html?q=${questionNumber}`; // Use 'q' instead of 'question'
    }
}

// Function to retry the wrong question
function retryQuestion() {
    const urlParams = new URLSearchParams(window.location.search);
    const questionNumber = urlParams.get('q'); // Retrieve 'q' instead of 'question'

    if (questionNumber) {
        window.location.href = `question${questionNumber}.html`; // Redirect back to the specific wrong question
    } else {
        window.location.href = "question1.html"; // Default to question 1 if no question number is found
    }
}
