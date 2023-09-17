const Actions = () => {
    const quoteContainer = document.getElementById('quote-container');
    const quoteText = document.getElementById('quote');
    const authorText = document.getElementById('author');
    const twitterBtn = document.getElementById('twitter');
    const newQuoteBtn = document.getElementById('new-quote');
    const loader = document.getElementById('loader');
    
    function showLoadingSpinner() {
        loader.hidden = false;
        quoteContainer.hidden = true;
    }
    
    function hideLoadingSpinner() {
        if (!loader.hidden) {
            quoteContainer.hidden = false;
            loader.hidden = true;
        }
    }
    
    // Get Quote From API
    async function getQuote() {
        showLoadingSpinner();
        const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            
            var randomNumber = Math.floor(Math.random() * (data.length));
    
            // If Author is blank, add 'Unknown'
            if (data[randomNumber].author === '') {
                authorText.innerText = 'Unknown';
            } else {
                authorText.innerText = data[randomNumber].author;
            }
            // Reduce font size for long quotes
            if (data[randomNumber].text.length > 120) {
                quoteText.classList.add('long-quote');
            } else {
                quoteText.classList.remove('long-quote');
            }
            quoteText.innerText = data[randomNumber].text;
            // Stop Loader, Show Quote
            hideLoadingSpinner();
        } catch (error) {
            console.log(error)
        }
    }
    
    function tweetQuote() {
        const quote = quoteText.innerText;
        const author = authorText.innerText;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
        window.open(twitterUrl, '_blank');
    }
    
    newQuoteBtn.addEventListener('click', getQuote);
    twitterBtn.addEventListener('click', tweetQuote);
    
    getQuote();
}

export default Actions;
