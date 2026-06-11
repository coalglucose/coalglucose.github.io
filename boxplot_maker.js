function makePlot() {
  try {
    // get input 
    let yText = document.getElementById("y-values").value.trim(); 
    if (!yText) { 
      alert("Please enter Y values."); 
      return; 
    } 

    // string -> array 
    let yValues = yText.split(',').map(val => Number(val.trim())); 

    // check if number 
    if (yValues.some(isNaN)) { 
      alert("Please enter only numbers."); 
      return; 
    }

    let trace = {
      y: yValues,
      type: 'box',
      name: "",
      marker: {
        color: '#1f77b4',
        line: { color: 'white', width: 1 }
      },
      boxpoints: 'suspectedoutliers', // how points are shown
      jitter: 0.3,                    // sets the horizontal spread of the points
      pointpos: 0
    }

    let layout = {
      title: 'Box Plot of Y Values',
      xaxis: { title: 'Plot' },
      yaxis: { title: 'Value' }
    };

    Plotly.newPlot('graph', [trace], layout);
    
  } catch(error) { 
    alert("Invalid input."); 
    console.log(error); 
  } 
}
