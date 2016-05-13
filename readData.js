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
var regionMin2;
var regionMax2;
var geneList;
var selectedChr;
var selectedChr2;
var selectedGenes = [];
var leftmaxGenes = new Set(['PIWIL3', 'SGSM1', 'TMEM211', 'KIAA1671', 'CRYBB3', 'CRYBB2', 'LRP5L', 'ADRBK2']);
var rightmaxGenes = new Set(['MYO18B', 'SEZ6L', 'ASPHD2', 'HPS4', 'SRRD', 'TFIP11', 'TPST2', 'CRYBB1']);
var regionOffset = 0;
var justStarted = true;

//(function () {

function handle(e){
    if (e.keyCode === 13){

        var term = document.getElementById("search1").value;
        var spltTerm = term.split(' ');
        var chrArr = ["x", "X", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22" ];
        if (spltTerm.length == 1){

            if (contains(chrArr, spltTerm) == false){
                searchSingleGene(spltTerm[0]);
            }
            else {
                if ((spltTerm == "x")) {
                    spltTerm = "X";
                }
                document.getElementById("search1").value = "Chromosome " + spltTerm;
                clearBrush1();
                selectedChr = spltTerm;
                chromoSelected(spltTerm);
                chrBrush();
            }
        }
        else if (spltTerm.length == 2){

            if ((spltTerm[0] != 'chromosome') && (spltTerm[0] != 'Chromosome')){
                alert('Please enter a valid search term in the the form -> \"gene\", \"chromosome digit\", or \"digit\".  Did you spell chromosome correctly?');
            }
            else{
                if ((spltTerm == "x")) {
                    spltTerm = "X";
                }
                document.getElementById("search1").value = "Chromosome " + spltTerm[1];
                clearBrush1();
                selectedChr = spltTerm[1];
                chromoSelected(spltTerm[1]);
                chrBrush();
            }

        }
        else{
            alert('Please enter a valid search term in the the form -> \"gene\", \"chromosome digit\", or \"digit\"');
        }
    }
}

function handleButton(){

    var term = document.getElementById("search1").value;
    var spltTerm = term.split(' ');
    var chrArr = ["x", "X", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22" ];
    if (spltTerm.length == 1){

        if (contains(chrArr, spltTerm) == false){
            searchSingleGene(spltTerm[0]);
        }
        else {
            if ((spltTerm == "x")) {
                spltTerm = "X";
            }
            document.getElementById("search1").value = "Chromosome " + spltTerm;
            clearBrush1();
            selectedChr = spltTerm;
            chromoSelected(spltTerm);
            chrBrush();
        }
    }
    else if (spltTerm.length == 2){

        if ((spltTerm[0] != 'chromosome') && (spltTerm[0] != 'Chromosome')){
            alert('Please enter a valid search term in the the form -> \"gene\", \"chromosome digit\", or \"digit\".  Did you spell chromosome correctly?');
        }
        else{
            if ((spltTerm == "x")) {
                spltTerm = "X";
            }
            document.getElementById("search1").value = "Chromosome " + spltTerm[1];
            clearBrush1();
            selectedChr = spltTerm[1];
            chromoSelected(spltTerm[1]);
            chrBrush();
        }

    }
    else{
        alert('Please enter a valid search term in the the form -> \"gene\", \"chromosome digit\", or \"digit\"');
    }
}


function handle2(e){
    if (e.keyCode === 13){

        var term = document.getElementById("search2").value;
        var spltTerm = term.split(' ');
        var chrArr = ["x", "X", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22" ];
        if (spltTerm.length == 1){

            if (contains(chrArr, spltTerm) == false){
                searchSingleGene2(spltTerm[0]);
            }
            else {
                if ((spltTerm == "x")) {
                    spltTerm = "X";
                }
                document.getElementById("search2").value = "Chromosome " + spltTerm;

                //chromoSelected(spltTerm);
                //chrBrush();
                clearBrush2();
                selectedChr2 = spltTerm[1];
                startHere2(spltTerm);
            }
        }
        else if (spltTerm.length == 2){

            if ((spltTerm[0] != 'chromosome') && (spltTerm[0] != 'Chromosome')){
                alert('Please enter a valid search term in the the form -> \"gene\", \"chromosome digit\", or \"digit\".  Did you spell chromosome correctly?');
            }
            else{
                if ((spltTerm == "x")) {
                    spltTerm = "X";
                }
                document.getElementById("search2").value = "Chromosome " + spltTerm[1];

                //chromoSelected(spltTerm[1]);
                //chrBrush();
                clearBrush2();
                selectedChr2 = spltTerm[1];
                startHere2(spltTerm[1]);
            }

        }
        else{
            alert('Please enter a valid search term in the the form -> \"gene\", \"chromosome digit\", or \"digit\"');
        }
    }
}

function handleButton2(){
    var term = document.getElementById("search2").value;
    var spltTerm = term.split(' ');
    var chrArr = ["x", "X", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22" ];
    if (spltTerm.length == 1){

        if (contains(chrArr, spltTerm) == false){
            searchSingleGene2(spltTerm[0]);
        }
        else {
            if ((spltTerm == "x")) {
                spltTerm = "X";
            }
            document.getElementById("search2").value = "Chromosome " + spltTerm;

            //chromoSelected(spltTerm);
            //chrBrush();
            clearBrush2();
            selectedChr2 = spltTerm[1];
            startHere2(spltTerm);
        }
    }
    else if (spltTerm.length == 2){

        if ((spltTerm[0] != 'chromosome') && (spltTerm[0] != 'Chromosome')){
            alert('Please enter a valid search term in the the form -> \"gene\", \"chromosome digit\", or \"digit\".  Did you spell chromosome correctly?');
        }
        else{
            if ((spltTerm == "x")) {
                spltTerm = "X";
            }
            document.getElementById("search2").value = "Chromosome " + spltTerm[1];

            //chromoSelected(spltTerm[1]);
            //chrBrush();
            clearBrush2();
            selectedChr2 = spltTerm[1];
            startHere2(spltTerm[1]);
        }

    }
    else{
        alert('Please enter a valid search term in the the form -> \"gene\", \"chromosome digit\", or \"digit\"');
    }

}

function drawHighestConnected(){
    //console.log('drawHighestConnected');
    var maxCounts = [];
    var leftmaxRegions = new Set();
    var rightmaxRegions = new Set();

    var leftRegion;
    var rightRegion;

    for (var i = groupsData.length; i < data.connections.length; i++){
        maxCounts.push(data.connections[i][0].value);
    }

    maxCounts.sort(function(a, b){return b-a});
    maxCounts = maxCounts.slice(0,1);


    if (selectedChr2 == null){
        for (i = groupsData.length; i < data.connections.length; i++){
            if (contains(maxCounts, data.connections[i][0].value)){
                leftmaxRegions.add(data.connections[i][0].group);
                rightmaxRegions.add(data.connections[i][1].group);
                leftRegion=data.connections[i][0].group;
                rightRegion=data.connections[i][1].group;
            }
        }

        if(leftRegion == undefined){
            document.getElementById('connectedLeftHeader').innerHTML = 'No Data Found in your Selection';
            document.getElementById('connectedRightHeader').innerHTML = 'No Data Found in your Selection';
        }
        else{
            document.getElementById('connectedLeftHeader').innerHTML = 'Chromosome ' + selectedChr + ' ' + leftRegion + 'Mb Region';
            document.getElementById('connectedRightHeader').innerHTML = 'Chromosome ' + selectedChr + ' ' + rightRegion + 'Mb Region';
        }

        //console.log(maxRegions);
        var leftgenes = "";
        var rightgenes = "";
        //console.log(leftmaxGenes);
        leftmaxGenes.clear();
        rightmaxGenes.clear();
        if(geneList != undefined) {
            for (i = 0; i < geneList.length; i++) {
                if (geneList[i].Chromosome == ('chr'+selectedChr) &&
                    leftmaxRegions.has(Math.floor(geneList[i].Start / 1000000))) {
                    leftmaxGenes.add(geneList[i].Gene);
                    //leftgenes += geneList[i].Gene + ", ";
                    leftgenes += "<a href=\"http://uswest.ensembl.org/Homo_sapiens/Search/Results?q="+geneList[i].Gene+";site=ensembl;facet_species=Human\">"+geneList[i].Gene+", </a>";
                }
                if (geneList[i].Chromosome == ('chr'+selectedChr) &&
                    rightmaxRegions.has(Math.floor(geneList[i].Start / 1000000))) {
                    rightmaxGenes.add(geneList[i].Gene);
                    rightgenes += "<a href=\"http://uswest.ensembl.org/Homo_sapiens/Search/Results?q="+geneList[i].Gene+";site=ensembl;facet_species=Human\">"+geneList[i].Gene+", </a>";
                    //rightgenes += geneList[i].Gene + ", ";
                }
            }
            //console.log(rightmaxGenes.size);
            if(leftmaxGenes.size == 0){
                leftgenes = "There are no genes in this region."
            }
            if(rightmaxGenes.size == 0){
                rightgenes = "There are no genes in this region."
            }
            //console.log(maxGenes.size);
            //leftgenes = leftgenes.substring(0, leftgenes.length-2);
            document.getElementById('connectedLeftGenes').innerHTML = leftgenes;
            document.getElementById('connectedRightGenes').innerHTML = rightgenes;
        }
        drawHighlightedGenes();
    }

    else{
        for (i = groupsData.length; i < data.connections.length; i++){
            if (contains(maxCounts, data.connections[i][0].value)){
                leftmaxRegions.add(data.connections[i][0].group);
                rightmaxRegions.add(data.connections[i][1].group - regionOffset);
                leftRegion=data.connections[i][0].group;
                rightRegion=data.connections[i][1].group - regionOffset;
            }
        }

        if(leftRegion == undefined){
            document.getElementById('connectedLeftHeader').innerHTML = 'No Genes Found in your Selection';
            document.getElementById('connectedRightHeader').innerHTML = 'No Genes Found in your Selection';
        }
        else{
            document.getElementById('connectedLeftHeader').innerHTML = 'Chromosome ' + selectedChr + ' ' + leftRegion + 'Mb Region';
            document.getElementById('connectedRightHeader').innerHTML = 'Chromosome ' + selectedChr2 + ' ' + rightRegion + 'Mb Region';
        }

        //console.log(maxRegions);
        var searchString = "";
        var leftgenes = "";
        var rightgenes = "";
        leftmaxGenes.clear();
        rightmaxGenes.clear();
        if(geneList != undefined) {
            for (i = 0; i < geneList.length; i++) {
                if (geneList[i].Chromosome == ('chr'+selectedChr) &&
                    leftmaxRegions.has(Math.floor(geneList[i].Start / 1000000))) {
                    leftmaxGenes.add(geneList[i].Gene);
                    leftgenes += "<a href=\"http://uswest.ensembl.org/Homo_sapiens/Search/Results?q="+geneList[i].Gene+";site=ensembl;facet_species=Human\">"+geneList[i].Gene+", </a>";
                    //leftgenes += geneList[i].Gene + ", ";
                    //leftgenes += geneList[i].Gene + ", ";
                }
                if (geneList[i].Chromosome == ('chr'+selectedChr2) &&
                    rightmaxRegions.has(Math.floor(geneList[i].Start / 1000000))) {
                    rightmaxGenes.add(geneList[i].Gene);
                    //rightgenes += geneList[i].Gene + ", ";
                    rightgenes += "<a href=\"http://uswest.ensembl.org/Homo_sapiens/Search/Results?q="+geneList[i].Gene+";site=ensembl;facet_species=Human\">"+geneList[i].Gene+", </a>";
                }
            }
            //console.log(maxGenes.size);
            //leftgenes = leftgenes.substring(0, leftgenes.length-2);
            //console.log(rightmaxGenes.size);
            if(leftmaxGenes.size == 0){
                leftgenes = "There are no genes in this region."
            }
            if(rightmaxGenes.size == 0){
                rightgenes = "There are no genes in this region."
            }
            document.getElementById('connectedLeftGenes').innerHTML = leftgenes;
            document.getElementById('connectedRightGenes').innerHTML = rightgenes;
         }
        drawHighlightedGenes();
        drawHighlightedGenes2();
    }


}

function searchSingleGene(gene){
    gene = gene.toUpperCase();
    //console.log(gene);
    document.getElementById("search1").value = gene;
    var found = false;
    var chr;
    for (var i = 0; i < geneList.length; i++){
        if (geneList[i].Gene == gene){
            found = true;
            chr = geneList[i].Chromosome.substring(3,geneList[i].Chromosome.length);
            var min = Math.floor(geneList[i].Start/1000000);
            //var max = Math.ceil(geneList[i].Stop/1000000);



            //commented out 04-26
            //startHere(chr);

            selectedChr = chr;
            chromosomeBrushed(chr, min-1, min+1);
            regionMin = (Math.floor(geneList[i].Start/1000000));
            regionMax = (Math.ceil(geneList[i].Stop/1000000));
            //wrangleData();
            drawHighlightedGenes();
        }
    }
    if (found == false){
        alert('Sorry, that gene could not be found in the HAVANA gene database. Please enter another.')
    }

}

function searchSingleGene2(gene){
    gene = gene.toUpperCase();
    console.log(gene);
    document.getElementById("search2").value = gene;
    var found = false;
    var chr;
    for (var i = 0; i < geneList.length; i++){
        if (geneList[i].Gene == gene){
            found = true;
            chr = +geneList[i].Chromosome.substring(3,geneList[i].Chromosome.length);
            console.log(geneList[i]);
            var min = Math.floor(geneList[i].Start/1000000);
            //var max = Math.ceil(geneList[i].Stop/1000000);
            //console.log(min);
            //console.log(max);
            selectedChr2 = chr;
            //console.log(selectedChr2)
            //startHere2(chr);
            chromosomeBrushed2(chr, min-1, min+1);

            regionMin = (Math.floor(geneList[i].Start/1000000));
            regionMax = (Math.ceil(geneList[i].Stop/1000000));
            drawHighlightedGenes2();
        }
    }
    if (found == false){
        alert('Sorry, that gene could not be found in the HAVANA gene database. Please enter another.')
    }

}


// Cheater contains method because JS doesn't have one.  Does not match type.
function contains(a, obj) {
    var i = a.length;
    while (i--) {
        if (a[i] == obj) {
            return true;
        }
    }
    return false;
}

// Main function for drawing histogram of interaction strength
function drawHisto(){
    countData.sort(function(a, b){return a-b});

    //Width and height
    //var w = 1000;
    //var h = 200;

    var margin = {top: 20, right: 80, bottom: 30, left: 20},
        w = 1000 - margin.left - margin.right,
        h = 230 - margin.top - margin.bottom;
    var barPadding = 0;

    var dataset = countData;

    var y = d3.scale.linear()
        .domain([0, countData[countData.length-1]])
        .range([h, 0]);


    var x = d3.scale.linear()
        .domain([0,dataset.length])
        .range([0,w]);


    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("right");

    //Create SVG element
    d3.select('#barChartDiv').selectAll('svg').remove();

    var svg = d3.select("#barChartDiv").append("svg")
        .attr("width", w + margin.left + margin.right)
        .attr("height", h + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.selectAll("rect")
        .data(dataset)
        .enter().append("rect")

        .attr("x", function(d, i) {
            return (i * (w / dataset.length));
        })
        .attr("y", function(d) {
            //return h - (d);
            return  y(d);
        })
        .attr("width", w / dataset.length - barPadding)
        .attr("height", function(d) {
            return h - y(d);
        });

    svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", "translate(910,0)")
        .call(yAxis)
        ;

    svg.append("text")
        .attr("x", -95)
        .attr("y", 975)
        .attr("width", 100)
        .style("text-anchor", "middle")
        .text("Number of Sequenced Reads")
        .attr("transform", "rotate(-90)");

    svg.append("text")
        .attr("x", (w + margin.left + margin.right)/2)
        .attr("y", 200)
        .attr("width", 100)
        .style("text-anchor", "middle")
        .text("Each bar is a unique two-site coupling.")
        //.attr("transform", "rotate()")
    ;



    //var yAxis = d3.svg.axis().scale(y).orient("right").ticks(5);
    //svg.append("g")
    //    .attr("class", "y-axis")
    //    .attr("transform", "translate(930,0)")
    //    .attr("y", 6)
    //    .attr("dy", ".71em")
    //    .call(yAxis);

    var brush = d3.svg.brush()
        .x(x)
        .on("brush", function () {
            var selectedRange;
            currentBrushRegion = brush.extent();

            if (brush.empty()) {
                selectedRange = x.domain();
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
            if (selectedChr2 != null){
                wrangleData2();
            }
            else{
                wrangleData();
            }

        });


    svg.append("text")
        .attr("x", 100)
        .attr("y", 1000)
        .attr("width", 100)
        .style("text-anchor", "middle")
        .text("Number of Sequencing Reads")
        .attr("transform", "rotate(-90)")
    ;


    countMin = 0;
    countMax = 1;

    var gBrush = svg.append('g')
        .attr('class', 'x brush')
        .call(brush);
    gBrush.selectAll("rect")
        .attr("height", h);

}

// Builds relationship table that is used by the chord diagram for display.
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

    //if (justStarted == false){
        drawHighestConnected();
    //}
    loadScreen();
    //justStarted = false;
}

// Builds relationship table that is used by the chord diagram for displaying 2 chromosomes.
function wrangleData2(){

    //console.log('wrangledata2');

    data = {connections: [], labels: {}};

    //console.log(groupsData.length);

    data.labels = allData.labels;

    for (var i = 0; i < groupsData.length; i++){
        data.connections.push(allData.connections[i]);
    }

    //console.log(allData.connections[200]);
    //console.log("Min: "+regionMin2);
    //console.log("Max: "+regionMax2);

    for (i = groupsData.length; i < allData.connections.length; i++){

        if ((allData.connections[i][0].value > countMin) &&
            (allData.connections[i][0].value < countMax) &&
            (allData.connections[i][0].group >= regionMin) &&
            (allData.connections[i][0].group <= regionMax) &&
            (allData.connections[i][1].group >= (regionMin2+48)) &&
            (allData.connections[i][1].group <= (regionMax2+48))){
            data.connections.push(allData.connections[i]);
        }

        //if ((allData.connections[i][0].value > countMin) &&
        //    (allData.connections[i][0].value < countMax) //&&
        //        //(allData.connections[i][0].group >= regionMin) &&
        //    //(allData.connections[i][1].group >= regionMin) &&
        //        //(allData.connections[i][0].group <= regionMax) &&
        //    //(allData.connections[i][1].group <= regionMax)
        //){
        //    data.connections.push(allData.connections[i]);
        //}
    }
    drawHighestConnected();
    loadScreen();
}


var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
        return "<strong>Gene:</strong> <span style='color:#b3ffb3'>" + d.Gene + "</span>";
    })
;

// Filter and aggrigate gene list depending on highlighted region for display.
// Also, draws genes based on region.
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

    //var w = 1000;
    //var h = 300;

    var margin = {top: 0, right: 20, bottom: 100, left: 20},
        w = 1000 - margin.left - margin.right,
        h = 300 - margin.top - margin.bottom;


    var xScale = d3.scale.linear()
        .domain([regionMin, regionMax+1])
        .range([0,w]);

    d3.select("#geneDisplayDiv1").selectAll("svg").remove();

    var svg = d3.select("#geneDisplayDiv1").append("svg")
        .attr("width", w + margin.left + margin.right)
        .attr("height", h + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //var svg = d3.select("#geneDisplayDiv1")
    //    .append("svg")
    //    .attr("width", w)
    //    .attr("height", h);

    svg.call(tip);

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
        .attr("fill", function(d){
            if (leftmaxGenes.has(d.Gene)){
                return "#b3ffb3";
            }
            if (rightmaxGenes.has(d.Gene)){
                return "#b3ffb3";
            }
        })
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide)
        .on("click", function(d){
            window.location = "http://uswest.ensembl.org/Homo_sapiens/Search/Results?q="+d.Gene+";site=ensembl;facet_species=Human";
        })
        ;


    var xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(5);
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(-10," + 70 + ")")
        .call(xAxis);

    svg.append("text")
        .attr("x", 500)
        .attr("y", 110)
        .style("text-anchor", "middle")
        .text("Chromosome "+selectedChr+" Position in Megabases");
}

// Filter and agrigate gene list depending on highlighted region for display.
// Also, draws genes based on region.
function drawHighlightedGenes2(){


    var chr = "chr"+selectedChr2;

    selectedGenes = [];

    for(var i = 0; i < geneList.length; i++){

        if(geneList[i].Chromosome == chr &&
            Math.floor(geneList[i].Start/1000000) >= regionMin2-1 &&
            Math.ceil(geneList[i].Stop/1000000) <= regionMax2+1
        ){
            selectedGenes.push(geneList[i]);
        }
    }

    //var w = 1000;
    //var h = 300;

    var margin = {top: 0, right: 20, bottom: 100, left: 20},
        w = 1000 - margin.left - margin.right,
        h = 300 - margin.top - margin.bottom;

    var xScale = d3.scale.linear()
        .domain([regionMin2, regionMax2+1])
        .range([0,w]);

    d3.select("#geneDisplayDiv2").selectAll("svg").remove();

    //var svg = d3.select("#geneDisplayDiv2")
    //    .append("svg")
    //    .attr("width", w)
    //    .attr("height", h);

    var svg = d3.select("#geneDisplayDiv2").append("svg")
        .attr("width", w + margin.left + margin.right)
        .attr("height", h + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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
        .attr("fill", function(d){
            if (leftmaxGenes.has(d.Gene)){
                return "#b3ffb3";
            }
            if (rightmaxGenes.has(d.Gene)){
                return "#b3ffb3";
            }
        })
        //.on("mouseover", function(d) {
        //    var info = d.Gene + " Start: " + d.Start + " End: " + d.Stop + " Chromosome: " + selectedChr2;
        //    document.getElementById("geneNameDiv2").innerHTML = info;
        //})
        //.on("mouseout", function(d) {
        //    document.getElementById("geneNameDiv2").innerHTML = "";
        //})
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide)
        .on("click", function(d){
            window.location = "http://uswest.ensembl.org/Homo_sapiens/Search/Results?q="+d.Gene+";site=ensembl;facet_species=Human";
        })
        ;


    var xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(5);
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + 70 + ")")
        .call(xAxis);

    svg.append("text")
        .attr("x", 500)
        .attr("y", 110)
        .style("text-anchor", "middle")
        .text("Chromosome "+selectedChr2+" Position in Megabases");
}

// Sets necessary values when the displayed chromosome is brushed.
function chromosomeBrushed(chr, minVal, maxVal){
    //document.getElementById("search1").value = null;

    clearBrush1();

    regionMin = minVal;
    regionMax = maxVal;

    drawHighlightedGenes();
    if (selectedChr2 != null){
        //chromoSelected(chr);
        wrangleData2();
    }
    else {

        wrangleData();
    }
}

function chromosomeReallyBrushed(chr, minVal, maxVal){
    document.getElementById("search1").value = null;

    regionMin = minVal;
    regionMax = maxVal;

    drawHighlightedGenes();
    if (selectedChr2 != null){
        //chromoSelected(chr);
        wrangleData2();
    }
    else {
        wrangleData();
    }
}


// Sets necessary values when the displayed chromosome is brushed.
function chromosomeBrushed2(chr, minVal, maxVal){

    regionMin2 = minVal;
    regionMax2 = maxVal;

    //console.log(regionMin2, regionMax2);
    //
    drawHighlightedGenes2();
    //if (selectedChr != chr){
    //    chromoSelected(chr);
    //    wrangleData();
    //}
    //else {
        wrangleData2();
    //}
}

function chromosomeReallyBrushed2(chr, minVal, maxVal){
    document.getElementById("search2").value = null;

    regionMin2 = minVal;
    regionMax2 = maxVal;

    //console.log(regionMin2, regionMax2);
    //
    drawHighlightedGenes2();
    //if (selectedChr != chr){
    //    chromoSelected(chr);
    //    wrangleData();
    //}
    //else {
    wrangleData2();
    //}
}

// Sets length of chromosome based on selection
function setChrLength(chr){
    var chrLengths = [155, 249, 243, 197, 191, 180, 171, 159, 146, 141, 135, 134, 133, 115, 107, 102, 90, 81, 78, 59, 62, 48, 51];
    regionMin = 0;
    regionMax = chrLengths[chr];
    //console.log("chromosome length: " + regionMax);
}

// Sets length of chromosome based on selection
function setChrLength2(chr){
    var chrLengths = [155, 249, 243, 197, 191, 180, 171, 159, 146, 141, 135, 134, 133, 115, 107, 102, 90, 81, 78, 59, 62, 48, 51];
    regionMin2 = 0;
    regionMax2 = chrLengths[chr];
    //console.log(regionMin2, regionMax2);
}

// Helper function to clear arrays and pass on chromosome.
function chromoSelected(chr){
    clearArrays();
    startHere(chr);
}

// Clears data arrays for chromosome selection
function clearArrays(){
    allData = {connections: [], labels: {}};
    data = {connections: [], labels: {}};
    groupsData = [];
    connectionsData= [];
    countData = [];
}

// Reads in raw count data from the selected chromosome and builds data model
function rawDataLoaded(error, rawDataIn, genelistIn){
        loadGeneList(error, genelistIn);

        clearArrays();
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

                //toPush = [{group: +rawData[i].group1/1000000, value: 1},
                //    {group: +rawData[i].group2/1000000, value: 1}];
                //allData.connections.push(toPush);

                // Make an array of just the connections.
                connectionsData.push(toPush);
            }
        }
        data = allData;

        drawHisto();
        //loadScreen();
        wrangleData();
        //drawHighestConnected();
    }

