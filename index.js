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

// function getYears() {
//     return getFinals(fifaData).map(i => i.Year);
// }

function getYears(callback) {
    return callback(fifaData).map(i => i.Year);
}

// console.log(getYears(getFinals));

/* Task 4: Implement a higher-order function called `getWinners`, that accepts the callback function `getFinals()` and determine the winner (home or away) of each `finals` game. Return the name of all winning countries in an array called `winners` */


function getWinners() {
    return getFinals(fifaData).map(i => {
        if (i['Home Team Goals'] < i['Away Team Goals']) {
            return i['Away Team Name'];
        } else if (i['Home Team Goals'] > i['Away Team Goals']) {
            return i['Home Team Name'];
        } else {
            return (i['Win conditions'].toLowerCase().includes(i['Home Team Name']) ? i['Home Team Name'] : i['Away Team Name']);
        }
    })
}

console.log(getWinners());

// function getWinners(callback) {
//     return callback(fifaData).map(item => {
//         if (item['Win conditions'].toLowerCase().includes(item['Home Team Name'].toLowerCase())) {
//             return item['Home Team Name'];
//         } else {
//             return item['Away Team Name'];
//         }
//     })
// }

// console.log(getWinners(getFinals));

/* Task 5: Implement a higher-order function called `getWinnersByYear` that accepts the following parameters and returns a set of strings "In {year}, {country} won the world cup!" 

Parameters: 
 * callback function getWinners
 * callback function getYears
 */

// function getWinnersByYear(callback1, callback2) {
//     const winners = callback1();
//     const years = callback2();
//     return winners.map((w, i) => {
//         return `In ${years[i]}, ${w} won the World Cup!`;
//     })
// };

// console.log(getWinnersByYear(getWinners, getYears));

function getWinnersByYear(callbA, callbB) {
    const winners = callbA(getFinals);
    const years = callbB(getFinals);
    const byYear = new Set();
    for (let i = 0; i < winners.length; i++) {
        byYear.add(`In ${years[i]}, ${winners[i]} won the World Cup!`);
    }
    return byYear;
}

console.log(getWinnersByYear(getWinners, getYears));
console.log(getFinals(fifaData));
/* Task 6: Write a function called `getAverageGoals` that accepts a parameter `data` and returns the the average number of home team goals and away team goals scored per match (Hint: use .reduce and do this in 2 steps) */

// function getAverageGoals(data) {
//     const home = [];
//     const away = [];
//     for (let i = 0; i < data.length; i++) {
//         home.push(data[i]['Home Team Goals']);
//     }
//     for (let i = 0; i < data.length; i++) {
//         away.push(data[i]['Away Team Goals']);
//     }
//     const hAvg = home.reduce((acc, g) => acc + g, 0) / home.length;
//     const aAvg = away.reduce((acc, g) => acc + g, 0) / away.length;
//     return { "Home": hAvg, "Away": aAvg };
// };

// console.log(getAverageGoals(getFinals(fifaData)));

function getAverageGoals(data) {
    return {
        'home': data.reduce(function(acc, i) {
            return acc + i['Home Team Goals'];
        }, 0) / data.length,
        'away': data.reduce(function(acc, i) {
            return acc + i['Away Team Goals'];
        }, 0) / data.length
    }
}

// console.log(getAverageGoals(fifaData));

/// STRETCH 🥅 //

/* Stretch 1: Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */
/*
    getCountryWins takes params data and initials
    get winners
    get count of winners
    get countries and country codes and create object with it
    get count that corresponds to country code
    returns count of wc wins for country
*/

// function getCountryWins(data, teamInitials) {
//     const winners = getWinners();
//     const finals = getFinals(data);
//     let count = 0;
//     const inits = {};
//     finals.forEach(final => {
//         if (!inits[final['Home Team Name']]) {
//             inits[final['Home Team Name']] = final['Home Team Initials']
//         }

