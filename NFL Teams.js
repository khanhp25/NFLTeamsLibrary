var url = "https://raw.githubusercontent.com/b-mcavoy/datasets/main/Sports/NFL%20Teams.csv"
function getColumn(url, columnNumber){
  var column = [];
  var table = [];
  var request = new XMLHttpRequest();  
  request.open("GET", url, false);   
  request.send(null);  
  var csvData = new Array();
  var jsonObject = request.responseText.split(/\r?\n|\r/);
  for (var i = 0; i < jsonObject.length; i++) {
    csvData.push(jsonObject[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/));
  }
  table = csvData;
  column = getCol(table, columnNumber);
  return column;
}

//returns the specified column from a 2D Array
function getCol(matrix, col){
       var column = [];
       for(var i=1; i<matrix.length-1; i++){
          column.push(matrix[i][col]);
       }
       return column;
    }


var divisions = getColumn(url, 2);
var teams = getColumn(url, 3);
var conferences = getColumn(url, 1);
var city = getColumn(url, 4);
var stadium = getColumn(url, 5);
var capacity = getColumn(url, 6);
var headCoach = getColumn(url, 7);
//Heach coaches in each division


//Finding the head coaches in each team
//teams- a list contained with all the football team
//coach - a new list created by me for putting the result
//The function will return the list coach for the result
function findCoach(team){
  var coach = [];
  for (var i in teams){
    if(teams[i].toLowerCase().includes(team.toLowerCase())){
      coach.push(headCoach[i])
    }
  }
  if(coach.length == 0){
    return "Fake team you just put in" 
  }
  return coach;
}

console.log(findCoach("Miami Dolphins"));


//finding the stadium from the division he put in. 
//matches - list self created, will contain the matched stadium
//divisons - a list contained with divisions 
//will return matches of the matche stadium of each division
//conferences - a list containing all the conferences
//stadiums - a list contained with all the stdiums  
function getStadiumsInDivision(division){
  var matches = [];
  for (var i in divisions){
      if((conferences[i].toLowerCase() + " " + divisions[i].toLowerCase()).includes( division.toLowerCase())){
      matches.push(stadium[i]);
    }
  }
  if (matches.length == 0){
    matches.push("NO NHL teams are in the division" + " " + division);
  }
  return matches;
}
console.log(getStadiumsInDivision("NFC East"));


//Biggest arena in each division
// max - biggest value it can go
// maxIndex - make the index start a 0
// divisions - a list contained with all the divions. 
// capacity - a list with all the capacity of each stadium 
//conferences - a list containing all the conferences
//returns the highest capacity of the stadiums

function findMaxCapactiy(division){
  max = 10000000;
  maxIndex = 0;
  for(var i in divisions){
    if(conferences[i].toLowerCase() + " " + divisions[i].toLowerCase() == division.toLowerCase() && parseFloat(capacity[i]) < max){
      max = parseFloat(capacity[i])
    maxIndex = i
    }
  }
  if(stadium[maxIndex] == 0){
    return "False division"
  }
  return stadium[maxIndex];
}

console.log(findMaxCapactiy("East"));


//Putting in the division and conference and get the averageCapacity of the stadium in the stadium 
//sum - is a parameter = 0, for being the total capacity of the stadiums
//stadiums - a list contained with all the stdiums  
//divisons - a list contained with divisions 
//conferences - a list containing all the conferences
//returns the sum of the stadium and divide by how many stadium are there


function averageCapacity(division){
  var sum = 0;
  var stadiums = []
  for (var i in capacity){
    if(conferences[i].toLowerCase() + " " + divisions[i].toLowerCase() == division.toLowerCase()){
      sum +=(parseFloat(capacity[i].substring(1, capacity[i].length - 1)));
      stadiums.push(stadium[i]);
    }
  }
  if (stadiums.length == 0){
    return "False division";
  }
  return sum / stadiums.length
}

console.log(averageCapacity("AFC North"));

//How many teams are there in each division
//divisons - a list contained with divisions 
//conferences - a list containing all the conferences
//returns the count list which is the amount teams in each divsion
//count is a list created for storing the result of the function

function getAppear(division){
  var count = [];
  for (var i =  0; i < divisions.length; i++){
    if(division.toLowerCase() ==conferences[i].toLowerCase() + " " + divisions[i].toLowerCase()){
       count.push(teams[i])
    }
  }
  if(count.length == 0){
    return "False division";
  }
  return count.length
}

console.log(getAppear("AFC North"));





