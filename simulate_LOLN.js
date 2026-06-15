const canvas = document.getElementById('chart');
const ctx = canvas.getContext('2d');

// set dimensions
canvas.width = canvas.getBoundingClientRect().width;
canvas.height = 400;

let totalFlips = 0;
let totalHeads = 0;
let averages = [];
let animationId = null;

function simulateAndDraw() {
    // run 25 flips per frame
    const flipsPerFrame = 25;
    
    for (let i = 0; i < flipsPerFrame; i++) {
        // coin flip
        const flip = Math.random() < 0.5 ? 1 : 0;
        totalFlips++;
        totalHeads += flip;
        
        // track running average
        averages.push(totalHeads / totalFlips);
    }

    // clear canvas for the next frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 0.5 theoretical convergence line
    const yTheoretical = canvas.height / 2; // middle of the chart
    ctx.strokeStyle = '#777777';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(0, yTheoretical);
    ctx.lineTo(canvas.width, yTheoretical);
    ctx.stroke();

    // draw the cumulative average line (use all points)
    ctx.strokeStyle = '#4caf50';
    ctx.lineWidth = 2;
    ctx.setLineDash([]);
    ctx.beginPath();
    
    const step = canvas.width / averages.length;
    for (let i = 0; i < averages.length; i++) {
        const avg = averages[i];
        // invert the y-coordinate mapping (the origin is at the top left, but you want it to be at the bottom right)
        const x = i * step;
        const y = canvas.height - (avg * canvas.height);
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.stroke();

    // update UI Text
    document.getElementById('total-flips').innerText = totalFlips.toLocaleString();
    document.getElementById('current-avg').innerText = (totalHeads / totalFlips).toFixed(4);

    // stop after 10,000 flips
    if (totalFlips >= 10000) {
        cancelAnimationFrame(animationId);
        return;
    }

    // request next frame continuously if limit not reached
    animationId = requestAnimationFrame(simulateAndDraw);
}

// start animation loop
animationId = requestAnimationFrame(simulateAndDraw);
