import { fifaData } from './fifa.js';
// console.log(fifaData);

// console.log('its working');
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

// getFinals(fifaData);

/* Task 3: Implement a higher-order function called `getYears` that accepts the callback function `getFinals`, and returns an array called `years` containing all of the years in the dataset */

function getYears() {
    return getFinals(fifaData).map(i => i.Year);
}

// console.log(getYears());

/* Task 4: Implement a higher-order function called `getWinners`, that accepts the callback function `getFinals()` and determine the winner (home or away) of each `finals` game. Return the name of all winning countries in an array called `winners` */


function getWinners() {
    return getFinals(fifaData).map(i => {
        if (i['Home Team Goals'] < i['Away Team Goals']) {
            return i['Away Team Name'];
        } else if (i['Home Team Goals'] > i['Away Team Goals']) {
            return i['Home Team Name'];
        } else {
            return null;
        }
    })
}

// console.log(getWinners());

/* Task 5: Implement a higher-order function called `getWinnersByYear` that accepts the following parameters and returns a set of strings "In {year}, {country} won the world cup!" 

Parameters: 
 * callback function getWinners
 * callback function getYears
 */

function getWinnersByYear(callback1, callback2) {
    const winners = callback1();
    const years = callback2();
    return winners.map((w, i) => {
        return `In ${years[i]}, ${w} won the World Cup!`;
    })
};

// console.log(getWinnersByYear(getWinners, getYears));

/* Task 6: Write a function called `getAverageGoals` that accepts a parameter `data` and returns the the average number of home team goals and away team goals scored per match (Hint: use .reduce and do this in 2 steps) */

function getAverageGoals(data) {
    const home = [];
    const away = [];
    for (let i = 0; i < data.length; i++) {
        home.push(data[i]['Home Team Goals']);
    }
    for (let i = 0; i < data.length; i++) {
        away.push(data[i]['Away Team Goals']);
    }
    const hAvg = home.reduce((acc, g) => acc + g, 0) / home.length;
    const aAvg = away.reduce((acc, g) => acc + g, 0) / away.length;
    return { "Home": hAvg, "Away": aAvg };
};

// console.log(getAverageGoals(getFinals(fifaData)));

/// STRETCH 🥅 //

/* Stretch 1: Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, teamInitials) {
    const initials = {};
    for (let i = 0; i < data.length; i++) {
        if (data[i]['Home Team Name'] in initials) {
            continue;
        } else {
            // initials[data[i]['Home Team Name']] = data[i]['Home Team Initials'];
            initials[data[i]['Home Team Initials']] = data[i]['Home Team Name'];
        }
    }
    return getWinners().reduce(function(acc, i) {
        if (i === initials[teamInitials]) {
            acc = acc + 1;
        }
        return acc;
    }, 0);
};

// console.log(getCountryWins(fifaData, 'ITA'));
// getCountryWins(fifaData, 'ITA');


/* Stretch 3: Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */
/*  function takes params data
    get all finals
    get amount of goals scored in all wc final appearance for each team and calculate average
    compare each teams average and return highest
    returns most average goals per wc final appearance
*/

function getGoals(data, callback) {
    const goals = {};
    const finals = callback(data);
    for (let i = 0; i < finals.length; i++) {
        if (finals[i]['Home Team Goals'] in goals) {
            continue;
        } else {
            goals[finals[i]['Home Team Name']] = finals[i]['Home Team Goals'];
        }
        if (finals[i]['Away Team Goals'] in goals) {
            continue;
        } else {
            goals[finals[i]['Away Team Name']] = finals[i]['Away Team Goals'];
        }
    }
    return Object.keys(goals).reduce((most, next) => goals[most] > goals[next] ? most : next);
};

// console.log(getGoals(fifaData, getFinals));
// console.log(getFinals(fifaData));

/* Stretch 4: Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense( /* code here */ ) {

    /* code here */

};

badDefense();

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */