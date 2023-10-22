
import React, { useState, useEffect } from 'react';
import './App.css';

const Quote = () => {
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getQuote();
    }, []);

    const showLoadingSpinner = () => {
        setLoading(true);
    };

    const hideLoadingSpinner = () => {
        setLoading(false);
    };

    let isLongQuote;

    const getQuote = async () => {
        showLoadingSpinner();
        const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
        
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
          
            const randomNumber = Math.floor(Math.random() * data.length);
            const  quoteAuthor = data[randomNumber].author;
            const  quoteText = data[randomNumber].text;

            setAuthor(quoteAuthor || 'Unknown');
            setQuote(quoteText);

            isLongQuote = quoteText.length > 120;

            hideLoadingSpinner();
        } catch (error) {
            console.log(error);
        }
    };

    const tweetQuote = () => {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
        window.open(twitterUrl, '_blank');
    };

    return (
        <div className="quote-container" id="quote-container">
            {loading ? (
                <div className="loader" id="loader"></div>
            ) : (
                <>
                    <div className={`quote-text ${isLongQuote ? 'long-quote' : ''}`}>
                        <i className="fas fa-quote-left"></i>
                        <span id="quote">{quote}</span>
                    </div>
                    <div className="quote-author">
                        <span id="author">{author}</span>
                    </div>
                    <div className="button-container">
                        <button className="twitter-button" id="twitter" onClick={tweetQuote} title="Tweet This!">
                            <i className="fab fa-twitter"></i>
                        </button>
                        <button id="new-quote" onClick={getQuote}>New Quote</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Quote;