//Global variables
var waveLimits;
var waveData;
var windLimits;
var windData;
var totalAvailableWindows = 0;
var logAvailableWindows;
var allowRun = false;
       
// ************* UI FUNCTIONS *************
function waveToggle() {
  if (document.getElementById("waveSwitch").checked === true) {
    document.getElementById("waveLimitsHTML").removeAttribute('disabled');
    document.getElementById("waveDataHTML").removeAttribute('disabled');
    document.getElementById("btn_run").removeAttribute('disabled');
    document.getElementById("btn_check").removeAttribute('disabled');
    document.getElementById("btn_chart").removeAttribute('disabled');
  } else {
    document.getElementById("waveLimitsHTML").setAttribute('disabled','disabled');
    document.getElementById("waveDataHTML").setAttribute('disabled','disabled');
  }
  if (document.getElementById("waveSwitch").checked == false && document.getElementById("windSwitch").checked === false) {
    document.getElementById("btn_run").setAttribute('disabled','disabled');
    document.getElementById("btn_check").setAttribute('disabled','disabled');
    document.getElementById("btn_chart").setAttribute('disabled','disabled');
  }
}

function windToggle() {
  if (document.getElementById("windSwitch").checked == true) {
    document.getElementById("windLimitsHTML").removeAttribute('disabled');
    document.getElementById("windDataHTML").removeAttribute('disabled');
    document.getElementById("btn_run").removeAttribute('disabled');
    document.getElementById("btn_check").removeAttribute('disabled');
    document.getElementById("btn_chart").removeAttribute('disabled');
  } else {
    document.getElementById("windLimitsHTML").setAttribute('disabled','disabled');
    document.getElementById("windDataHTML").setAttribute('disabled','disabled');
  }
  if (document.getElementById("waveSwitch").checked == false && document.getElementById("windSwitch").checked == false) {
    document.getElementById("btn_run").setAttribute('disabled','disabled');
    document.getElementById("btn_check").setAttribute('disabled','disabled');
    document.getElementById("btn_chart").setAttribute('disabled','disabled');
  }
}

function showSpinner() {
    document.getElementById("spinner").hidden = false;
    document.getElementById("btn_run_text").textContent = "Running analysis...";
}

function hideSpinner() {
    document.getElementById("spinner").hidden = true;
    document.getElementById("btn_run_text").textContent = "Run analysis";
}

function resetFunction() {
    document.getElementById("waveSwitch").checked = false;
    document.getElementById("windSwitch").checked = false;
    waveToggle();
    windToggle();
    document.getElementById("waveLimitsHTML").value="Replace this text with wave limits in 1 hours intervals, separated by commas.";
    document.getElementById("waveDataHTML").value="Replace this text with wave data in 1 hours intervals, separated by commas.";
    document.getElementById("windLimitsHTML").value="Replace this text with wind limits in 1 hours intervals, separated by commas.";
    document.getElementById("windDataHTML").value="Replace this text with wind data in 1 hours intervals, separated by commas.";
    document.getElementById("btn_run").setAttribute('disabled','disabled');
    document.getElementById("btn_chart").setAttribute('disabled','disabled');
    document.getElementById("btn_check").setAttribute('disabled','disabled');
    document.getElementById("environmentalLimitsChartContainer").hidden = true;
    document.getElementById("environmentalDataChartContainer").hidden = true;
    document.getElementById("outputLog").textContent = " ";
    document.getElementById("outputInfo").textContent = " ";
}

function drawChartsFunction() { 
  document.getElementById("environmentalLimitsChartContainer").hidden = false;
  document.getElementById("environmentalDataChartContainer").hidden = false; 
  extractData();
  drawEnvironmentalLimitsChartFunction();
  drawEnvironmentalDataChartFunction();
}

