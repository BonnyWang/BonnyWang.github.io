import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import { getDatabase, ref, onValue, orderByChild, query } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

const firebaseConfig = {
apiKey: "AIzaSyCXdMp5vBVl_chtOAl2bMRDUpav4nf4xUE",
authDomain: "moonsters-54393.firebaseapp.com",
databaseURL: "https://moonsters-54393-default-rtdb.firebaseio.com",
projectId: "moonsters-54393",
storageBucket: "moonsters-54393.appspot.com",
messagingSenderId: "557353828331",
appId: "1:557353828331:web:1cff264c162fa01db723ae",
measurementId: "G-FYH1DTN2BN"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const database = getDatabase(app);


const reference =  query(ref(database, 'LeaderBoard'),  orderByChild('score'));


let childs = [];

const board = document.getElementById("Board");

function insertPaddingRow(rowNumber){
  var paddingRow = board.insertRow(rowNumber);
  var paddingCell1 = paddingRow.insertCell(0);
  var paddingCell2 = paddingRow.insertCell(1);
  var paddingCell3 = paddingRow.insertCell(2);
  var paddingCell4 = paddingRow.insertCell(3);
  var paddingCell5 = paddingRow.insertCell(4);

  paddingCell1.innerHTML = "<br>";
  paddingCell2.innerHTML = "<br>";
  paddingCell3.innerHTML = "<br>";
  paddingCell4.innerHTML = "<br>";
  paddingCell5.innerHTML = "<br>";
}

function updateBoard(childs){

  // Clear the board
  board.innerHTML = "";
  // Inverse order update the board
  childs.reverse();

  // Only show the top 5
  childs = childs.slice(0,5);

  insertPaddingRow(0);

  var HeaderRow = board.insertRow(1);
  HeaderRow.style.fontsize = "large";
  var headerPaddingCell = HeaderRow.insertCell(0);

  var rankCell = HeaderRow.insertCell(1);
  var nameCell = HeaderRow.insertCell(2);
  var scoreCell = HeaderRow.insertCell(3);
  var headerPaddingCellEnd = HeaderRow.insertCell(4);


  rankCell.innerHTML = "Rank";
  nameCell.innerHTML = "Name";
  scoreCell.innerHTML = "Score";
  headerPaddingCell.innerHTML = "<br>";
  headerPaddingCellEnd.innerHTML = "<br>";

  let TopRankColors = ["gold", "silver", "#cd7f32"];

  for (let i = 0; i < childs.length; i++) {
   
    var newRow = board.insertRow(i+2);
    var paddingCell = newRow.insertCell(0);
    var rankCell = newRow.insertCell(1);
    var nameCell = newRow.insertCell(2);
    var scoreCell = newRow.insertCell(3);
    var paddingCellEnd = newRow.insertCell(4);

    if(i < 3){
      rankCell.innerHTML = "<img src='./imgs/"+(i+1)+".png' width='30' height='30'>";
      nameCell.style.color = TopRankColors[i];
      scoreCell.style.color = TopRankColors[i];
    }else{
      rankCell.innerHTML = i+1;
    }
    nameCell.innerHTML = childs[i].name;
    scoreCell.innerHTML = childs[i].score;
    paddingCell.innerHTML = "<br>";
    paddingCellEnd.innerHTML = "<br>";

  }

  insertPaddingRow(childs.length+2);

}


onValue(reference, (snapshot) => {
  childs = [];
  snapshot.forEach(function(childSnapshot) {
    var childData = childSnapshot.val();
    childs.push(childData);
  })

  updateBoard(childs);
  

});