// Reads in raw count data from the selected chromosomes and builds data model
function rawDataLoaded2(error, rawDataIn){
    //geneList = geneListIn;
    clearArrays();
    var headers = ["group1", "group2", "count"].join("\t");
    rawDataIn = d3.tsv.parse(headers + "\n" + rawDataIn);
    rawData = rawDataIn;

    //console.log(rawDataIn);

    maxCount = d3.max(rawData.map(function (d){
        // Don't Exclude self interactions
        //if (d.group1 != d.group2){
            return +d.count;
        //}
    }));

    //console.log(maxCount);

    //var chr1last = rawData[rawData.length-1].group1/1000000;
    var chr1last = rawData[rawData.length-1].group2/1000000;
    regionOffset = chr1last;
    //console.log(chr1last + " 1last");

    for (var i = 0; i < chr1last; i++){
        var toPush = [{group: +i, value: +0.5}];
        allData.connections.push(toPush);
        allData.labels[i] = i + " Mb";

        // Make an array of just the groups
        groupsData.push(toPush);
    }
    allData.labels[chr1last] = chr1last + " Mb";

    var chr2last = rawData[rawData.length-1].group2/1000000;
    for (i = chr1last; i < (chr1last+chr2last); i++){
        toPush = [{group: +i, value: +0.5}];
        allData.connections.push(toPush);
        var index = i-chr1last;
        allData.labels[i] = index + " Mb";

        // Make an array of just the groups
        groupsData.push(toPush);
    }

    for (i = 0; i < rawData.length; i++){
        if(rawData[i].group1 != rawData[i].group2){
            // Push to countData for bar chart
            countData.push(rawData[i].count);

            toPush = [{group: +rawData[i].group1/1000000, value: (rawData[i].count/maxCount)},
                //{group: +rawData[i].group2/1000000, value: (rawData[i].count/maxCount)}];
                {group: +(rawData[i].group2/1000000)+chr1last, value: (rawData[i].count/maxCount)}];
            allData.connections.push(toPush);


            // Make an array of just the connections.
            connectionsData.push(toPush);
        }
    }

    data = allData;
    drawHighestConnected();
    drawHisto();
    //loadScreen();
    wrangleData2();
}

