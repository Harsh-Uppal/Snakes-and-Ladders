const firebaseConfig = {
    apiKey: "AIzaSyD-jnjCDNznTrn26QpCoBKWy6qDPemt5AA",
    authDomain: "snake-and-ladder-6bee6.firebaseapp.com",
    databaseURL: "https://snake-and-ladder-6bee6-default-rtdb.firebaseio.com",
    projectId: "snake-and-ladder-6bee6",
    storageBucket: "snake-and-ladder-6bee6.appspot.com",
    messagingSenderId: "477519873008",
    appId: "1:477519873008:web:ca2dccc31cfdff25525335"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const database = firebase.database();

const isRoomAvailable = async roomId => {
    const room = await getDataAsync('Rooms/' + roomId);
    return !Boolean(room);
}
const roomHasPassword = async roomId => {
    const room = await getDataAsync('Rooms/' + roomId);
    return Boolean(room.password);
}
const getData = (key, onRecieve) => database.ref(key).on('value', data => onRecieve(data.val()));
const getDataAsync = async key => {
    let d;
    await database.ref(key).on('value', data => d = data);
    return d;
}
const setData = (key, value) => {
    database.ref(key).set(value);
};