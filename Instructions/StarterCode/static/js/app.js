//Use the D3 library to read in samples.json.
d3.json("data/samples.json").then((data) => {
    console.log(data);
    
});

//Drop down menu
var idNumber = data.names;
for (i = 0; i < idNumber.length; i++) {
    var dropdownMenu = d3.select("#selDataset");
    dropdownMenu.append("option").text(idList[i]);
}

// Display the default plot
plotFunction(0)
//Updating plots
function plotFunction(index) {
    var sampleOTUs = data.samples[index].otu_ids;
      console.log(sampleOTUs);
      var sampleFreq = data.samples[index].sample_values;
      var otuLabels = data.samples[index].otu_labels;
  
      var washFrequency = data.metadata[index].wfreq;
      console.log(washFrequency);

}

      var topOTUS = sampleOTUs.slice(0, 10).reverse();
      var topFreq = sampleFreq.slice(0, 10).reverse();
      var topToolTips = data.samples[0].otu_labels.slice(0, 10).reverse();
      var topLabels = topOTUS.map((otu => "OTU " + otu));
      var reversedLabels = topLabels.reverse();
  
  // Set up trace
    var trace1 = {
        x: topFreq,
        y: reversedLabels,
        text: topToolTips,
        name: "",
        type: "bar",
        orientation: "h",
    };

    // data
    var barData = [trace1];

    // layout
    var layout = {
        title: "Top 10 OTUs",
        margin: {
        l: 80,
        r: 80,
        t: 80,
        b: 50
        }
    };

    
    Plotly.newPlot("bar", barData, layout);

    // Set up trace
    trace2 = {
        x: sampleOTUs,
        y: sampleFreq,
        text: otuLabels,
        mode: 'markers',
        marker: {
        color: sampleOTUs,
        opacity: [1, 0.8, 0.6, 0.4],
        size: sampleFreq
        }
    }

    //data
    var bubbleData = [trace2];

    //layout
    var layout = {
        title: 'OTU Frequency',
        showlegend: false,
        height: 600,
        width: 930
    }

    
    Plotly.newPlot("bubble", bubbleData, layout)