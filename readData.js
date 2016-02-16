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
var countMin;
var countMax;
var regionMin;
var regionMax;
var geneList;
var selectedChr;
var selectedGenes = [];

//(function () {

function handle(e){
    if (e.keyCode === 13){
        //alert(document.getElementById("search").value);
        var chr = document.getElementById("search").value;
        if(chr == "x"){
            chr = "X";
        }

        var arr = ["x", "X", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22" ];
        if (contains(arr, chr) == false){
            alert("Please enter a valid chromosome.")
            return;
        }
        //document.getElementById("chrBrush").textContent = "Chromosome " + chr;

        chromoSelected(chr);
        chrBrush();
    }
}

function contains(a, obj) {
    var i = a.length;
    while (i--) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}


function drawHisto(){
        countData.sort(function(a, b){return a-b});

        //Width and height
        var w = 1000;
        var h = 200;
        var barPadding = 0;

        var dataset = countData;

        var yScale = d3.scale.linear()
            .domain([0, countData[countData.length-1]])
            .range([0, h]);

        //var xScale = d3.scale.linear()
        //    .domain([0, maxCount])
        //    .range([0, w]);

        var xScale = d3.scale.linear()
            .domain([0,dataset.length])
            .range([0,w]);

        //Create SVG element
        d3.select('#barChart').selectAll('svg').remove();
        var svg = d3.select("#barChart")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

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

                var minVal = Math.round(selectedRange[0]);
                var maxVal = Math.round(selectedRange[1]);
                minVal = countData[minVal]/maxCount;
                maxVal = countData[maxVal-1]/maxCount;
                countMin = minVal;
                countMax = maxVal;
                //brushHistoCalled(minVal, maxVal);
                wrangleData();
            });

        countMin = 0;
        countMax = 1;

        var gBrush = svg.append('g')
            .attr('class', 'x brush')
            .call(brush);
        gBrush.selectAll("rect")
            .attr("height", h);

}

function brushHistoCalled(minVal, maxVal){

    data = {connections: [], labels: {}};

    data.labels = allData.labels;

    for (var i = 0; i < groupsData.length; i++){
        data.connections.push(allData.connections[i]);
    }

    for (i = groupsData.length; i < allData.connections.length; i++){

        if ((allData.connections[i][0].value > minVal) && (allData.connections[i][0].value < maxVal)){
            data.connections.push(allData.connections[i]);
            //console.log(allData.connections[i][0]);
        }
    }
    loadScreen();
    //wrangleData();
}

function wrangleData(){

    data = {connections: [], labels: {}};

    data.labels = allData.labels;

    for (var i = 0; i < groupsData.length; i++){
        data.connections.push(allData.connections[i]);
    }


    for (i = groupsData.length; i < allData.connections.length; i++){

        if ((allData.connections[i][0].value > countMin) &&
            (allData.connections[i][0].value < countMax) &&
            //(allData.connections[i][0].group >= regionMin) &&
            (allData.connections[i][1].group >= regionMin) &&
            //(allData.connections[i][0].group <= regionMax) &&
            (allData.connections[i][1].group <= regionMax)
        ){
                data.connections.push(allData.connections[i]);
        }
    }

    loadScreen();
}

//function showHighlightedGenes(){
//
//    var chr = "chr"+selectedChr;
//
//    document.getElementById("geneListDiv").innerHTML = "";
//    for(var i = 0; i < geneList.length; i++){
//
//        if(geneList[i].Chromosome == chr &&
//            Math.floor(geneList[i].Start/1000000) >= regionMin-1 &&
//            Math.ceil(geneList[i].Stop/1000000) <= regionMax+1
//        ){
//            document.getElementById("geneListDiv").innerHTML += geneList[i].Gene + ", ";
//        }
//    }
//}

function drawHighlightedGenes(){
    var chr = "chr"+selectedChr;

    selectedGenes = [];

    for(var i = 0; i < geneList.length; i++){

        if(geneList[i].Chromosome == chr &&
            Math.floor(geneList[i].Start/1000000) >= regionMin-1 &&
            Math.ceil(geneList[i].Stop/1000000) <= regionMax+1
        ){
          selectedGenes.push(geneList[i]);
        }
    }

    var w = 1000;
    var h = 80;

    var xScale = d3.scale.linear()
        .domain([regionMin, regionMax])
        .range([0,w]);

    d3.select("#geneDisplayDiv").selectAll("svg").remove();

    var svg = d3.select("#geneDisplayDiv")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    svg.selectAll("rect")
        .data(selectedGenes)
        .enter()
        .append("rect")

        .attr("x", function(d) {
            return xScale(d.Start/1000000);
        })
        .attr("y", 15)
        .attr("width", 3)
        .attr("height", 50)
        .on("mouseover", function(d) {
            console.log(d.Gene + " Start: " + d.Start + " End: " + d.Stop);
        });
}



function chromosomeBrushed(chr, minVal, maxVal){

    regionMin = minVal;
    regionMax = maxVal;

    drawHighlightedGenes();
    if (selectedChr != chr){
        chromoSelected(chr);
        wrangleData();
    }
    else {
        wrangleData();
    }
}

function setChrLength(chr){
    var chrLengths = [155, 249, 243, 197, 191, 180, 171, 159, 146, 141, 135, 134, 133, 115, 107, 102, 90, 81, 78, 59, 62, 48, 51];
    regionMin = 0;
    regionMax = chrLengths[chr];
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

function rawDataLoaded(error, rawDataIn){
        //geneList = geneListIn;
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

        data = allData;

        drawHisto();
        loadScreen();
    }

function loadGeneList(error, geneListIn){
    geneList = geneListIn;
    drawHighlightedGenes();
}

function loadScreen(){

    data = [data];

    var width = 960, height = 900, padding = 0.005; //padding = .05

    d3.select("#chordDiv").selectAll("#chordSvg").remove();
    d3.select("#chordDiv").selectAll("#chord").remove();

    chart = d3.chord2()
        .width(width)
        .height(height)
        .padding(padding);


    d3.select("#chordDiv")
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
    document.getElementById("header").style.fontFamily = "Arial, 'Helvetica Neue', Helvetica, sans-serif";
    document.getElementById("barChart").style.margin = "20px 50px 20px 20px";
    document.getElementById("chordSvg").style.margin = "20px 50px 10px 20px";
}

function startHere(chr){
    setChrLength(chr);

    selectedChr = chr;
    // Load each data file, and then call rawDataLoaded() when they are finished.
    queue()
        .defer(d3.tsv, 'data/1mb_resolution_intrachromosomal/chr'+chr+'/MAPQGE30/chr'+chr+'_1mb_header.RAWobserved')
        .await(rawDataLoaded);
    queue()
        .defer(d3.csv, 'data/output_ENSEMBL.csv')
        .await(loadGeneList);
}
setupDivs();
regionMax = 51;
selectedChr = 22;
//regionMin = 0;
chrBrush();
startHere(22);
//showHighlightedGenes(0,51);
//})();