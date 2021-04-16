function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata= data.metadata;
      var resultsarray= metadata.filter(sampleobject => sampleobject.id == sample);
      var result= resultsarray[0]
      var PANEL = d3.select("#sample-metadata");
      PANEL.html("");
      Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key}: ${value}`);
      });

    })
}

function buildCharts(sample) {
    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        var array = samples.filter(sampleobject => sampleobject.id == sample)
        var result = array[0]

        var ids = result.otu_ids;
        var sampleValues = result.sample_values;
        var labels = result.otu_labels;
        
        var layoutBubble = {
            title: "Bubble Chart",
            showlegend: false,
            xaxis: { title: "Id's"},
            hovermode: "closest",
           }

        var BubbleChart = [
            {       
            x: ids,
            y: sampleValues,
            text: labels,
            mode: 'markers',
            marker: {
                size: sampleValues,
                color: ids,
                }
            }
    ];
         
        Plotly.newPlot("bubble", BubbleChart, layoutBubble)


        var barData =[
            {
              y:ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
              x:sampleValues.slice(0,10).reverse(),
              text:labels.slice(0,10).reverse(),
              type:"bar",
              orientation:"h"
      
            }
          ];

         var barLayout = {
             title: "Bar Chart",
            };

        Plotly.newPlot("bar", barData, barLayout);
    });
}
        

function init() {
    
    var selector = d3.select("#selDataset");
  
    
    d3.json("samples.json").then((data) => {
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      
      const firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }
  
  function optionChanged(newSample) {
    
    buildCharts(newSample);
    buildMetadata(newSample);
  }
  
  
  init();