//Extract data from input boxes into global variables
function extractData() {
  // Storing wave limits and wave data from user input 
  var waveLimitsString = document.getElementById("waveLimitsHTML").value;
  var waveDataString = document.getElementById("waveDataHTML").value;
  
  //Splitting wave limits and wave data input strings to arrays
  waveLimits = waveLimitsString.split('\n');
  waveData = waveDataString.split('\n');
  
  // Storing wind limits and wind data from user input 
  var windLimitsString = document.getElementById("windLimitsHTML").value;
  var windDataString = document.getElementById("windDataHTML").value;
          
  //Splitting wave limits and wave data input strings to arrays
  windLimits = windLimitsString.split('\n');
  windData = windDataString.split('\n');      
}

// Chart Output
function drawEnvironmentalLimitsChartFunction () {
  // Create chart labels - hour timesteps from 0 to max number input
  var labelFields = [];
  for (var i = 0; i < Math.max(waveLimits.length, windLimits.length); i++) {
      labelFields.push(i);
  }

  feather.replace()

  // Graphs
  var ctx = document.getElementById('environmentalLimitsChart')
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labelFields,
      datasets: [{
          label: 'Wave limits',
          data: waveLimits,
          lineTension: 0,
          backgroundColor: 'transparent',
          borderColor: '#0000FF',
          borderWidth: 4,
          pointBackgroundColor: '#0000FF'
      },
      {
          label: 'Wind limits',
          data: windLimits,
          lineTension: 0,
          backgroundColor: 'transparent',
          borderColor: '#FF0000	',
          borderWidth: 4,
          pointBackgroundColor: '#FF0000	'
      }]
    },
    options: {
      scales: {
          xAxes: [{
              scaleLabel: {
                  labelString: 'Hour of operation',
                  display: true,
                  }
            }],
        yAxes: [{
          ticks: {
            beginAtZero: true
          },
          scaleLabel: {
              labelString: 'Magnitude (Wave = Hs (m), Wind = velocity (m/s))',
              display: true,
              }
        }]
      },
      legend: {
        display: true
      }
    }
  })
}

// Chart Output
function drawEnvironmentalDataChartFunction () {
  // Create chart labels
  var labelFields = [];
  for (var i = 0; i < Math.max(waveData.length, windData.length); i++) {
      labelFields.push(i);
  }

  feather.replace()

  // Graphs
  var ctx = document.getElementById('environmentalDataChart')
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labelFields,
      datasets: [{
          label: 'Wave data',
          data: waveData,
          lineTension: 0,
          backgroundColor: 'transparent',
          borderColor: '#0000FF',
          borderWidth: 4,
          pointBackgroundColor: '#0000FF'
      },
      {
          label: 'Wind data',
          data: windData,
          lineTension: 0,
          backgroundColor: 'transparent',
          borderColor: '#FF0000',
          borderWidth: 4,
          pointBackgroundColor: '#FF0000'
      }]
    },
    options: {
      scales: {
          xAxes: [{
              scaleLabel: {
                  labelString: 'Hour of dataset',
                  display: true,
                  }
            }],
        yAxes: [{
          ticks: {
            beginAtZero: true
          },
          scaleLabel: {
              labelString: 'Magnitude (Wave = Hs (m), Wind = velocity (m/s))',
              display: true,
              }
        }]
      },
      legend: {
        display: true
      }
    }
  })
}

// Check limit lengths and data lengths match for wind and wave
function checkInputs() {
  extractData();
  if (document.getElementById("waveSwitch").checked === true && document.getElementById("windSwitch").checked === true) {
    document.getElementById("outputLog").textContent = "Both wave and wind will be checked";
    if (waveLimits.length != windLimits.length) {
      allowRun = false;
      alert("Error: Number of wind and wave limits entered do not match");
    } else if (waveData.length != windData.length) {
      allowRun = false;
      alert("Error: Number of wind and wave data points entered do not match");
    } else {
      allowRun = true;
    }
    
  } else if (document.getElementById("waveSwitch").checked === true) {
    document.getElementById("outputLog").textContent = "Only wave will be checked";
    allowRun = true;
  } else if (document.getElementById("windSwitch").checked === true) {
    document.getElementById("outputLog").textContent = "Only wind will be checked";
    allowRun = true;
  } else {
    document.getElementById("outputLog").textContent = "Nothing will be checked";
    allowRun = false;
  }
}



