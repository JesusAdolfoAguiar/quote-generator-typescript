import './App.css';
import React, { useState, useEffect } from 'react';

const App = () => {

  const [quoteContainer, setQuoteContainer] = useState();
  const [quoteText, setQuoteText] = useState('Hello')
  const [authorText, setAuthorText] = useState('Hello');
  const [twitterBtn, setTwitterBtn] = useState();
  const [newQuoteBtn, setNewQuoteBtn] = useState();
  
  const [isVisible, setIsVisible] = useState(true);

  const handleVisible = () => {
    setIsVisible(false);
  }
  
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

  return (
    <>
      <div style={{ display: isVisible ? "block" : "none" }} className="quote-container" id="quote-container">
          <div className="quote-text">
              <i className="fas fa-quote-left"></i>
              <span id="quote">{quoteText}</span>
          </div>

          <div className="quote-author">
              <span id="author">{authorText}</span>
          </div>
          
          <div className="button-container">
              <button className="twitter-button" id="twitter" title="Tweet This!">
                  <i className="fab fa-twitter"></i>
              </button>
              <button id="new-quote" onClick={showQuote}>New Quote</button>
          </div>
      </div>
      <div style={{ display: isVisible ? "block" : "none" }} className="loader" id="loader"></div>
    </>
  );
}

export default App;