// Reads in gene list and parses for data display
function loadGeneList(error, geneListIn){
    geneList = geneListIn;
    //console.log(geneList);
    drawHighlightedGenes();
    drawHighlightedGenes2();
}

// Once all filtering and model building is complete, function is called to
// build the chord diagram
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
        .call(chart)

        .append("text")
        .attr("x", 750)
        .attr("y", 50)
        .style("text-anchor", "center")
        .style("font-size", "200%")
        .text("Chromosome "+selectedChr)
    ;

    d3.select("#chordDiv")
        .selectAll("#chord")
        .append("text")
        .attr("x", 500)
        .attr("y", 50)
        .style("text-anchor", "middle")
        .text("Chromosome Position in Megabases");

    if (selectedChr2 != null){
        d3.select("#chordDiv")
            .selectAll("#chord")
            .append("text")
            .attr("x", 50)
            .attr("y", 50)
            .style("text-anchor", "center")
            .style("font-size", "200%")
            .text("Chromosome " + selectedChr2);
    }
}

// Cheater, should probably be in css
function setupDivs(){
    document.getElementById("header").style.fontFamily = "Arial, 'Helvetica Neue', Helvetica, sans-serif";
    //document.getElementById("barChartDiv").style.margin = "20px 50px 20px 20px";
    document.getElementById("chordSvg").style.margin = "20px 50px 10px 20px";
}

