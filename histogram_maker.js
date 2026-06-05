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

    // --- ADDITION: Create the histogram ---
    let trace = {
      x: xValues,
      type: 'histogram',
      marker: {
        color: '#1f77b4',
        line: { color: 'white', width: 1 }
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
