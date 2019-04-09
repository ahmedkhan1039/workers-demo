if (!window.Worker) {
  // Message to show if Worker is not supported in browser
}

const workButton = document.getElementById("workButton");
const terminateButton = document.getElementById("terminateButton");


// 01-Initialization
const myWorker = new Worker("lesson-01/worker.js");

workButton.addEventListener("click", function(e) {
  // 02-Message Passing
  // myWorker.postMessage({ a: 12, b:12 });

  // DEMO for heavy Ops
  myWorker.postMessage(generateGrid(1000,1000));
});

// 03-Listening for messages
myWorker.onmessage = function(e) {
  console.log("Message From Web Worker", e.data);
};

// 04-Termination
terminateButton.addEventListener("click", function(e) {
  myWorker.terminate();
  console.log("Worker Terminated");
});


function generateGrid(x, y) {
    const grid = {
        cols: x,
        rows: y,
        data: []
    }

    const randomExitRow = getRandomInt(0, y - 1);

    for (let row = 0; row < y; row++) {
        grid.data.push([]);
        for (let col = 0; col < x; col++) {
            if (col === (x - 1) && row === randomExitRow) {
                grid.data[row].push(2);
            }
            else if ((row === 0)
                || (row > 0 && col === 0)
                || (row > 0 && col == (x - 1))
                || (row === (y - 1))) {
                grid.data[row].push(1);
            } else {
                grid.data[row].push(getRandomInt(0, 1));
            }
        }
    }

    return grid;
}

function getRandomInt(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}
