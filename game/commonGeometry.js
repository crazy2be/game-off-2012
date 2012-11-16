function Vector(x, y) {
    this.x = x;
    this.y = y;

    this.magSq = function () {
        return this.x * this.x + this.y * this.y;
    };
	
	this.mag = function() {
		return Math.sqrt(this.magSq());
	}

	this.mult = function(amount) {
		this.x *= amount;
		this.y *= amount;
		return this;
	}
	
	this.unit = function() {
		var mag = this.mag();
		return new Vector(this.x / mag, this.y / mag);
	}

    this.sub = function (vec) {
        this.x -= vec.x;
        this.y -= vec.y;
		return this;
    }
    this.add = function (vec) {
        this.x += vec.x;
        this.y += vec.y;
		return this;
    }
}

function Rect(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	
	this.getCenter = function() {
		return new Vector(this.x + this.w / 2, this.y + this.h / 2 );
	}
	
	// vecToPoint() calculates how far outside of the rectangle
	// the given point lies, and returns the shortest vector
	// between the point and the edge of the rectangle.
	this.vecToPoint = function(point) {
		var dist = new Vector(0, 0);
		
		if (point.x >= this.x + this.w) {
			dist.x = point.x - (this.x + this.w);
		} else if (point.x <= this.x) {
			dist.x = this.x - point.x;
		} else {
			dist.x = 0;
		}
		
		if (point.y >= this.y + this.h) {
			dist.y = point.y - (this.y + this.h);
		} else if (point.y <= this.y) {
			dist.y = this.y - point.y;
		} else {
			dist.y = 0;
		}
		
		return dist;
	}
	
	// verts() returns a list of Vectors corresponding
	// to the vecticies of the rectangle.
	this.verts = function() {
		return [
			new Vector(this.x, this.y),
			new Vector(this.x, this.y + this.h),
			new Vector(this.x + this.w, this.y),
			new Vector(this.x + this.w, this.y + this.h),
		];
	}
	
	// vecTo() returns the vector with the smallest magnitude
	// between the vertices of this rectangle and
	// the vecticies of rect
	this.vecTo = function(rect) {
		var verts = rect.verts();
		var min = Number.MAX_VALUE;
		var res;
		for (var i = 0; i < verts.length; i++) {
			var vect = this.vecToPoint(verts[i]);
			var dist = vect.magSq();
			if (dist < min) {
				min = dist;
				res = vect;
			}
		}
		return res;
	}
}

function sizeToBounds(size) {
    return { xs: size.x, ys: size.y, xe: size.x + size.w, ye: size.y + size.h };
}

function boundsToSize(bounds) {
    return { x: bounds.xs, y: bounds.ys, w: bounds.xe - bounds.xs, h: bounds.xe - bounds.xs };
}

//Gets distance to the rect, 0 if it is in rect
//Rect uses xs, xe, ys, ye structure
function distanceToRectSq(rect, point) {
    var xDistance;
    var yDistance;

    if (point.x >= rect.xe)
        xDistance = point.x - rect.xe;
    else if (point.x <= rect.xs)
        xDistance = rect.xs - point.x;
    else
        xDistance = 0;

    if (point.y >= rect.ye)
        yDistance = point.y - rect.ye;
    else if (point.y <= rect.ys)
        yDistance = rect.ys - point.y;
    else
        yDistance = 0;

    return xDistance * xDistance + yDistance * yDistance;
}

// NOTE: Old! Use Rect.vecToPoint() instead.
function vecToRect(rect, point) {
    var distance = new Vector(0, 0);

    rect = sizeToBounds(rect);

    if (point.x >= rect.xe)
        distance.x = rect.xe - point.x;
    else if (point.x <= rect.xs)
        distance.x = rect.xs - point.x;
    else
        distance.x = 0;

    if (point.y >= rect.ye)
        distance.y = rect.ye - point.y;
    else if (point.y <= rect.ys)
        distance.y = rect.ys - point.y;
    else
        distance.y = 0;

    return distance;
}

//Basically just the minimum vec between the vertices of one and two
function vecBetweenRects(rectOne, rectTwo) {
    var distance1 = vecToRect(rectOne, new Vector(rectTwo.x, rectTwo.y));
    var distance2 = vecToRect(rectOne, new Vector(rectTwo.x + rectTwo.w, rectTwo.y));
    var distance3 = vecToRect(rectOne, new Vector(rectTwo.x, rectTwo.y + rectTwo.h));
    var distance4 = vecToRect(rectOne, new Vector(rectTwo.x + rectTwo.w, rectTwo.y + rectTwo.h));

    var minimum = distance1;

    if (distance2.magSq() < minimum.magSq())
        minimum = distance2;

    if (distance3.magSq() < minimum.magSq())
        minimum = distance3;

    if (distance4.magSq() < minimum.magSq())
        minimum = distance4;

    return minimum;
}

//Basically just the maximum vec between the vertices of one and two
function distBetweenRectsFullOverlap(rectOne, rectTwo) {
    var distance1 = vecToRect(rectOne, new Vector(rectTwo.x, rectTwo.y));
    var distance2 = vecToRect(rectOne, new Vector(rectTwo.x + rectTwo.w, rectTwo.y));
    var distance3 = vecToRect(rectOne, new Vector(rectTwo.x, rectTwo.y + rectTwo.h));
    var distance4 = vecToRect(rectOne, new Vector(rectTwo.x + rectTwo.w, rectTwo.y + rectTwo.h));

    var maximum = distance1;

    if (distance2.magSq() > maximum.magSq())
        maximum = distance2;

    if (distance3.magSq() > maximum.magSq())
        maximum = distance3;

    if (distance4.magSq() > maximum.magSq())
        maximum = distance4;

    return maximum;
}

//Circle is defined as the bounds on the circle
function distBetweenRectAndCircle(rect, circleCenter, r) {
    if (!r)
        console.log("vecBetweenRectAndCircle called with r==0, you don't want this.");
    var vec = vecToRect(rect, circleCenter);

    var dist = Math.sqrt(vec.magSq()) - r;

    if (dist < 0)
        dist = 0;

    return dist;
}