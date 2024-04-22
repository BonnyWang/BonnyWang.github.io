import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import { getDatabase, ref, onValue, orderByChild, query } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

const seperator = "<br>";

let childs = [];

document.getElementById("Board").innerText = "\n";
onValue(reference, (snapshot) => {
  snapshot.forEach(function(childSnapshot) {
    var childData = childSnapshot.val();
    childs.push(childData);
    
  })

  // Inverse order update the board
  childs.reverse();
  document.getElementById("Board").innerHTML += "<em>Rank &nbsp&nbsp&nbsp &nbsp&nbsp Name &nbsp&nbsp&nbsp &nbsp&nbsp Score <br></em>";
  for (let i = 0; i < childs.length; i++) {
    // add the seperator
    document.getElementById("Board").innerHTML += seperator;
    // set the rank to different color

    document.getElementById("Board").innerHTML += (i + 1) + " &nbsp&nbsp&nbsp &nbsp&nbsp";

    document.getElementById("Board").innerHTML += childs[i].name + " &nbsp&nbsp&nbsp &nbsp&nbsp" + childs[i].score + "<br>";
  }

  document.getElementById("Board").innerHTML += seperator;

  

});
