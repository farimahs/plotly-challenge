//Use the D3 library to read in samples.json.
d3.json("samples.json").then(data => console.log(data))

//Drop down menu based on ID numbers
function init() {
    let dropDownMenu = d3.select("#selDataset"); 
//using => to call json file
    d3.json("samples.json").then(data => {
        let id_list = data.names;
        id_list.forEach(ids => {dropDownMenu.append("option").text(ids).property("value", ids)
     });
 // Assign the value of the dropdown menu option to a variable
     let id_name = dropDownMenu.property("value");
     console.log(id_name);
     barChart(id_name);
     bubbleChart(id_name);
     metaData(id_name);
    
    });
};

   
function barChart (idLoc){
    d3.json("samples.json").then((data) => {
        let samples_list=data.samples
        let arrayData = samples_list.filter(sample => sample.id == idLoc); 
        let results = arrayData[0]
        let otu_ids = results.otu_ids;
        let otu_labels = results.otu_labels;
        let sample_values_ = results.sample_values;

        let barData = {
            x: sample_values_.slice(0,10).reverse(),
            y: otu_ids.slice(0,10).map(row => "OTU" + row).reverse(),
            text: otu_labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
        };
        let barArray = [barData];
                let layout = {
                    title: "Top 10 OTU's",
                    height: 500,
                    width: 800,    
                };

        Plotly.newPlot("bar", barArray, layout);
    
    })
}

function bubbleChart(idLoc){
    d3.json("samples.json").then((data) => {
        let samples_list=data.samples
        let arrayData = samples_list.filter(sample => sample.id == idLoc); 
        let results = arrayData[0]
        let otu_ids = results.otu_ids;
        let sample_values_ = results.sample_values;
        let otu_labels = results.otu_labels;

        let bubbleData = {
            x: otu_ids,
            y: sample_values_,
            text: otu_labels,
            mode: 'markers',
            marker: {
                color: otu_ids,
                size: sample_values_,
                sizeref: 2
            }

        };
            let bubbleArray = [bubbleData];
            console.log(otu_ids);
            let layout2 = {
            title: "All OTU",
            xaxis: {
                title: "OTU ID",
                tick0: 0,
                ticks: 'outside',
                rangemode: 'tozero',
                autorange: true
            },
            yaxis: {
                title: "Sample Values",
                tick0: 0,
                ticks: 'outside',
                rangemode: 'tozero',
                autorange: true  

            },
            height: 500,
            width: 1300,    
            };
            Plotly.newPlot("bubble", bubbleArray, layout2);
    })

}

function metadata(idLoc){
    d3.json("samples.json").then((data) => {
        let demodata=data.metadata
        let arrayData = demodata.filter(sample => sample.id == idLoc); 
        let results = arrayData[0]
        let metaSamples = d3.select("#sample-metadata");
        metaSamples.html("");
        Object.entries(results).forEach(([key, value]) => {
            metaSamples.append("h5").text(`${key}: ${value}`)
        });
        console.log(results);

    })
}

  
init();
function optionChanged(id_name) {
    console.log(id_name);
    barChart(id_name);
    bubbleChart(id_name);
    metadata(id_name);

};

