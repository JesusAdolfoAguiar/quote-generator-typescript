import './App.css';
import React, { useState } from 'react';

const App = () => {


  const [quoteText, setQuoteText] = useState('Click the New Quote button to generate a random quote!')
  const [authorText, setAuthorText] = useState('');

  
  let jsonData = "";
  let apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
  
  const fetchtQuote = async(url) => {
    let response = await fetch(url);
    let data = await response.json()
    return data;
  }

  const showQuote = async () => {
    jsonData = await fetchtQuote(apiUrl);
    var randomNumber = Math.floor(Math.random() * (jsonData.length));
    console.log(randomNumber)

    if (jsonData[randomNumber].author === '') {
      setAuthorText('Unknown');
    } else {
      setAuthorText(jsonData[randomNumber].author);
    }

    if (jsonData[randomNumber].text.length > 120) {
        document.querySelector("#quote").classList.add('long-quote');
        setQuoteText(jsonData[randomNumber].text)
    } else {
        document.querySelector("#quote").classList.remove('long-quote');
        setQuoteText(jsonData[randomNumber].text)
    }
  }

  function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText} - ${authorText}`;
    window.open(twitterUrl, '_blank');
  }

  return (
    <>
      <div className="quote-container" id="quote-container">
          <div className="quote-text">
              <i className="fas fa-quote-left"></i>
              <span id="quote">{quoteText}</span>
          </div>

          <div className="quote-author">
              <span id="author">{authorText}</span>
          </div>
          
          <div className="button-container">
              <button onClick={tweetQuote} className="twitter-button" id="twitter" title="Tweet This!">
                  <i className="fab fa-twitter"></i>
              </button>
              <button id="new-quote" onClick={showQuote}>New Quote</button>
          </div>
      </div>
    </>
  );
}

export default App;
