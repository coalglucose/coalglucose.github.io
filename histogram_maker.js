function makePlot() {
  try {
    // get input 
    let xText = document.getElementById("x-values").value.trim(); 
    if (!xText) { 
      alert("Please enter X values."); 
      return; 
    } 

    // string -> array 
    let xValues = xText.split(',').map(val => Number(val.trim())); 

    // check if number 
    if (xValues.some(isNaN)) { 
      alert("Please enter only numbers."); 
      return; 
    }

    let binWidth = document.getElementById("bin-width").value.trim();
    if (!binWidth) { 
      alert("Please enter a value for Bin Width");
      return;
    }

    if (binWidth.isNaN()) {
      alert("Please enter only numbers.");
      return;
    }

    let trace = {
      x: xValues,
      type: 'histogram',
      marker: {
        color: '#1f77b4',
        line: { color: 'white', width: 1 }
      },
      autobinx: false,
      xbins: {
        start: Math.min(...xValues), // set minimum bin edge
        end: Math.max(...xValues),   // set maximum bin edge
        size: binWidth
      }
    };

    let layout = {
      title: 'Histogram of X Values',
      xaxis: { title: 'Value' },
      yaxis: { title: 'Frequency' }
    };

    Plotly.newPlot('graph', [trace], layout);

  } catch(error) { 
    alert("Invalid input."); 
    console.log(error); 
  } 
}
