/**
 * Created by roybastien on 11/19/15.
 */

var allData = {connections: [], labels: {}};
var data = {connections: [], labels: {}};
var groupsData = [];
var connectionsData= [];
var countData = [];
var maxCount;
var rawData;


//(function () {

    function drawHisto(){
        countData.sort(function(a, b){return a-b});

        //Width and height
        var w = 1000;
        var h = 300;
        var barPadding = 0;

        var dataset = countData;
        console.log("countData.length "+countData.length);

        var yScale = d3.scale.linear()
            .domain([0, countData[countData.length-1]])
            .range([0,h]);

        //console.log(maxCount);

        var xScale = d3.scale.linear()
            .domain([0,maxCount])
            .range([0,w]);

        //Create SVG element
        d3.select('#barChart').selectAll('svg').remove();
        var svg = d3.select("#barChart")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

        //console.log("dataset.length " + dataset.length);

        svg.selectAll("rect")
            .data(dataset)
            .enter().append("rect")

            .attr("x", function(d, i) {
                return i * (w / dataset.length);
            })
            .attr("y", function(d) {
                //return h - (d);
                return h - yScale(d);
            })
            .attr("width", w / dataset.length - barPadding)
            .attr("height", function(d) {
                return d * 4;
            });

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
                //console.log(Math.round(selectedRange[0]), Math.round(selectedRange[1]));
                brushCalled(Math.round(selectedRange[0]), Math.round(selectedRange[1]))
            });

        var gBrush = svg.append('g')
            .attr('class', 'x brush')
            .call(brush);
        gBrush.selectAll("rect")
            .attr("height", h)
            .attr("width", w);


    }

function chromoSelected(chr){
    clearArrays();
    startHere(chr);
}


function clearArrays(){
    allData = {connections: [], labels: {}};
    data = {connections: [], labels: {}};
    groupsData = [];
    connectionsData= [];
    countData = [];
}


function brushCalled(minVal, maxVal){
    console.log(minVal, maxVal);
    data = {connections: [], labels: {}};
    minVal = minVal/maxCount;
    maxVal = maxVal/maxCount;

    data.labels = allData.labels;

    for (var i = 0; i < groupsData.length; i++){
        data.connections.push(allData.connections[i]);
    }

    for (i = groupsData.length; i < allData.connections.length; i++){

        if ((allData.connections[i][0].value > minVal) && (allData.connections[i][0].value < maxVal)){
            data.connections.push(allData.connections[i]);
        }
    }
    //console.log(minVal, maxVal);
    //console.log(data.connections);
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
                // Push to countData for bar chart
                countData.push(rawData[i].count);

                toPush = [{group: +rawData[i].group1/1000000, value: (rawData[i].count/maxCount)},
                    {group: +rawData[i].group2/1000000, value: (rawData[i].count/maxCount)}];
                allData.connections.push(toPush);

                // Make an array of just the connections.
                connectionsData.push(toPush);
            }
        }

        //console.log("countdata.length"+countData.length);

        data = allData;

        drawHisto();
        loadScreen();

    }

function loadScreen(){

    //console.log(data.connections.length);

    data = [data];



    var width = 960, height = 900, padding = 0.005; //padding = .05

    //Clear all of the old SVG elements
    d3.select("body").selectAll("#chordSvg").remove();
    d3.select("body").selectAll("#chord").remove();
    //d3.select("body").selectAll("svg").remove();
    //d3.select("chordDiv").selectAll("#chordSvg").remove();

    chart = d3.chord2()
        .width(width)
        .height(height)
        .padding(padding);


    //d3.select("body")
    //    //.selectAll("svg")
    //    .selectAll("#chord")
    //    .data(data)
    //    .enter()
    //    .append("svg")
    //    .attr("width", width)
    //    .attr("height", height)
    //    .call(chart);

    d3.select("body")
        //.selectAll("svg")
        .selectAll("#chord")
        .data(data)
        .enter()
        .append("svg")
        .attr("id", "chord")
        .style("align", "center")
        .attr("width", width)
        .attr("height", height)
        .call(chart);


}

function setupDivs(){
    document.getElementById("buttonDiv1").style.margin = "50px 50px 20px 50px";
    document.getElementById("buttonDiv2").style.margin = "20px 50px 20px 50px";
    document.getElementById("buttonDiv3").style.margin = "20px 50px 20px 50px";
    document.getElementById("barChart").style.margin = "20px 50px 20px 50px";
    document.getElementById("chordSvg").style.margin = "20px 50px 50px 20px";
}


function startHere(chr){

    // Load each data file, and then call rawDataLoaded() when they are finished.
    queue()
        .defer(d3.tsv, 'data/1mb_resolution_intrachromosomal/chr'+chr+'/MAPQGE30/chr'+chr+'_1mb_header.RAWobserved')
        .await(rawDataLoaded);
}
setupDivs();
startHere(22);
//})();