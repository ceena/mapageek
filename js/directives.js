angular.module('starter.directives', ['d3'])
    .directive('d3GeeksPlotter', ['d3', '$timeout', '$window',
        function(d3, $timeout, $window) {
            return {
                restrict: 'EA',
                scope: {
                    data: "=",
                    label: "@",
                    onClick: "&"
                },
                link: function(scope, iElement, iAttrs) {
                    var renderTimeout;
                    var margin = {
                        top: 20,
                        right: 20,
                        bottom: 50,
                        left: 40
                    };

                    // },
                    //     width = 960 - margin.left - margin.right,
                    //     height = 500 - margin.top - margin.bottom;
                    var svg = d3.select(iElement[0])
                        .append("svg")
                        .attr("width", '100%')
                        .attr("height", '100%')
                        .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                    // on window resize, re-render d3 canvas
                    $window.onresize = function() {
                        svg.selectAll("*").remove();
                        return scope.$apply();
                    };
                    scope.$watch(function() {
                        return angular.element($window)[0].innerWidth;
                    }, function() {
                        return scope.render(scope.data);
                    });

                    // watch for data changes and re-render
                    scope.$watch('data', function(newVals, oldVals) {
                        svg.selectAll("*").remove();
                        return scope.render(newVals);
                    }, true);

                    scope.render = function(data) {
                        if (!data) return;
                        if (renderTimeout) clearTimeout(renderTimeout);
                        svg.selectAll("*").remove();
                        renderTimeout = $timeout(function() {
                            // add the tooltip area to the webpage
                            var tooltip = d3.select("body").append("div")
                                .attr("class", "tooltip")
                                .style("opacity", 0);

                            var width = d3.select(iElement[0])[0][0].offsetWidth - margin.left - margin.right,
                                height = 1000;
                            svg.selectAll("*").remove();
                            var xValue = function(d) {
                                    return d.x;
                                }, // data -> value
                                xScale = d3.scale.linear().range([0, width]), // value -> display
                                xMap = function(d) {
                                    return xScale(xValue(d));
                                }, // data -> display
                                xAxis = d3.svg.axis().scale(xScale).orient("bottom");

                            // setup y
                            var yValue = function(d) {
                                    return d.y;
                                }, // data -> value
                                yScale = d3.scale.linear().range([height, 0]), // value -> display
                                yMap = function(d) {
                                    return yScale(yValue(d));
                                }, // data -> display
                                yAxis = d3.svg.axis().scale(yScale).orient("left");
                            // don't want dots overlapping axis, so add in buffer to data domain
                            xScale.domain([d3.min(data, xValue) - 1, d3.max(data, xValue) + 1]);
                            yScale.domain([d3.min(data, yValue) - 1, d3.max(data, yValue) + 1]);
                            // x-axis
                            svg.append("g")
                                .attr("class", "x axis")
                                .attr("transform", "translate(0," + height + ")")
                                .call(xAxis)
                                .append("text")
                                .attr("class", "label")
                                .attr("x", width)
                                .attr("y", -6)
                                .style("text-anchor", "end")
                                .text("Calories");

                            // y-axis
                            svg.append("g")
                                .attr("class", "y axis")
                                .call(yAxis)
                                .append("text")
                                .attr("class", "label")
                                .attr("transform", "rotate(-90)")
                                .attr("y", 6)
                                .attr("dy", ".71em")
                                .style("text-anchor", "end")
                                .text("Protein (g)");

                            // draw dots
                            svg.selectAll(".dot")
                                .data(data)
                                .enter().append("circle")
                                .attr("class", "dot")
                                .attr("r", 3.5)
                                .attr("cx", xMap)
                                .attr("cy", yMap)
                                .style("fill", function(d) {
                                    return d.color;
                                })
                                .on("mouseover", function(d) {
                                    tooltip.transition()
                                        .duration(200)
                                        .style("opacity", .9);
                                    tooltip.html(d.tech)
                                        .style("left", (d3.event.pageX + 5) + "px")
                                        .style("top", (d3.event.pageY - 28) + "px");
                                })
                                .on("mouseout", function(d) {
                                    tooltip.transition()
                                        .duration(500)
                                        .style("opacity", 0);
                                });;

                        }, 200);

                    };
                }
            };
        }
    ]);