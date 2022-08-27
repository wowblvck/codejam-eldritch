import { deckFirstStage, deckSecondStage, deckThirdStage } from "./cards";

let leftCardCounter;
let totalCards = 0;
let firstInit = 0;
let active = 1;

export default function loadDeck() {
    document.querySelector('.ancients').classList.remove('active');
    document.querySelector('.selector__bg').classList.remove('active');
    document.querySelector('.deck').classList.add('active');

    showGameInfo();
    showTracker();

    document.querySelector('.card__mythical').addEventListener('click', nextCard);
    document.querySelector('.again').classList.add('active');
}

function showGameInfo() {
    document.getElementsByTagName('footer')[0].classList.add('active');
    totalCards = deckFirstStage.flat().length + deckSecondStage.flat().length + deckThirdStage.flat().length;
    leftCardCounter = totalCards;
    document.querySelector('.info__hero').textContent = `Древний: ${localStorage.getItem("hero")}`;
    document.querySelector('.info__difficult').textContent = `Сложность: ${localStorage.getItem("difficult")}`;
    document.querySelector('.info__total').textContent = `Всего карт: ${totalCards}`;
    document.querySelector('.info__left').textContent = `Осталось карт: ${leftCardCounter}`;
}

function nextCard() {
    if(firstInit != 1) {
        const newCard = document.querySelector('.card__empty');
        const img = document.createElement('img');
        img.classList.add('card__deck');
        img.src = deckFirstStage[0].cardFace;
        newCard.appendChild(img);
        deckFirstStage.shift();
        showTracker();
        active = 1;
        firstInit = 1;
    } else {
        const img = document.querySelector('.card__deck');
        if(deckFirstStage.length == 0 && active == 1) {
            img.src = deckSecondStage[0].cardFace;
            active = 2;
        } else if(active == 1) {
            img.src = deckFirstStage[0].cardFace;
            deckFirstStage.shift();
            showTracker();
        }
        if(deckSecondStage.length == 0 && active == 2) {
            img.src = deckThirdStage[0].cardFace;
            active = 3;
        } else if(active == 2) {
            img.src = deckSecondStage[0].cardFace;
            deckSecondStage.shift();
            showTracker();
        }
        if(deckThirdStage.length == 0) {
            document.querySelector('.card__mythical').style.opacity = "0";
            return
        }
        else if (active == 3) {
            img.src = deckThirdStage[0].cardFace;
            deckThirdStage.shift();
            showTracker();
        }
    }
    leftCardCounter--;
    document.querySelector('.info__left').textContent = `Осталось карт: ${leftCardCounter}`;
};

function showTracker() {
    updateTracker(1, "firstStage", "green");
    updateTracker(1, "firstStage", "brown");
    updateTracker(1, "firstStage", "blue");
    updateTracker(2, "secondStage", "green");
    updateTracker(2, "secondStage", "brown");
    updateTracker(2, "secondStage", "blue");
    updateTracker(3, "thirdStage", "green");
    updateTracker(3, "thirdStage", "brown");
    updateTracker(3, "thirdStage", "blue");
};

const updateTracker = (stage, stagename, color) => {
    const stageSelector = document.querySelector(`.${stagename}__${color}`);
    stageSelector.style.backgroundColor = `${color}`;
    let values;
    if(stage == 1) {
        values = deckFirstStage.filter(item => item.color.includes(`${color}`)).length;
    } if(stage == 2) {
        values = deckSecondStage.filter(item => item.color.includes(`${color}`)).length;
    } if(stage == 3) {
        values = deckThirdStage.filter(item => item.color.includes(`${color}`)).length;
    }
    return stageSelector.textContent = values;
};