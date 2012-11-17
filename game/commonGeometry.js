//For all functions:
    //rect in x, y, w, h format
    //point in x, y format
    //circle is in bounding rect format

//getCircleCenter
    //function getCircleCenter(circle)
    //Returns the vector of the center of a circle

//vectorToRect
    //function vecToRect(rect, point, vector) 
    //Gets the Vector from the a rect to a point.    
    //Caveats
        //If point is in rect then it returns Vector(0, 0).
        //If vector is given, then it will fill in vector and return that)

//minimumVectorBetweenRects
    //function minVecBetweenRects(rectOne, rectTwo) 
    //Gets the minimum vector from rectOne to rectTwo

//minimumVectorUntilFullOverlapRects
    //function minVecFullOverlapRects(rectOne, rectTwo)
    //Gets the minimum vector for rectOne to be fully overlapped by rectTwo
    //Caveats
        //Its behaviour is undefined if rectOne cannot be fully overlapped by rectTwo

//vectorBetweenRectAndCircle
    //function vecBetweenRectAndCircle(rect, circle)
    //Circle is defined as the bounding rect of circle


/********************************* CODE START *********************************/

//Returns the vector of the center of a circle
function getCircleCenter(circle) {
    return new Vector(circle.x + circle.w / 2, circle.y + circle.h / 2);
}

//Gets the Vector from the a rect to a point.    
    //Caveats
        //If point is in rect then it returns Vector(0, 0).
        //If vector is given, then it will fill in vector and return that)
function vecToRect(rect, point, vector) {
    if (!assertDefined("vecToRect", rect, point, vector))
        return new Vector(0, 0);

    if(!vector)
        vector = new Vector(0, 0);
    
    if (point.x > rect.xe)
        vector.x = point.x - (rect.x + rect.w);
    else if (point.x < rect.xs)
        vector.x = rect.x - point.x;    

    if (point.y > rect.ye)
        vector.y = point.y - (rect.y + rect.h);
    else if (point.y < rect.ys)
        vector.y = rect.y - point.y;

    return vector;
}

//Gets the minimum vector from rectOne to rectTwo
//Basically just the minimum vec between the vertices of one and two
function minVecBetweenRects(rectOne, rectTwo) {
    if (!assertDefined("minVecBetweenRects", rectOne, rectTwo))
        return new Vector(0, 0);

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

//Gets the minimum vector for rectOne to be fully overlapped by rectTwo
//Its behaviour is undefined if rectOne cannot be fully overlapped by rectTwo
function minVecFullOverlapRects(rectOne, rectTwo) {
    if (!assertDefined("minVecFullOverlapRects", rectOne, rectTwo))
        return new Vector(0, 0);

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

//Circle is defined as the bounding rect of circle
function vecBetweenRectAndCircle(rect, circle) {
    if (!assertDefined("vecBetweenRectAndCircle", rect, circle))
        return new Vector(0, 0);

    var vec = vecToRect(rect, getCircleCenter(circle));

    if (vec.magSq() < circle.w * circle.w)
        return new Vector(0, 0);
    else
        return dist;
}