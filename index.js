let apiQuotes = [];

let quoteText = document.getElementsByClassName("quoteText")[0];
let author = document.getElementsByClassName("author")[0];
let loader = document.getElementsByClassName("loader")[0];
let container = document.getElementsByClassName("container")[0];

//Loading
function loading() {
  loader.hidden = false;
  container.hidden = true;
}

function complete() {
  container.hidden = false;
  loader.hidden = true;
}
//Show new Quote
function newQuote() {
  loading();
  //Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  quoteText.textContent = quote.text;
  if (!quote.author) {
    author.textContent = "Unknown";
  } else {
    author.textContent = quote.author;
  }
  //Check Quote length to determine styling
  if (quote.text.length > 80) {
    quoteText.classList.add("longQuote");
  } else {
    quoteText.classList.remove("longQuote");
  }
  complete();
}

//get quotes from API
async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (err) {}
}

//Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${author.textContent}`;
  window.open(twitterUrl, "_blank");
}

//Event Listeners
//on load
getQuotes();
