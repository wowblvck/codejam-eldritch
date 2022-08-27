import { greenCards, brownCards, blueCards } from "../data/mythicCards/index";
import ancientsData from "../data/ancients";

//Sum of Column in Matrix
const sumCol = (arr, col) =>
  arr
    .map((row) => row[col])
    .reduce((a, b) => a + b);
//End sum of column in matrix

//Random Light Easy and Very Hard (LEVH) Level
function randomCardsLEVH(cards, sum, level = 0) {
    let stack = cards.filter(e => { return e.difficulty == (level == 0 ? "easy" : "hard") });
    if(stack.length < sum) {
        do stack.push(cards.filter(e => { return e.difficulty == "normal"; }).sort(() => Math.random() - 0.5));
        while (stack == sum);
    }
    return stack.flat().splice(0, sum).sort(() => Math.random() - 0.5);
}
//End random ligth easy and very hard (LEVH) level

//Random Easy and Hard (EH) level
function randomCardsEH(cards, sum, level = 1) {
    let stack = cards.filter(e => { return e.difficulty == (level == 1 ? "easy" : "hard") }).sort(() => Math.random() - 0.5);
    stack.push(cards.filter(e => { return e.difficulty == "normal"; }).sort(() => Math.random() - 0.5));
    return stack.flat().sort(() => Math.random() - 0.5).splice(0, sum);
}
//End random easy and hard (EH) level

//Random Normal Level
function randomCardsN(cards, sum) {
    let stack = cards.filter(e => { return e.difficulty == "easy" }).sort(() => Math.random() - 0.5);
    stack.push(cards.filter(e => { return e.difficulty == "normal"; }).sort(() => Math.random() - 0.5));
    stack.push(cards.filter(e => { return e.difficulty == "hard"; }).sort(() => Math.random() - 0.5));
    return stack.flat().sort(() => Math.random() - 0.5).splice(0, sum);
}
//End normal level

function setDeck(stack, limitCard) {
    let newStack = [];
    for(let i = 0; i <= newStack.length; i++) {
        if(newStack.length < limitCard) {
            newStack.push(stack.pop());
        }
    }
    return newStack;
    
}

export let deckFirstStage = [];
export let deckSecondStage = [];
export let deckThirdStage = [];

export default function cardRandomizer(currentHero, currentDifficult) {
    const cardsStages = [
        [ancientsData[currentHero].firstStage.greenCards, ancientsData[currentHero].firstStage.brownCards, ancientsData[currentHero].firstStage.blueCards],
        [ancientsData[currentHero].secondStage.greenCards, ancientsData[currentHero].secondStage.brownCards, ancientsData[currentHero].secondStage.blueCards],
        [ancientsData[currentHero].thirdStage.greenCards, ancientsData[currentHero].thirdStage.brownCards, ancientsData[currentHero].thirdStage.blueCards],
    ];

    let greenStack = [];
    let brownStack = [];
    let blueStack = [];

    const sumGreenStage = sumCol(cardsStages, 0);
    const sumBrownStage = sumCol(cardsStages, 1);
    const sumBlueStage = sumCol(cardsStages, 2);

    if(currentDifficult == 0) {
        greenStack = randomCardsLEVH(greenCards, sumGreenStage);
        brownStack = randomCardsLEVH(brownCards, sumBrownStage);
        blueStack = randomCardsLEVH(blueCards, sumBlueStage);
    } else if (currentDifficult == 1) {
        greenStack = randomCardsEH(greenCards, sumGreenStage);
        brownStack = randomCardsEH(brownCards, sumBrownStage);
        blueStack = randomCardsEH(blueCards, sumBlueStage);
    } else if (currentDifficult == 2) {
        greenStack = randomCardsN(greenCards, sumGreenStage);
        brownStack = randomCardsN(brownCards, sumBrownStage);
        blueStack = randomCardsN(blueCards, sumBlueStage);
    } else if (currentDifficult == 3) {
        greenStack = randomCardsEH(greenCards, sumGreenStage, 3);
        brownStack = randomCardsEH(brownCards, sumBrownStage, 3);
        blueStack = randomCardsEH(blueCards, sumBlueStage, 3);
    } else if (currentDifficult == 4) {
        greenStack = randomCardsLEVH(greenCards, sumGreenStage, 4);
        brownStack = randomCardsLEVH(brownCards, sumBrownStage, 4);
        blueStack = randomCardsLEVH(blueCards, sumBlueStage, 4);
    }
    deckFirstStage = [
        setDeck(greenStack, ancientsData[currentHero].firstStage.greenCards), 
        setDeck(brownStack, ancientsData[currentHero].firstStage.brownCards), 
        setDeck(blueStack, ancientsData[currentHero].firstStage.blueCards)
    ];
    deckSecondStage = [
        setDeck(greenStack, ancientsData[currentHero].secondStage.greenCards), 
        setDeck(brownStack, ancientsData[currentHero].secondStage.brownCards), 
        setDeck(blueStack, ancientsData[currentHero].secondStage.blueCards)
    ];
    deckThirdStage = [
        setDeck(greenStack, ancientsData[currentHero].thirdStage.greenCards), 
        setDeck(brownStack, ancientsData[currentHero].thirdStage.brownCards), 
        setDeck(blueStack, ancientsData[currentHero].thirdStage.blueCards)
    ];
}