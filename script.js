const searchField = document.getElementById('query-input');
const adviceDiv = document.getElementById('advice');
const randomAdviceButton = document.getElementById('new-advice');
const yodaButton = document.getElementById('yoda-button');
const wrapper = document.getElementById('wrapper');
let theForce = 0;

function useTheForce(onOrOff) {
    if(onOrOff==="on") {
        adviceDiv.classList.add('yoda-yellow');
        searchField.classList.add('yoda-search');
        wrapper.classList.add('yoda-wrapper');
        randomAdviceButton.classList.add('yoda-yellow-bg');
        yodaButton.style.visibility = "hidden";
        theForce = 1;
    }
    else if (onOrOff==="off") {
        adviceDiv.classList.remove('yoda-yellow');
        searchField.classList.remove('yoda-search');
        wrapper.classList.remove('yoda-wrapper');
        randomAdviceButton.classList.remove('yoda-yellow-bg');
        yodaButton.style.visibility = "initial";
        theForce = 0;
    }
}

async function giveRandomAdvice() {
    if(theForce===1) useTheForce("off");

    let randomNumber = Math.floor(Math.random() * 222 + 1);
    const response = await fetch('https://api.adviceslip.com/advice/' + randomNumber);
    const data = await response.json();

    if(typeof data.slip !== 'undefined') adviceDiv.innerHTML = data.slip['advice'];
    else adviceDiv.innerHTML = "Don't brush your teeth before drinking coffee.";

    searchField.value = "";
}

async function searchadvice() {
    if(theForce===1) useTheForce("off");

    let query = searchField.value;
    searchField.value = "";
    
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

async function yodafy() {
    let query = adviceDiv.innerHTML;

    const response = await fetch(`https://api.funtranslations.com/translate/yoda.json?text=${query}`);
    const data = await response.json();

    if(typeof data.contents !== 'undefined') {
    const advice = data.contents['translated'];
    adviceDiv.innerHTML = advice;
    }
    else {
        adviceDiv.innerHTML = "Too tired to give advice, I am....";
    }
    useTheForce("on");
    
}


randomAdviceButton.addEventListener("click", giveRandomAdvice);
yodaButton.addEventListener("click", yodafy);

searchField.focus();
searchField.addEventListener("keypress", (event) => {
    if (event.key ==="Enter") {
        event.preventDefault();
        searchadvice();
      }
});

giveRandomAdvice();



