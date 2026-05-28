function makePlot() {
    try {
        // get input
        let xText = document.getElementById("x-values").value.trim();
        let yText = document.getElementById("y-values").value.trim();

        if (!xText || !yText) {
            alert("Please enter both X and Y values.");
            return;
        }

        // string -> array
        let xValues = xText.split(",").map(val => Number(val.trim()));
        let yValues = yText.split(",").map(val => Number(val.trim()));

        // check lengths
        if (xValues.length !== yValues.length) {
            alert("X and Y must have same number of values.");
            return;
        }

        // check if number
        if (xValues.some(isNaN) || yValues.some(isNaN)) {
            alert("Please enter only numbers.");
            return;
        }

        // line of best fit
        const n = xValues.length;
        let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
        for (let i = 0; i < n; i++) {
            sumX += xValues[i];
            sumY += yValues[i];
            sumXY += xValues[i] * yValues[i];
            sumXX += xValues[i] * xValues[i];
        }

        // calculate slope and y-intercept
        const denominator = (n * sumXX - sumX * sumX);
        
        // handle vertical line edge case
        if (denominator === 0) {
            alert("Cannot calculate line of best fit for vertical lines or single points.");
            return;
        }

        const slope = (n * sumXY - sumX * sumY) / denominator;
        const intercept = (sumY - slope * sumX) / n;

        // show calculated slope and y-intercept
        document.getElementById("slope-display").textContent = `Slope: ${slope.toFixed(4)}`;
        document.getElementById("intercept-display").textContent = `y-intercept: ${intercept.toFixed(4)}`;

        // pair and sort data by X values so the best fit line draws sequentially
        let pairedData = xValues.map((x, i) => ({ x: x, y: yValues[i] }));
        pairedData.sort((a, b) => a.x - b.x);

        const sortedX = pairedData.map(p => p.x);
        const bestFitY = sortedX.map(x => (slope * x) + intercept);

        // create scatterplot
        let trace = { 
            x: xValues, 
            y: yValues, 
            mode: "markers", 
            type: "scatter", 
            name: "Data Points", 
            marker: { size: 12 } 
        };
        
        let traceBestFit = { 
            x: sortedX, 
            y: bestFitY, 
            mode: "lines", 
            type: "scatter", 
            name: "Best Fit", 
            line: { color: "red", width: 2 } 
        };
        
        let layout = { 
            title: "Scatterplot", 
            xaxis: { title: "X Values" }, 
            yaxis: { title: "Y Values" } 
        };
        
        Plotly.newPlot("graph", [trace, traceBestFit], layout);
        
    } catch(error) {
        alert("Invalid input.");
        console.log(error);
    }
}
