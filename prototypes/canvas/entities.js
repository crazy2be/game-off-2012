function Sprite(x, y, w, h) {
    this.dx = 0;
    this.dy = 0;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.update = function() {
        this.x += this.dx;
        this.y += this.dy;
    }
    this.getCenter = function() {
        return {x: this.x + this.w / 2, y: this.y + this.h / 2};
    }
}

function Tile(x, y, w, h) {
    var sprite = new Sprite(x, y, w, h);
    var object = null;
    this.hover = false;
    
    this.addObject = function(obj) {
        object = new obj(sprite, this);
    }
    this.update = function() {
        if (object != null && object.update) {
            object.update();
        }
    }
    this.draw = function(pen) {
        var s = sprite;
        if (object == null) {
            pen.fillStyle = "white";
            if (this.hover) {
                pen.strokeStyle = "yellow";
            } else {
                pen.strokeStyle = "black";
            }
            ink.rect(s.x, s.y, s.w, s.h, pen);
        } else {
            if (object.draw) {
                object.draw(pen);
            }
        }
    }
}

function Path(sprite) {
    this.draw = function(pen) {
        var s = sprite;
        pen.fillStyle = "green";
        pen.strokeStyle = "green";
        ink.rect(s.x, s.y, s.w, s.h, pen);
    }
}

function Base(sprite) {
    this.draw = function(pen) {
        var s = sprite;
        pen.fillStyle = "blue";
        pen.strokeStyle = "blue";
        ink.rect(s.x, s.y, s.w, s.h, pen);
    }
}

function Tower(sprite) {
    var range = 112;
    var damage = 16;
    var nextFire = 0;
    var coolDown = 200;
    var laserTime = 50;
    this.draw = function(pen) {
        var s = sprite;
        pen.fillStyle = "red";
        pen.strokeStyle = "red";
        ink.rect(s.x, s.y, s.w, s.h, pen);
    }
    this.overlay = function(pen) {
        var s = sprite;
        pen.save();
        pen.lineWidth = 2;
        pen.fillStyle = "transparent";
        pen.strokeStyle = "blue";
        ink.circ(s.x + s.w / 2, s.y + s.h / 2, this.range, pen);
        pen.restore();
    }
}

function Bug(x, y, r, id) {
    var sprite = new Sprite(x, y, r * 2, r * 2);
    sprite.dx = speed;
    var id = id;
    var hp = 100;
    var value = 15;
    var speed = 0.2;
    this.getCenter = function() {
        return sprite.getCenter();
    }
    this.update = function() {
        sprite.update();
    }
    this.draw = function(pen) {
        var s = sprite;
        pen.fillStyle = "yellow";
        pen.strokeStyle = "orange";
        pen.save();
        pen.lineWidth = 1;
        ink.circ(s.x, s.y, s.w / 2, pen);
        pen.restore();
    }
}

function Laser(x1, y1, x2, y2, start, dur, id) {
    this.draw = function(pen) {
        pen.strokeStyle = "purple";
        pen.save();
        pen.lineWidth = 5;
        ink.line(x1, y1, x2, y2, pen);
        pen.restore();
    }
}