//         if (!inits[final['Away Team Name']]) {
//             inits[final['Away Team Name']] = final['Away Team Initials']
//         }
//     })
//     let team = Object.keys(inits).filter(function(key) { return inits[key] === teamInitials })[0]
//     for (let i = 0; i < winners.length; i++) {
//         if (winners[i] === team) {
//             count++;
//         }
//     }
//     return count;
// }

// function getCountryWins(data, teamInitials) {
//     const initials = {};
//     for (let i = 0; i < data.length; i++) {
//         if (data[i]['Home Team Name'] in initials) {
//             continue;
//         } else {
//             // initials[data[i]['Home Team Name']] = data[i]['Home Team Initials'];
//             initials[data[i]['Home Team Initials']] = data[i]['Home Team Name'];
//         }
//     }
//     return getWinners().reduce(function(acc, i) {
//         if (i === initials[teamInitials]) {
//             acc = acc + 1;
//         }
//         return acc;
//     }, 0);
// };

// console.log(getCountryWins(fifaData, 'ITA'));
// getCountryWins(fifaData, 'ITA');

function getCountryWins(data, initials) {
    const finals = getFinals(data);
    const inits = {};
    finals.forEach(function(final) {
        inits[final['Home Team Initials']] = final['Home Team Name'];
        inits[final['Away Team Initials']] = final['Away Team Name'];
    });
    return finals.map(function(item) {
        if (item['Home Team Goals'] < item['Away Team Goals']) {
            return item['Away Team Initials'];
        } else if (item['Home Team Goals'] > item['Away Team Goals']) {
            return item['Home Team Initials'];
        } else {
            return null;
        }
    }).filter(function(item) {
        return item === initials;
    }).length;
}

// console.log(getCountryWins(fifaData, 'ITA'));
// console.log(getFinals(fifaData).map(function(item) {
//     return [item['Home Team Name'], item['Away Team Name']];
// }))

/* Stretch 3: Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */
/*  
    function getGoals takes params data
    get finals
    get home team, away team, home goals and away goals of each game
    create object with each team: goals and total appearances
    compare each object value and
    returns team with most goals allowed per apearance
*/

// function goalsAndApps(data) {
//     const finals = getFinals(data);
//     const tot = {};
//     finals.forEach(item => {
//         if (item['Home Team Name'] in tot) {
//             tot[item['Home Team Name']] = { 'goals': tot[item['Home Team Name']].goals + item['Home Team Goals'], 'app': tot[item['Home Team Name']].app + 1 };
//         } else {
//             tot[item['Home Team Name']] = { 'goals': item['Home Team Goals'], 'app': 1 };
//         }
//     })
//     finals.forEach(item => {
//         if (item['Away Team Name'] in tot) {
//             tot[item['Away Team Name']] = { 'goals': tot[item['Away Team Name']].goals + item['Away Team Goals'], 'app': tot[item['Away Team Name']].app + 1 };
//         } else {
//             tot[item['Away Team Name']] = { 'goals': item['Away Team Goals'], 'app': 1 };
//         }
//     })

//     return tot;
// }

// function getGoals2(data) {
//     const goalsApps = goalsAndApps(data);
//     const gpa = Object.keys(goalsApps).map(item => {
//         return goalsApps[item].goals / goalsApps[item].app
//     });
//     return gpa;
// }

