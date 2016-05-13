

var gBrushB;





function chrBrush() {
    var tooltip1 = d3.select("#chrDisplayDiv1").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
    var tooltip2 = d3.select("#chrDisplayDiv1").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
    //console.log('chrbrush');
    tooltip1.style("opacity", 0);
    tooltip2.style("opacity", 0);

    //console.log(selectedChr);
    d3.select("#gBrushB").remove();
    var svgB = d3.select("#chrBrush1")
        .append("svg")
        .attr("width", 560)
        .attr("height", 40);
    var xScaleB = d3.scale.linear()
        .domain([0, regionMax])
        .range([0, 560]);
    var brushB = d3.svg.brush()
        .x(xScaleB)
        .on("brush", function () {
            var selectedRangeB;
            currentBrushRegionB = brushB.extent();

            if (brushB.empty()) {
                setChrLength(selectedChr);
                selectedRangeB = xScaleB.domain();
                //console.log(selectedRangeB);
            } else {
                selectedRangeB = brushB.extent();
            }

            chromosomeReallyBrushed(selectedChr, Math.floor(selectedRangeB[0]), Math.ceil(selectedRangeB[1]));

            if (brushB.empty()){
                tooltip1.transition().duration(200).style("opacity", 0);
                tooltip2.transition().duration(200).style("opacity", 0);
            }
            else{
                var element = document.getElementById('chrBrush1');
                var position = element.getBoundingClientRect();
                var xPos = position.left;
                var yPos = position.top;


                var extentRect = d3.select("g.x.brush rect.extent");
                var rangeWidth  = +extentRect.attr("width");
                var rangeHeight = +extentRect.attr("height");
                var rangeLeft = +extentRect.attr("x");
                var rangeTop = +extentRect.attr("y");
                var rangeRight = rangeLeft + rangeWidth;

                //console.log(rangeWidth);

                tooltip1.transition().duration(200).style("opacity", .7);
                tooltip1.html(Math.floor(selectedRangeB[0]) + ' Mb')
                    .style("left", (xPos + rangeLeft - 60) + "px")
                    .style("top", 175 + "px");

                tooltip2.transition().duration(200).style("opacity", .7);
                tooltip2.html(Math.ceil(selectedRangeB[1]) + ' Mb')
                    .style("left", (xPos+rangeLeft+rangeWidth) + "px")
                    .style("top", 175 + "px");
            }

        });
    //svgB.select('#gBrushB').remove();
    gBrushB = svgB.append('g')
        .attr('class', 'x brush')
        .attr('id', 'gBrushB')
        .call(brushB);
    gBrushB.selectAll("rect")
        .attr("height", 30)
        .attr('y', 5)
        ;


    ///////////////////////////////////////////////////////////////////////////////////////
}



var gBrushB2;


function chrBrush2() {
    //var tooltip3 = d3.select("#chrDisplayDiv2").append("div")
    //    .attr("class", "tooltip")
    //    .style("opacity", 0);
    //var tooltip4 = d3.select("#chrDisplayDiv2").append("div")
    //    .attr("class", "tooltip")
    //    .style("opacity", 0);
    //console.log(selectedChr2);
    //console.log(regionMin2, regionMax2);
    d3.select("#gBrushB2").remove();
    var svgB = d3.select("#chrBrush2")
        .append("svg")
        .attr("width", 560)
        .attr("height", 40);
    var xScaleB2 = d3.scale.linear()
        .domain([0, regionMax2])
        .range([0, 560]);
    var brushB2 = d3.svg.brush()
        .x(xScaleB2)
        .on("brush", function () {
            var selectedRangeB;
            currentBrushRegionB = brushB2.extent();

            if (brushB2.empty()) {
                setChrLength2(selectedChr2);
                selectedRangeB = xScaleB2.domain();
            } else {
                selectedRangeB = brushB2.extent();
            }
            //console.log(Math.round(selectedRangeB[0]), Math.round(selectedRangeB[1]));
            //chromosomeBrushed(selectedChr, Math.round(selectedRangeB[0]), Math.round(selectedRangeB[1]));
            chromosomeReallyBrushed2(selectedChr2, Math.floor(selectedRangeB[0]), Math.ceil(selectedRangeB[1]));


            //if (brushB2.empty()){
            //    tooltip3.transition().duration(200).style("opacity", 0);
            //    tooltip4.transition().duration(200).style("opacity", 0);
            //}
            //else {
            //    var element = document.getElementById('chrBrush2');
            //    var position = element.getBoundingClientRect();
            //    var xPos = position.left;
            //    var yPos = position.top;
            //    //console.log(xPos);
            //    //console.log(regionMax);
            //    //console.log(selectedRangeB[0]);
            //
            //    var extentRect = d3.select("g.x.brush rect.extent");
            //    //console.log(extentRect);
            //    var rangeWidth = +extentRect.attr("width");
            //    var rangeHeight = +extentRect.attr("height");
            //    var rangeLeft = +extentRect.attr("x");
            //    var rangeTop = +extentRect.attr("y");
            //    var rangeRight = rangeLeft + rangeWidth;
            //
            //
            //    //console.log(rangeWidth);
            //
            //    tooltip3.transition().duration(50).style("opacity", 1);
            //    tooltip3.html(Math.floor(selectedRangeB[0]) + ' Mb')
            //        .style("left", (xPos + rangeLeft - 60) + "px")
            //        .style("top", 360 + "px");
            //
            //    tooltip4.transition().duration(50).style("opacity", 1);
            //    tooltip4.html(Math.ceil(selectedRangeB[1]) + ' Mb')
            //        .style("left", (xPos + rangeLeft + rangeWidth) + "px")
            //        .style("top", 360 + "px");
            //}
        });
    //svgB.select('#gBrushB').remove();
    gBrushB2 = svgB.append('g')
        .attr('class', 'x brush')
        .attr('id', 'gBrushB2')
        .call(brushB2);
    gBrushB2.selectAll("rect")
        .attr("height", 30)
        .attr('y', 5)
    ;

    ///////////////////////////////////////////////////////////////////////////////////////
}

function clearBrush1(){
    d3.select("#gBrushB").remove();
    d3.select("#chrDisplayDiv1").selectAll('.tooltip').remove();
    chrBrush();
}

function clearBrush2(){
    d3.select("#gBrushB2").remove();
    d3.select("#chrDisplayDiv2").selectAll('.tooltip').remove();
    chrBrush();
}
