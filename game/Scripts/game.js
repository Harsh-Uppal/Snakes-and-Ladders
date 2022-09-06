const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
const gridSize = 10;
let tilePainter, grid, ladders;

function connectToServer(params) {
    if (!params.roomId)
        return 1;

    const playerType = params.type;

    if (playerType == 'host') {
        if (!params.visibility)
            return 1;

        createRoom(params);
    }
    else
        joinRoom(params);

    return 0;
}

function createRoom(params) {
    setData('Rooms/' + params.roomId, {
        ...params,
        players: []
    }
    );
}

async function joinRoom(params) {
    const roomId = 'Rooms/' + params.roomId;
    const room = await getData(roomId);

    if (room.password == params.password && (!room.players || room.maxPlayers < room.players.length)) {
        alert('Joined Room');
        setData(roomId + '/players', ['Yo iM a Player']);
    }
    else
        console.error('Invalid room data');
}

function setup() {
    const error = connectToServer(window.getURLParams());
    if (error) {
        noLoop();
        return;
    }

    let minSize = min(screenHeight, screenWidth);
    createCanvas(minSize * .7, minSize * .7);
    let tileSize = width / gridSize;

    let color0 = '#6f2';
    let color1 = '#09f';

    tilePainter = new TilePainter((tile, i) => {
        fill(i % 2 ? color0 : color1);
        rect(tile.pos.x * tile.size.x, tile.pos.y * tile.size.y, tile.size.x, tile.size.y);
        fill('black');
        text(i + 1, tile.size.x * (tile.pos.x + .5), tile.size.y * (tile.pos.y + .5));
    }, () => {
        noStroke();
        textAlign(CENTER, CENTER);
        textFont('Silkscreen');
        textSize(16);
    });

    grid = createGrid(vec(tileSize, tileSize));

    ladders = [
        new Ladder(vec(width - tileSize / 2), vec(tileSize / 2), 20, randomColor())
    ];
}

function createGrid(tileSize) {
    let grid = [];
    let i = 0;

    for (let y = gridSize - 1; y >= 0; y--)
        for (let x = y % 2 ? 0 : gridSize - 1; y % 2 ? x < gridSize : x >= 0; x += y % 2 ? 1 : -1)
            grid[i++] = new Tile(vec(x, y), tileSize);

    return grid;
}

function generateLadders(seed) {
    return [];
}

function draw() {
    background('');
    tilePainter.paint(grid);
    ladders.forEach(ladder => {
        ladder.draw();
    });
}

const randomColor = () => {
    const color = '#' + Math.floor(Math.random() * 16777215).toString(16)
    return color.length == 7 ? color : color + '0';
}