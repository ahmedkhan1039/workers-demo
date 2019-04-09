if (!window.Worker) {
  // Message to show if Worker is not supported in browser
}

const workButton = document.getElementById("workButton");
const terminateButton = document.getElementById("terminateButton");


// 01-Initialization
const myWorker = new Worker("lesson-02/worker.js");

const chartDataFetchInfo = [
  {
    name: "Chart-1",
    url:'api.com',
    params : ["param1","param2"]
  },
  {
    name: "Chart-2",
    url:'api.com',
    params : ["param1","param2"]
  },
  ,
  {
    name: "Chart-3",
    url:'api.com',
    params : ["param1","param2"]
  }
  ,
  {
    name: "Chart-4",
    url:'api.com',
    params : ["param1","param2"]
  }
]


workButton.addEventListener("click", function(e) {
  // 02-Message Passing
  myWorker.postMessage(chartDataFetchInfo);
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
