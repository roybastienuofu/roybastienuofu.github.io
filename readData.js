/**
 * Created by roybastien on 11/19/15.
 */

var allData = {connections: [], labels: {}};
var data = {connections: [], labels: {}};
var groupsData = [];
var connectionsData= [];
var maxCount;
var rawData;


//(function () {

    function drawHisto(){
        //console.log(connectionsData);
        var colorScale;

        var svgBounds = document.getElementById("barChart").getBoundingClientRect(),
            xAxisWidth = 100,
            yAxisHeight = 60;

        var xScale = d3.scale.ordinal()
            .domain(rawData.map(function (d) {
                return d.group1;
            }))
            //.domain([0, rawData.length])
            .rangeRoundBands([yAxisHeight, svgBounds.width], 0.1);

        var maxAttendance = d3.max(rawData, function (d) {
                return parseInt(d.count);
        });


        var yScale = d3.scale.linear()
            .domain([0, maxAttendance]).range([svgBounds.height - xAxisWidth, 0]);

        colorScale = d3.scale.linear()
            .domain([0, maxAttendance])
            .range(['#edf8e9', '#006d2c'])
            .interpolate(d3.interpolateLab);

        // Create the axes
        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("left");
        d3.select("#xAxis")
            .attr("transform", "rotate(-90) translate(" + (xAxisWidth - svgBounds.height) + ",0)")
            .call(xAxis);

        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");
        d3.select("#yAxis")
            .attr("transform", "translate(" + yAxisHeight + ",0)")
            .call(yAxis);

        // Create the bars
        var bars = d3.select("#bars").selectAll("rect").data(rawData);
        bars.enter().append('rect');
        bars.exit().remove();
        bars.attr('x', function (d) {
            return xScale(d.group1);
        })
            .attr('width', function (d) {
                return xScale.rangeBand();
            })
            .attr('y', function (d) {
                return yScale(d.count);
            })
            .attr('height', function (d) {
                return svgBounds.height - xAxisWidth - yScale(d.count);
            })
            .attr('fill', function (d) {
                return colorScale(d.count);
            })
        ;

        var currentBrushRegion = null;
        var brush = d3.svg.brush()
            .x(xScale)
            .on("brush", function () {
                var selectedRange;
                currentBrushRegion = brush.extent();

                if (brush.empty()) {
                    selectedRange = xScale.domain();
                } else {
                    selectedRange = brush.extent();
                }
                console.log(selectedRange[0], selectedRange[1]);
            });
        //console.log(bars);

    }


    // Retired function was used in initial development phase.
    function dataLoaded(error, groupData, connectionData){

        groupsData = groupData;
        connectionsData = connectionData;

        for (var i = 0; i < groupData.length; i++){
            var toPush = [{group: +groupData[i].group, value: +groupData[i].value}];
            allData.connections.push(toPush);
        }

        for (i = 0; i < connectionData.length; i++){
            if (+connectionData[i].group != +connectionData[i].group1){
                toPush = [{group: +connectionData[i].group, value: +connectionData[i].value},
                    {group: +connectionData[i].group1, value: +connectionData[i].value1}];
                allData.connections.push(toPush);
            }
        }

        for (i = 0; i < groupData.length; i++){
            //allData.labels[i] = "chr22 " + i + "Mb"
            allData.labels[i] =  i + "Mb"
        }


        data = allData;

        //drawHisto();
        loadScreen();
    }

function clearArrays(){
    allData = {connections: [], labels: {}};
    data = {connections: [], labels: {}};
    groupsData = [];
    connectionsData= [];
    //scrollMaxX = 0;
}


function sliderCalled(value){
    data = {connections: [], labels: {}};

    data.labels = allData.labels;

    for (var i = 0; i < groupsData.length; i++){
        data.connections.push(allData.connections[i]);
    }

    for (i = groupsData.length; i < allData.connections.length; i++){

        if (allData.connections[i][0].value > value){
            data.connections.push(allData.connections[i]);
        }
    }

    loadScreen();
}

    function rawDataLoaded(error, rawDataIn){
        rawData = rawDataIn;

        maxCount = d3.max(rawData.map(function (d){
            // Exclude self interactions
            if (d.group1 != d.group2){
                return +d.count;
            }
        }));

        var last = rawData[rawData.length-1].group1/1000000;

        for (var i = 0; i < last; i++){
            var toPush = [{group: +i, value: +0.5}];
            allData.connections.push(toPush);
            allData.labels[i] = i + "Mb";

            // Make an array of just the groups
            groupsData.push(toPush);
        }
        allData.labels[last] = last + "Mb";




        for (i = 0; i < rawData.length; i++){
            if(rawData[i].group1 != rawData[i].group2){
                toPush = [{group: +rawData[i].group1/1000000, value: (rawData[i].count/maxCount)},
                    {group: +rawData[i].group2/1000000, value: (rawData[i].count/maxCount)}];
                allData.connections.push(toPush);

                // Make an array of just the connections.
                connectionsData.push(toPush);
            }
        }

        data = allData;

        //drawHisto();
        loadScreen();
    }

function loadScreen(){

    data = [data];

    var width = 960, height = 900, padding = 0.005; //padding = .05

    //Clear all of the old SVG elements
    //seqArcContextSVG.selectAll("defs").remove();
    //seqArcContextSVG.selectAll("ellipse").remove();

    d3.select("body").selectAll("svg").remove();

    chart = d3.chord2()
        .width(width)
        .height(height)
        .padding(padding);



    d3.select("body")
        .selectAll("svg")
        .data(data)
        .enter()
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .call(chart);
}


function startHere(chr){

    // Load each data file, and then call rawDataLoaded() when they are finished.
    queue()
        .defer(d3.tsv, 'data/1mb_resolution_intrachromosomal/chr'+chr+'/MAPQGE30/chr'+chr+'_1mb_header.RAWobserved')
        .await(rawDataLoaded);
}

startHere(22);
//})();