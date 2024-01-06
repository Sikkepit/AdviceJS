const searchField = document.getElementById('query-input');
const adviceDiv = document.getElementById('advice');
const randomAdviceButton = document.getElementById('new-advice')


async function giveRandomAdvice() {
    let randomNumber = Math.floor(Math.random() * 223);
    const response = await fetch('https://api.adviceslip.com/advice/' + randomNumber);
    const data = await response.json();
    adviceDiv.innerHTML = data.slip['advice'];
}


giveRandomAdvice();
randomAdviceButton.addEventListener("click", giveRandomAdvice);

searchField.focus();
searchField.addEventListener("keypress", (event) => {
    if (event.key ==="Enter") {
        event.preventDefault();
        searchadvice();
      }
});

async function searchadvice() {
    let query = searchField.value;

    const response = await fetch(`https://api.adviceslip.com/advice/search/${query}`);
    const data = await response.json();
    const advices = data.slips;

    if(typeof advices !== 'undefined') {
    
    const advice = advices[Math.floor(Math.random() * advices.length)];
    adviceDiv.innerHTML = advice['advice'] 
    }

    else {
    adviceDiv.innerHTML = "I don't have advice on that";
    }
    
}



