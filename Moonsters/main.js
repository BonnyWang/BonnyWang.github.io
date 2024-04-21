import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
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


const starCountRef = ref(database, 'LeaderBoard');
document.getElementById("Board").innerText = "\n";
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  console.log(Object.entries(data)[1][1].name);
  for (let i = 0; i < Object.entries(data).length; i++) {
    console.log(Object.entries(data)[i][1].name);
    console.log(Object.entries(data)[i][1].score);

    document.getElementById("Board").innerText += Object.entries(data)[i][1].name + " " + Object.entries(data)[i][1].score + "\n";
  }

//   document.getElementById("Board").innerText = data;
});