// ************* ANALYSIS FUNCTIONS *************

function checkData() {
  
  // Iterate each hour within the defined wave/wind limits
  for (var DataHour = 0; DataHour <  Math.max(waveData.length, windData.length); DataHour++) {                    
    var waveLimitsAcceptable = 0;
    var windLimitsAcceptable = 0;

    //Iterate each hour within the defined wave/wind limits
    if (document.getElementById("waveSwitch").checked === true) {
      for (var LimitsHour = 0; LimitsHour < waveLimits.length; LimitsHour++) {
        var DataHourTemp = DataHour + LimitsHour;
        //console.log("Checking waves for data hour " + DataHourTemp + " against limit hour " + LimitsHour);
        if (parseFloat(waveLimits[LimitsHour]) >= parseFloat(waveData[DataHourTemp])) {
          waveLimitsAcceptable++;
        }
      } 
    }
    if (document.getElementById("windSwitch").checked === true) {
      for (var LimitsHour = 0; LimitsHour < windLimits.length; LimitsHour++) {
        var DataHourTemp = DataHour + LimitsHour;
        // console.log("Checking wind for data hour " + DataHourTemp + " against limit hour " + LimitsHour);
        if (parseFloat(windLimits[LimitsHour]) >= parseFloat(windData[DataHourTemp])) {
          windLimitsAcceptable++;
        }
      }
    }

    //Check if this operation would have been a 'go'
    if (document.getElementById("waveSwitch").checked === true && document.getElementById("windSwitch").checked === true) {
      //console.log("Checking both wind and wave acceptable");
      if (waveLimitsAcceptable === waveLimits.length && windLimitsAcceptable === windLimits.length) {
        totalAvailableWindows++;
        logAvailableWindows.push(DataHour);
        //console.log("Confirmed both wind and wave acceptable for operation start hour of " + DataHour);
      }
    } else if (document.getElementById("waveSwitch").checked === true) {
      //console.log("Checking only wave acceptable");
      if (waveLimitsAcceptable === waveLimits.length) {
        totalAvailableWindows++;
        logAvailableWindows.push(DataHour);
        //console.log("Confirmed only wave acceptable for operation start hour of " + DataHour);
      }
    } else if (document.getElementById("windSwitch").checked === true) {
      //console.log("Checking only wind acceptable");
      if (windLimitsAcceptable === windLimits.length) {
        totalAvailableWindows++;
        logAvailableWindows.push(DataHour);
        //console.log("Confirmed only wind acceptable for operation start hour of " + DataHour);
      }
    }

  }
}

function runFunction(){
  checkInputs();
  if (allowRun === true) {
    // Status update    
  showSpinner();
  document.getElementById("outputLog").textContent = " ";
  document.getElementById("outputInfo").textContent = " ";

  totalAvailableWindows = 0;
  logAvailableWindows = [];

  // Extract data from HTML input fields
  // extractData();

  // Log the operational limits and environmental data
  console.log("The " + waveLimits.length + " defined hourly wave limits are: " + waveLimits);
  console.log("The " + waveData.length + " defined hourly wave data points are: " + waveData);
  console.log("The " + windLimits.length + " defined hourly wind limits are: " + windLimits);
  console.log("The " + windData.length + " defined hourly wind data points are: " + windData);    

  //Iterate  each hour in the wave data set
  checkData();

  //Log the output following completion of all iterations
  hideSpinner();
  var outputLog = "Completed checking attempted starts, " + totalAvailableWindows + " of " + Math.max(waveData.length, windData.length)  + " were acceptable.";
  var outputInfo;
  if (totalAvailableWindows != 0) {
    outputInfo = "The successful starts were at data hours: " + logAvailableWindows;
  } else {
    outputInfo = "No successful starts found";
  }
  console.log(outputLog);
  console.log(outputInfo);
  document.getElementById("outputLog").textContent = outputLog;
  document.getElementById("outputData").textContent = logAvailableWindows;
  }
}


    

