let openLoginScreen = () => { };
let playBtnClicked = () => { };
let createRoom = () => { };
let joinRoom = () => { };
let quickJoin = () => { };

window.addEventListener('load', () => {
    const homeScreen = new Screen('homeScreen');
    const loginScreen = new Screen('loginScreen');
    const gameStartScreen = new Screen('gameStartScreen');
    const createRoomScreen = new Screen('createRoomScreen');

    const passwordModal = document.getElementById('passwordModal');

    const joinRoomIdInput = document.getElementById('joinRoomId');
    const createRoomIdInput = document.getElementById('createRoomId');

    homeScreen.enable();

    ScreenManager.screenChangeTransition = new Transition("black-rtl", "transition", 2000);

    //openLoginScreen = loginScreen.enable;
    openLoginScreen = () => alert('Coming soon...');
    playBtnClicked = gameStartScreen.enable;
    joinRoom = async () => {
        const roomId = joinRoomIdInput.value;

        if (!roomId) {
            alert('Enter Room ID');
            return;
        }

        const roomAvailable = await isRoomAvailable(roomId);
        if (roomAvailable) {
            alert('Invalid Room ID');
            return;
        }

        const passwordRequired = await roomHasPassword(roomId);

        if (passwordRequired)
            passwordModal.open = true;
        else
            window.location.replace('/game?type=join&roomId=' + roomId);
    }
    createRoom = async () => {
        const roomId = createRoomIdInput.value;

        if (!roomId) {
            alert('Enter Room ID');
            return;
        }

        const roomAvailable = !await isRoomAvailable(roomId);
        if (roomAvailable) {
            alert('Room is not Available');
            return;
        }

        createRoomScreen.enable();
        document.getElementById('roomIdInput').value = roomId;
    };
});