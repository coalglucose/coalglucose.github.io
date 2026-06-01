// 1. Math Functions
function getNormalPDF(x, mean, stdDev) {
    const exponent = Math.exp(-Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2)));
    return (1 / (stdDev * Math.sqrt(2 * Math.PI))) * exponent;
}

// 2. Setup Canvas
const canvas = document.getElementById('distributionCanvas');
const ctx = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;
const padding = 40;

// 3. Distribution Parameters
const mean = 0;
const stdDev = 1;

// Define graph boundaries (-4 to +4 standard deviations covers 99.99% of data)
const minX = -4;
const maxX = 4;
const minY = 0;
const maxY = getNormalPDF(mean, mean, stdDev) * 1.1; // Find peak and add padding

// 4. Coordinate Mapping Helpers
function mapX(x) {
    return padding + ((x - minX) / (maxX - minX)) * (width - 2 * padding);
}

function mapY(y) {
    return (height - padding) - ((y - minY) / (maxY - minY)) * (height - 2 * padding);
}

// 5. Drawing the Graph
function drawGraph() {
    ctx.clearRect(0, 0, width, height);

    // Draw Grid Axes
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    
    // X-Axis
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Axis Labels & Grid ticks
    ctx.fillStyle = '#6b7280';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    for (let x = minX; x <= maxX; x += 1) {
        const canvasX = mapX(x);
        ctx.fillText(x, canvasX, height - padding + 8);
        
        // Tick mark
        ctx.beginPath();
        ctx.moveTo(canvasX, height - padding);
        ctx.lineTo(canvasX, height - padding + 4);
        ctx.stroke();
    }

    // Generate Curve Points
    const points = [];
    const resolution = 200; // Total segments to draw the smooth curve
    
    for (let i = 0; i <= resolution; i++) {
        const x = minX + (i / resolution) * (maxX - minX);
        const y = getNormalPDF(x, mean, stdDev);
        points.push({ cx: mapX(x), cy: mapY(y) });
    }

    // Shading Area under the Curve
    ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
    ctx.beginPath();
    ctx.moveTo(points[0].cx, height - padding);
    points.forEach(p => ctx.lineTo(p.cx, p.cy));
    ctx.lineTo(points[points.length - 1].cx, height - padding);
    ctx.closePath();
    ctx.fill();

    // Drawing the Bell Curve Stroke Line
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(points[0].cx, points[0].cy);
    points.forEach(p => ctx.lineTo(p.cx, p.cy));
    ctx.stroke();
}

drawGraph();
