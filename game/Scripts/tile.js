class Tile {
    constructor(position, size) {
        this.pos = position;
        this.size = size;
    }
}

class TilePainter {
    constructor(painter, setup) {
        this.painter = painter;
        this.setup = setup;
    }

    paint(tiles) {
        if (!tiles || !Array.isArray(tiles))
            return console.error('Parameter tiles should be an array');

        if (this.setup && typeof (this.setup) == 'function')
            this.setup();

        tiles.forEach((tile, index) => {
            this.painter(tile, index);
        });
    }
}