function getGoals2(data, initials) {
    const finals = getFinals(data);

    function getCount(homeOrAway) {
        const count = [];
        finals.forEach(item => {
            const sides = `${homeOrAway} Team Name`;
            const amt = `${homeOrAway} Team Goals`;
            for (let i = 0; i < item[amt]; i++) {
                count.push(item[sides])
            }
        });
        return count;
    }
    const goalsH = getCount('Home');
    const goalsA = getCount('Away');
    const goalsCount = goalsH.concat(goalsA);
    const appsCount = []

    finals.forEach(item => {
        appsCount.push(item['Home Team Name']);
        appsCount.push(item['Away Team Name']);
    });

    function retCount(arr) {
        const obj = {};
        for (var i = 0; i < arr.length; i++) {
            var num = arr[i];
            obj[num] = obj[num] ? obj[num] + 1 : 1;
        }
        return obj;
    }
    const goals = retCount(goalsCount);
    const apps = retCount(appsCount);
    const avgs = [];
    for (let i = 0; i < Object.keys(goals).length; i++) {
        avgs.push([Object.keys(goals)[i], (Object.values(goals)[i] / Object.values(apps)[i]]));
    }
    const all = [];
    for (let i = 0; i < avgs.length; i++) {
        all.push(avgs[i][1]);
    }
    // avgs.forEach(item => {
    //     k
    //     // if (item[1] > most[1]) {
    //     //     most.splice(0, 2);
    //     //     most.push(item[0]);
    //     //     most.push(item[1]);
    //     // } else {
    //     //     most.push(item[0]);
    //     //     most.push(item[1]);
    //     // }

    // })
    for (let i = 0; i < avgs.length; i++) {
        if (avgs[i][1] === 7) {
            // return avgs[i][0];
            // return avgs;
        }
    }
    // return Math.max(...all);
    return [goals, apps]
}

console.log(getGoals2(fifaData));

function getGoals(data, callback) {
    const goals = {};
    const avgGoals = {};
    const finals = callback(data);
    for (let i = 0; i < finals.length; i++) {
        const homeTeam = finals[i]['Home Team Name']
        const awayTeam = finals[i]['Away Team Name']
        const homeGoals = finals[i]['Home Team Goals']
        const awayGoals = finals[i]['Away Team Goals']

        if (!goals[homeTeam]) {
            goals[homeTeam] = { 'goals': homeGoals, 'appearances': 1 }
        } else {
            goals[homeTeam].goals += homeGoals
            goals[homeTeam].appearances++
        }

        if (!goals[awayTeam]) {
            goals[awayTeam] = { 'goals': awayGoals, 'appearances': 1 }
        } else {
            goals[awayTeam].goals += awayGoals
            goals[awayTeam].appearances++
        }
    }

    Object.keys(goals).forEach(team => {
        avgGoals[team] = goals[team].goals / goals[team].appearances;
    })
    return goals;
    // return Object.keys(avgGoals).reduce((most, next) => goals[most] > goals[next] ? most : next);
};

// getGoals(fifaData, getFinals);
// console.log(getGoals(fifaData, getFinals));
// console.log(getFinals(fifaData));

/* Stretch 4: Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */
/*  
    function badDefense takes params data
    get finals
    get teams and score of each game
    create object with each team and goals allowed and total appearances
    compare each object value and
    returns team with most goals allowed per apearance
*/

function badDefense(data) {
    const finals = getFinals(data);
    const goalsPerTeam = {};
    const avgGoals = {};
    finals.forEach(final => {
        const homeName = final['Home Team Name'];
        const awayName = final['Away Team Name'];
        const homeGoals = final['Home Team Goals'];
        const awayGoals = final['Away Team Goals'];
        if (!goalsPerTeam[homeName]) {
            goalsPerTeam[homeName] = { 'totalGoals': awayGoals, 'appearances': 1 }
        } else {
            goalsPerTeam[homeName].totalGoals += awayGoals
            goalsPerTeam[homeName].appearances++;
        }

        if (!goalsPerTeam[awayName]) {
            goalsPerTeam[awayName] = { 'totalGoals': homeGoals, 'appearances': 1 }
        } else {
            goalsPerTeam[awayName].totalGoals += homeGoals
            goalsPerTeam[awayName].appearances++;
        }
    })
    Object.keys(goalsPerTeam).forEach(team => {
        avgGoals[team] = goalsPerTeam[team].totalGoals / goalsPerTeam[team].appearances
    })

    return Object.keys(goals).reduce((most, next) => goals[most] > goals[next] ? most : next);
};

// badDefense(fifaData);
// console.log(badDefense(fifaData));
/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */