class Rectangle {
    constructor(x, y, w, h, pivot = vec(1, 1)) {
        this.x = x + (pivot.x - 1) * w;
        this.y = y + (pivot.y - 1) * h;
        this.width = w;
        this.height = h;
        this.pivot = pivot;
    }

    repos(x, y) {
        this.x = x + (this.pivot.x - 1) * this.width;
        this.y = y + (this.pivot.y - 1) * this.height;
    }

    resize(w, h) {
        this.x = x + (pivot.x - 1) * w;
        this.y = y + (pivot.y - 1) * h;
        this.width = w;
        this.height = h;
    }

    draw() {
        rect(this.x, this.y, this.width, this.height);
    }

    touches(other) {
        if (other.constructor.name != 'Rectangle')
            return console.error('Error');

        let x = Math.min(this.x, this.x + this.width);
        let y = Math.min(this.y, this.y + this.height);
        let oX = Math.min(other.x, other.x + other.width);
        let oY = Math.min(other.y, other.y + other.height);

        return x < oX + Math.abs(other.width) && x + Math.abs(this.width) > oX &&
            y < oY + Math.abs(other.height) && y + Math.abs(this.height) > oY;
    }
}

const vec = vector = (x, y = x) => {
    return {
        x: x,
        y: y,
        add(val) {
            if (!isNaN(val))
                return vector(x + val, y + val);
            if (val != undefined)
                return vector(x + val.x, y + val.y);
        },
        sub(val) {
            if (!isNaN(val))
                return vector(x - val, y - val);
            if (val != undefined)
                return vector(x - val.x, y - val.y);
        },
        mult(val) {
            if (val.x != null)
                return vector(x * val.x, y * val.y);
            if (!isNaN(val))
                return vector(x * val, y * val);
        },
        divide(val) {
            if (!isNaN(val))
                return vector(x / val, y / val);
        },
        round() {
            return vector(Math.round(x), Math.round(y));
        },
        dot(v) {
            return x * v.x + y * v.y;
        },
        cosine_similarity(v) {
            return this.dot(v) / (v.normalized * this.normalized);
        },
        get length() {
            return Math.sqrt(x * x + y * y);
        },
        get normalized() {
            let l = this.length;
            return vec(x / l, y / l);
        }
    };
}

vec.zero = vec(0);

vec.lerp = vector.lerp = (v0, v1, t) => vec(v0.x + (v1.x - v0.x) * t, v0.y + (v1.y - v0.y) * t);