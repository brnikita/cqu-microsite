'use strict';

$(function () {
    var $planet = $('.js-planet'),
        $linksWrapper = $('.js-planet-links-wrapper'),
        $links = $('.js-planet-link'),
        $space = $('.js-space');

    void new Parallax($space[0]);

    /**
     * Method returns link element rotation radius
     *
     * @method
     * @name Decoration#getLinkRotationRadius
     * @param {jQuery} $link
     * @returns {number}
     */
    function getLinkRotationRadius($link) {
        var planetCenter = getElementCenter($linksWrapper),
            linkOffset = $link.offset();

        return Math.sqrt(Math.pow((planetCenter.x - linkOffset.left), 2) + Math.pow((planetCenter.y - linkOffset.top), 2));
    }

    /**
     * Method returns x coordinate of link element by angle
     *
     * @method
     * @name Decoration#getXCoordinateByAngle
     * @param {jQuery} $link
     * @param {number} angle
     * @returns {number}
     */
    function getXCoordinateByAngle($link, angle) {
        var linkRotationRadius = getLinkRotationRadius($link),
            planetCenterX = getElementCenter($linksWrapper).x;

        return planetCenterX + (Math.cos(angle) * linkRotationRadius);
    }

    /**
     * Method returns x coordinate of link element by angle
     *
     * @method
     * @name Decoration#getYCoordinateByAngle
     * @param {jQuery} $link
     * @param {number} angle
     * @returns {number}
     */
    function getYCoordinateByAngle($link, angle) {
        var linkRotationRadius = getLinkRotationRadius($link),
            planetCenterY = getElementCenter($linksWrapper).y;

        return planetCenterY + (Math.sin(angle) * linkRotationRadius);
    }

    /**
     * Function returns x coordinate of link element
     *
     * @function
     * @name getLinkX
     * @param {jQuery} $link
     * @returns {number}
     */
    function getLinkX($link) {
        return $link.offset().left;
    }

    /**
     * Method returns x coordinate of decoration center;
     *
     * @function
     * @name getLinkY
     * @param {jQuery} $link
     * @returns {number}
     */
    function getLinkY($link) {
        return $link.offset().top;
    }

    /**
     * Function rotates planet links
     *
     * @function
     * @name rotatePlanetLinks
     * @returns {undefined}
     */
    function rotatePlanetLinks() {
        setInterval(function () {
            $links.each(function () {
                var $planetOffset = $planet.offset(),
                    wrapperOffset = $linksWrapper.offset(),
                    planetWrapperTopDiff = wrapperOffset.top - $planetOffset.top,
                    planetWrapperLeftDiff = wrapperOffset.left - $planetOffset.left,
                    $link = $(this),
                    linkAngle = getLinkRotationAngle($link),
                    newLinkAngle = linkAngle + 0.005,
                    newXCoordinate = getXCoordinateByAngle($link, newLinkAngle),
                    newYCoordinate = getYCoordinateByAngle($link, newLinkAngle),
                    top,
                    left;

                //if (planetWrapperTopDiff < 0) {
                //    top = newYCoordinate - wrapperOffset.top - planetWrapperTopDiff;
                //} else {
                //    top = newYCoordinate - wrapperOffset.top + planetWrapperTopDiff;
                //}
                //
                //if (planetWrapperLeftDiff < 0) {
                //    left = newXCoordinate - wrapperOffset.left - planetWrapperLeftDiff;
                //} else {
                //    left = newXCoordinate - wrapperOffset.left + planetWrapperLeftDiff;
                //}

                $link.css({
                    top: newYCoordinate - wrapperOffset.top,
                    left: newXCoordinate - wrapperOffset.left
                });
            });
        }, 50);
    }

    /**
     * Function returns center of element
     *
     * @function
     * @name getElementCenter
     * @param {jQuery} $element
     * @returns {Object}
     */
    function getElementCenter($element) {
        var elementWidth = $element.width(),
            elementHeight = $element.height(),
            elementOffset = $element.offset(),
            elementTop = elementOffset.top,
            elementLeft = elementOffset.left,
            elementCenterLeft = elementLeft + elementWidth / 2,
            elementCenterTop = elementTop + elementHeight / 2;

        return {
            x: elementCenterLeft,
            y: elementCenterTop
        };
    }

    /**
     * Function returns angle by x,y coordinates
     *
     * @function
     * @name getLinkRotationAngle
     * @param {jQuery} $link
     * @returns {number}
     */
    function getLinkRotationAngle($link) {
        var x = getLinkX($link),
            y = getLinkY($link),
            rotationCenter = getElementCenter($linksWrapper),
            planetCenterY = rotationCenter.y,
            planetCenterX = rotationCenter.x;

        return Math.atan2(planetCenterY - y, planetCenterX - x) + Math.PI;
    }

    rotatePlanetLinks();

    //var Renderer = function (canvas) {
    //    var canvas = $(canvas).get(0);
    //    var ctx = canvas.getContext("2d");
    //    var particleSystem;
    //
    //    var that = {
    //        init: function (system) {
    //            particleSystem = system;
    //            particleSystem.screenSize(canvas.width, canvas.height);
    //            particleSystem.screenPadding(80);
    //            that.initMouseHandling();
    //        },
    //
    //        redraw: function () {
    //            ctx.fillStyle = "white";
    //            ctx.fillRect(0, 0, canvas.width, canvas.height);
    //
    //            particleSystem.eachEdge(
    //                function (edge, pt1, pt2) {
    //                    ctx.strokeStyle = "rgba(0,0,0, .333)";
    //                    ctx.lineWidth = 1;
    //                    ctx.beginPath();
    //                    ctx.moveTo(pt1.x, pt1.y);
    //                    ctx.lineTo(pt2.x, pt2.y);
    //                    ctx.stroke();
    //                });
    //
    //            particleSystem.eachNode(
    //                function (node, pt) {
    //                    var w = 10;
    //                    ctx.fillStyle = "orange";
    //                    ctx.fillRect(pt.x - w / 2, pt.y - w / 2, w, w);
    //                    ctx.fillStyle = "black";
    //                    ctx.font = 'italic 13px sans-serif';
    //                    ctx.fillText(node.name, pt.x + 8, pt.y + 8);
    //                });
    //        }
    //    };
    //    return that;
    //};
    //
    //$(document).ready(function () {
    //    var system = arbor.ParticleSystem(1000);
    //    system.parameters({gravity: true});
    //    system.renderer = Renderer("#viewport");
    //
    //    $.getJSON("data.json",
    //        function (data) {
    //            $.each(data.nodes, function (i, node) {
    //                system.addNode(node.name);
    //            });
    //
    //            $.each(data.edges, function (i, edge) {
    //                system.addEdge(system.getNode(edge.src), system.getNode(edge.dest));
    //            });
    //        });
    //
    //})
});
