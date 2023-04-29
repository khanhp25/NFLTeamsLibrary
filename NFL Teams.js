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

console.log(capacity);

/*
Takes an NFL team as a parameter and uses it to print out the head coach of the entered team
@param team(string) - the user's desired NFL team
@return coach(string) - returns the coach of the entered NFL team
*/
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

/*
Uses an NFL division as a parameter and returns all of the stadiums in the entered division
@param division(string) - the user's desired NFL division
@return matches(list) - returns a list of all of the stadiums in the entered division
*/
function getStadiumsInDivision(division){
  var matches = [];
  for (var i in divisions){
      if((conferences[i].toLowerCase() + " " + divisions[i].toLowerCase()).includes( division.toLowerCase())){
      matches.push(stadium[i]);
    }
  }
  if (matches.length == 0){
    matches.push("NO NFL stadiums are in the division" + " " + division);
  }
  return matches;
}



/*
Uses an NFL division as a parameter and returns the stadium in the division with the lowest capacity
@param division(string) - the user's desired NFL division
@return stadium[maxIndex](string) - returns the stadium with the largest capacity in the entered division
*/

function findLowestCapactiy(division){
  max = 82500;
  minIndex = 0;
  for(var i in divisions){
    if((conferences[i].toLowerCase() + " " + divisions[i].toLowerCase()).includes(division.toLowerCase()) && parseFloat(capacity[i]) < max){
      max = parseFloat(capacity[i])
    minIndex = i
    }
  }
  if(minIndex == 0){
    return "False division"
  }
  return stadium[minIndex];
}




/*
Uses an NFL division as a parameter and returns the average capacity of the stadiums in the divison
@param division(string) - the user's desired NFL division
@return sum/stadiums.length(number) - returns the average stadium capacity of the entered division
*/


function getAverageCapacity(division){
  var sum = 0;
  var stadiums = []
  for (var i in capacity){
    if((conferences[i].toLowerCase() + " " + divisions[i].toLowerCase()).includes(division.toLowerCase())){
      sum +=(parseFloat(capacity[i]));
      stadiums.push(stadium[i]);
    }
  }
  
  if (stadiums.length == 0){
    return "False division";
  }
  return sum / stadiums.length
}



/*
Uses an NFL division as a parameter and returns the number of teams in the entered division
@param division(string) - the user's desired NFL division
@return count.length(number) - returns the total number of teams in the entered NFL division
*/
function getTotalStadiums(division){
  var count = [];
  for (var i =  0; i < divisions.length; i++){
    if((conferences[i].toLowerCase() + " " + divisions[i].toLowerCase()).includes(division.toLowerCase())){
       count.push(teams[i])
    }
  }
  if(count.length == 0){
    return "False division";
  }
  return count.length
}