// Start chain of data loading, filtering and aggregation for the selection of one chromosome
function startHere(chr){
    setChrLength(chr);
    selectedChr = chr;
    chrBrush();
    // Load each data file, and then call rawDataLoaded() when they are finished.
    queue()
        .defer(d3.tsv, 'data/1mb_resolution_intrachromosomal/chr'+chr+'/MAPQGE30/chr'+chr+'_1mb_header.RAWobserved')
    //    .await(rawDataLoaded);
    //queue()
        .defer(d3.csv, 'data/output_HAVANA.csv')
        //.await(loadGeneList);
        .await(rawDataLoaded);

}

// Start chain of data loading, filtering and aggregation for the selection of two chromosomes
function startHere2(chr2){
    //alert("caller is " + arguments.callee.caller.toString());
    //console.log(arguments.callee.caller.toString().includes('onclick'));
    var filepath = "";

    if (document.getElementById('dummyDiv').style.display == 'none' && selectedChr2 == null){

        $("#chr2holder").slideDown("slow");
        document.getElementById('dummyDiv').style.display = 'block';
        document.getElementById('addButton').innerHTML = '<span id="glyph" class="glyphicon glyphicon-minus"></span> Remove Chromosome';

        selectedChr2 = chr2;
        setChrLength2(chr2);
        chrBrush2();
        //chrBrush();
        drawHighlightedGenes2();
        if (selectedChr == selectedChr2){
            //alert("Please select two different chromosomes.")
        }

        else if (selectedChr < selectedChr2){
            filepath = 'data/1mb_resolution_interchromosomal/chr'+selectedChr+'_chr'+selectedChr2+'/MAPQGE30/chr'+selectedChr+'_'+selectedChr2+'_1mb.RAWobserved';
        }

        else{
            filepath = 'data/1mb_resolution_interchromosomal/chr'+selectedChr2+'_chr'+selectedChr+'/MAPQGE30/chr'+selectedChr2+'_'+selectedChr+'_1mb.RAWobserved';
        }
        //var filepath = 'data/1mb_resolution_interchromosomal/chr'+chr1+'_chr'+chr2+'/MAPQGE30/chr'+chr1+'_'+chr2+'_1mb.RAWobserved';


        // Load each data file, and then call rawDataLoaded() when they are finished.
        queue()
            .defer(d3.text, filepath)
            .await(rawDataLoaded2);
    }

    else if (arguments.callee.caller.toString().includes('onclick')){
        selectedChr2 = null;
        //chrBrush();
        $("#chr2holder").slideUp();
        clearBrush1();
        clearBrush2();
        document.getElementById('dummyDiv').style.display = 'none';
        document.getElementById('addButton').innerHTML = '<span id="glyph" class="glyphicon glyphicon-plus"></span> Add Chromosome';
        startHere(selectedChr);
    }
    else if (document.getElementById('dummyDiv').style.display == 'block'){
        //console.log('block');
        selectedChr2 = chr2;
        setChrLength2(chr2);
        chrBrush2();
        chrBrush();
        drawHighlightedGenes2();
        if (selectedChr == selectedChr2){
            alert("Please select two different chromosomes.")
        }

        else if (selectedChr < selectedChr2){
            filepath = 'data/1mb_resolution_interchromosomal/chr'+selectedChr+'_chr'+selectedChr2+'/MAPQGE30/chr'+selectedChr+'_'+selectedChr2+'_1mb.RAWobserved';
        }

        else{
            filepath = 'data/1mb_resolution_interchromosomal/chr'+selectedChr2+'_chr'+selectedChr+'/MAPQGE30/chr'+selectedChr2+'_'+selectedChr+'_1mb.RAWobserved';
        }
        queue()
            .defer(d3.text, filepath)
            .await(rawDataLoaded2);
    }


}

setupDivs();
regionMax = 51;
selectedChr = 22;
//regionMin = 0;
chrBrush();
startHere(22);
//})();