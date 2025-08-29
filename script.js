document.addEventListener('DOMContentLoaded', () => {
    const quoteTextElement = document.getElementById('quote-text');
    const quoteAuthorElement = document.getElementById('quote-author');
    const newQuoteBtn = document.getElementById('new-quote-btn');
    const copyQuoteBtn = document.getElementById('copy-quote-btn');
    const copyMessageElement = document.getElementById('copy-message');

    const quotes = [
        {
            text: "The only way to do great work is to love what you do.",
            author: "Steve Jobs"
        },
        {
            text: "Strive not to be a success, but rather to be of value.",
            author: "Albert Einstein"
        },
        {
            text: "The mind is everything. What you think you become.",
            author: "Buddha"
        },
        {
            text: "Your time is limited, so don't waste it living someone else's life.",
            author: "Steve Jobs"
        },
        {
            text: "The best way to predict the future is to create it.",
            author: "Peter Drucker"
        },
        {
            text: "Life is 10% what happens to us and 90% how we react to it.",
            author: "Charles R. Swindoll"
        },
        {
            text: "Believe you can and you're halfway there.",
            author: "Theodore Roosevelt"
        }
    ];

    const backgroundColors = [
        ['#6e8efb', '#a777e3'], // Soft Blue to Purple
        ['#7F7FD5', '#91EAE4'], // Light Blue/Purple to Tealish Blue
        ['#86A8E7', '#6DD5FA'], // Soft Blue to Sky Blue
        ['#a777e3', '#8A2BE2'], // Purple to BlueViolet
        ['#4e54c8', '#8f94fb'],  // Indigo to Lavender Blue
        ['#5e72e4', '#825ee4'], // Royal Blue to Medium Purple
        ['#43cea2', '#185a9d']  // Greenish Blue to Dark Blue (more blue focused)
    ];

    let currentQuoteIndex = 0;
    let currentBgIndex = 0;

    function getRandomElement(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function displayNewQuote() {
        // Get a new random quote (ensure it's different from the current one if possible)
        let newQuote;
        if (quotes.length > 1) {
            do {
                newQuote = getRandomElement(quotes);
            } while (newQuote.text === quoteTextElement.textContent);
        } else {
            newQuote = quotes[0];
        }
        
        quoteTextElement.textContent = newQuote.text;
        quoteAuthorElement.textContent = `- ${newQuote.author}`;

        // Change background
        let newBgColors;
        if (backgroundColors.length > 1) {
            do {
                newBgColors = getRandomElement(backgroundColors);
            } while (backgroundColors.length > 1 && newBgColors.join(',') === document.body.style.backgroundImage.slice(18, -1).split(', ').map(c => c.startsWith('rgb') ? rgbToHex(c) : c).join(',')); // Avoid immediate repetition
        } else {
            newBgColors = backgroundColors[0];
        }
        
        document.body.style.background = `linear-gradient(135deg, ${newBgColors.join(', ')})`;
    }

    // Helper to convert rgb to hex for comparison if needed, though direct comparison of array should work for this setup
    // For simplicity, this version relies on the direct array join for comparison, assuming the format remains consistent.

    function copyToClipboard() {
        const textToCopy = `${quoteTextElement.textContent} ${quoteAuthorElement.textContent}`;
        navigator.clipboard.writeText(textToCopy).then(() => {
            copyMessageElement.style.display = 'inline-block';
            setTimeout(() => {
                copyMessageElement.style.display = 'none';
            }, 2000); // Show message for 2 seconds
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            // Optionally, show an error message to the user
        });
    }

    newQuoteBtn.addEventListener('click', displayNewQuote);
    copyQuoteBtn.addEventListener('click', copyToClipboard);

    // Display initial quote
    displayNewQuote(); // Load a quote and set initial background on page load
}); 