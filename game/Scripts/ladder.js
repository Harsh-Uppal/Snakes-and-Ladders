class Ladder {
    constructor(p0, p1, stepLength = 10, color = 'black') {
        this.p0 = p0;
        this.p1 = p1;
        this.stepLen = stepLength;

        let dx = p1.x - p0.x;
        let dy = p1.y - p0.y;
        this.normals = [vec(-dy, dx).normalized.mult(20), vec(dy, -dx).normalized.mult(20)];

        this.dir = p1.sub(p0).normalized;
        this.length = p0.sub(p1).length;
        this.stepInc = this.dir.mult(this.stepLen);
        this.color = color;
    }

    draw() {
        strokeWeight(2);
        stroke(this.color);

        this.normals.forEach(normal => {
            let p0 = this.p0.add(normal);
            let p1 = this.p1.add(normal);
            line(p0.x, p0.y, p1.x, p1.y);
        });

        let steps = this.length / this.stepLen;
        let i = .75;

        while (i < steps) {
            let p = this.p0.add(this.stepInc.mult(i));
            let p0 = p.add(this.normals[0]);
            let p1 = p.add(this.normals[1]);

            line(p0.x, p0.y, p1.x, p1.y);
            i++;
        }
    }
}