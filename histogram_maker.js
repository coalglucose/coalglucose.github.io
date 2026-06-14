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

    let binWidthInput = document.getElementById("bin-width").value.trim();
    if (!binWidthInput) { 
      alert("Please enter a value for Bin Width");
      return;
    }

    let numberPattern = /^\d+(\.\d+)?$/;

    if (!numberPattern.test(binWidthInput)) {
        alert("Please enter only one number (no commas, spaces, or symbols)");
        return;
    }
    
    // convert to number
    let binWidth = Number(binWidthInput);

    const min = Math.min(...xValues);
    const max = Math.max(...xValues);

    const end = Math.ceil((max - min) / binWidth) * binWidth + min;

    let labels = [];
    let frequencies = [];
    
    for (let binStart = min; binStart < end; binStart += binWidth) {
        let binEnd = binStart + binWidth;
    
        labels.push(`${binStart}-${binEnd}`);
    
        let count = xValues.filter(x =>
            x >= binStart &&
            (x < binEnd || (binEnd === end && x <= binEnd))
        ).length;
    
        frequencies.push(count);
    }
    
    let trace = {
        x: labels,
        y: frequencies,
        type: 'bar',
        marker: {
            color: '#1f77b4',
            line: {
                color: 'white',
                width: 1
            }
        }
    };

    let layout = {
        title: 'Histogram of X Values',
        xaxis: {
            title: 'Bins'
        },
        yaxis: {
            title: 'Frequency'
        },
        bargap: 0
    };

    Plotly.newPlot('graph', [trace], layout);

  } catch(error) { 
    alert("Invalid input."); 
    console.log(error); 
  } 
}
