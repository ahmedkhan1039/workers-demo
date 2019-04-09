importScripts('./externalScript.js');
//importScripts('//cdnjs.cloudflare.com/ajax/libs/ramda/0.25.0/ramda.min.js');



// 01-Getting Message from Host
self.onmessage = function(e) {
  console.log("Message From Host", e.data);
//  const { a, b } = e.data;
//   self.postMessage({ result: R.add(a, b) });

  // Demo - For Heavy Ops
  self.postMessage({ result: transformGridStructure(e.data) });
};

// function add(a, b) {
//   if (isNaN(a)) {
//     throw {
//       message: "Input is not a Number"
//     };
//   }
//   return a + b;
// }

// 02-Handle Error
self.onerror = function(event, source, line, col, errorMessage) {
  console.log("Caught Error");
  console.log("Source", source);
  console.log("Line", line);
  console.log("Col", col);
  console.log("Message", errorMessage);
};
