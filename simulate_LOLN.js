const canvas = document.getElementById('chart');
const ctx = canvas.getContext('2d');

// set explicit dimensions (prevent blurry drawing)
canvas.width = canvas.getBoundingClientRect().width;
canvas.height = 400;

let totalFlips = 0;
let totalHeads = 0;
let averages = [];
let animationId = null;

function simulateAndDraw() {
    // Run 50 flips per frame to speed up the convergence visibility
    const flipsPerFrame = 50;
    
    for (let i = 0; i < flipsPerFrame; i++) {
        // coin flip
        const flip = Math.random() < 0.5 ? 1 : 0;
        totalFlips++;
        totalHeads += flip;
        
        // Track the running average
        averages.push(totalHeads / totalFlips);
    }

    // Clear canvas for the next frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the 0.5 theoretical convergence line
    const yTheoretical = canvas.height / 2; // Middle of the chart
    ctx.strokeStyle = '#777777';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(0, yTheoretical);
    ctx.lineTo(canvas.width, yTheoretical);
    ctx.stroke();

    // Draw the cumulative average line (using ALL points to show the whole story)
    ctx.strokeStyle = '#4caf50';
    ctx.lineWidth = 2;
    ctx.setLineDash([]);
    ctx.beginPath();
    
    const step = canvas.width / averages.length;
    for (let i = 0; i < averages.length; i++) {
        const avg = averages[i];
        // Invert the y-coordinate mapping (0 is at the top of canvas)
        const x = i * step;
        const y = canvas.height - (avg * canvas.height);
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.stroke();

    // Update UI Text
    document.getElementById('total-flips').innerText = totalFlips.toLocaleString();
    document.getElementById('current-avg').innerText = (totalHeads / totalFlips).toFixed(4);

    // stop after 5,000 flips
    if (totalFlips >= 5000) {
        cancelAnimationFrame(animationId);
        return; // Exit the function to permanently stop
    }

    // Request the next frame continuously if limit not reached
    animationId = requestAnimationFrame(simulateAndDraw);
}

// Start the animation loop
animationId = requestAnimationFrame(simulateAndDraw);
