import difficulties from "../data/difficulties";
import loadAncientsCards from "./ancients";
import { tns } from "tiny-slider";
import ancientsData from "../data/ancients";

export let currentDifficult = 0;

window.addEventListener('DOMContentLoaded', () => {

    const startBtn = document.querySelector('#btn-start');
    const closeBtn = document.querySelectorAll('#btn-close');
    const selectorBg = document.querySelector('.selector__bg');
    const selectorWrapper = document.querySelector('.selector__wrapper');

    //Load default difficulties
    function loadDifficultiesFromFile() {
        if(difficulties.length > 0) {
            difficulties.forEach((el, i) => {
                const btnDiff = document.createElement('button');
                btnDiff.classList.add('btn');
                btnDiff.setAttribute('id', el.id);
                btnDiff.textContent = el.name;
                selectorWrapper.appendChild(btnDiff);
                btnDiff.addEventListener('click', (e) => selectDifficulties(e, i));
            });
        }
    }
    //End load default difficulties
    
    //Load ancients
    function loadAncientsFromFile() {
        const sliderContainer = document.querySelector('.slider__container');
        ancientsData.forEach(el => {
            const li = document.createElement('li');
            li.classList.add('slider__item');
            const img = document.createElement('img');
            img.src = el.cardFace;
            li.appendChild(img);
            sliderContainer.appendChild(li);
        });
        const slider = tns({
            container: '.slider__container',
            items: 1,
            slideBy: 'page',
            loop: true,
            autoplay: false,
            center: true,
            controls: true,
            nav: false,
            speed: 500,
            controlsContainer: ".slider__controls",
        });
    }
    //End load ancients

    loadDifficultiesFromFile();
    loadAncientsFromFile();

    //Events for open and close selector
    startBtn.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.start').style.display = 'none';
        selectorBg.classList.add('active');
        selectorWrapper.classList.add('active');
        closeBtn.forEach(btn => {
            btn.addEventListener('click', closeWindows);
        });

    });

    document.addEventListener('click', function(e) {
        if(selectorBg == e.target) {
            document.querySelector('.start').style.display = 'flex';
            selectorBg.classList.remove('active');
            selectorWrapper.classList.remove('active');
            document.querySelector('.ancients').classList.remove('active');
        }
    }, true);
    //End events for open and close selector

    //Select Difficulties
    function selectDifficulties(event, iterable) {
        if(event.target.id == difficulties[iterable].id) {
            currentDifficult = iterable;
        }
        selectorWrapper.classList.remove('active');
        loadAncientsCards();
    }
    //End select difficulties

    //Close All Wrappers
    function closeWindows() {
        document.querySelector('.start').style.display = 'flex';
        document.querySelector('.selector__bg').classList.remove('active');
        document.querySelector('.selector__wrapper').classList.remove('active');
        document.querySelector('.ancients').classList.remove('active');
    }
    //End close all wrappers
});