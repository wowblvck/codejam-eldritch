import ancientsData from "../data/ancients";
import cardRandomizer from "./cards";
import { currentDifficult } from "./difficulties";

let currentAncient = 0;

export default function loadAncientsCards() {
    document.querySelector('.ancients').classList.add('active');
    document.querySelector('.ancients__hero').textContent = ancientsData[currentAncient].locale.toLocaleUpperCase();
}

document.querySelector('.controls__next').addEventListener('click', () => {
    currentAncient++;
    if(currentAncient > ancientsData.length - 1) {
        currentAncient = 0;
    }
    document.querySelector('.ancients__hero').textContent = ancientsData[currentAncient].locale.toUpperCase();
});

document.querySelector('.controls__prev').addEventListener('click', () => {
    currentAncient--;
    if(currentAncient < 0) {
        currentAncient = ancientsData.length - 1;
    }
    document.querySelector('.ancients__hero').textContent = ancientsData[currentAncient].locale.toUpperCase();
});

document.querySelector('.ancients__select').addEventListener('click', () => {
    localStorage.setItem("hero", ancientsData[currentAncient].locale.toLowerCase());
    cardRandomizer(currentAncient, currentDifficult);
});