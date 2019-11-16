import firebase from 'firebase';


var firebaseConfig = {
    apiKey: "AIzaSyCdiDCxaQVKcf5phTgrmjHvTShw2JVZ6oA",
    authDomain: "hackathon-7a64b.firebaseapp.com",
    databaseURL: "https://hackathon-7a64b.firebaseio.com",
    projectId: "hackathon-7a64b",
    storageBucket: "hackathon-7a64b.appspot.com",
    messagingSenderId: "395665323987",
    appId: "1:395665323987:web:60eed28c2a531973a46126",
    measurementId: "G-PQSG4QZXTG"
  };
 
  const fire = firebase.initializeApp(firebaseConfig);
  export default fire;