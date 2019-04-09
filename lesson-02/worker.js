// 01-Getting Message from Host
self.onmessage = function(e) {
  console.log("Message From Host", e.data);

  fetchData(e.data);
};

function fetchData(fetchInfoList) {
  const fetchPromises = [];

  fetchInfoList.forEach((item, index) => {
    fetchPromises.push(
      new Promise(resolve => {
        setTimeout(() => {
          // Fetch Some Data

          self.postMessage({
            chartName: item.name,
            data: [1, 2, 3, 4, 5, 6]
          });
        }, 1000 * index);
      })
    );
  });

  Promise.all(fetchPromises).then(data => {
    // Tasks to Do after all data is fetched if any
  });
}

// 02-Handle Error
self.onerror = function(event, source, line, col, errorMessage) {
  console.log("Caught Error");
  console.log("Source", source);
  console.log("Line", line);
  console.log("Col", col);
  console.log("Message", errorMessage);
};
