import { fifaData } from './fifa.js';
console.log(fifaData);

console.log('its working');
// ⚽️ M  V P ⚽️ //

/* Task 1: Investigate the data above. Practice accessing data by console.log-ing the following pieces of data 

(a) Home Team name for 2014 world cup final
(b) Away Team name for 2014 world cup final
(c) Home Team goals for 2014 world cup final
(d) Away Team goals for 2014 world cup final
(e) Winner of 2014 world cup final */
const twentyFourteen = fifaData.filter(t => t.Year === 2014).filter(t => t.Stage === 'Final');
// console.log(twentyFourteen);
// console.log(twentyFourteen[0]['Home Team Name']);
// console.log(twentyFourteen[0]['Away Team Name']);
// console.log(twentyFourteen[0]['Home Team Goals']);
// console.log(twentyFourteen[0]['Away Team Goals']);
// console.log(twentyFourteen[0]['Win conditions']);

/* Task 2: Create a function called  getFinals that takes `data` as an argument and returns an array of objects with only finals data */

function getFinals(data) {
    return data.filter(d => d.Stage === 'Final');
};

getFinals(fifaData);

/* Task 3: Implement a higher-order function called `getYears` that accepts the callback function `getFinals`, and returns an array called `years` containing all of the years in the dataset */

// function getYears(callback) {
//     const years = [];
//     for (let i = 0; i < callback.length; i++) {
//         years.push(callback[i]['Year']);
//     }
//     return years
// };

// console.log(getYears(getFinals(fifaData)));
// console.log(getYears(getFinals(fifaData)).length);


function getYears(data, callback) {
    return [...callback(data).map(i => {
        return i.Year;
    })];
}

// console.log(getYears(fifaData, getFinals));
// getYears(fifaData, getFinals);

/* Task 4: Implement a higher-order function called `getWinners`, that accepts the callback function `getFinals()` and determine the winner (home or away) of each `finals` game. Return the name of all winning countries in an array called `winners` */

// function getWinners(callback) {
//     const winners = [];
//     for (let i = 0; i < callback.length; i++) {
//         if (callback[i]['Home Team Goals'] < callback[i]['Away Team Goals']) {
//             winners.push(callback[i]['Away Team Name'])
//         } else if (callback[i]['Home Team Goals'] > callback[i]['Away Team Goals']) {
//             winners.push(callback[i]['Home Team Name'])
//         } else {
//             winners.push(null);
//         }
//     }
//     return winners;
// };

function getWinners(data, callback) {
    return [...callback(data).map(i => {
        if (i['Home Team Goals'] < i['Away Team Goals']) {
            return i['Away Team Name'];
        } else if (i['Home Team Goals'] > i['Away Team Goals']) {
            return i['Home Team Name'];
        } else {
            return null;
        }
    })]
}

// console.log(getWinners(fifaData, getFinals));

// console.log(getWinners(getFinals(fifaData)));
// console.log(getWinners(getFinals(fifaData)).length);

/* Task 5: Implement a higher-order function called `getWinnersByYear` that accepts the following parameters and returns a set of strings "In {year}, {country} won the world cup!" 

Parameters: 
 * callback function getWinners
 * callback function getYears
 */

function getWinnersByYear(data, callback1, callback2) {
    // const winByYear = new Set();
    const win = [];
    const y = [];
    for (let i = 0; i < callback1.length; i++) {
        win.push(callback1(data)[i]);
    }
    for (let i = 0; i < callback2.length; i++) {
        y.push(callback2(data)[i]);
    }
    return [...win + y]
};

// getWinnersByYear(getWinners(fifaData), getYears(fifaData));
console.log(getWinnersByYear(fifaData, getWinners, getYears));

/* Task 6: Write a function called `getAverageGoals` that accepts a parameter `data` and returns the the average number of home team goals and away team goals scored per match (Hint: use .reduce and do this in 2 steps) */

function getAverageGoals( /* code here */ ) {

    /* code here */

};

getAverageGoals();

/// STRETCH 🥅 //

/* Stretch 1: Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins( /* code here */ ) {

    /* code here */

};

getCountryWins();


/* Stretch 3: Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals( /* code here */ ) {

    /* code here */

};

getGoals();


/* Stretch 4: Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense( /* code here */ ) {

    /* code here */

};

badDefense();

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */