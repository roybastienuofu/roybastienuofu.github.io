

var gBrushB;


function chrBrush() {
    //console.log(selectedChr);
    d3.select("#gBrushB").remove();
    var svgB = d3.select("#chrBrush")
        .append("svg")
        .attr("width", 560)
        .attr("height", 50);
    var xScaleB = d3.scale.linear()
        .domain([0, regionMax])
        .range([0, 560]);
    var brushB = d3.svg.brush()
        .x(xScaleB)
        .on("brush", function () {
            var selectedRangeB;
            currentBrushRegionB = brushB.extent();

            if (brushB.empty()) {
                selectedRangeB = xScaleB.domain();
            } else {
                selectedRangeB = brushB.extent();
            }
            //console.log(Math.round(selectedRangeB[0]), Math.round(selectedRangeB[1]));
            chromosomeBrushed(selectedChr, Math.round(selectedRangeB[0]), Math.round(selectedRangeB[1]));

        });
    //svgB.select('#gBrushB').remove();
    gBrushB = svgB.append('g')
        .attr('class', 'x brush')
        .attr('id', 'gBrushB')
        .call(brushB);
    gBrushB.selectAll("rect")
        .attr("height", 40);

    ///////////////////////////////////////////////////////////////////////////////////////
}
//    var svg1 = d3.select("#chr1")
//        .append("svg")
//        .attr("width", 160)
//        .attr("height", 50);
//    var xScale1 = d3.scale.linear()
//        .domain([0, 249])
//        .range([0, 160]);
//    var brush1 = d3.svg.brush()
//        .x(xScale1)
//        .on("brush", function () {
//            var selectedRange1;
//            currentBrushRegion1 = brush1.extent();
//
//            if (brush1.empty()) {
//                selectedRange1 = xScale1.domain();
//            } else {
//                selectedRange1 = brush1.extent();
//            }
//            //console.log(Math.round(selectedRange[0]), Math.round(selectedRange[1]));
//            chromosomeBrushed(1, Math.round(selectedRange1[0]), Math.round(selectedRange1[1]));
//        });
//    var gBrush1 = svg1.append('g')
//        .attr('class', 'x brush')
//        .call(brush1);
//    gBrush1.selectAll("rect")
//        .attr("height", 40);
//
//    ///////////////////////////////////////////////////////////////////////////////////////
//
//    var svg2 = d3.select("#chr2")
//        .append("svg")
//        .attr("width", 160)
//        .attr("height", 50);
//    var xScale2 = d3.scale.linear()
//        .domain([0, 243])
//        .range([0, 160]);
//    var brush2 = d3.svg.brush()
//        .x(xScale2)
//        .on("brush", function () {
//            var selectedRange2;
//            currentBrushRegion2 = brush2.extent();
//
//            if (brush2.empty()) {
//                selectedRange2 = xScale2.domain();
//            } else {
//                selectedRange2 = brush2.extent();
//            }
//            //console.log(Math.round(selectedRange[0]), Math.round(selectedRange[1]));
//            chromosomeBrushed(2, Math.round(selectedRange2[0]), Math.round(selectedRange2[1]));
//        });
//    var gBrush2 = svg2.append('g')
//        .attr('class', 'x brush')
//        .call(brush2);
//    gBrush2.selectAll("rect")
//        .attr("height", 40);
//
//    ///////////////////////////////////////////////////////////////////////////////////////
//
//    var svg3 = d3.select("#chr3")
//        .append("svg")
//        .attr("width", 160)
//        .attr("height", 50);
//    var xScale3 = d3.scale.linear()
//        .domain([0, 197])
//        .range([0, 160]);
//    var brush3 = d3.svg.brush()
//        .x(xScale3)
//        .on("brush", function () {
//            var selectedRange3;
//            currentBrushRegion3 = brush3.extent();
//
//            if (brush3.empty()) {
//                selectedRange3 = xScale3.domain();
//            } else {
//                selectedRange3 = brush3.extent();
//            }
//            //console.log(Math.round(selectedRange[0]), Math.round(selectedRange[1]));
//            chromosomeBrushed(3, Math.round(selectedRange3[0]), Math.round(selectedRange3[1]));
//        });
//    var gBrush3 = svg3.append('g')
//        .attr('class', 'x brush')
//        .call(brush3);
//    gBrush3.selectAll("rect")
//        .attr("height", 40);
//
//
//    ///////////////////////////////////////////////////////////////////////////////////////
//
//    var svg4 = d3.select("#chr4")
//        .append("svg")
//        .attr("width", 160)
//        .attr("height", 50);
//    var xScale4 = d3.scale.linear()
//        .domain([0, 191])
//        .range([0, 160]);
//    var brush4 = d3.svg.brush()
//        .x(xScale4)
//        .on("brush", function () {
//            var selectedRange4;
//            currentBrushRegion4 = brush4.extent();
//
//            if (brush4.empty()) {
//                selectedRange4 = xScale4.domain();
//            } else {
//                selectedRange4 = brush4.extent();
//            }
//            //console.log(Math.round(selectedRange[0]), Math.round(selectedRange[1]));
//            chromosomeBrushed(4, Math.round(selectedRange4[0]), Math.round(selectedRange4[1]));
//        });
//    var gBrush4 = svg4.append('g')
//        .attr('class', 'x brush')
//        .call(brush4);
//    gBrush4.selectAll("rect")
//        .attr("height", 40);
//
//
//    ///////////////////////////////////////////////////////////////////////////////////////
//
//    var svg5 = d3.select("#chr5")
//        .append("svg")
//        .attr("width", 160)
//        .attr("height", 50);
//    var xScale5 = d3.scale.linear()
//        .domain([0, 180])
//        .range([0, 160]);
//    var brush5 = d3.svg.brush()
//        .x(xScale5)
//        .on("brush", function () {
//            var selectedRange5;
//            currentBrushRegion5 = brush5.extent();
//
//            if (brush5.empty()) {
//                selectedRange5 = xScale5.domain();
//            } else {
//                selectedRange5 = brush5.extent();
//            }
//            //console.log(Math.round(selectedRange[0]), Math.round(selectedRange[1]));
//            chromosomeBrushed(5, Math.round(selectedRange5[0]), Math.round(selectedRange5[1]));
//        });
//    var gBrush5 = svg5.append('g')
//        .attr('class', 'x brush')
//        .call(brush5);
//    gBrush5.selectAll("rect")
//        .attr("height", 40);
//
//
//    ///////////////////////////////////////////////////////////////////////////////////////
//
//    var svg6 = d3.select("#chr6")
//        .append("svg")
//        .attr("width", 160)
//        .attr("height", 50);
//    var xScale6 = d3.scale.linear()
//        .domain([0, 171])
//        .range([0, 160]);
//    var brush6 = d3.svg.brush()
//        .x(xScale6)
//        .on("brush", function () {
//            var selectedRange6;
//            currentBrushRegion6 = brush6.extent();
//
//            if (brush6.empty()) {
//                selectedRange6 = xScale6.domain();
//            } else {
//                selectedRange6 = brush6.extent();
//            }
//            //console.log(Math.round(selectedRange[0]), Math.round(selectedRange[1]));
//            chromosomeBrushed(6, Math.round(selectedRange6[0]), Math.round(selectedRange6[1]));
//        });
//    var gBrush6 = svg6.append('g')
//        .attr('class', 'x brush')
//        .call(brush6);
//    gBrush6.selectAll("rect")
//        .attr("height", 40);
//
//    ///////////////////////////////////////////////////////////////////////////////////////
//
//    var svg7 = d3.select("#chr7")
//        .append("svg")
//        .attr("width", 160)
//        .attr("height", 50);
//    var xScale7 = d3.scale.linear()
//        .domain([0, 159])
//        .range([0, 160]);
//    var brush7 = d3.svg.brush()
//        .x(xScale7)
//        .on("brush", function () {
//            var selectedRange7;
//            currentBrushRegion7 = brush7.extent();
//
//            if (brush7.empty()) {
//                selectedRange7 = xScale7.domain();
//            } else {
//                selectedRange7 = brush7.extent();
//            }
//            //console.log(Math.round(selectedRange[0]), Math.round(selectedRange[1]));
//            chromosomeBrushed(7, Math.round(selectedRange7[0]), Math.round(selectedRange7[1]));
//        });
//    var gBrush7 = svg7.append('g')
//        .attr('class', 'x brush')
//        .call(brush7);
//    gBrush7.selectAll("rect")
//        .attr("height", 40);
//
//
//    ///////////////////////////////////////////////////////////////////////////////////////
//
//    var svg8 = d3.select("#chr8")
//        .append("svg")
//        .attr("width", 160)
//        .attr("height", 50);
//    var xScale8 = d3.scale.linear()
//        .domain([0, 146])
//        .range([0, 160]);
//    var brush8 = d3.svg.brush()
//        .x(xScale8)
//        .on("brush", function () {
//            var selectedRange8;
//            currentBrushRegion8 = brush8.extent();
//
//            if (brush8.empty()) {
//                selectedRange8 = xScale8.domain();
//            } else {
//                selectedRange8 = brush8.extent();
//            }
//            //console.log(Math.round(selectedRange[0]), Math.round(selectedRange[1]));
//            chromosomeBrushed(8, Math.round(selectedRange8[0]), Math.round(selectedRange8[1]));
//        });
//    var gBrush8 = svg8.append('g')
//        .attr('class', 'x brush')
//        .call(brush8);
//    gBrush8.selectAll("rect")
//        .attr("height", 40);
//
//
//    ///////////////////////////////////////////////////////////////////////////////////////
//
//    var svg9 = d3.select("#chr9")
//        .append("svg")
//        .attr("width", 160)
//        .attr("height", 50);
//    var xScale9 = d3.scale.linear()
//        .domain([0, 141])
//        .range([0, 160]);
//    var brush9 = d3.svg.brush()
//        .x(xScale9)
//        .on("brush", function () {
//            var selectedRange9;
//            currentBrushRegion9 = brush9.extent();
//
//            if (brush9.empty()) {
//                selectedRange9 = xScale9.domain();
//            } else {
//                selectedRange9 = brush9.extent();
//            }
//            //console.log(Math.round(selectedRange[0]), Math.round(selectedRange[1]));
//            chromosomeBrushed(9, Math.round(selectedRange9[0]), Math.round(selectedRange9[1]));
//        });
//    var gBrush9 = svg9.append('g')
//        .attr('class', 'x brush')
//        .call(brush9);
//    gBrush9.selectAll("rect")
//        .attr("height", 40);
//
//
//    ///////////////////////////////////////////////////////////////////////////////////////
//
//    var svg10 = d3.select("#chr10")
//        .append("svg")
//        .attr("width", 160)
//        .attr("height", 50);
//    var xScale10 = d3.scale.linear()
//        .domain([0, 135])
//        .range([0, 160]);
//    var brush10 = d3.svg.brush()
//        .x(xScale10)
//        .on("brush", function () {
//            var selectedRange10;
//            currentBrushRegion10 = brush10.extent();
//
//            if (brush10.empty()) {
//                selectedRange10 = xScale10.domain();
//            } else {
//                selectedRange10 = brush10.extent();
//            }
//            //console.log(Math.round(selectedRange[0]), Math.round(selectedRange[1]));
//            chromosomeBrushed(10, Math.round(selectedRange10[0]), Math.round(selectedRange10[1]));
//        });
//    var gBrush10 = svg10.append('g')
//        .attr('class', 'x brush')
//        .call(brush10);
//    gBrush10.selectAll("rect")
//        .attr("height", 40);
//
//    ///////////////////////////////////////////////////////////////////////////////////////
//
//    var svg11 = d3.select("#chr11")
//        .append("svg")
//        .attr("width", 160)
//        .attr("height", 50);
//    var xScale11 = d3.scale.linear()
//        .domain([0, 134])
//        .range([0, 160]);
//    var brush11 = d3.svg.brush()
//        .x(xScale11)
//        .on("brush", function () {
//            var selectedRange11;
//            currentBrushRegion11 = brush11.extent();
//
//            if (brush11.empty()) {
//                selectedRange11 = xScale11.domain();
//            } else {
//                selectedRange11 = brush11.extent();
//            }
//            //console.log(Math.round(selectedRange[0]), Math.round(selectedRange[1]));
//            chromosomeBrushed(11, Math.round(selectedRange11[0]), Math.round(selectedRange11[1]));
//        });
//    var gBrush11 = svg11.append('g')
//        .attr('class', 'x brush')
//        .call(brush11);
//    gBrush11.selectAll("rect")
//        .attr("height", 40);
//
//    ///////////////////////////////////////////////////////////////////////////////////////
//
//    var svg12 = d3.select("#chr12")
//        .append("svg")
//        .attr("width", 160)
//        .attr("height", 50);
//    var xScale12 = d3.scale.linear()
//        .domain([0, 133])
//        .range([0, 160]);
//    var brush12 = d3.svg.brush()
//        .x(xScale11)
//        .on("brush", function () {
//            var selectedRange12;
//            currentBrushRegion12 = brush12.extent();
//
//            if (brush12.empty()) {
//                selectedRange12 = xScale12.domain();
//            } else {
//                selectedRange12 = brush12.extent();
//            }
//            //console.log(Math.round(selectedRange[0]), Math.round(selectedRange[1]));
//            chromosomeBrushed(12, Math.round(selectedRange12[0]), Math.round(selectedRange12[1]));
//        });
//    var gBrush12 = svg12.append('g')
//        .attr('class', 'x brush')
//        .call(brush12);
//    gBrush12.selectAll("rect")
//        .attr("height", 40);
//
//    ///////////////////////////////////////////////////////////////////////////////////////
//
//    var svg13 = d3.select("#chr13")
//        .append("svg")
//        .attr("width", 160)
//        .attr("height", 50);
//    var xScale13 = d3.scale.linear()
//        .domain([0, 115])
//        .range([0, 160]);
//    var brush13 = d3.svg.brush()
//        .x(xScale13)
//        .on("brush", function () {
//            var selectedRange13;
//            currentBrushRegion13 = brush13.extent();
//
//            if (brush13.empty()) {
//                selectedRange13 = xScale13.domain();
//            } else {
//                selectedRange13 = brush13.extent();
//            }
//            //console.log(Math.round(selectedRange[0]), Math.round(selectedRange[1]));
//            chromosomeBrushed(13, Math.round(selectedRange13[0]), Math.round(selectedRange13[1]));
//        });
//    var gBrush13 = svg13.append('g')
//        .attr('class', 'x brush')
//        .call(brush13);
//    gBrush13.selectAll("rect")
//        .attr("height", 40);
//
//    ///////////////////////////////////////////////////////////////////////////////////////
//
//    var svg14 = d3.select("#chr14")
//        .append("svg")
//        .attr("width", 160)
//        .attr("height", 50);
//    var xScale14 = d3.scale.linear()
//        .domain([0, 107])
//        .range([0, 160]);
//    var brush14 = d3.svg.brush()
//        .x(xScale14)
//        .on("brush", function () {
//            var selectedRange14;
//            currentBrushRegion14 = brush14.extent();
//
//            if (brush14.empty()) {
//                selectedRange14 = xScale14.domain();
//            } else {
//                selectedRange14 = brush14.extent();
//            }
//            //console.log(Math.round(selectedRange[0]), Math.round(selectedRange[1]));
//            chromosomeBrushed(14, Math.round(selectedRange14[0]), Math.round(selectedRange14[1]));
//        });
//    var gBrush14 = svg14.append('g')
//        .attr('class', 'x brush')
//        .call(brush14);
//    gBrush14.selectAll("rect")
//        .attr("height", 40);
//
//    ///////////////////////////////////////////////////////////////////////////////////////
//
//    var svg15 = d3.select("#chr15")
//        .append("svg")
//        .attr("width", 160)
//        .attr("height", 50);
//    var xScale15 = d3.scale.linear()
//        .domain([0, 102])
//        .range([0, 160]);
//    var brush15 = d3.svg.brush()
//        .x(xScale15)
//        .on("brush", function () {
//            var selectedRange15;
//            currentBrushRegion15 = brush15.extent();
//
//            if (brush15.empty()) {
//                selectedRange15 = xScale15.domain();
//            } else {
//                selectedRange15 = brush15.extent();
//            }
//            //console.log(Math.round(selectedRange[0]), Math.round(selectedRange[1]));
//            chromosomeBrushed(15, Math.round(selectedRange15[0]), Math.round(selectedRange15[1]));
//        });
//    var gBrush15 = svg15.append('g')
//        .attr('class', 'x brush')
//        .call(brush15);
//    gBrush15.selectAll("rect")
//        .attr("height", 40);
//
//    ///////////////////////////////////////////////////////////////////////////////////////
//
//    var svg16 = d3.select("#chr16")
//        .append("svg")
//        .attr("width", 90)
//        .attr("height", 50);
//    var xScale16 = d3.scale.linear()
//        .domain([0, 90])
//        .range([0, 160]);
//    var brush16 = d3.svg.brush()
//        .x(xScale16)
//        .on("brush", function () {
//            var selectedRange16;
//            currentBrushRegion16 = brush16.extent();
//
//            if (brush16.empty()) {
//                selectedRange16 = xScale16.domain();
//            } else {
//                selectedRange16 = brush16.extent();
//            }
//            //console.log(Math.round(selectedRange[0]), Math.round(selectedRange[1]));
//            chromosomeBrushed(16, Math.round(selectedRange16[0]), Math.round(selectedRange16[1]));
//        });
//    var gBrush16 = svg16.append('g')
//        .attr('class', 'x brush')
//        .call(brush16);
//    gBrush16.selectAll("rect")
//        .attr("height", 40);
//
//    ///////////////////////////////////////////////////////////////////////////////////////
//
//    var svg17 = d3.select("#chr17")
//        .append("svg")
//        .attr("width", 160)
//        .attr("height", 50);
//    var xScale17 = d3.scale.linear()
//        .domain([0, 81])
//        .range([0, 160]);
//    var brush17 = d3.svg.brush()
//        .x(xScale17)
//        .on("brush", function () {
//            var selectedRange17;
//            currentBrushRegion17 = brush17.extent();
//
//            if (brush17.empty()) {
//                selectedRange17 = xScale17.domain();
//            } else {
//                selectedRange17 = brush17.extent();
//            }
//            //console.log(Math.round(selectedRange[0]), Math.round(selectedRange[1]));
//            chromosomeBrushed(17, Math.round(selectedRange17[0]), Math.round(selectedRange17[1]));
//        });
//    var gBrush17 = svg17.append('g')
//        .attr('class', 'x brush')
//        .call(brush17);
//    gBrush17.selectAll("rect")
//        .attr("height", 40);
//
//    ///////////////////////////////////////////////////////////////////////////////////////
//
//    var svg18 = d3.select("#chr18")
//        .append("svg")
//        .attr("width", 160)
//        .attr("height", 50);
//    var xScale18 = d3.scale.linear()
//        .domain([0, 78])
//        .range([0, 160]);
//    var brush18 = d3.svg.brush()
//        .x(xScale18)
//        .on("brush", function () {
//            var selectedRange18;
//            currentBrushRegion18 = brush18.extent();
//
//            if (brush18.empty()) {
//                selectedRange18 = xScale18.domain();
//            } else {
//                selectedRange18 = brush18.extent();
//            }
//            //console.log(Math.round(selectedRange[0]), Math.round(selectedRange[1]));
//            chromosomeBrushed(18, Math.round(selectedRange18[0]), Math.round(selectedRange18[1]));
//        });
//    var gBrush18 = svg18.append('g')
//        .attr('class', 'x brush')
//        .call(brush18);
//    gBrush18.selectAll("rect")
//        .attr("height", 40);
//
//    ///////////////////////////////////////////////////////////////////////////////////////
//
//    var svg19 = d3.select("#chr19")
//        .append("svg")
//        .attr("width", 160)
//        .attr("height", 50);
//    var xScale19 = d3.scale.linear()
//        .domain([0, 59])
//        .range([0, 160]);
//    var brush19 = d3.svg.brush()
//        .x(xScale19)
//        .on("brush", function () {
//            var selectedRange19;
//            currentBrushRegion19 = brush19.extent();
//
//            if (brush19.empty()) {
//                selectedRange19 = xScale19.domain();
//            } else {
//                selectedRange19 = brush19.extent();
//            }
//            //console.log(Math.round(selectedRange[0]), Math.round(selectedRange[1]));
//            chromosomeBrushed(19, Math.round(selectedRange19[0]), Math.round(selectedRange19[1]));
//        });
//    var gBrush19 = svg19.append('g')
//        .attr('class', 'x brush')
//        .call(brush19);
//    gBrush19.selectAll("rect")
//        .attr("height", 40);
//
//    ///////////////////////////////////////////////////////////////////////////////////////
//
//    var svg20 = d3.select("#chr20")
//        .append("svg")
//        .attr("width", 160)
//        .attr("height", 50);
//    var xScale20 = d3.scale.linear()
//        .domain([0, 62])
//        .range([0, 160]);
//    var brush20 = d3.svg.brush()
//        .x(xScale20)
//        .on("brush", function () {
//            var selectedRange20;
//            currentBrushRegion20 = brush20.extent();
//
//            if (brush20.empty()) {
//                selectedRange20 = xScale20.domain();
//            } else {
//                selectedRange20 = brush20.extent();
//            }
//            //console.log(Math.round(selectedRange[0]), Math.round(selectedRange[1]));
//            chromosomeBrushed(20, Math.round(selectedRange20[0]), Math.round(selectedRange20[1]));
//        });
//    var gBrush20 = svg20.append('g')
//        .attr('class', 'x brush')
//        .call(brush20);
//    gBrush20.selectAll("rect")
//        .attr("height", 40);
//
//    ///////////////////////////////////////////////////////////////////////////////////////
//
//    var svg21 = d3.select("#chr21")
//        .append("svg")
//        .attr("width", 160)
//        .attr("height", 50);
//    var xScale21 = d3.scale.linear()
//        .domain([0, 48])
//        .range([0, 160]);
//    var brush21 = d3.svg.brush()
//        .x(xScale21)
//        .on("brush", function () {
//            var selectedRange21;
//            currentBrushRegion21 = brush21.extent();
//
//            if (brush21.empty()) {
//                selectedRange21 = xScale21.domain();
//            } else {
//                selectedRange21 = brush21.extent();
//            }
//            //console.log(Math.round(selectedRange[0]), Math.round(selectedRange[1]));
//            chromosomeBrushed(21, Math.round(selectedRange21[0]), Math.round(selectedRange21[1]));
//        });
//    var gBrush21 = svg21.append('g')
//        .attr('class', 'x brush')
//        .call(brush21);
//    gBrush21.selectAll("rect")
//        .attr("height", 40);
//
//    ///////////////////////////////////////////////////////////////////////////////////////
//
//    var svg22 = d3.select("#chr22")
//        .append("svg")
//        .attr("width", 160)
//        .attr("height", 50);
//    var xScale22 = d3.scale.linear()
//        .domain([0, 51])
//        .range([0, 160]);
//    var brush22 = d3.svg.brush()
//        .x(xScale22)
//        .on("brush", function () {
//            var selectedRange22;
//            currentBrushRegion22 = brush22.extent();
//
//            if (brush22.empty()) {
//                selectedRange22 = xScale22.domain();
//            } else {
//                selectedRange22 = brush22.extent();
//            }
//            //console.log(Math.round(selectedRange[0]), Math.round(selectedRange[1]));
//            chromosomeBrushed(22, Math.round(selectedRange22[0]), Math.round(selectedRange22[1]));
//        });
//    var gBrush22 = svg22.append('g')
//        .attr('class', 'x brush')
//        .call(brush22);
//    gBrush22.selectAll("rect")
//        .attr("height", 40);
//
//
//    ///////////////////////////////////////////////////////////////////////////////////////
//
//    var svgX = d3.select("#chrX")
//        .append("svg")
//        .attr("width", 160)
//        .attr("height", 50);
//    var xScaleX = d3.scale.linear()
//        .domain([0, 155])
//        .range([0, 160]);
//    var brushX = d3.svg.brush()
//        .x(xScaleX)
//        .on("brush", function () {
//            var selectedRangeX;
//            currentBrushRegionX = brushX.extent();
//
//            if (brushX.empty()) {
//                selectedRangeX = xScaleX.domain();
//            } else {
//                selectedRangeX = brushX.extent();
//            }
//            //console.log(Math.round(selectedRange[0]), Math.round(selectedRange[1]));
//            chromosomeBrushed("X", Math.round(selectedRangeX[0]), Math.round(selectedRangeX[1]));
//        });
//    var gBrushX = svgX.append('g')
//        .attr('class', 'x brush')
//        .call(brushX);
//    gBrushX.selectAll("rect")
//        .attr("height", 40);
//}