/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2015, Olivier Biot, Jason Oster, Aaron McLeod
 * http://www.melonjs.org
 *
 */
(function () {
    /**
     * a rectangle Object
     * @class
     * @extends Object
     * @memberOf me
     * @constructor
     * @param {Number} x position of the Rectangle
     * @param {Number} y position of the Rectangle
     * @param {Number} w width of the rectangle
     * @param {Number} h height of the rectangle
     */
    me.Rect = Object.extend(
    /** @scope me.Rect.prototype */ {

        /** @ignore */
        init : function (x, y, w, h) {
            /**
             * position of the Rectangle
             * @public
             * @type {me.Vector2d}
             * @name pos
             * @memberOf me.Rect
             */
            this.pos = new me.Vector2d(x, y);

            /**
             * width of the Rectangle
             * @public
             * @type {Number}
             * @name width
             * @memberOf me.Rect
             */
            this.width = w;
            /**
             * height of the Rectangle
             * @public
             * @type {Number}
             * @name height
             * @memberOf me.Rect
             */
            this.height = h;

            // the shape type
            this.shapeType = "Rectangle";
        },

        /**
         * set new value to the rectangle shape
         * @name setShape
         * @memberOf me.Rect
         * @function
         * @param {Number} x position of the Rectangle
         * @param {Number} y position of the Rectangle
         * @param {Number} w width of the rectangle
         * @param {Number} h height of the rectangle
         * @return {me.Rect} this rectangle
         */
        setShape : function (x, y, w, h) {
            // set the new position vector
            this.pos.set(x, y);

            // resize
            this.resize(w, h);

            return this;
        },

        /**
         * resize the rectangle
         * @name resize
         * @memberOf me.Rect
         * @function
         * @param {Number} w new width of the rectangle
         * @param {Number} h new height of the rectangle
         * @return {me.Rect} this rectangle
         */
        resize : function (w, h) {
            this.width = w;
            this.height = h;
            return this;
        },

        /**
         * returns the bounding box for this shape, the smallest rectangle object completely containing this shape.
         * @name getBounds
         * @memberOf me.Rect
         * @function
         * @return {me.Rect} this shape bounding box Rectangle object
         */
        getBounds : function () {
            return this;
        },

        /**
         * update the bounding box for this shape.
         * @name updateBounds
         * @memberOf me.Rect
         * @function
         * @return {me.Rect} this shape bounding box Rectangle object
         */
        updateBounds : function () {
            return this;
        },

        /**
         * clone this rectangle
         * @name clone
         * @memberOf me.Rect
         * @function
         * @return {me.Rect} new rectangle
         */
        clone : function () {
            return new me.Rect(this.pos.x, this.pos.y, this.width, this.height);
        },

        /**
         * copy the position and size of the given rectangle into this one
         * @name copy
         * @memberOf me.Rect
         * @function
         * @param {me.Rect} rect Source rectangle
         * @return {me.Rect} new rectangle
         */
        copy : function (rect) {
            return this.setShape(rect.pos.x, rect.pos.y, rect.width, rect.height);
        },

        /**
         * translate the rect by the specified offset
         * @name translate
         * @memberOf me.Rect
         * @function
         * @param {Number} x x offset
         * @param {Number} y y offset
         * @return {me.Rect} this rectangle
         */
        translate : function (x, y) {
            this.pos.x += x;
            this.pos.y += y;
            return this;
        },

        /**
         * translate the rect by the specified vector
         * @name translateV
         * @memberOf me.Rect
         * @function
         * @param {me.Vector2d} v vector offset
         * @return {me.Rect} this rectangle
         */
        translateV : function (v) {
            return this.translate(v.x, v.y);
        },

        /**
         * merge this rectangle with another one
         * @name union
         * @memberOf me.Rect
         * @function
         * @param {me.Rect} rect other rectangle to union with
         * @return {me.Rect} the union(ed) rectangle
         */
        union : function (/** {me.Rect} */ r) {
            var x1 = Math.min(this.left, r.left);
            var y1 = Math.min(this.top, r.top);

            this.resize(
                Math.max(this.right, r.right) - x1,
                Math.max(this.bottom, r.bottom) - y1
            );

            this.pos.set(x1, y1);

            return this;
        },

        /**
         * check if this rectangle is intersecting with the specified one
         * @name overlaps
         * @memberOf me.Rect
         * @function
         * @param  {me.Rect} rect
         * @return {boolean} true if overlaps
         */
        overlaps : function (r)    {
            return (
                this.left < r.right &&
                r.left < this.right &&
                this.top < r.bottom &&
                r.top < this.bottom
            );
        },

        /**
         * check if this rectangle contains the specified one
         * @name contains
         * @memberOf me.Rect
         * @function
         * @param  {me.Rect} rect
         * @return {boolean} true if contains
         */
        contains: function (r) {
            return (
                r.left >= this.left &&
                r.right <= this.right &&
                r.top >= this.top &&
                r.bottom <= this.bottom
            );
        },

        /**
         * check if this rectangle contains the specified point
         * @name containsPointV
         * @memberOf me.Rect
         * @function
         * @param  {me.Vector2d} point
         * @return {boolean} true if contains
         */
        containsPointV: function (v) {
            return this.containsPoint(v.x, v.y);
        },

        /**
         * check if this rectangle contains the specified point
         * @name containsPoint
         * @memberOf me.Rect
         * @function
         * @param  {Number} x x coordinate
         * @param  {Number} y y coordinate
         * @return {boolean} true if contains
         */
        containsPoint: function (x, y) {
            return (
                x >= this.left &&
                x <= this.right &&
                y >= this.top &&
                y <= this.bottom
            );
        },

        /**
         * Returns a polygon whose edges are the same as this box.
         * @name toPolygon
         * @memberOf me.Rect
         * @function
         * @return {me.Polygon} a new Polygon that represents this rectangle.
         */
        toPolygon: function () {
            var pos = this.pos;
            var w = this.width;
            var h = this.height;
            return new me.Polygon(
                pos.x, pos.y, [
                    new me.Vector2d(), new me.Vector2d(w, 0),
                    new me.Vector2d(w, h), new me.Vector2d(0, h)
                ]
            );
        }
    });

    // redefine some properties to ease our life when getting the rectangle coordinates
    /**
     * left coordinate of the Rectangle<br>
     * takes in account the adjusted size of the rectangle (if set)
     * @public
     * @type {Number}
     * @name left
     * @memberOf me.Rect
     */
    Object.defineProperty(me.Rect.prototype, "left", {
        get : function () {
            return this.pos.x;
        },
        configurable : true
    });

    /**
     * right coordinate of the Rectangle<br>
     * takes in account the adjusted size of the rectangle (if set)
     * @public
     * @type {Number}
     * @name right
     * @memberOf me.Rect
     */
    Object.defineProperty(me.Rect.prototype, "right", {
        get : function () {
            return (this.pos.x + this.width) || this.width;
        },
        configurable : true
    });

    /**
     * top coordinate of the Rectangle<br>
     * takes in account the adjusted size of the rectangle (if set)
     * @public
     * @type {Number}
     * @name top
     * @memberOf me.Rect
     */
    Object.defineProperty(me.Rect.prototype, "top", {
        get : function () {
            return this.pos.y;
        },
        configurable : true
    });

    /**
     * bottom coordinate of the Rectangle<br>
     * takes in account the adjusted size of the rectangle (if set)
     * @public
     * @type {Number}
     * @name bottom
     * @memberOf me.Rect
     */
    Object.defineProperty(me.Rect.prototype, "bottom", {
        get : function () {
            return (this.pos.y + this.height) || this.height;
        },
        configurable : true
    });

})();
