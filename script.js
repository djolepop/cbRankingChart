let plotData = [];
let originalData = [];
let layout = {};
let financeVisible = true;
let allAppsVisible = true;
let normalizedScales = false;
let smoothLines = true;
let showCrosshair = true;
let drawingMode = null;
let drawingPoints = [];
let drawings = [];

const fileInput = document.getElementById('csvFile');
const chartDiv = document.getElementById('chart');
const statsDiv = document.getElementById('stats');
const loadingDiv = document.getElementById('loading');
const yearSelector = document.getElementById('yearSelector');
const monthSelector = document.getElementById('monthSelector');
const chartStyleToggle = document.getElementById('chartStyleToggle');
const crosshairToggle = document.getElementById('crosshairToggle');

document.addEventListener('DOMContentLoaded', function() {
    chartStyleToggle.checked = true;
    crosshairToggle.checked = true;
    autoLoadCsv();
});

function autoLoadCsv() {
    loadingDiv.style.display = 'block';
    
    fetch('coinbase_app_rank_data.csv')
        .then(response => {
            if (!response.ok) {
                throw new Error('CSV file not found via fetch');
            }
            return response.text();
        })
        .then(csvText => {
            processCsvText(csvText);
        })
        .catch(error => {
            console.log('Could not load CSV via fetch, using embedded data instead');
            useEmbeddedData();
        });
}

function processCsvText(csvText) {
    Papa.parse(csvText, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: function(results) {
            loadingDiv.style.display = 'none';
            if (results.data.length === 0 || !results.data[0]) {
                statsDiv.innerHTML = '<p class="error">No data found in CSV file.</p>';
                return;
            }
            
            originalData = results.data;
            
            processData(results.data);
            populateYearSelector(results.data);
        },
        error: function(error) {
            console.error('Error parsing CSV:', error);
            loadingDiv.style.display = 'none';
            statsDiv.innerHTML = `<p class="error">Error parsing CSV: ${error.message}</p>`;
        }
    });
}

function useEmbeddedData() {
const embeddedData = [
  {
    "date": "2024-01-15T19:00:00.000Z",
    "formattedDate": "2024-Jan-15 8PM",
    "allAppsRank": 500,
    "financeAppsRank": 25
  },
  {
    "date": "2024-01-16T07:00:00.000Z",
    "formattedDate": "2024-Jan-16 8AM",
    "allAppsRank": 500,
    "financeAppsRank": 25
  },
  {
    "date": "2024-01-16T19:00:00.000Z",
    "formattedDate": "2024-Jan-16 8PM",
    "allAppsRank": 500,
    "financeAppsRank": 25
  },
  {
    "date": "2024-01-17T07:00:00.000Z",
    "formattedDate": "2024-Jan-17 8AM",
    "allAppsRank": 480,
    "financeAppsRank": 32
  },
  {
    "date": "2024-01-17T19:00:00.000Z",
    "formattedDate": "2024-Jan-17 8PM",
    "allAppsRank": 478,
    "financeAppsRank": 36
  },
  {
    "date": "2024-01-18T07:00:00.000Z",
    "formattedDate": "2024-Jan-18 8AM",
    "allAppsRank": 459,
    "financeAppsRank": 34
  },
  {
    "date": "2024-01-19T07:00:00.000Z",
    "formattedDate": "2024-Jan-19 8AM",
    "allAppsRank": 469,
    "financeAppsRank": 35
  },
  {
    "date": "2024-01-19T19:00:00.000Z",
    "formattedDate": "2024-Jan-19 8PM",
    "allAppsRank": 499,
    "financeAppsRank": 38
  },
  {
    "date": "2024-01-20T07:00:00.000Z",
    "formattedDate": "2024-Jan-20 8AM",
    "allAppsRank": 485,
    "financeAppsRank": 34
  },
  {
    "date": "2024-01-22T07:00:00.000Z",
    "formattedDate": "2024-Jan-22 8AM",
    "allAppsRank": 500,
    "financeAppsRank": 34
  },
  {
    "date": "2024-01-22T19:00:00.000Z",
    "formattedDate": "2024-Jan-22 8PM",
    "allAppsRank": 500,
    "financeAppsRank": 38
  },
  {
    "date": "2024-01-23T07:00:00.000Z",
    "formattedDate": "2024-Jan-23 8AM",
    "allAppsRank": 500,
    "financeAppsRank": 36
  },
  {
    "date": "2024-01-23T19:00:00.000Z",
    "formattedDate": "2024-Jan-23 8PM",
    "allAppsRank": 500,
    "financeAppsRank": 40
  },
  {
    "date": "2024-01-25T07:00:00.000Z",
    "formattedDate": "2024-Jan-25 8AM",
    "allAppsRank": 500,
    "financeAppsRank": 39
  },
  {
    "date": "2024-01-25T19:00:00.000Z",
    "formattedDate": "2024-Jan-25 8PM",
    "allAppsRank": 500,
    "financeAppsRank": 43
  },
  {
    "date": "2024-01-26T07:00:00.000Z",
    "formattedDate": "2024-Jan-26 8AM",
    "allAppsRank": 500,
    "financeAppsRank": 42
  },
  {
    "date": "2024-01-26T19:00:00.000Z",
    "formattedDate": "2024-Jan-26 8PM",
    "allAppsRank": 500,
    "financeAppsRank": 42
  },
  {
    "date": "2024-01-27T07:00:00.000Z",
    "formattedDate": "2024-Jan-27 8AM",
    "allAppsRank": 498,
    "financeAppsRank": 39
  },
  {
    "date": "2024-01-27T19:00:00.000Z",
    "formattedDate": "2024-Jan-27 8PM",
    "allAppsRank": 500,
    "financeAppsRank": 44
  },
  {
    "date": "2024-01-28T07:00:00.000Z",
    "formattedDate": "2024-Jan-28 8AM",
    "allAppsRank": 500,
    "financeAppsRank": 36
  },
  {
    "date": "2024-01-28T19:00:00.000Z",
    "formattedDate": "2024-Jan-28 8PM",
    "allAppsRank": 500,
    "financeAppsRank": 40
  },
  {
    "date": "2024-01-29T07:00:00.000Z",
    "formattedDate": "2024-Jan-29 8AM",
    "allAppsRank": 500,
    "financeAppsRank": 38
  },
  {
    "date": "2024-01-29T19:00:00.000Z",
    "formattedDate": "2024-Jan-29 8PM",
    "allAppsRank": 500,
    "financeAppsRank": 46
  },
  {
    "date": "2024-02-04T19:00:00.000Z",
    "formattedDate": "2024-Feb-4 8PM",
    "allAppsRank": 500,
    "financeAppsRank": 47
  },
  {
    "date": "2024-02-05T07:00:00.000Z",
    "formattedDate": "2024-Feb-5 8AM",
    "allAppsRank": 500,
    "financeAppsRank": 41
  },
  {
    "date": "2024-02-05T19:00:00.000Z",
    "formattedDate": "2024-Feb-5 8PM",
    "allAppsRank": 500,
    "financeAppsRank": 49
  },
  {
    "date": "2024-02-06T07:00:00.000Z",
    "formattedDate": "2024-Feb-6 8AM",
    "allAppsRank": 500,
    "financeAppsRank": 45
  },
  {
    "date": "2024-02-06T19:00:00.000Z",
    "formattedDate": "2024-Feb-6 8PM",
    "allAppsRank": 500,
    "financeAppsRank": 50
  },
  {
    "date": "2024-02-07T07:00:00.000Z",
    "formattedDate": "2024-Feb-7 8AM",
    "allAppsRank": 500,
    "financeAppsRank": 43
  },
  {
    "date": "2024-02-07T19:00:00.000Z",
    "formattedDate": "2024-Feb-7 8PM",
    "allAppsRank": 500,
    "financeAppsRank": 48
  },
  {
    "date": "2024-02-08T07:00:00.000Z",
    "formattedDate": "2024-Feb-8 8AM",
    "allAppsRank": 500,
    "financeAppsRank": 40
  },
  {
    "date": "2024-02-08T19:00:00.000Z",
    "formattedDate": "2024-Feb-8 8PM",
    "allAppsRank": 500,
    "financeAppsRank": 43
  },
  {
    "date": "2024-02-09T07:00:00.000Z",
    "formattedDate": "2024-Feb-9 8AM",
    "allAppsRank": 500,
    "financeAppsRank": 40
  },
  {
    "date": "2024-02-09T19:00:00.000Z",
    "formattedDate": "2024-Feb-9 8PM",
    "allAppsRank": 482,
    "financeAppsRank": 41
  },
  {
    "date": "2024-02-10T07:00:00.000Z",
    "formattedDate": "2024-Feb-10 8AM",
    "allAppsRank": 481,
    "financeAppsRank": 38
  },
  {
    "date": "2024-02-10T19:00:00.000Z",
    "formattedDate": "2024-Feb-10 8PM",
    "allAppsRank": 500,
    "financeAppsRank": 42
  },
  {
    "date": "2024-02-11T07:00:00.000Z",
    "formattedDate": "2024-Feb-11 8AM",
    "allAppsRank": 500,
    "financeAppsRank": 36
  },
  {
    "date": "2024-02-11T19:00:00.000Z",
    "formattedDate": "2024-Feb-11 8PM",
    "allAppsRank": 500,
    "financeAppsRank": 41
  },
  {
    "date": "2024-02-12T07:00:00.000Z",
    "formattedDate": "2024-Feb-12 8AM",
    "allAppsRank": 500,
    "financeAppsRank": 36
  },
  {
    "date": "2024-02-12T19:00:00.000Z",
    "formattedDate": "2024-Feb-12 8PM",
    "allAppsRank": 468,
    "financeAppsRank": 34
  },
  {
    "date": "2024-02-13T07:00:00.000Z",
    "formattedDate": "2024-Feb-13 8AM",
    "allAppsRank": 428,
    "financeAppsRank": 34
  },
  {
    "date": "2024-02-13T19:00:00.000Z",
    "formattedDate": "2024-Feb-13 8PM",
    "allAppsRank": 446,
    "financeAppsRank": 36
  },
  {
    "date": "2024-02-14T07:00:00.000Z",
    "formattedDate": "2024-Feb-14 8AM",
    "allAppsRank": 418,
    "financeAppsRank": 32
  },
  {
    "date": "2024-02-14T19:00:00.000Z",
    "formattedDate": "2024-Feb-14 8PM",
    "allAppsRank": 384,
    "financeAppsRank": 32
  },
  {
    "date": "2024-02-15T07:00:00.000Z",
    "formattedDate": "2024-Feb-15 8AM",
    "allAppsRank": 333,
    "financeAppsRank": 28
  },
  {
    "date": "2024-02-15T19:00:00.000Z",
    "formattedDate": "2024-Feb-15 8PM",
    "allAppsRank": 338,
    "financeAppsRank": 30
  },
  {
    "date": "2024-02-16T07:00:00.000Z",
    "formattedDate": "2024-Feb-16 8AM",
    "allAppsRank": 324,
    "financeAppsRank": 28
  },
  {
    "date": "2024-02-16T19:00:00.000Z",
    "formattedDate": "2024-Feb-16 8PM",
    "allAppsRank": 362,
    "financeAppsRank": 31
  },
  {
    "date": "2024-02-17T07:00:00.000Z",
    "formattedDate": "2024-Feb-17 8AM",
    "allAppsRank": 368,
    "financeAppsRank": 29
  },
  {
    "date": "2024-02-17T19:00:00.000Z",
    "formattedDate": "2024-Feb-17 8PM",
    "allAppsRank": 427,
    "financeAppsRank": 34
  },
  {
    "date": "2024-02-18T07:00:00.000Z",
    "formattedDate": "2024-Feb-18 8AM",
    "allAppsRank": 421,
    "financeAppsRank": 30
  },
  {
    "date": "2024-02-18T19:00:00.000Z",
    "formattedDate": "2024-Feb-18 8PM",
    "allAppsRank": 439,
    "financeAppsRank": 33
  },
  {
    "date": "2024-02-19T07:00:00.000Z",
    "formattedDate": "2024-Feb-19 8AM",
    "allAppsRank": 396,
    "financeAppsRank": 27
  },
  {
    "date": "2024-02-19T19:00:00.000Z",
    "formattedDate": "2024-Feb-19 8PM",
    "allAppsRank": 406,
    "financeAppsRank": 31
  },
  {
    "date": "2024-02-20T07:00:00.000Z",
    "formattedDate": "2024-Feb-20 8AM",
    "allAppsRank": 369,
    "financeAppsRank": 29
  },
  {
    "date": "2024-02-20T19:00:00.000Z",
    "formattedDate": "2024-Feb-20 8PM",
    "allAppsRank": 379,
    "financeAppsRank": 34
  },
  {
    "date": "2024-02-21T07:00:00.000Z",
    "formattedDate": "2024-Feb-21 8AM",
    "allAppsRank": 357,
    "financeAppsRank": 31
  },
  {
    "date": "2024-02-21T19:00:00.000Z",
    "formattedDate": "2024-Feb-21 8PM",
    "allAppsRank": 376,
    "financeAppsRank": 34
  },
  {
    "date": "2024-02-22T07:00:00.000Z",
    "formattedDate": "2024-Feb-22 8AM",
    "allAppsRank": 353,
    "financeAppsRank": 31
  },
  {
    "date": "2024-02-22T19:00:00.000Z",
    "formattedDate": "2024-Feb-22 8PM",
    "allAppsRank": 355,
    "financeAppsRank": 33
  },
  {
    "date": "2024-02-23T07:00:00.000Z",
    "formattedDate": "2024-Feb-23 8AM",
    "allAppsRank": 345,
    "financeAppsRank": 30
  },
  {
    "date": "2024-02-23T19:00:00.000Z",
    "formattedDate": "2024-Feb-23 8PM",
    "allAppsRank": 370,
    "financeAppsRank": 34
  },
  {
    "date": "2024-02-24T07:00:00.000Z",
    "formattedDate": "2024-Feb-24 8AM",
    "allAppsRank": 370,
    "financeAppsRank": 31
  },
  {
    "date": "2024-02-24T19:00:00.000Z",
    "formattedDate": "2024-Feb-24 8PM",
    "allAppsRank": 420,
    "financeAppsRank": 33
  },
  {
    "date": "2024-02-25T07:00:00.000Z",
    "formattedDate": "2024-Feb-25 8AM",
    "allAppsRank": 416,
    "financeAppsRank": 30
  },
  {
    "date": "2024-02-25T19:00:00.000Z",
    "formattedDate": "2024-Feb-25 8PM",
    "allAppsRank": 434,
    "financeAppsRank": 31
  },
  {
    "date": "2024-02-26T07:00:00.000Z",
    "formattedDate": "2024-Feb-26 8AM",
    "allAppsRank": 422,
    "financeAppsRank": 29
  },
  {
    "date": "2024-02-26T19:00:00.000Z",
    "formattedDate": "2024-Feb-26 8PM",
    "allAppsRank": 388,
    "financeAppsRank": 31
  },
  {
    "date": "2024-02-27T07:00:00.000Z",
    "formattedDate": "2024-Feb-27 8AM",
    "allAppsRank": 293,
    "financeAppsRank": 25
  },
  {
    "date": "2024-02-27T19:00:00.000Z",
    "formattedDate": "2024-Feb-27 8PM",
    "allAppsRank": 277,
    "financeAppsRank": 25
  },
  {
    "date": "2024-02-28T07:00:00.000Z",
    "formattedDate": "2024-Feb-28 8AM",
    "allAppsRank": 252,
    "financeAppsRank": 23
  },
  {
    "date": "2024-02-28T19:00:00.000Z",
    "formattedDate": "2024-Feb-28 8PM",
    "allAppsRank": 163,
    "financeAppsRank": 17
  },
  {
    "date": "2024-02-29T07:00:00.000Z",
    "formattedDate": "2024-Feb-29 8AM",
    "allAppsRank": 130,
    "financeAppsRank": 13
  },
  {
    "date": "2024-02-29T19:00:00.000Z",
    "formattedDate": "2024-Feb-29 8PM",
    "allAppsRank": 135,
    "financeAppsRank": 14
  },
  {
    "date": "2024-03-01T07:00:00.000Z",
    "formattedDate": "2024-Mar-1 8AM",
    "allAppsRank": 156,
    "financeAppsRank": 14
  },
  {
    "date": "2024-03-01T19:00:00.000Z",
    "formattedDate": "2024-Mar-1 8PM",
    "allAppsRank": 165,
    "financeAppsRank": 17
  },
  {
    "date": "2024-03-02T07:00:00.000Z",
    "formattedDate": "2024-Mar-2 8AM",
    "allAppsRank": 133,
    "financeAppsRank": 13
  },
  {
    "date": "2024-03-02T19:00:00.000Z",
    "formattedDate": "2024-Mar-2 8PM",
    "allAppsRank": 151,
    "financeAppsRank": 14
  },
  {
    "date": "2024-03-03T07:00:00.000Z",
    "formattedDate": "2024-Mar-3 8AM",
    "allAppsRank": 150,
    "financeAppsRank": 12
  },
  {
    "date": "2024-03-03T19:00:00.000Z",
    "formattedDate": "2024-Mar-3 8PM",
    "allAppsRank": 162,
    "financeAppsRank": 12
  },
  {
    "date": "2024-03-04T07:00:00.000Z",
    "formattedDate": "2024-Mar-4 8AM",
    "allAppsRank": 141,
    "financeAppsRank": 10
  },
  {
    "date": "2024-03-04T19:00:00.000Z",
    "formattedDate": "2024-Mar-4 8PM",
    "allAppsRank": 84,
    "financeAppsRank": 7
  },
  {
    "date": "2024-03-05T07:00:00.000Z",
    "formattedDate": "2024-Mar-5 8AM",
    "allAppsRank": 44,
    "financeAppsRank": 4
  },
  {
    "date": "2024-03-05T19:00:00.000Z",
    "formattedDate": "2024-Mar-5 8PM",
    "allAppsRank": 51,
    "financeAppsRank": 4
  },
  {
    "date": "2024-03-06T07:00:00.000Z",
    "formattedDate": "2024-Mar-6 8AM",
    "allAppsRank": 69,
    "financeAppsRank": 7
  },
  {
    "date": "2024-03-06T19:00:00.000Z",
    "formattedDate": "2024-Mar-6 8PM",
    "allAppsRank": 79,
    "financeAppsRank": 8
  },
  {
    "date": "2024-03-07T07:00:00.000Z",
    "formattedDate": "2024-Mar-7 8AM",
    "allAppsRank": 90,
    "financeAppsRank": 8
  },
  {
    "date": "2024-03-07T19:00:00.000Z",
    "formattedDate": "2024-Mar-7 8PM",
    "allAppsRank": 110,
    "financeAppsRank": 12
  },
  {
    "date": "2024-03-08T07:00:00.000Z",
    "formattedDate": "2024-Mar-8 8AM",
    "allAppsRank": 123,
    "financeAppsRank": 13
  },
  {
    "date": "2024-03-08T19:00:00.000Z",
    "formattedDate": "2024-Mar-8 8PM",
    "allAppsRank": 124,
    "financeAppsRank": 13
  },
  {
    "date": "2024-03-09T07:00:00.000Z",
    "formattedDate": "2024-Mar-9 8AM",
    "allAppsRank": 126,
    "financeAppsRank": 12
  },
  {
    "date": "2024-03-09T19:00:00.000Z",
    "formattedDate": "2024-Mar-9 8PM",
    "allAppsRank": 146,
    "financeAppsRank": 12
  },
  {
    "date": "2024-03-10T07:00:00.000Z",
    "formattedDate": "2024-Mar-10 8AM",
    "allAppsRank": 146,
    "financeAppsRank": 11
  },
  {
    "date": "2024-03-10T19:00:00.000Z",
    "formattedDate": "2024-Mar-10 8PM",
    "allAppsRank": 155,
    "financeAppsRank": 11
  },
  {
    "date": "2024-03-11T07:00:00.000Z",
    "formattedDate": "2024-Mar-11 8AM",
    "allAppsRank": 156,
    "financeAppsRank": 11
  },
  {
    "date": "2024-03-11T19:00:00.000Z",
    "formattedDate": "2024-Mar-11 8PM",
    "allAppsRank": 137,
    "financeAppsRank": 11
  },
  {
    "date": "2024-03-12T07:00:00.000Z",
    "formattedDate": "2024-Mar-12 8AM",
    "allAppsRank": 119,
    "financeAppsRank": 10
  },
  {
    "date": "2024-03-12T19:00:00.000Z",
    "formattedDate": "2024-Mar-12 8PM",
    "allAppsRank": 128,
    "financeAppsRank": 11
  },
  {
    "date": "2024-03-13T07:00:00.000Z",
    "formattedDate": "2024-Mar-13 8AM",
    "allAppsRank": 133,
    "financeAppsRank": 12
  },
  {
    "date": "2024-03-13T19:00:00.000Z",
    "formattedDate": "2024-Mar-13 8PM",
    "allAppsRank": 129,
    "financeAppsRank": 12
  },
  {
    "date": "2024-03-14T07:00:00.000Z",
    "formattedDate": "2024-Mar-14 8AM",
    "allAppsRank": 127,
    "financeAppsRank": 12
  },
  {
    "date": "2024-03-14T19:00:00.000Z",
    "formattedDate": "2024-Mar-14 8PM",
    "allAppsRank": 138,
    "financeAppsRank": 13
  },
  {
    "date": "2024-03-15T07:00:00.000Z",
    "formattedDate": "2024-Mar-15 8AM",
    "allAppsRank": 137,
    "financeAppsRank": 12
  },
  {
    "date": "2024-03-15T19:00:00.000Z",
    "formattedDate": "2024-Mar-15 8PM",
    "allAppsRank": 162,
    "financeAppsRank": 15
  },
  {
    "date": "2024-03-16T07:00:00.000Z",
    "formattedDate": "2024-Mar-16 8AM",
    "allAppsRank": 179,
    "financeAppsRank": 13
  },
  {
    "date": "2024-03-16T19:00:00.000Z",
    "formattedDate": "2024-Mar-16 8PM",
    "allAppsRank": 203,
    "financeAppsRank": 16
  },
  {
    "date": "2024-03-17T07:00:00.000Z",
    "formattedDate": "2024-Mar-17 8AM",
    "allAppsRank": 201,
    "financeAppsRank": 14
  },
  {
    "date": "2024-03-17T19:00:00.000Z",
    "formattedDate": "2024-Mar-17 8PM",
    "allAppsRank": 219,
    "financeAppsRank": 14
  },
  {
    "date": "2024-03-18T07:00:00.000Z",
    "formattedDate": "2024-Mar-18 8AM",
    "allAppsRank": 198,
    "financeAppsRank": 13
  },
  {
    "date": "2024-03-19T19:00:00.000Z",
    "formattedDate": "2024-Mar-19 8PM",
    "allAppsRank": 221,
    "financeAppsRank": 22
  },
  {
    "date": "2024-03-20T07:00:00.000Z",
    "formattedDate": "2024-Mar-20 8AM",
    "allAppsRank": 230,
    "financeAppsRank": 20
  },
  {
    "date": "2024-03-20T19:00:00.000Z",
    "formattedDate": "2024-Mar-20 8PM",
    "allAppsRank": 232,
    "financeAppsRank": 23
  },
  {
    "date": "2024-03-21T07:00:00.000Z",
    "formattedDate": "2024-Mar-21 8AM",
    "allAppsRank": 220,
    "financeAppsRank": 19
  },
  {
    "date": "2024-03-21T19:00:00.000Z",
    "formattedDate": "2024-Mar-21 8PM",
    "allAppsRank": 234,
    "financeAppsRank": 23
  },
  {
    "date": "2024-03-22T07:00:00.000Z",
    "formattedDate": "2024-Mar-22 8AM",
    "allAppsRank": 240,
    "financeAppsRank": 20
  },
  {
    "date": "2024-03-22T19:00:00.000Z",
    "formattedDate": "2024-Mar-22 8PM",
    "allAppsRank": 261,
    "financeAppsRank": 24
  },
  {
    "date": "2024-03-23T07:00:00.000Z",
    "formattedDate": "2024-Mar-23 8AM",
    "allAppsRank": 277,
    "financeAppsRank": 21
  },
  {
    "date": "2024-03-23T19:00:00.000Z",
    "formattedDate": "2024-Mar-23 8PM",
    "allAppsRank": 300,
    "financeAppsRank": 25
  },
  {
    "date": "2024-03-24T07:00:00.000Z",
    "formattedDate": "2024-Mar-24 8AM",
    "allAppsRank": 309,
    "financeAppsRank": 22
  },
  {
    "date": "2024-03-24T19:00:00.000Z",
    "formattedDate": "2024-Mar-24 8PM",
    "allAppsRank": 328,
    "financeAppsRank": 22
  },
  {
    "date": "2024-03-25T07:00:00.000Z",
    "formattedDate": "2024-Mar-25 8AM",
    "allAppsRank": 290,
    "financeAppsRank": 19
  },
  {
    "date": "2024-03-25T19:00:00.000Z",
    "formattedDate": "2024-Mar-25 8PM",
    "allAppsRank": 261,
    "financeAppsRank": 22
  },
  {
    "date": "2024-03-26T07:00:00.000Z",
    "formattedDate": "2024-Mar-26 8AM",
    "allAppsRank": 228,
    "financeAppsRank": 17
  },
  {
    "date": "2024-03-26T19:00:00.000Z",
    "formattedDate": "2024-Mar-26 8PM",
    "allAppsRank": 230,
    "financeAppsRank": 21
  },
  {
    "date": "2024-03-27T07:00:00.000Z",
    "formattedDate": "2024-Mar-27 8AM",
    "allAppsRank": 222,
    "financeAppsRank": 16
  },
  {
    "date": "2024-03-27T19:00:00.000Z",
    "formattedDate": "2024-Mar-27 8PM",
    "allAppsRank": 230,
    "financeAppsRank": 21
  },
  {
    "date": "2024-03-28T07:00:00.000Z",
    "formattedDate": "2024-Mar-28 8AM",
    "allAppsRank": 222,
    "financeAppsRank": 19
  },
  {
    "date": "2024-03-28T19:00:00.000Z",
    "formattedDate": "2024-Mar-28 8PM",
    "allAppsRank": 223,
    "financeAppsRank": 22
  },
  {
    "date": "2024-03-29T07:00:00.000Z",
    "formattedDate": "2024-Mar-29 8AM",
    "allAppsRank": 222,
    "financeAppsRank": 16
  },
  {
    "date": "2024-03-29T19:00:00.000Z",
    "formattedDate": "2024-Mar-29 8PM",
    "allAppsRank": 246,
    "financeAppsRank": 23
  },
  {
    "date": "2024-03-30T07:00:00.000Z",
    "formattedDate": "2024-Mar-30 8AM",
    "allAppsRank": 255,
    "financeAppsRank": 17
  },
  {
    "date": "2024-03-30T19:00:00.000Z",
    "formattedDate": "2024-Mar-30 8PM",
    "allAppsRank": 275,
    "financeAppsRank": 21
  },
  {
    "date": "2024-03-31T06:00:00.000Z",
    "formattedDate": "2024-Mar-31 8AM",
    "allAppsRank": 274,
    "financeAppsRank": 18
  },
  {
    "date": "2024-03-31T18:00:00.000Z",
    "formattedDate": "2024-Mar-31 8PM",
    "allAppsRank": 277,
    "financeAppsRank": 18
  },
  {
    "date": "2024-04-01T06:00:00.000Z",
    "formattedDate": "2024-Apr-1 8AM",
    "allAppsRank": 248,
    "financeAppsRank": 14
  },
  {
    "date": "2024-04-01T18:00:00.000Z",
    "formattedDate": "2024-Apr-1 8PM",
    "allAppsRank": 281,
    "financeAppsRank": 22
  },
  {
    "date": "2024-04-02T06:00:00.000Z",
    "formattedDate": "2024-Apr-2 8AM",
    "allAppsRank": 278,
    "financeAppsRank": 21
  },
  {
    "date": "2024-04-02T18:00:00.000Z",
    "formattedDate": "2024-Apr-2 8PM",
    "allAppsRank": 294,
    "financeAppsRank": 24
  },
  {
    "date": "2024-04-03T06:00:00.000Z",
    "formattedDate": "2024-Apr-3 8AM",
    "allAppsRank": 287,
    "financeAppsRank": 22
  },
  {
    "date": "2024-04-03T18:00:00.000Z",
    "formattedDate": "2024-Apr-3 8PM",
    "allAppsRank": 298,
    "financeAppsRank": 24
  },
  {
    "date": "2024-04-04T06:00:00.000Z",
    "formattedDate": "2024-Apr-4 8AM",
    "allAppsRank": 290,
    "financeAppsRank": 23
  },
  {
    "date": "2024-04-04T18:00:00.000Z",
    "formattedDate": "2024-Apr-4 8PM",
    "allAppsRank": 293,
    "financeAppsRank": 25
  },
  {
    "date": "2024-04-05T06:00:00.000Z",
    "formattedDate": "2024-Apr-5 8AM",
    "allAppsRank": 284,
    "financeAppsRank": 23
  },
  {
    "date": "2024-04-05T18:00:00.000Z",
    "formattedDate": "2024-Apr-5 8PM",
    "allAppsRank": 306,
    "financeAppsRank": 25
  },
  {
    "date": "2024-04-06T06:00:00.000Z",
    "formattedDate": "2024-Apr-6 8AM",
    "allAppsRank": 316,
    "financeAppsRank": 24
  },
  {
    "date": "2024-04-06T18:00:00.000Z",
    "formattedDate": "2024-Apr-6 8PM",
    "allAppsRank": 344,
    "financeAppsRank": 25
  },
  {
    "date": "2024-04-07T06:00:00.000Z",
    "formattedDate": "2024-Apr-7 8AM",
    "allAppsRank": 320,
    "financeAppsRank": 21
  },
  {
    "date": "2024-04-07T18:00:00.000Z",
    "formattedDate": "2024-Apr-7 8PM",
    "allAppsRank": 336,
    "financeAppsRank": 21
  },
  {
    "date": "2024-04-08T06:00:00.000Z",
    "formattedDate": "2024-Apr-8 8AM",
    "allAppsRank": 322,
    "financeAppsRank": 21
  },
  {
    "date": "2024-04-08T18:00:00.000Z",
    "formattedDate": "2024-Apr-8 8PM",
    "allAppsRank": 308,
    "financeAppsRank": 21
  },
  {
    "date": "2024-04-09T06:00:00.000Z",
    "formattedDate": "2024-Apr-9 8AM",
    "allAppsRank": 293,
    "financeAppsRank": 21
  },
  {
    "date": "2024-04-09T18:00:00.000Z",
    "formattedDate": "2024-Apr-9 8PM",
    "allAppsRank": 318,
    "financeAppsRank": 25
  },
  {
    "date": "2024-04-10T06:00:00.000Z",
    "formattedDate": "2024-Apr-10 8AM",
    "allAppsRank": 317,
    "financeAppsRank": 26
  },
  {
    "date": "2024-04-10T18:00:00.000Z",
    "formattedDate": "2024-Apr-10 8PM",
    "allAppsRank": 337,
    "financeAppsRank": 28
  },
  {
    "date": "2024-04-11T06:00:00.000Z",
    "formattedDate": "2024-Apr-11 8AM",
    "allAppsRank": 271,
    "financeAppsRank": 23
  },
  {
    "date": "2024-04-11T18:00:00.000Z",
    "formattedDate": "2024-Apr-11 8PM",
    "allAppsRank": 276,
    "financeAppsRank": 25
  },
  {
    "date": "2024-04-12T06:00:00.000Z",
    "formattedDate": "2024-Apr-12 8AM",
    "allAppsRank": 273,
    "financeAppsRank": 22
  },
  {
    "date": "2024-04-12T18:00:00.000Z",
    "formattedDate": "2024-Apr-12 8PM",
    "allAppsRank": 271,
    "financeAppsRank": 25
  },
  {
    "date": "2024-04-13T06:00:00.000Z",
    "formattedDate": "2024-Apr-13 8AM",
    "allAppsRank": 278,
    "financeAppsRank": 21
  },
  {
    "date": "2024-04-13T18:00:00.000Z",
    "formattedDate": "2024-Apr-13 8PM",
    "allAppsRank": 286,
    "financeAppsRank": 24
  },
  {
    "date": "2024-04-14T06:00:00.000Z",
    "formattedDate": "2024-Apr-14 8AM",
    "allAppsRank": 268,
    "financeAppsRank": 17
  },
  {
    "date": "2024-04-14T18:00:00.000Z",
    "formattedDate": "2024-Apr-14 8PM",
    "allAppsRank": 294,
    "financeAppsRank": 20
  },
  {
    "date": "2024-04-15T06:00:00.000Z",
    "formattedDate": "2024-Apr-15 8AM",
    "allAppsRank": 276,
    "financeAppsRank": 19
  },
  {
    "date": "2024-04-15T18:00:00.000Z",
    "formattedDate": "2024-Apr-15 8PM",
    "allAppsRank": 286,
    "financeAppsRank": 25
  },
  {
    "date": "2024-04-16T06:00:00.000Z",
    "formattedDate": "2024-Apr-16 8AM",
    "allAppsRank": 257,
    "financeAppsRank": 22
  },
  {
    "date": "2024-04-16T18:00:00.000Z",
    "formattedDate": "2024-Apr-16 8PM",
    "allAppsRank": 259,
    "financeAppsRank": 22
  },
  {
    "date": "2024-04-17T06:00:00.000Z",
    "formattedDate": "2024-Apr-17 8AM",
    "allAppsRank": 246,
    "financeAppsRank": 19
  },
  {
    "date": "2024-04-17T18:00:00.000Z",
    "formattedDate": "2024-Apr-17 8PM",
    "allAppsRank": 268,
    "financeAppsRank": 22
  },
  {
    "date": "2024-04-18T06:00:00.000Z",
    "formattedDate": "2024-Apr-18 8AM",
    "allAppsRank": 252,
    "financeAppsRank": 20
  },
  {
    "date": "2024-04-18T18:00:00.000Z",
    "formattedDate": "2024-Apr-18 8PM",
    "allAppsRank": 251,
    "financeAppsRank": 22
  },
  {
    "date": "2024-04-19T06:00:00.000Z",
    "formattedDate": "2024-Apr-19 8AM",
    "allAppsRank": 232,
    "financeAppsRank": 17
  },
  {
    "date": "2024-04-19T18:00:00.000Z",
    "formattedDate": "2024-Apr-19 8PM",
    "allAppsRank": 237,
    "financeAppsRank": 19
  },
  {
    "date": "2024-04-20T06:00:00.000Z",
    "formattedDate": "2024-Apr-20 8AM",
    "allAppsRank": 209,
    "financeAppsRank": 14
  },
  {
    "date": "2024-04-20T18:00:00.000Z",
    "formattedDate": "2024-Apr-20 8PM",
    "allAppsRank": 229,
    "financeAppsRank": 15
  },
  {
    "date": "2024-04-21T06:00:00.000Z",
    "formattedDate": "2024-Apr-21 8AM",
    "allAppsRank": 240,
    "financeAppsRank": 13
  },
  {
    "date": "2024-04-21T18:00:00.000Z",
    "formattedDate": "2024-Apr-21 8PM",
    "allAppsRank": 251,
    "financeAppsRank": 13
  },
  {
    "date": "2024-04-22T06:00:00.000Z",
    "formattedDate": "2024-Apr-22 8AM",
    "allAppsRank": 260,
    "financeAppsRank": 13
  },
  {
    "date": "2024-04-22T18:00:00.000Z",
    "formattedDate": "2024-Apr-22 8PM",
    "allAppsRank": 266,
    "financeAppsRank": 18
  },
  {
    "date": "2024-04-23T06:00:00.000Z",
    "formattedDate": "2024-Apr-23 8AM",
    "allAppsRank": 287,
    "financeAppsRank": 19
  },
  {
    "date": "2024-04-23T18:00:00.000Z",
    "formattedDate": "2024-Apr-23 8PM",
    "allAppsRank": 315,
    "financeAppsRank": 23
  },
  {
    "date": "2024-04-24T06:00:00.000Z",
    "formattedDate": "2024-Apr-24 8AM",
    "allAppsRank": 281,
    "financeAppsRank": 20
  },
  {
    "date": "2024-04-24T18:00:00.000Z",
    "formattedDate": "2024-Apr-24 8PM",
    "allAppsRank": 268,
    "financeAppsRank": 20
  },
  {
    "date": "2024-04-25T06:00:00.000Z",
    "formattedDate": "2024-Apr-25 8AM",
    "allAppsRank": 224,
    "financeAppsRank": 15
  },
  {
    "date": "2024-04-25T18:00:00.000Z",
    "formattedDate": "2024-Apr-25 8PM",
    "allAppsRank": 243,
    "financeAppsRank": 19
  },
  {
    "date": "2024-04-26T06:00:00.000Z",
    "formattedDate": "2024-Apr-26 8AM",
    "allAppsRank": 249,
    "financeAppsRank": 16
  },
  {
    "date": "2024-04-26T18:00:00.000Z",
    "formattedDate": "2024-Apr-26 8PM",
    "allAppsRank": 273,
    "financeAppsRank": 19
  },
  {
    "date": "2024-04-27T06:00:00.000Z",
    "formattedDate": "2024-Apr-27 8AM",
    "allAppsRank": 274,
    "financeAppsRank": 17
  },
  {
    "date": "2024-04-27T18:00:00.000Z",
    "formattedDate": "2024-Apr-27 8PM",
    "allAppsRank": 305,
    "financeAppsRank": 19
  },
  {
    "date": "2024-04-28T06:00:00.000Z",
    "formattedDate": "2024-Apr-28 8AM",
    "allAppsRank": 268,
    "financeAppsRank": 15
  },
  {
    "date": "2024-04-28T18:00:00.000Z",
    "formattedDate": "2024-Apr-28 8PM",
    "allAppsRank": 272,
    "financeAppsRank": 15
  },
  {
    "date": "2024-04-29T06:00:00.000Z",
    "formattedDate": "2024-Apr-29 8AM",
    "allAppsRank": 234,
    "financeAppsRank": 11
  },
  {
    "date": "2024-04-29T18:00:00.000Z",
    "formattedDate": "2024-Apr-29 8PM",
    "allAppsRank": 254,
    "financeAppsRank": 17
  },
  {
    "date": "2024-04-30T06:00:00.000Z",
    "formattedDate": "2024-Apr-30 8AM",
    "allAppsRank": 255,
    "financeAppsRank": 18
  },
  {
    "date": "2024-04-30T18:00:00.000Z",
    "formattedDate": "2024-Apr-30 8PM",
    "allAppsRank": 269,
    "financeAppsRank": 22
  },
  {
    "date": "2024-05-01T06:00:00.000Z",
    "formattedDate": "2024-May-1 8AM",
    "allAppsRank": 258,
    "financeAppsRank": 22
  },
  {
    "date": "2024-05-01T18:00:00.000Z",
    "formattedDate": "2024-May-1 8PM",
    "allAppsRank": 269,
    "financeAppsRank": 23
  },
  {
    "date": "2024-05-02T06:00:00.000Z",
    "formattedDate": "2024-May-2 8AM",
    "allAppsRank": 244,
    "financeAppsRank": 20
  },
  {
    "date": "2024-05-02T18:00:00.000Z",
    "formattedDate": "2024-May-2 8PM",
    "allAppsRank": 278,
    "financeAppsRank": 23
  },
  {
    "date": "2024-05-03T06:00:00.000Z",
    "formattedDate": "2024-May-3 8AM",
    "allAppsRank": 262,
    "financeAppsRank": 21
  },
  {
    "date": "2024-05-03T18:00:00.000Z",
    "formattedDate": "2024-May-3 8PM",
    "allAppsRank": 282,
    "financeAppsRank": 22
  },
  {
    "date": "2024-05-04T06:00:00.000Z",
    "formattedDate": "2024-May-4 8AM",
    "allAppsRank": 276,
    "financeAppsRank": 19
  },
  {
    "date": "2024-05-04T18:00:00.000Z",
    "formattedDate": "2024-May-4 8PM",
    "allAppsRank": 310,
    "financeAppsRank": 19
  },
  {
    "date": "2024-05-05T06:00:00.000Z",
    "formattedDate": "2024-May-5 8AM",
    "allAppsRank": 306,
    "financeAppsRank": 16
  },
  {
    "date": "2024-05-05T18:00:00.000Z",
    "formattedDate": "2024-May-5 8PM",
    "allAppsRank": 320,
    "financeAppsRank": 17
  },
  {
    "date": "2024-05-06T06:00:00.000Z",
    "formattedDate": "2024-May-6 8AM",
    "allAppsRank": 293,
    "financeAppsRank": 17
  },
  {
    "date": "2024-05-06T18:00:00.000Z",
    "formattedDate": "2024-May-6 8PM",
    "allAppsRank": 289,
    "financeAppsRank": 19
  },
  {
    "date": "2024-05-07T06:00:00.000Z",
    "formattedDate": "2024-May-7 8AM",
    "allAppsRank": 262,
    "financeAppsRank": 17
  },
  {
    "date": "2024-05-07T18:00:00.000Z",
    "formattedDate": "2024-May-7 8PM",
    "allAppsRank": 273,
    "financeAppsRank": 19
  },
  {
    "date": "2024-05-08T06:00:00.000Z",
    "formattedDate": "2024-May-8 8AM",
    "allAppsRank": 268,
    "financeAppsRank": 19
  },
  {
    "date": "2024-05-08T18:00:00.000Z",
    "formattedDate": "2024-May-8 8PM",
    "allAppsRank": 291,
    "financeAppsRank": 22
  },
  {
    "date": "2024-05-09T06:00:00.000Z",
    "formattedDate": "2024-May-9 8AM",
    "allAppsRank": 273,
    "financeAppsRank": 20
  },
  {
    "date": "2024-05-09T18:00:00.000Z",
    "formattedDate": "2024-May-9 8PM",
    "allAppsRank": 296,
    "financeAppsRank": 22
  },
  {
    "date": "2024-05-10T06:00:00.000Z",
    "formattedDate": "2024-May-10 8AM",
    "allAppsRank": 500,
    "financeAppsRank": 50
  },
  {
    "date": "2024-05-10T18:00:00.000Z",
    "formattedDate": "2024-May-10 8PM",
    "allAppsRank": 329,
    "financeAppsRank": 25
  },
  {
    "date": "2024-05-11T06:00:00.000Z",
    "formattedDate": "2024-May-11 8AM",
    "allAppsRank": 339,
    "financeAppsRank": 24
  },
  {
    "date": "2024-05-11T18:00:00.000Z",
    "formattedDate": "2024-May-11 8PM",
    "allAppsRank": 373,
    "financeAppsRank": 27
  },
  {
    "date": "2024-05-12T06:00:00.000Z",
    "formattedDate": "2024-May-12 8AM",
    "allAppsRank": 387,
    "financeAppsRank": 24
  },
  {
    "date": "2024-05-12T18:00:00.000Z",
    "formattedDate": "2024-May-12 8PM",
    "allAppsRank": 396,
    "financeAppsRank": 25
  },
  {
    "date": "2024-05-13T06:00:00.000Z",
    "formattedDate": "2024-May-13 8AM",
    "allAppsRank": 357,
    "financeAppsRank": 21
  },
  {
    "date": "2024-05-13T18:00:00.000Z",
    "formattedDate": "2024-May-13 8PM",
    "allAppsRank": 348,
    "financeAppsRank": 25
  },
  {
    "date": "2024-05-14T06:00:00.000Z",
    "formattedDate": "2024-May-14 8AM",
    "allAppsRank": 299,
    "financeAppsRank": 22
  },
  {
    "date": "2024-05-14T18:00:00.000Z",
    "formattedDate": "2024-May-14 8PM",
    "allAppsRank": 301,
    "financeAppsRank": 23
  },
  {
    "date": "2024-05-15T06:00:00.000Z",
    "formattedDate": "2024-May-15 8AM",
    "allAppsRank": 285,
    "financeAppsRank": 23
  },
  {
    "date": "2024-05-15T18:00:00.000Z",
    "formattedDate": "2024-May-15 8PM",
    "allAppsRank": 305,
    "financeAppsRank": 23
  },
  {
    "date": "2024-05-16T06:00:00.000Z",
    "formattedDate": "2024-May-16 8AM",
    "allAppsRank": 271,
    "financeAppsRank": 23
  },
  {
    "date": "2024-05-16T18:00:00.000Z",
    "formattedDate": "2024-May-16 8PM",
    "allAppsRank": 280,
    "financeAppsRank": 22
  },
  {
    "date": "2024-05-17T06:00:00.000Z",
    "formattedDate": "2024-May-17 8AM",
    "allAppsRank": 277,
    "financeAppsRank": 22
  },
  {
    "date": "2024-05-17T18:00:00.000Z",
    "formattedDate": "2024-May-17 8PM",
    "allAppsRank": 287,
    "financeAppsRank": 22
  },
  {
    "date": "2024-05-18T06:00:00.000Z",
    "formattedDate": "2024-May-18 8AM",
    "allAppsRank": 271,
    "financeAppsRank": 17
  },
  {
    "date": "2024-05-18T18:00:00.000Z",
    "formattedDate": "2024-May-18 8PM",
    "allAppsRank": 275,
    "financeAppsRank": 20
  },
  {
    "date": "2024-05-19T06:00:00.000Z",
    "formattedDate": "2024-May-19 8AM",
    "allAppsRank": 258,
    "financeAppsRank": 16
  },
  {
    "date": "2024-05-19T18:00:00.000Z",
    "formattedDate": "2024-May-19 8PM",
    "allAppsRank": 261,
    "financeAppsRank": 16
  },
  {
    "date": "2024-05-20T06:00:00.000Z",
    "formattedDate": "2024-May-20 8AM",
    "allAppsRank": 241,
    "financeAppsRank": 12
  },
  {
    "date": "2024-05-20T18:00:00.000Z",
    "formattedDate": "2024-May-20 8PM",
    "allAppsRank": 250,
    "financeAppsRank": 16
  },
  {
    "date": "2024-05-21T06:00:00.000Z",
    "formattedDate": "2024-May-21 8AM",
    "allAppsRank": 207,
    "financeAppsRank": 15
  },
  {
    "date": "2024-05-22T06:00:00.000Z",
    "formattedDate": "2024-May-22 8AM",
    "allAppsRank": 208,
    "financeAppsRank": 15
  },
  {
    "date": "2024-05-22T18:00:00.000Z",
    "formattedDate": "2024-May-22 8PM",
    "allAppsRank": 239,
    "financeAppsRank": 18
  },
  {
    "date": "2024-05-23T06:00:00.000Z",
    "formattedDate": "2024-May-23 8AM",
    "allAppsRank": 221,
    "financeAppsRank": 16
  },
  {
    "date": "2024-05-23T18:00:00.000Z",
    "formattedDate": "2024-May-23 8PM",
    "allAppsRank": 230,
    "financeAppsRank": 18
  },
  {
    "date": "2024-05-24T06:00:00.000Z",
    "formattedDate": "2024-May-24 8AM",
    "allAppsRank": 219,
    "financeAppsRank": 16
  },
  {
    "date": "2024-05-24T18:00:00.000Z",
    "formattedDate": "2024-May-24 8PM",
    "allAppsRank": 225,
    "financeAppsRank": 19
  },
  {
    "date": "2024-05-25T06:00:00.000Z",
    "formattedDate": "2024-May-25 8AM",
    "allAppsRank": 218,
    "financeAppsRank": 15
  },
  {
    "date": "2024-05-25T18:00:00.000Z",
    "formattedDate": "2024-May-25 8PM",
    "allAppsRank": 221,
    "financeAppsRank": 15
  },
  {
    "date": "2024-05-26T06:00:00.000Z",
    "formattedDate": "2024-May-26 8AM",
    "allAppsRank": 204,
    "financeAppsRank": 12
  },
  {
    "date": "2024-05-26T18:00:00.000Z",
    "formattedDate": "2024-May-26 8PM",
    "allAppsRank": 209,
    "financeAppsRank": 12
  },
  {
    "date": "2024-05-27T06:00:00.000Z",
    "formattedDate": "2024-May-27 8AM",
    "allAppsRank": 184,
    "financeAppsRank": 10
  },
  {
    "date": "2024-05-27T18:00:00.000Z",
    "formattedDate": "2024-May-27 8PM",
    "allAppsRank": 192,
    "financeAppsRank": 12
  },
  {
    "date": "2024-05-28T06:00:00.000Z",
    "formattedDate": "2024-May-28 8AM",
    "allAppsRank": 171,
    "financeAppsRank": 11
  },
  {
    "date": "2024-05-28T18:00:00.000Z",
    "formattedDate": "2024-May-28 8PM",
    "allAppsRank": 192,
    "financeAppsRank": 13
  },
  {
    "date": "2024-05-29T06:00:00.000Z",
    "formattedDate": "2024-May-29 8AM",
    "allAppsRank": 177,
    "financeAppsRank": 12
  },
  {
    "date": "2024-05-29T18:00:00.000Z",
    "formattedDate": "2024-May-29 8PM",
    "allAppsRank": 191,
    "financeAppsRank": 16
  },
  {
    "date": "2024-05-30T06:00:00.000Z",
    "formattedDate": "2024-May-30 8AM",
    "allAppsRank": 186,
    "financeAppsRank": 15
  },
  {
    "date": "2024-05-30T18:00:00.000Z",
    "formattedDate": "2024-May-30 8PM",
    "allAppsRank": 219,
    "financeAppsRank": 17
  },
  {
    "date": "2024-05-31T06:00:00.000Z",
    "formattedDate": "2024-May-31 8AM",
    "allAppsRank": 207,
    "financeAppsRank": 14
  },
  {
    "date": "2024-05-31T18:00:00.000Z",
    "formattedDate": "2024-May-31 8PM",
    "allAppsRank": 226,
    "financeAppsRank": 18
  },
  {
    "date": "2024-06-01T06:00:00.000Z",
    "formattedDate": "2024-Jun-1 8AM",
    "allAppsRank": 208,
    "financeAppsRank": 14
  },
  {
    "date": "2024-06-01T18:00:00.000Z",
    "formattedDate": "2024-Jun-1 8PM",
    "allAppsRank": 220,
    "financeAppsRank": 14
  },
  {
    "date": "2024-06-02T06:00:00.000Z",
    "formattedDate": "2024-Jun-2 8AM",
    "allAppsRank": 203,
    "financeAppsRank": 11
  },
  {
    "date": "2024-06-02T18:00:00.000Z",
    "formattedDate": "2024-Jun-2 8PM",
    "allAppsRank": 202,
    "financeAppsRank": 11
  },
  {
    "date": "2024-06-03T06:00:00.000Z",
    "formattedDate": "2024-Jun-3 8AM",
    "allAppsRank": 175,
    "financeAppsRank": 10
  },
  {
    "date": "2024-06-03T18:00:00.000Z",
    "formattedDate": "2024-Jun-3 8PM",
    "allAppsRank": 207,
    "financeAppsRank": 14
  },
  {
    "date": "2024-06-04T06:00:00.000Z",
    "formattedDate": "2024-Jun-4 8AM",
    "allAppsRank": 179,
    "financeAppsRank": 13
  },
  {
    "date": "2024-06-04T18:00:00.000Z",
    "formattedDate": "2024-Jun-4 8PM",
    "allAppsRank": 205,
    "financeAppsRank": 15
  },
  {
    "date": "2024-06-05T06:00:00.000Z",
    "formattedDate": "2024-Jun-5 8AM",
    "allAppsRank": 182,
    "financeAppsRank": 15
  },
  {
    "date": "2024-06-05T18:00:00.000Z",
    "formattedDate": "2024-Jun-5 8PM",
    "allAppsRank": 203,
    "financeAppsRank": 17
  },
  {
    "date": "2024-06-06T06:00:00.000Z",
    "formattedDate": "2024-Jun-6 8AM",
    "allAppsRank": 164,
    "financeAppsRank": 14
  },
  {
    "date": "2024-06-06T18:00:00.000Z",
    "formattedDate": "2024-Jun-6 8PM",
    "allAppsRank": 187,
    "financeAppsRank": 17
  },
  {
    "date": "2024-06-07T06:00:00.000Z",
    "formattedDate": "2024-Jun-7 8AM",
    "allAppsRank": 252,
    "financeAppsRank": 20
  },
  {
    "date": "2024-06-07T18:00:00.000Z",
    "formattedDate": "2024-Jun-7 8PM",
    "allAppsRank": 242,
    "financeAppsRank": 22
  },
  {
    "date": "2024-06-08T06:00:00.000Z",
    "formattedDate": "2024-Jun-8 8AM",
    "allAppsRank": 241,
    "financeAppsRank": 18
  },
  {
    "date": "2024-06-08T18:00:00.000Z",
    "formattedDate": "2024-Jun-8 8PM",
    "allAppsRank": 256,
    "financeAppsRank": 20
  },
  {
    "date": "2024-06-09T06:00:00.000Z",
    "formattedDate": "2024-Jun-9 8AM",
    "allAppsRank": 256,
    "financeAppsRank": 17
  },
  {
    "date": "2024-06-09T18:00:00.000Z",
    "formattedDate": "2024-Jun-9 8PM",
    "allAppsRank": 260,
    "financeAppsRank": 16
  },
  {
    "date": "2024-06-10T06:00:00.000Z",
    "formattedDate": "2024-Jun-10 8AM",
    "allAppsRank": 264,
    "financeAppsRank": 15
  },
  {
    "date": "2024-06-10T18:00:00.000Z",
    "formattedDate": "2024-Jun-10 8PM",
    "allAppsRank": 278,
    "financeAppsRank": 20
  },
  {
    "date": "2024-06-11T06:00:00.000Z",
    "formattedDate": "2024-Jun-11 8AM",
    "allAppsRank": 293,
    "financeAppsRank": 21
  },
  {
    "date": "2024-06-11T18:00:00.000Z",
    "formattedDate": "2024-Jun-11 8PM",
    "allAppsRank": 291,
    "financeAppsRank": 24
  },
  {
    "date": "2024-06-12T06:00:00.000Z",
    "formattedDate": "2024-Jun-12 8AM",
    "allAppsRank": 299,
    "financeAppsRank": 23
  },
  {
    "date": "2024-06-12T18:00:00.000Z",
    "formattedDate": "2024-Jun-12 8PM",
    "allAppsRank": 291,
    "financeAppsRank": 23
  },
  {
    "date": "2024-06-13T06:00:00.000Z",
    "formattedDate": "2024-Jun-13 8AM",
    "allAppsRank": 276,
    "financeAppsRank": 23
  },
  {
    "date": "2024-06-13T18:00:00.000Z",
    "formattedDate": "2024-Jun-13 8PM",
    "allAppsRank": 287,
    "financeAppsRank": 23
  },
  {
    "date": "2024-06-14T06:00:00.000Z",
    "formattedDate": "2024-Jun-14 8AM",
    "allAppsRank": 281,
    "financeAppsRank": 23
  },
  {
    "date": "2024-06-14T18:00:00.000Z",
    "formattedDate": "2024-Jun-14 8PM",
    "allAppsRank": 292,
    "financeAppsRank": 24
  },
  {
    "date": "2024-06-15T06:00:00.000Z",
    "formattedDate": "2024-Jun-15 8AM",
    "allAppsRank": 302,
    "financeAppsRank": 22
  },
  {
    "date": "2024-06-15T18:00:00.000Z",
    "formattedDate": "2024-Jun-15 8PM",
    "allAppsRank": 294,
    "financeAppsRank": 21
  },
  {
    "date": "2024-06-16T06:00:00.000Z",
    "formattedDate": "2024-Jun-16 8AM",
    "allAppsRank": 313,
    "financeAppsRank": 18
  },
  {
    "date": "2024-06-16T18:00:00.000Z",
    "formattedDate": "2024-Jun-16 8PM",
    "allAppsRank": 311,
    "financeAppsRank": 20
  },
  {
    "date": "2024-06-17T06:00:00.000Z",
    "formattedDate": "2024-Jun-17 8AM",
    "allAppsRank": 300,
    "financeAppsRank": 15
  },
  {
    "date": "2024-06-17T18:00:00.000Z",
    "formattedDate": "2024-Jun-17 8PM",
    "allAppsRank": 313,
    "financeAppsRank": 22
  },
  {
    "date": "2024-06-18T06:00:00.000Z",
    "formattedDate": "2024-Jun-18 8AM",
    "allAppsRank": 301,
    "financeAppsRank": 22
  },
  {
    "date": "2024-06-18T18:00:00.000Z",
    "formattedDate": "2024-Jun-18 8PM",
    "allAppsRank": 314,
    "financeAppsRank": 23
  },
  {
    "date": "2024-06-19T06:00:00.000Z",
    "formattedDate": "2024-Jun-19 8AM",
    "allAppsRank": 312,
    "financeAppsRank": 23
  },
  {
    "date": "2024-06-19T18:00:00.000Z",
    "formattedDate": "2024-Jun-19 8PM",
    "allAppsRank": 316,
    "financeAppsRank": 24
  },
  {
    "date": "2024-06-20T06:00:00.000Z",
    "formattedDate": "2024-Jun-20 8AM",
    "allAppsRank": 320,
    "financeAppsRank": 23
  },
  {
    "date": "2024-06-20T18:00:00.000Z",
    "formattedDate": "2024-Jun-20 8PM",
    "allAppsRank": 317,
    "financeAppsRank": 24
  },
  {
    "date": "2024-06-21T06:00:00.000Z",
    "formattedDate": "2024-Jun-21 8AM",
    "allAppsRank": 307,
    "financeAppsRank": 23
  },
  {
    "date": "2024-06-21T18:00:00.000Z",
    "formattedDate": "2024-Jun-21 8PM",
    "allAppsRank": 301,
    "financeAppsRank": 21
  },
  {
    "date": "2024-06-22T06:00:00.000Z",
    "formattedDate": "2024-Jun-22 8AM",
    "allAppsRank": 312,
    "financeAppsRank": 21
  },
  {
    "date": "2024-06-22T18:00:00.000Z",
    "formattedDate": "2024-Jun-22 8PM",
    "allAppsRank": 313,
    "financeAppsRank": 22
  },
  {
    "date": "2024-06-23T06:00:00.000Z",
    "formattedDate": "2024-Jun-23 8AM",
    "allAppsRank": 313,
    "financeAppsRank": 18
  },
  {
    "date": "2024-06-23T18:00:00.000Z",
    "formattedDate": "2024-Jun-23 8PM",
    "allAppsRank": 324,
    "financeAppsRank": 19
  },
  {
    "date": "2024-06-24T06:00:00.000Z",
    "formattedDate": "2024-Jun-24 8AM",
    "allAppsRank": 335,
    "financeAppsRank": 20
  },
  {
    "date": "2024-06-24T18:00:00.000Z",
    "formattedDate": "2024-Jun-24 8PM",
    "allAppsRank": 320,
    "financeAppsRank": 22
  },
  {
    "date": "2024-06-25T06:00:00.000Z",
    "formattedDate": "2024-Jun-25 8AM",
    "allAppsRank": 253,
    "financeAppsRank": 18
  },
  {
    "date": "2024-06-25T18:00:00.000Z",
    "formattedDate": "2024-Jun-25 8PM",
    "allAppsRank": 253,
    "financeAppsRank": 20
  },
  {
    "date": "2024-06-26T06:00:00.000Z",
    "formattedDate": "2024-Jun-26 8AM",
    "allAppsRank": 248,
    "financeAppsRank": 18
  },
  {
    "date": "2024-06-26T18:00:00.000Z",
    "formattedDate": "2024-Jun-26 8PM",
    "allAppsRank": 259,
    "financeAppsRank": 21
  },
  {
    "date": "2024-06-27T06:00:00.000Z",
    "formattedDate": "2024-Jun-27 8AM",
    "allAppsRank": 230,
    "financeAppsRank": 17
  },
  {
    "date": "2024-06-27T18:00:00.000Z",
    "formattedDate": "2024-Jun-27 8PM",
    "allAppsRank": 248,
    "financeAppsRank": 20
  },
  {
    "date": "2024-06-28T06:00:00.000Z",
    "formattedDate": "2024-Jun-28 8AM",
    "allAppsRank": 238,
    "financeAppsRank": 16
  },
  {
    "date": "2024-06-28T18:00:00.000Z",
    "formattedDate": "2024-Jun-28 8PM",
    "allAppsRank": 241,
    "financeAppsRank": 19
  },
  {
    "date": "2024-06-29T06:00:00.000Z",
    "formattedDate": "2024-Jun-29 8AM",
    "allAppsRank": 241,
    "financeAppsRank": 16
  },
  {
    "date": "2024-06-29T18:00:00.000Z",
    "formattedDate": "2024-Jun-29 8PM",
    "allAppsRank": 261,
    "financeAppsRank": 19
  },
  {
    "date": "2024-06-30T06:00:00.000Z",
    "formattedDate": "2024-Jun-30 8AM",
    "allAppsRank": 260,
    "financeAppsRank": 15
  },
  {
    "date": "2024-06-30T18:00:00.000Z",
    "formattedDate": "2024-Jun-30 8PM",
    "allAppsRank": 263,
    "financeAppsRank": 15
  },
  {
    "date": "2024-07-01T06:00:00.000Z",
    "formattedDate": "2024-Jul-1 8AM",
    "allAppsRank": 262,
    "financeAppsRank": 13
  },
  {
    "date": "2024-07-01T18:00:00.000Z",
    "formattedDate": "2024-Jul-1 8PM",
    "allAppsRank": 281,
    "financeAppsRank": 20
  },
  {
    "date": "2024-07-02T06:00:00.000Z",
    "formattedDate": "2024-Jul-2 8AM",
    "allAppsRank": 278,
    "financeAppsRank": 19
  },
  {
    "date": "2024-07-02T18:00:00.000Z",
    "formattedDate": "2024-Jul-2 8PM",
    "allAppsRank": 278,
    "financeAppsRank": 21
  },
  {
    "date": "2024-07-03T06:00:00.000Z",
    "formattedDate": "2024-Jul-3 8AM",
    "allAppsRank": 271,
    "financeAppsRank": 21
  },
  {
    "date": "2024-07-03T18:00:00.000Z",
    "formattedDate": "2024-Jul-3 8PM",
    "allAppsRank": 283,
    "financeAppsRank": 23
  },
  {
    "date": "2024-07-04T06:00:00.000Z",
    "formattedDate": "2024-Jul-4 8AM",
    "allAppsRank": 237,
    "financeAppsRank": 14
  },
  {
    "date": "2024-07-04T18:00:00.000Z",
    "formattedDate": "2024-Jul-4 8PM",
    "allAppsRank": 235,
    "financeAppsRank": 15
  },
  {
    "date": "2024-07-05T06:00:00.000Z",
    "formattedDate": "2024-Jul-5 8AM",
    "allAppsRank": 204,
    "financeAppsRank": 11
  },
  {
    "date": "2024-07-05T18:00:00.000Z",
    "formattedDate": "2024-Jul-5 8PM",
    "allAppsRank": 219,
    "financeAppsRank": 14
  },
  {
    "date": "2024-07-06T06:00:00.000Z",
    "formattedDate": "2024-Jul-6 8AM",
    "allAppsRank": 223,
    "financeAppsRank": 14
  },
  {
    "date": "2024-07-06T18:00:00.000Z",
    "formattedDate": "2024-Jul-6 8PM",
    "allAppsRank": 233,
    "financeAppsRank": 15
  },
  {
    "date": "2024-07-07T06:00:00.000Z",
    "formattedDate": "2024-Jul-7 8AM",
    "allAppsRank": 224,
    "financeAppsRank": 13
  },
  {
    "date": "2024-07-07T18:00:00.000Z",
    "formattedDate": "2024-Jul-7 8PM",
    "allAppsRank": 240,
    "financeAppsRank": 14
  },
  {
    "date": "2024-07-08T06:00:00.000Z",
    "formattedDate": "2024-Jul-8 8AM",
    "allAppsRank": 234,
    "financeAppsRank": 12
  },
  {
    "date": "2024-07-08T18:00:00.000Z",
    "formattedDate": "2024-Jul-8 8PM",
    "allAppsRank": 258,
    "financeAppsRank": 20
  },
  {
    "date": "2024-07-09T06:00:00.000Z",
    "formattedDate": "2024-Jul-9 8AM",
    "allAppsRank": 283,
    "financeAppsRank": 22
  },
  {
    "date": "2024-07-09T18:00:00.000Z",
    "formattedDate": "2024-Jul-9 8PM",
    "allAppsRank": 301,
    "financeAppsRank": 26
  },
  {
    "date": "2024-07-10T06:00:00.000Z",
    "formattedDate": "2024-Jul-10 8AM",
    "allAppsRank": 265,
    "financeAppsRank": 20
  },
  {
    "date": "2024-07-10T18:00:00.000Z",
    "formattedDate": "2024-Jul-10 8PM",
    "allAppsRank": 296,
    "financeAppsRank": 25
  },
  {
    "date": "2024-07-11T06:00:00.000Z",
    "formattedDate": "2024-Jul-11 8AM",
    "allAppsRank": 251,
    "financeAppsRank": 20
  },
  {
    "date": "2024-07-11T18:00:00.000Z",
    "formattedDate": "2024-Jul-11 8PM",
    "allAppsRank": 249,
    "financeAppsRank": 21
  },
  {
    "date": "2024-07-12T06:00:00.000Z",
    "formattedDate": "2024-Jul-12 8AM",
    "allAppsRank": 209,
    "financeAppsRank": 15
  },
  {
    "date": "2024-07-12T18:00:00.000Z",
    "formattedDate": "2024-Jul-12 8PM",
    "allAppsRank": 210,
    "financeAppsRank": 18
  },
  {
    "date": "2024-07-13T06:00:00.000Z",
    "formattedDate": "2024-Jul-13 8AM",
    "allAppsRank": 190,
    "financeAppsRank": 14
  },
  {
    "date": "2024-07-13T18:00:00.000Z",
    "formattedDate": "2024-Jul-13 8PM",
    "allAppsRank": 202,
    "financeAppsRank": 16
  },
  {
    "date": "2024-07-14T06:00:00.000Z",
    "formattedDate": "2024-Jul-14 8AM",
    "allAppsRank": 173,
    "financeAppsRank": 12
  },
  {
    "date": "2024-07-14T18:00:00.000Z",
    "formattedDate": "2024-Jul-14 8PM",
    "allAppsRank": 173,
    "financeAppsRank": 11
  },
  {
    "date": "2024-07-15T06:00:00.000Z",
    "formattedDate": "2024-Jul-15 8AM",
    "allAppsRank": 143,
    "financeAppsRank": 7
  },
  {
    "date": "2024-07-15T18:00:00.000Z",
    "formattedDate": "2024-Jul-15 8PM",
    "allAppsRank": 153,
    "financeAppsRank": 11
  },
  {
    "date": "2024-07-16T06:00:00.000Z",
    "formattedDate": "2024-Jul-16 8AM",
    "allAppsRank": 133,
    "financeAppsRank": 9
  },
  {
    "date": "2024-07-16T18:00:00.000Z",
    "formattedDate": "2024-Jul-16 8PM",
    "allAppsRank": 142,
    "financeAppsRank": 11
  },
  {
    "date": "2024-07-17T06:00:00.000Z",
    "formattedDate": "2024-Jul-17 8AM",
    "allAppsRank": 126,
    "financeAppsRank": 9
  },
  {
    "date": "2024-07-17T18:00:00.000Z",
    "formattedDate": "2024-Jul-17 8PM",
    "allAppsRank": 137,
    "financeAppsRank": 12
  },
  {
    "date": "2024-07-18T06:00:00.000Z",
    "formattedDate": "2024-Jul-18 8AM",
    "allAppsRank": 130,
    "financeAppsRank": 10
  },
  {
    "date": "2024-07-18T18:00:00.000Z",
    "formattedDate": "2024-Jul-18 8PM",
    "allAppsRank": 141,
    "financeAppsRank": 12
  },
  {
    "date": "2024-07-19T06:00:00.000Z",
    "formattedDate": "2024-Jul-19 8AM",
    "allAppsRank": 137,
    "financeAppsRank": 11
  },
  {
    "date": "2024-07-19T18:00:00.000Z",
    "formattedDate": "2024-Jul-19 8PM",
    "allAppsRank": 149,
    "financeAppsRank": 14
  },
  {
    "date": "2024-07-20T06:00:00.000Z",
    "formattedDate": "2024-Jul-20 8AM",
    "allAppsRank": 146,
    "financeAppsRank": 11
  },
  {
    "date": "2024-07-20T18:00:00.000Z",
    "formattedDate": "2024-Jul-20 8PM",
    "allAppsRank": 148,
    "financeAppsRank": 11
  },
  {
    "date": "2024-07-21T06:00:00.000Z",
    "formattedDate": "2024-Jul-21 8AM",
    "allAppsRank": 135,
    "financeAppsRank": 10
  },
  {
    "date": "2024-07-21T18:00:00.000Z",
    "formattedDate": "2024-Jul-21 8PM",
    "allAppsRank": 145,
    "financeAppsRank": 12
  },
  {
    "date": "2024-07-22T06:00:00.000Z",
    "formattedDate": "2024-Jul-22 8AM",
    "allAppsRank": 129,
    "financeAppsRank": 8
  },
  {
    "date": "2024-07-22T18:00:00.000Z",
    "formattedDate": "2024-Jul-22 8PM",
    "allAppsRank": 153,
    "financeAppsRank": 12
  },
  {
    "date": "2024-07-23T06:00:00.000Z",
    "formattedDate": "2024-Jul-23 8AM",
    "allAppsRank": 145,
    "financeAppsRank": 12
  },
  {
    "date": "2024-07-23T18:00:00.000Z",
    "formattedDate": "2024-Jul-23 8PM",
    "allAppsRank": 164,
    "financeAppsRank": 13
  },
  {
    "date": "2024-07-24T06:00:00.000Z",
    "formattedDate": "2024-Jul-24 8AM",
    "allAppsRank": 152,
    "financeAppsRank": 12
  },
  {
    "date": "2024-07-24T18:00:00.000Z",
    "formattedDate": "2024-Jul-24 8PM",
    "allAppsRank": 178,
    "financeAppsRank": 14
  },
  {
    "date": "2024-07-25T06:00:00.000Z",
    "formattedDate": "2024-Jul-25 8AM",
    "allAppsRank": 188,
    "financeAppsRank": 13
  },
  {
    "date": "2024-07-25T18:00:00.000Z",
    "formattedDate": "2024-Jul-25 8PM",
    "allAppsRank": 212,
    "financeAppsRank": 16
  },
  {
    "date": "2024-07-26T06:00:00.000Z",
    "formattedDate": "2024-Jul-26 8AM",
    "allAppsRank": 191,
    "financeAppsRank": 13
  },
  {
    "date": "2024-07-26T18:00:00.000Z",
    "formattedDate": "2024-Jul-26 8PM",
    "allAppsRank": 215,
    "financeAppsRank": 16
  },
  {
    "date": "2024-07-27T06:00:00.000Z",
    "formattedDate": "2024-Jul-27 8AM",
    "allAppsRank": 214,
    "financeAppsRank": 15
  },
  {
    "date": "2024-07-27T18:00:00.000Z",
    "formattedDate": "2024-Jul-27 8PM",
    "allAppsRank": 238,
    "financeAppsRank": 16
  },
  {
    "date": "2024-07-28T06:00:00.000Z",
    "formattedDate": "2024-Jul-28 8AM",
    "allAppsRank": 215,
    "financeAppsRank": 13
  },
  {
    "date": "2024-07-28T18:00:00.000Z",
    "formattedDate": "2024-Jul-28 8PM",
    "allAppsRank": 230,
    "financeAppsRank": 14
  },
  {
    "date": "2024-07-29T06:00:00.000Z",
    "formattedDate": "2024-Jul-29 8AM",
    "allAppsRank": 210,
    "financeAppsRank": 12
  },
  {
    "date": "2024-07-29T18:00:00.000Z",
    "formattedDate": "2024-Jul-29 8PM",
    "allAppsRank": 244,
    "financeAppsRank": 16
  },
  {
    "date": "2024-07-30T06:00:00.000Z",
    "formattedDate": "2024-Jul-30 8AM",
    "allAppsRank": 219,
    "financeAppsRank": 15
  },
  {
    "date": "2024-07-30T18:00:00.000Z",
    "formattedDate": "2024-Jul-30 8PM",
    "allAppsRank": 250,
    "financeAppsRank": 21
  },
  {
    "date": "2024-07-31T06:00:00.000Z",
    "formattedDate": "2024-Jul-31 8AM",
    "allAppsRank": 222,
    "financeAppsRank": 15
  },
  {
    "date": "2024-07-31T18:00:00.000Z",
    "formattedDate": "2024-Jul-31 8PM",
    "allAppsRank": 239,
    "financeAppsRank": 23
  },
  {
    "date": "2024-08-01T06:00:00.000Z",
    "formattedDate": "2024-Aug-1 8AM",
    "allAppsRank": 214,
    "financeAppsRank": 15
  },
  {
    "date": "2024-08-01T18:00:00.000Z",
    "formattedDate": "2024-Aug-1 8PM",
    "allAppsRank": 251,
    "financeAppsRank": 23
  },
  {
    "date": "2024-08-02T06:00:00.000Z",
    "formattedDate": "2024-Aug-2 8AM",
    "allAppsRank": 227,
    "financeAppsRank": 15
  },
  {
    "date": "2024-08-02T18:00:00.000Z",
    "formattedDate": "2024-Aug-2 8PM",
    "allAppsRank": 243,
    "financeAppsRank": 23
  },
  {
    "date": "2024-08-03T06:00:00.000Z",
    "formattedDate": "2024-Aug-3 8AM",
    "allAppsRank": 221,
    "financeAppsRank": 16
  },
  {
    "date": "2024-08-03T18:00:00.000Z",
    "formattedDate": "2024-Aug-3 8PM",
    "allAppsRank": 223,
    "financeAppsRank": 16
  },
  {
    "date": "2024-08-04T06:00:00.000Z",
    "formattedDate": "2024-Aug-4 8AM",
    "allAppsRank": 206,
    "financeAppsRank": 13
  },
  {
    "date": "2024-08-04T18:00:00.000Z",
    "formattedDate": "2024-Aug-4 8PM",
    "allAppsRank": 199,
    "financeAppsRank": 13
  },
  {
    "date": "2024-08-05T06:00:00.000Z",
    "formattedDate": "2024-Aug-5 8AM",
    "allAppsRank": 137,
    "financeAppsRank": 9
  },
  {
    "date": "2024-08-05T18:00:00.000Z",
    "formattedDate": "2024-Aug-5 8PM",
    "allAppsRank": 168,
    "financeAppsRank": 13
  },
  {
    "date": "2024-08-06T06:00:00.000Z",
    "formattedDate": "2024-Aug-6 8AM",
    "allAppsRank": 217,
    "financeAppsRank": 19
  },
  {
    "date": "2024-08-06T18:00:00.000Z",
    "formattedDate": "2024-Aug-6 8PM",
    "allAppsRank": 259,
    "financeAppsRank": 25
  },
  {
    "date": "2024-08-07T06:00:00.000Z",
    "formattedDate": "2024-Aug-7 8AM",
    "allAppsRank": 292,
    "financeAppsRank": 25
  },
  {
    "date": "2024-08-07T18:00:00.000Z",
    "formattedDate": "2024-Aug-7 8PM",
    "allAppsRank": 319,
    "financeAppsRank": 28
  },
  {
    "date": "2024-08-08T06:00:00.000Z",
    "formattedDate": "2024-Aug-8 8AM",
    "allAppsRank": 298,
    "financeAppsRank": 25
  },
  {
    "date": "2024-08-08T18:00:00.000Z",
    "formattedDate": "2024-Aug-8 8PM",
    "allAppsRank": 315,
    "financeAppsRank": 26
  },
  {
    "date": "2024-08-09T06:00:00.000Z",
    "formattedDate": "2024-Aug-9 8AM",
    "allAppsRank": 304,
    "financeAppsRank": 24
  },
  {
    "date": "2024-08-09T18:00:00.000Z",
    "formattedDate": "2024-Aug-9 8PM",
    "allAppsRank": 346,
    "financeAppsRank": 28
  },
  {
    "date": "2024-08-10T06:00:00.000Z",
    "formattedDate": "2024-Aug-10 8AM",
    "allAppsRank": 354,
    "financeAppsRank": 29
  },
  {
    "date": "2024-08-10T18:00:00.000Z",
    "formattedDate": "2024-Aug-10 8PM",
    "allAppsRank": 394,
    "financeAppsRank": 31
  },
  {
    "date": "2024-08-11T06:00:00.000Z",
    "formattedDate": "2024-Aug-11 8AM",
    "allAppsRank": 395,
    "financeAppsRank": 31
  },
  {
    "date": "2024-08-11T18:00:00.000Z",
    "formattedDate": "2024-Aug-11 8PM",
    "allAppsRank": 414,
    "financeAppsRank": 32
  },
  {
    "date": "2024-08-12T06:00:00.000Z",
    "formattedDate": "2024-Aug-12 8AM",
    "allAppsRank": 420,
    "financeAppsRank": 30
  },
  {
    "date": "2024-08-12T18:00:00.000Z",
    "formattedDate": "2024-Aug-12 8PM",
    "allAppsRank": 466,
    "financeAppsRank": 34
  },
  {
    "date": "2024-08-13T06:00:00.000Z",
    "formattedDate": "2024-Aug-13 8AM",
    "allAppsRank": 453,
    "financeAppsRank": 33
  },
  {
    "date": "2024-08-13T18:00:00.000Z",
    "formattedDate": "2024-Aug-13 8PM",
    "allAppsRank": 487,
    "financeAppsRank": 39
  },
  {
    "date": "2024-08-14T06:00:00.000Z",
    "formattedDate": "2024-Aug-14 8AM",
    "allAppsRank": 473,
    "financeAppsRank": 36
  },
  {
    "date": "2024-08-14T18:00:00.000Z",
    "formattedDate": "2024-Aug-14 8PM",
    "allAppsRank": 460,
    "financeAppsRank": 36
  },
  {
    "date": "2024-08-15T06:00:00.000Z",
    "formattedDate": "2024-Aug-15 8AM",
    "allAppsRank": 409,
    "financeAppsRank": 32
  },
  {
    "date": "2024-08-15T18:00:00.000Z",
    "formattedDate": "2024-Aug-15 8PM",
    "allAppsRank": 417,
    "financeAppsRank": 34
  },
  {
    "date": "2024-08-16T06:00:00.000Z",
    "formattedDate": "2024-Aug-16 8AM",
    "allAppsRank": 386,
    "financeAppsRank": 33
  },
  {
    "date": "2024-08-16T18:00:00.000Z",
    "formattedDate": "2024-Aug-16 8PM",
    "allAppsRank": 407,
    "financeAppsRank": 35
  },
  {
    "date": "2024-08-17T06:00:00.000Z",
    "formattedDate": "2024-Aug-17 8AM",
    "allAppsRank": 388,
    "financeAppsRank": 33
  },
  {
    "date": "2024-08-17T18:00:00.000Z",
    "formattedDate": "2024-Aug-17 8PM",
    "allAppsRank": 436,
    "financeAppsRank": 35
  },
  {
    "date": "2024-08-18T06:00:00.000Z",
    "formattedDate": "2024-Aug-18 8AM",
    "allAppsRank": 403,
    "financeAppsRank": 31
  },
  {
    "date": "2024-08-18T18:00:00.000Z",
    "formattedDate": "2024-Aug-18 8PM",
    "allAppsRank": 422,
    "financeAppsRank": 32
  },
  {
    "date": "2024-08-19T06:00:00.000Z",
    "formattedDate": "2024-Aug-19 8AM",
    "allAppsRank": 397,
    "financeAppsRank": 26
  },
  {
    "date": "2024-08-19T18:00:00.000Z",
    "formattedDate": "2024-Aug-19 8PM",
    "allAppsRank": 395,
    "financeAppsRank": 30
  },
  {
    "date": "2024-08-20T06:00:00.000Z",
    "formattedDate": "2024-Aug-20 8AM",
    "allAppsRank": 373,
    "financeAppsRank": 30
  },
  {
    "date": "2024-08-20T18:00:00.000Z",
    "formattedDate": "2024-Aug-20 8PM",
    "allAppsRank": 369,
    "financeAppsRank": 31
  },
  {
    "date": "2024-08-21T06:00:00.000Z",
    "formattedDate": "2024-Aug-21 8AM",
    "allAppsRank": 385,
    "financeAppsRank": 30
  },
  {
    "date": "2024-08-21T18:00:00.000Z",
    "formattedDate": "2024-Aug-21 8PM",
    "allAppsRank": 392,
    "financeAppsRank": 31
  },
  {
    "date": "2024-08-22T06:00:00.000Z",
    "formattedDate": "2024-Aug-22 8AM",
    "allAppsRank": 333,
    "financeAppsRank": 25
  },
  {
    "date": "2024-08-22T18:00:00.000Z",
    "formattedDate": "2024-Aug-22 8PM",
    "allAppsRank": 360,
    "financeAppsRank": 28
  },
  {
    "date": "2024-08-23T06:00:00.000Z",
    "formattedDate": "2024-Aug-23 8AM",
    "allAppsRank": 347,
    "financeAppsRank": 26
  },
  {
    "date": "2024-08-23T18:00:00.000Z",
    "formattedDate": "2024-Aug-23 8PM",
    "allAppsRank": 359,
    "financeAppsRank": 30
  },
  {
    "date": "2024-08-24T06:00:00.000Z",
    "formattedDate": "2024-Aug-24 8AM",
    "allAppsRank": 336,
    "financeAppsRank": 25
  },
  {
    "date": "2024-08-24T18:00:00.000Z",
    "formattedDate": "2024-Aug-24 8PM",
    "allAppsRank": 367,
    "financeAppsRank": 30
  },
  {
    "date": "2024-08-25T06:00:00.000Z",
    "formattedDate": "2024-Aug-25 8AM",
    "allAppsRank": 365,
    "financeAppsRank": 25
  },
  {
    "date": "2024-08-25T18:00:00.000Z",
    "formattedDate": "2024-Aug-25 8PM",
    "allAppsRank": 405,
    "financeAppsRank": 31
  },
  {
    "date": "2024-08-26T06:00:00.000Z",
    "formattedDate": "2024-Aug-26 8AM",
    "allAppsRank": 403,
    "financeAppsRank": 28
  },
  {
    "date": "2024-08-26T18:00:00.000Z",
    "formattedDate": "2024-Aug-26 8PM",
    "allAppsRank": 416,
    "financeAppsRank": 32
  },
  {
    "date": "2024-08-27T06:00:00.000Z",
    "formattedDate": "2024-Aug-27 8AM",
    "allAppsRank": 401,
    "financeAppsRank": 31
  },
  {
    "date": "2024-08-27T18:00:00.000Z",
    "formattedDate": "2024-Aug-27 8PM",
    "allAppsRank": 423,
    "financeAppsRank": 31
  },
  {
    "date": "2024-08-28T06:00:00.000Z",
    "formattedDate": "2024-Aug-28 8AM",
    "allAppsRank": 389,
    "financeAppsRank": 30
  },
  {
    "date": "2024-08-28T18:00:00.000Z",
    "formattedDate": "2024-Aug-28 8PM",
    "allAppsRank": 419,
    "financeAppsRank": 33
  },
  {
    "date": "2024-08-29T06:00:00.000Z",
    "formattedDate": "2024-Aug-29 8AM",
    "allAppsRank": 386,
    "financeAppsRank": 31
  },
  {
    "date": "2024-08-29T18:00:00.000Z",
    "formattedDate": "2024-Aug-29 8PM",
    "allAppsRank": 417,
    "financeAppsRank": 34
  },
  {
    "date": "2024-08-30T06:00:00.000Z",
    "formattedDate": "2024-Aug-30 8AM",
    "allAppsRank": 402,
    "financeAppsRank": 31
  },
  {
    "date": "2024-08-30T18:00:00.000Z",
    "formattedDate": "2024-Aug-30 8PM",
    "allAppsRank": 422,
    "financeAppsRank": 36
  },
  {
    "date": "2024-08-31T06:00:00.000Z",
    "formattedDate": "2024-Aug-31 8AM",
    "allAppsRank": 402,
    "financeAppsRank": 33
  },
  {
    "date": "2024-08-31T18:00:00.000Z",
    "formattedDate": "2024-Aug-31 8PM",
    "allAppsRank": 452,
    "financeAppsRank": 36
  },
  {
    "date": "2024-09-01T06:00:00.000Z",
    "formattedDate": "2024-Sep-1 8AM",
    "allAppsRank": 446,
    "financeAppsRank": 32
  },
  {
    "date": "2024-09-01T18:00:00.000Z",
    "formattedDate": "2024-Sep-1 8PM",
    "allAppsRank": 482,
    "financeAppsRank": 38
  },
  {
    "date": "2024-09-02T06:00:00.000Z",
    "formattedDate": "2024-Sep-2 8AM",
    "allAppsRank": 446,
    "financeAppsRank": 31
  },
  {
    "date": "2024-09-02T18:00:00.000Z",
    "formattedDate": "2024-Sep-2 8PM",
    "allAppsRank": 456,
    "financeAppsRank": 34
  },
  {
    "date": "2024-09-03T06:00:00.000Z",
    "formattedDate": "2024-Sep-3 8AM",
    "allAppsRank": 424,
    "financeAppsRank": 30
  },
  {
    "date": "2024-09-03T18:00:00.000Z",
    "formattedDate": "2024-Sep-3 8PM",
    "allAppsRank": 452,
    "financeAppsRank": 37
  },
  {
    "date": "2024-09-04T06:00:00.000Z",
    "formattedDate": "2024-Sep-4 8AM",
    "allAppsRank": 409,
    "financeAppsRank": 35
  },
  {
    "date": "2024-09-04T18:00:00.000Z",
    "formattedDate": "2024-Sep-4 8PM",
    "allAppsRank": 442,
    "financeAppsRank": 38
  },
  {
    "date": "2024-09-05T06:00:00.000Z",
    "formattedDate": "2024-Sep-5 8AM",
    "allAppsRank": 450,
    "financeAppsRank": 37
  },
  {
    "date": "2024-09-05T18:00:00.000Z",
    "formattedDate": "2024-Sep-5 8PM",
    "allAppsRank": 490,
    "financeAppsRank": 44
  },
  {
    "date": "2024-09-06T06:00:00.000Z",
    "formattedDate": "2024-Sep-6 8AM",
    "allAppsRank": 470,
    "financeAppsRank": 36
  },
  {
    "date": "2024-09-06T18:00:00.000Z",
    "formattedDate": "2024-Sep-6 8PM",
    "allAppsRank": 485,
    "financeAppsRank": 41
  },
  {
    "date": "2024-09-07T06:00:00.000Z",
    "formattedDate": "2024-Sep-7 8AM",
    "allAppsRank": 492,
    "financeAppsRank": 35
  },
  {
    "date": "2024-09-07T18:00:00.000Z",
    "formattedDate": "2024-Sep-7 8PM",
    "allAppsRank": 500,
    "financeAppsRank": 42
  },
  {
    "date": "2024-09-08T06:00:00.000Z",
    "formattedDate": "2024-Sep-8 8AM",
    "allAppsRank": 500,
    "financeAppsRank": 35
  },
  {
    "date": "2024-09-08T18:00:00.000Z",
    "formattedDate": "2024-Sep-8 8PM",
    "allAppsRank": 500,
    "financeAppsRank": 39
  },
  {
    "date": "2024-09-09T06:00:00.000Z",
    "formattedDate": "2024-Sep-9 8AM",
    "allAppsRank": 500,
    "financeAppsRank": 31
  },
  {
    "date": "2024-09-09T18:00:00.000Z",
    "formattedDate": "2024-Sep-9 8PM",
    "allAppsRank": 500,
    "financeAppsRank": 39
  },
  {
    "date": "2024-09-10T06:00:00.000Z",
    "formattedDate": "2024-Sep-10 8AM",
    "allAppsRank": 492,
    "financeAppsRank": 33
  },
  {
    "date": "2024-09-10T18:00:00.000Z",
    "formattedDate": "2024-Sep-10 8PM",
    "allAppsRank": 500,
    "financeAppsRank": 40
  },
  {
    "date": "2024-09-11T06:00:00.000Z",
    "formattedDate": "2024-Sep-11 8AM",
    "allAppsRank": 493,
    "financeAppsRank": 33
  },
  {
    "date": "2024-09-11T18:00:00.000Z",
    "formattedDate": "2024-Sep-11 8PM",
    "allAppsRank": 500,
    "financeAppsRank": 42
  },
  {
    "date": "2024-09-12T06:00:00.000Z",
    "formattedDate": "2024-Sep-12 8AM",
    "allAppsRank": 471,
    "financeAppsRank": 35
  },
  {
    "date": "2024-09-12T18:00:00.000Z",
    "formattedDate": "2024-Sep-12 8PM",
    "allAppsRank": 494,
    "financeAppsRank": 42
  },
  {
    "date": "2024-09-13T06:00:00.000Z",
    "formattedDate": "2024-Sep-13 8AM",
    "allAppsRank": 475,
    "financeAppsRank": 35
  },
  {
    "date": "2024-09-13T18:00:00.000Z",
    "formattedDate": "2024-Sep-13 8PM",
    "allAppsRank": 491,
    "financeAppsRank": 43
  },
  {
    "date": "2024-09-14T06:00:00.000Z",
    "formattedDate": "2024-Sep-14 8AM",
    "allAppsRank": 444,
    "financeAppsRank": 33
  },
  {
    "date": "2024-09-14T18:00:00.000Z",
    "formattedDate": "2024-Sep-14 8PM",
    "allAppsRank": 482,
    "financeAppsRank": 39
  },
  {
    "date": "2024-09-15T06:00:00.000Z",
    "formattedDate": "2024-Sep-15 8AM",
    "allAppsRank": 500,
    "financeAppsRank": 33
  },
  {
    "date": "2024-09-15T18:00:00.000Z",
    "formattedDate": "2024-Sep-15 8PM",
    "allAppsRank": 500,
    "financeAppsRank": 34
  },
  {
    "date": "2024-09-16T06:00:00.000Z",
    "formattedDate": "2024-Sep-16 8AM",
    "allAppsRank": 500,
    "financeAppsRank": 33
  },
  {
    "date": "2024-09-16T18:00:00.000Z",
    "formattedDate": "2024-Sep-16 8PM",
    "allAppsRank": 500,
    "financeAppsRank": 34
  },
  {
    "date": "2024-09-17T06:00:00.000Z",
    "formattedDate": "2024-Sep-17 8AM",
    "allAppsRank": 492,
    "financeAppsRank": 34
  },
  {
    "date": "2024-09-17T18:00:00.000Z",
    "formattedDate": "2024-Sep-17 8PM",
    "allAppsRank": 479,
    "financeAppsRank": 37
  },
  {
    "date": "2024-09-18T06:00:00.000Z",
    "formattedDate": "2024-Sep-18 8AM",
    "allAppsRank": 455,
    "financeAppsRank": 35
  },
  {
    "date": "2024-09-18T18:00:00.000Z",
    "formattedDate": "2024-Sep-18 8PM",
    "allAppsRank": 455,
    "financeAppsRank": 39
  },
  {
    "date": "2024-09-19T06:00:00.000Z",
    "formattedDate": "2024-Sep-19 8AM",
    "allAppsRank": 411,
    "financeAppsRank": 33
  },
  {
    "date": "2024-09-19T18:00:00.000Z",
    "formattedDate": "2024-Sep-19 8PM",
    "allAppsRank": 410,
    "financeAppsRank": 36
  },
  {
    "date": "2024-09-20T06:00:00.000Z",
    "formattedDate": "2024-Sep-20 8AM",
    "allAppsRank": 404,
    "financeAppsRank": 34
  },
  {
    "date": "2024-09-20T18:00:00.000Z",
    "formattedDate": "2024-Sep-20 8PM",
    "allAppsRank": 432,
    "financeAppsRank": 41
  },
  {
    "date": "2024-09-21T06:00:00.000Z",
    "formattedDate": "2024-Sep-21 8AM",
    "allAppsRank": 409,
    "financeAppsRank": 32
  },
  {
    "date": "2024-09-21T18:00:00.000Z",
    "formattedDate": "2024-Sep-21 8PM",
    "allAppsRank": 448,
    "financeAppsRank": 36
  },
  {
    "date": "2024-09-22T06:00:00.000Z",
    "formattedDate": "2024-Sep-22 8AM",
    "allAppsRank": 469,
    "financeAppsRank": 34
  },
  {
    "date": "2024-09-22T18:00:00.000Z",
    "formattedDate": "2024-Sep-22 8PM",
    "allAppsRank": 500,
    "financeAppsRank": 36
  },
  {
    "date": "2024-09-23T06:00:00.000Z",
    "formattedDate": "2024-Sep-23 8AM",
    "allAppsRank": 486,
    "financeAppsRank": 33
  },
  {
    "date": "2024-09-23T18:00:00.000Z",
    "formattedDate": "2024-Sep-23 8PM",
    "allAppsRank": 500,
    "financeAppsRank": 40
  },
  {
    "date": "2024-09-24T06:00:00.000Z",
    "formattedDate": "2024-Sep-24 8AM",
    "allAppsRank": 476,
    "financeAppsRank": 36
  },
  {
    "date": "2024-09-24T18:00:00.000Z",
    "formattedDate": "2024-Sep-24 8PM",
    "allAppsRank": 484,
    "financeAppsRank": 42
  },
  {
    "date": "2024-09-25T06:00:00.000Z",
    "formattedDate": "2024-Sep-25 8AM",
    "allAppsRank": 456,
    "financeAppsRank": 37
  },
  {
    "date": "2024-09-25T18:00:00.000Z",
    "formattedDate": "2024-Sep-25 8PM",
    "allAppsRank": 473,
    "financeAppsRank": 43
  },
  {
    "date": "2024-09-26T06:00:00.000Z",
    "formattedDate": "2024-Sep-26 8AM",
    "allAppsRank": 412,
    "financeAppsRank": 35
  },
  {
    "date": "2024-09-26T18:00:00.000Z",
    "formattedDate": "2024-Sep-26 8PM",
    "allAppsRank": 415,
    "financeAppsRank": 38
  },
  {
    "date": "2024-09-27T06:00:00.000Z",
    "formattedDate": "2024-Sep-27 8AM",
    "allAppsRank": 410,
    "financeAppsRank": 33
  },
  {
    "date": "2024-09-27T18:00:00.000Z",
    "formattedDate": "2024-Sep-27 8PM",
    "allAppsRank": 395,
    "financeAppsRank": 38
  },
  {
    "date": "2024-09-28T06:00:00.000Z",
    "formattedDate": "2024-Sep-28 8AM",
    "allAppsRank": 385,
    "financeAppsRank": 32
  },
  {
    "date": "2024-09-28T18:00:00.000Z",
    "formattedDate": "2024-Sep-28 8PM",
    "allAppsRank": 421,
    "financeAppsRank": 32
  },
  {
    "date": "2024-09-29T06:00:00.000Z",
    "formattedDate": "2024-Sep-29 8AM",
    "allAppsRank": 424,
    "financeAppsRank": 31
  },
  {
    "date": "2024-09-29T18:00:00.000Z",
    "formattedDate": "2024-Sep-29 8PM",
    "allAppsRank": 445,
    "financeAppsRank": 31
  },
  {
    "date": "2024-09-30T06:00:00.000Z",
    "formattedDate": "2024-Sep-30 8AM",
    "allAppsRank": 417,
    "financeAppsRank": 27
  },
  {
    "date": "2024-09-30T18:00:00.000Z",
    "formattedDate": "2024-Sep-30 8PM",
    "allAppsRank": 429,
    "financeAppsRank": 30
  },
  {
    "date": "2024-10-01T06:00:00.000Z",
    "formattedDate": "2024-Oct-1 8AM",
    "allAppsRank": 428,
    "financeAppsRank": 33
  },
  {
    "date": "2024-10-01T18:00:00.000Z",
    "formattedDate": "2024-Oct-1 8PM",
    "allAppsRank": 428,
    "financeAppsRank": 41
  },
  {
    "date": "2024-10-02T06:00:00.000Z",
    "formattedDate": "2024-Oct-2 8AM",
    "allAppsRank": 403,
    "financeAppsRank": 34
  },
  {
    "date": "2024-10-02T18:00:00.000Z",
    "formattedDate": "2024-Oct-2 8PM",
    "allAppsRank": 433,
    "financeAppsRank": 43
  },
  {
    "date": "2024-10-03T06:00:00.000Z",
    "formattedDate": "2024-Oct-3 8AM",
    "allAppsRank": 411,
    "financeAppsRank": 37
  },
  {
    "date": "2024-10-03T18:00:00.000Z",
    "formattedDate": "2024-Oct-3 8PM",
    "allAppsRank": 410,
    "financeAppsRank": 39
  },
  {
    "date": "2024-10-04T06:00:00.000Z",
    "formattedDate": "2024-Oct-4 8AM",
    "allAppsRank": 417,
    "financeAppsRank": 34
  },
  {
    "date": "2024-10-04T18:00:00.000Z",
    "formattedDate": "2024-Oct-4 8PM",
    "allAppsRank": 437,
    "financeAppsRank": 43
  },
  {
    "date": "2024-10-05T06:00:00.000Z",
    "formattedDate": "2024-Oct-5 8AM",
    "allAppsRank": 446,
    "financeAppsRank": 35
  },
  {
    "date": "2024-10-05T18:00:00.000Z",
    "formattedDate": "2024-Oct-5 8PM",
    "allAppsRank": 500,
    "financeAppsRank": 42
  },
  {
    "date": "2024-10-06T06:00:00.000Z",
    "formattedDate": "2024-Oct-6 8AM",
    "allAppsRank": 500,
    "financeAppsRank": 34
  },
  {
    "date": "2024-10-06T18:00:00.000Z",
    "formattedDate": "2024-Oct-6 8PM",
    "allAppsRank": 500,
    "financeAppsRank": 38
  },
  {
    "date": "2024-10-07T06:00:00.000Z",
    "formattedDate": "2024-Oct-7 8AM",
    "allAppsRank": 500,
    "financeAppsRank": 34
  },
  {
    "date": "2024-10-07T18:00:00.000Z",
    "formattedDate": "2024-Oct-7 8PM",
    "allAppsRank": 500,
    "financeAppsRank": 41
  },
  {
    "date": "2024-10-08T06:00:00.000Z",
    "formattedDate": "2024-Oct-8 8AM",
    "allAppsRank": 500,
    "financeAppsRank": 35
  },
  {
    "date": "2024-10-08T18:00:00.000Z",
    "formattedDate": "2024-Oct-8 8PM",
    "allAppsRank": 500,
    "financeAppsRank": 43
  },
  {
    "date": "2024-10-09T06:00:00.000Z",
    "formattedDate": "2024-Oct-9 8AM",
    "allAppsRank": 476,
    "financeAppsRank": 35
  },
  {
    "date": "2024-10-09T18:00:00.000Z",
    "formattedDate": "2024-Oct-9 8PM",
    "allAppsRank": 500,
    "financeAppsRank": 41
  },
  {
    "date": "2024-10-10T06:00:00.000Z",
    "formattedDate": "2024-Oct-10 8AM",
    "allAppsRank": 500,
    "financeAppsRank": 33
  },
  {
    "date": "2024-10-10T18:00:00.000Z",
    "formattedDate": "2024-Oct-10 8PM",
    "allAppsRank": 500,
    "financeAppsRank": 35
  },
  {
    "date": "2024-10-11T06:00:00.000Z",
    "formattedDate": "2024-Oct-11 8AM",
    "allAppsRank": 500,
    "financeAppsRank": 34
  },
  {
    "date": "2024-10-11T18:00:00.000Z",
    "formattedDate": "2024-Oct-11 8PM",
    "allAppsRank": 492,
    "financeAppsRank": 39
  },
  {
    "date": "2024-10-12T06:00:00.000Z",
    "formattedDate": "2024-Oct-12 8AM",
    "allAppsRank": 478,
    "financeAppsRank": 31
  },
  {
    "date": "2024-10-12T18:00:00.000Z",
    "formattedDate": "2024-Oct-12 8PM",
    "allAppsRank": 500,
    "financeAppsRank": 38
  },
  {
    "date": "2024-10-13T06:00:00.000Z",
    "formattedDate": "2024-Oct-13 8AM",
    "allAppsRank": 500,
    "financeAppsRank": 33
  },
  {
    "date": "2024-10-13T18:00:00.000Z",
    "formattedDate": "2024-Oct-13 8PM",
    "allAppsRank": 500,
    "financeAppsRank": 38
  },
  {
    "date": "2024-10-14T06:00:00.000Z",
    "formattedDate": "2024-Oct-14 8AM",
    "allAppsRank": 500,
    "financeAppsRank": 32
  },
  {
    "date": "2024-10-14T18:00:00.000Z",
    "formattedDate": "2024-Oct-14 8PM",
    "allAppsRank": 500,
    "financeAppsRank": 33
  },
  {
    "date": "2024-10-15T06:00:00.000Z",
    "formattedDate": "2024-Oct-15 8AM",
    "allAppsRank": 447,
    "financeAppsRank": 29
  },
  {
    "date": "2024-10-15T18:00:00.000Z",
    "formattedDate": "2024-Oct-15 8PM",
    "allAppsRank": 440,
    "financeAppsRank": 35
  },
  {
    "date": "2024-10-16T06:00:00.000Z",
    "formattedDate": "2024-Oct-16 8AM",
    "allAppsRank": 426,
    "financeAppsRank": 37
  },
  {
    "date": "2024-10-16T18:00:00.000Z",
    "formattedDate": "2024-Oct-16 8PM",
    "allAppsRank": 431,
    "financeAppsRank": 39
  },
  {
    "date": "2024-10-17T06:00:00.000Z",
    "formattedDate": "2024-Oct-17 8AM",
    "allAppsRank": 405,
    "financeAppsRank": 34
  },
  {
    "date": "2024-10-17T18:00:00.000Z",
    "formattedDate": "2024-Oct-17 8PM",
    "allAppsRank": 423,
    "financeAppsRank": 37
  },
  {
    "date": "2024-10-18T06:00:00.000Z",
    "formattedDate": "2024-Oct-18 8AM",
    "allAppsRank": 413,
    "financeAppsRank": 35
  },
  {
    "date": "2024-10-18T18:00:00.000Z",
    "formattedDate": "2024-Oct-18 8PM",
    "allAppsRank": 421,
    "financeAppsRank": 40
  },
  {
    "date": "2024-10-19T06:00:00.000Z",
    "formattedDate": "2024-Oct-19 8AM",
    "allAppsRank": 421,
    "financeAppsRank": 33
  },
  {
    "date": "2024-10-19T18:00:00.000Z",
    "formattedDate": "2024-Oct-19 8PM",
    "allAppsRank": 459,
    "financeAppsRank": 39
  },
  {
    "date": "2024-10-20T06:00:00.000Z",
    "formattedDate": "2024-Oct-20 8AM",
    "allAppsRank": 479,
    "financeAppsRank": 33
  },
  {
    "date": "2024-10-20T18:00:00.000Z",
    "formattedDate": "2024-Oct-20 8PM",
    "allAppsRank": 500,
    "financeAppsRank": 35
  },
  {
    "date": "2024-10-21T06:00:00.000Z",
    "formattedDate": "2024-Oct-21 8AM",
    "allAppsRank": 475,
    "financeAppsRank": 31
  },
  {
    "date": "2024-10-21T18:00:00.000Z",
    "formattedDate": "2024-Oct-21 8PM",
    "allAppsRank": 463,
    "financeAppsRank": 36
  },
  {
    "date": "2024-10-22T06:00:00.000Z",
    "formattedDate": "2024-Oct-22 8AM",
    "allAppsRank": 438,
    "financeAppsRank": 33
  },
  {
    "date": "2024-10-22T18:00:00.000Z",
    "formattedDate": "2024-Oct-22 8PM",
    "allAppsRank": 441,
    "financeAppsRank": 40
  },
  {
    "date": "2024-10-23T06:00:00.000Z",
    "formattedDate": "2024-Oct-23 8AM",
    "allAppsRank": 426,
    "financeAppsRank": 34
  },
  {
    "date": "2024-10-23T18:00:00.000Z",
    "formattedDate": "2024-Oct-23 8PM",
    "allAppsRank": 451,
    "financeAppsRank": 37
  },
  {
    "date": "2024-10-24T06:00:00.000Z",
    "formattedDate": "2024-Oct-24 8AM",
    "allAppsRank": 416,
    "financeAppsRank": 34
  },
  {
    "date": "2024-10-24T18:00:00.000Z",
    "formattedDate": "2024-Oct-24 8PM",
    "allAppsRank": 426,
    "financeAppsRank": 37
  },
  {
    "date": "2024-10-25T06:00:00.000Z",
    "formattedDate": "2024-Oct-25 8AM",
    "allAppsRank": 408,
    "financeAppsRank": 33
  },
  {
    "date": "2024-10-25T18:00:00.000Z",
    "formattedDate": "2024-Oct-25 8PM",
    "allAppsRank": 437,
    "financeAppsRank": 38
  },
  {
    "date": "2024-10-26T06:00:00.000Z",
    "formattedDate": "2024-Oct-26 8AM",
    "allAppsRank": 454,
    "financeAppsRank": 33
  },
  {
    "date": "2024-10-26T18:00:00.000Z",
    "formattedDate": "2024-Oct-26 8PM",
    "allAppsRank": 500,
    "financeAppsRank": 36
  },
  {
    "date": "2024-10-27T07:00:00.000Z",
    "formattedDate": "2024-Oct-27 8AM",
    "allAppsRank": 500,
    "financeAppsRank": 33
  },
  {
    "date": "2024-10-27T19:00:00.000Z",
    "formattedDate": "2024-Oct-27 8PM",
    "allAppsRank": 500,
    "financeAppsRank": 34
  },
  {
    "date": "2024-10-28T07:00:00.000Z",
    "formattedDate": "2024-Oct-28 8AM",
    "allAppsRank": 493,
    "financeAppsRank": 30
  },
  {
    "date": "2024-10-28T19:00:00.000Z",
    "formattedDate": "2024-Oct-28 8PM",
    "allAppsRank": 468,
    "financeAppsRank": 33
  },
  {
    "date": "2024-10-29T07:00:00.000Z",
    "formattedDate": "2024-Oct-29 8AM",
    "allAppsRank": 336,
    "financeAppsRank": 27
  },
  {
    "date": "2024-10-29T19:00:00.000Z",
    "formattedDate": "2024-Oct-29 8PM",
    "allAppsRank": 308,
    "financeAppsRank": 26
  },
  {
    "date": "2024-10-30T07:00:00.000Z",
    "formattedDate": "2024-Oct-30 8AM",
    "allAppsRank": 301,
    "financeAppsRank": 24
  },
  {
    "date": "2024-10-30T19:00:00.000Z",
    "formattedDate": "2024-Oct-30 8PM",
    "allAppsRank": 307,
    "financeAppsRank": 27
  },
  {
    "date": "2024-10-31T07:00:00.000Z",
    "formattedDate": "2024-Oct-31 8AM",
    "allAppsRank": 311,
    "financeAppsRank": 24
  },
  {
    "date": "2024-10-31T19:00:00.000Z",
    "formattedDate": "2024-Oct-31 8PM",
    "allAppsRank": 339,
    "financeAppsRank": 30
  },
  {
    "date": "2024-11-01T07:00:00.000Z",
    "formattedDate": "2024-Nov-1 8AM",
    "allAppsRank": 336,
    "financeAppsRank": 29
  },
  {
    "date": "2024-11-01T19:00:00.000Z",
    "formattedDate": "2024-Nov-1 8PM",
    "allAppsRank": 372,
    "financeAppsRank": 36
  },
  {
    "date": "2024-11-02T07:00:00.000Z",
    "formattedDate": "2024-Nov-2 8AM",
    "allAppsRank": 384,
    "financeAppsRank": 31
  },
  {
    "date": "2024-11-02T19:00:00.000Z",
    "formattedDate": "2024-Nov-2 8PM",
    "allAppsRank": 428,
    "financeAppsRank": 36
  },
  {
    "date": "2024-11-03T07:00:00.000Z",
    "formattedDate": "2024-Nov-3 8AM",
    "allAppsRank": 428,
    "financeAppsRank": 31
  },
  {
    "date": "2024-11-03T19:00:00.000Z",
    "formattedDate": "2024-Nov-3 8PM",
    "allAppsRank": 475,
    "financeAppsRank": 35
  },
  {
    "date": "2024-11-04T07:00:00.000Z",
    "formattedDate": "2024-Nov-4 8AM",
    "allAppsRank": 453,
    "financeAppsRank": 31
  },
  {
    "date": "2024-11-04T19:00:00.000Z",
    "formattedDate": "2024-Nov-4 8PM",
    "allAppsRank": 428,
    "financeAppsRank": 33
  },
  {
    "date": "2024-11-05T07:00:00.000Z",
    "formattedDate": "2024-Nov-5 8AM",
    "allAppsRank": 361,
    "financeAppsRank": 27
  },
  {
    "date": "2024-11-05T19:00:00.000Z",
    "formattedDate": "2024-Nov-5 8PM",
    "allAppsRank": 355,
    "financeAppsRank": 27
  },
  {
    "date": "2024-11-06T07:00:00.000Z",
    "formattedDate": "2024-Nov-6 8AM",
    "allAppsRank": 155,
    "financeAppsRank": 13
  },
  {
    "date": "2024-11-06T19:00:00.000Z",
    "formattedDate": "2024-Nov-6 8PM",
    "allAppsRank": 114,
    "financeAppsRank": 12
  },
  {
    "date": "2024-11-07T07:00:00.000Z",
    "formattedDate": "2024-Nov-7 8AM",
    "allAppsRank": 110,
    "financeAppsRank": 11
  },
  {
    "date": "2024-11-07T19:00:00.000Z",
    "formattedDate": "2024-Nov-7 8PM",
    "allAppsRank": 126,
    "financeAppsRank": 13
  },
  {
    "date": "2024-11-08T07:00:00.000Z",
    "formattedDate": "2024-Nov-8 8AM",
    "allAppsRank": 123,
    "financeAppsRank": 13
  },
  {
    "date": "2024-11-08T19:00:00.000Z",
    "formattedDate": "2024-Nov-8 8PM",
    "allAppsRank": 131,
    "financeAppsRank": 13
  },
  {
    "date": "2024-11-09T07:00:00.000Z",
    "formattedDate": "2024-Nov-9 8AM",
    "allAppsRank": 136,
    "financeAppsRank": 12
  },
  {
    "date": "2024-11-09T19:00:00.000Z",
    "formattedDate": "2024-Nov-9 8PM",
    "allAppsRank": 168,
    "financeAppsRank": 12
  },
  {
    "date": "2024-11-10T07:00:00.000Z",
    "formattedDate": "2024-Nov-10 8AM",
    "allAppsRank": 121,
    "financeAppsRank": 10
  },
  {
    "date": "2024-11-10T19:00:00.000Z",
    "formattedDate": "2024-Nov-10 8PM",
    "allAppsRank": 81,
    "financeAppsRank": 8
  },
  {
    "date": "2024-11-11T07:00:00.000Z",
    "formattedDate": "2024-Nov-11 8AM",
    "allAppsRank": 58,
    "financeAppsRank": 4
  },
  {
    "date": "2024-11-11T19:00:00.000Z",
    "formattedDate": "2024-Nov-11 8PM",
    "allAppsRank": 33,
    "financeAppsRank": 2
  },
  {
    "date": "2024-11-12T07:00:00.000Z",
    "formattedDate": "2024-Nov-12 8AM",
    "allAppsRank": 17,
    "financeAppsRank": 2
  },
  {
    "date": "2024-11-12T19:00:00.000Z",
    "formattedDate": "2024-Nov-12 8PM",
    "allAppsRank": 15,
    "financeAppsRank": 2
  },
  {
    "date": "2024-11-13T07:00:00.000Z",
    "formattedDate": "2024-Nov-13 8AM",
    "allAppsRank": 13,
    "financeAppsRank": 1
  },
  {
    "date": "2024-11-13T19:00:00.000Z",
    "formattedDate": "2024-Nov-13 8PM",
    "allAppsRank": 8,
    "financeAppsRank": 1
  },
  {
    "date": "2024-11-14T07:00:00.000Z",
    "formattedDate": "2024-Nov-14 8AM",
    "allAppsRank": 10,
    "financeAppsRank": 1
  },
  {
    "date": "2024-11-14T19:00:00.000Z",
    "formattedDate": "2024-Nov-14 8PM",
    "allAppsRank": 13,
    "financeAppsRank": 1
  },
  {
    "date": "2024-11-15T07:00:00.000Z",
    "formattedDate": "2024-Nov-15 8AM",
    "allAppsRank": 27,
    "financeAppsRank": 1
  },
  {
    "date": "2024-11-15T19:00:00.000Z",
    "formattedDate": "2024-Nov-15 8PM",
    "allAppsRank": 36,
    "financeAppsRank": 2
  },
  {
    "date": "2024-11-16T07:00:00.000Z",
    "formattedDate": "2024-Nov-16 8AM",
    "allAppsRank": 45,
    "financeAppsRank": 3
  },
  {
    "date": "2024-11-16T19:00:00.000Z",
    "formattedDate": "2024-Nov-16 8PM",
    "allAppsRank": 42,
    "financeAppsRank": 3
  },
  {
    "date": "2024-11-17T07:00:00.000Z",
    "formattedDate": "2024-Nov-17 8AM",
    "allAppsRank": 57,
    "financeAppsRank": 3
  },
  {
    "date": "2024-11-17T19:00:00.000Z",
    "formattedDate": "2024-Nov-17 8PM",
    "allAppsRank": 71,
    "financeAppsRank": 6
  },
  {
    "date": "2024-11-18T07:00:00.000Z",
    "formattedDate": "2024-Nov-18 8AM",
    "allAppsRank": 71,
    "financeAppsRank": 6
  },
  {
    "date": "2024-11-18T19:00:00.000Z",
    "formattedDate": "2024-Nov-18 8PM",
    "allAppsRank": 70,
    "financeAppsRank": 6
  },
  {
    "date": "2024-11-19T07:00:00.000Z",
    "formattedDate": "2024-Nov-19 8AM",
    "allAppsRank": 69,
    "financeAppsRank": 6
  },
  {
    "date": "2024-11-19T19:00:00.000Z",
    "formattedDate": "2024-Nov-19 8PM",
    "allAppsRank": 59,
    "financeAppsRank": 5
  },
  {
    "date": "2024-11-20T07:00:00.000Z",
    "formattedDate": "2024-Nov-20 8AM",
    "allAppsRank": 50,
    "financeAppsRank": 4
  },
  {
    "date": "2024-11-20T19:00:00.000Z",
    "formattedDate": "2024-Nov-20 8PM",
    "allAppsRank": 32,
    "financeAppsRank": 1
  },
  {
    "date": "2024-11-21T07:00:00.000Z",
    "formattedDate": "2024-Nov-21 8AM",
    "allAppsRank": 28,
    "financeAppsRank": 1
  },
  {
    "date": "2024-11-21T19:00:00.000Z",
    "formattedDate": "2024-Nov-21 8PM",
    "allAppsRank": 27,
    "financeAppsRank": 1
  },
  {
    "date": "2024-11-22T07:00:00.000Z",
    "formattedDate": "2024-Nov-22 8AM",
    "allAppsRank": 27,
    "financeAppsRank": 1
  },
  {
    "date": "2024-11-22T19:00:00.000Z",
    "formattedDate": "2024-Nov-22 8PM",
    "allAppsRank": 21,
    "financeAppsRank": 1
  },
  {
    "date": "2024-11-23T07:00:00.000Z",
    "formattedDate": "2024-Nov-23 8AM",
    "allAppsRank": 21,
    "financeAppsRank": 1
  },
  {
    "date": "2024-11-23T19:00:00.000Z",
    "formattedDate": "2024-Nov-23 8PM",
    "allAppsRank": 22,
    "financeAppsRank": 1
  },
  {
    "date": "2024-11-24T07:00:00.000Z",
    "formattedDate": "2024-Nov-24 8AM",
    "allAppsRank": 28,
    "financeAppsRank": 1
  },
  {
    "date": "2024-11-24T19:00:00.000Z",
    "formattedDate": "2024-Nov-24 8PM",
    "allAppsRank": 35,
    "financeAppsRank": 3
  },
  {
    "date": "2024-11-25T07:00:00.000Z",
    "formattedDate": "2024-Nov-25 8AM",
    "allAppsRank": 43,
    "financeAppsRank": 3
  },
  {
    "date": "2024-11-25T19:00:00.000Z",
    "formattedDate": "2024-Nov-25 8PM",
    "allAppsRank": 48,
    "financeAppsRank": 4
  },
  {
    "date": "2024-11-26T07:00:00.000Z",
    "formattedDate": "2024-Nov-26 8AM",
    "allAppsRank": 53,
    "financeAppsRank": 4
  },
  {
    "date": "2024-11-26T19:00:00.000Z",
    "formattedDate": "2024-Nov-26 8PM",
    "allAppsRank": 62,
    "financeAppsRank": 7
  },
  {
    "date": "2024-11-27T07:00:00.000Z",
    "formattedDate": "2024-Nov-27 8AM",
    "allAppsRank": 67,
    "financeAppsRank": 6
  },
  {
    "date": "2024-11-27T19:00:00.000Z",
    "formattedDate": "2024-Nov-27 8PM",
    "allAppsRank": 68,
    "financeAppsRank": 7
  },
  {
    "date": "2024-11-28T07:00:00.000Z",
    "formattedDate": "2024-Nov-28 8AM",
    "allAppsRank": 66,
    "financeAppsRank": 6
  },
  {
    "date": "2024-11-28T19:00:00.000Z",
    "formattedDate": "2024-Nov-28 8PM",
    "allAppsRank": 68,
    "financeAppsRank": 4
  },
  {
    "date": "2024-11-29T07:00:00.000Z",
    "formattedDate": "2024-Nov-29 8AM",
    "allAppsRank": 67,
    "financeAppsRank": 1
  },
  {
    "date": "2024-11-29T19:00:00.000Z",
    "formattedDate": "2024-Nov-29 8PM",
    "allAppsRank": 76,
    "financeAppsRank": 5
  },
  {
    "date": "2024-11-30T07:00:00.000Z",
    "formattedDate": "2024-Nov-30 8AM",
    "allAppsRank": 68,
    "financeAppsRank": 4
  },
  {
    "date": "2024-11-30T19:00:00.000Z",
    "formattedDate": "2024-Nov-30 8PM",
    "allAppsRank": 72,
    "financeAppsRank": 5
  },
  {
    "date": "2024-12-01T07:00:00.000Z",
    "formattedDate": "2024-Dec-1 8AM",
    "allAppsRank": 62,
    "financeAppsRank": 4
  },
  {
    "date": "2024-12-01T19:00:00.000Z",
    "formattedDate": "2024-Dec-1 8PM",
    "allAppsRank": 54,
    "financeAppsRank": 4
  },
  {
    "date": "2024-12-02T07:00:00.000Z",
    "formattedDate": "2024-Dec-2 8AM",
    "allAppsRank": 21,
    "financeAppsRank": 1
  },
  {
    "date": "2024-12-02T19:00:00.000Z",
    "formattedDate": "2024-Dec-2 8PM",
    "allAppsRank": 11,
    "financeAppsRank": 1
  },
  {
    "date": "2024-12-03T07:00:00.000Z",
    "formattedDate": "2024-Dec-3 8AM",
    "allAppsRank": 13,
    "financeAppsRank": 1
  },
  {
    "date": "2024-12-03T19:00:00.000Z",
    "formattedDate": "2024-Dec-3 8PM",
    "allAppsRank": 10,
    "financeAppsRank": 1
  },
  {
    "date": "2024-12-04T07:00:00.000Z",
    "formattedDate": "2024-Dec-4 8AM",
    "allAppsRank": 14,
    "financeAppsRank": 1
  },
  {
    "date": "2024-12-04T19:00:00.000Z",
    "formattedDate": "2024-Dec-4 8PM",
    "allAppsRank": 18,
    "financeAppsRank": 1
  },
  {
    "date": "2024-12-05T07:00:00.000Z",
    "formattedDate": "2024-Dec-5 8AM",
    "allAppsRank": 15,
    "financeAppsRank": 1
  },
  {
    "date": "2024-12-05T19:00:00.000Z",
    "formattedDate": "2024-Dec-5 8PM",
    "allAppsRank": 13,
    "financeAppsRank": 1
  },
  {
    "date": "2024-12-06T07:00:00.000Z",
    "formattedDate": "2024-Dec-6 8AM",
    "allAppsRank": 18,
    "financeAppsRank": 1
  },
  {
    "date": "2024-12-06T19:00:00.000Z",
    "formattedDate": "2024-Dec-6 8PM",
    "allAppsRank": 25,
    "financeAppsRank": 1
  },
  {
    "date": "2024-12-07T07:00:00.000Z",
    "formattedDate": "2024-Dec-7 8AM",
    "allAppsRank": 28,
    "financeAppsRank": 1
  },
  {
    "date": "2024-12-07T19:00:00.000Z",
    "formattedDate": "2024-Dec-7 8PM",
    "allAppsRank": 28,
    "financeAppsRank": 2
  },
  {
    "date": "2024-12-08T07:00:00.000Z",
    "formattedDate": "2024-Dec-8 8AM",
    "allAppsRank": 32,
    "financeAppsRank": 2
  },
  {
    "date": "2024-12-08T19:00:00.000Z",
    "formattedDate": "2024-Dec-8 8PM",
    "allAppsRank": 33,
    "financeAppsRank": 2
  },
  {
    "date": "2024-12-09T07:00:00.000Z",
    "formattedDate": "2024-Dec-9 8AM",
    "allAppsRank": 40,
    "financeAppsRank": 2
  },
  {
    "date": "2024-12-09T19:00:00.000Z",
    "formattedDate": "2024-Dec-9 8PM",
    "allAppsRank": 40,
    "financeAppsRank": 4
  },
  {
    "date": "2024-12-10T07:00:00.000Z",
    "formattedDate": "2024-Dec-10 8AM",
    "allAppsRank": 51,
    "financeAppsRank": 4
  },
  {
    "date": "2024-12-10T19:00:00.000Z",
    "formattedDate": "2024-Dec-10 8PM",
    "allAppsRank": 51,
    "financeAppsRank": 4
  },
  {
    "date": "2024-12-11T07:00:00.000Z",
    "formattedDate": "2024-Dec-11 8AM",
    "allAppsRank": 56,
    "financeAppsRank": 4
  },
  {
    "date": "2024-12-11T19:00:00.000Z",
    "formattedDate": "2024-Dec-11 8PM",
    "allAppsRank": 56,
    "financeAppsRank": 5
  },
  {
    "date": "2024-12-12T07:00:00.000Z",
    "formattedDate": "2024-Dec-12 8AM",
    "allAppsRank": 57,
    "financeAppsRank": 4
  },
  {
    "date": "2024-12-12T19:00:00.000Z",
    "formattedDate": "2024-Dec-12 8PM",
    "allAppsRank": 61,
    "financeAppsRank": 7
  },
  {
    "date": "2024-12-13T07:00:00.000Z",
    "formattedDate": "2024-Dec-13 8AM",
    "allAppsRank": 63,
    "financeAppsRank": 6
  },
  {
    "date": "2024-12-13T19:00:00.000Z",
    "formattedDate": "2024-Dec-13 8PM",
    "allAppsRank": 70,
    "financeAppsRank": 8
  },
  {
    "date": "2024-12-14T07:00:00.000Z",
    "formattedDate": "2024-Dec-14 8AM",
    "allAppsRank": 70,
    "financeAppsRank": 7
  },
  {
    "date": "2024-12-14T19:00:00.000Z",
    "formattedDate": "2024-Dec-14 8PM",
    "allAppsRank": 87,
    "financeAppsRank": 9
  },
  {
    "date": "2024-12-15T07:00:00.000Z",
    "formattedDate": "2024-Dec-15 8AM",
    "allAppsRank": 81,
    "financeAppsRank": 7
  },
  {
    "date": "2024-12-15T19:00:00.000Z",
    "formattedDate": "2024-Dec-15 8PM",
    "allAppsRank": 86,
    "financeAppsRank": 7
  },
  {
    "date": "2024-12-16T07:00:00.000Z",
    "formattedDate": "2024-Dec-16 8AM",
    "allAppsRank": 87,
    "financeAppsRank": 7
  },
  {
    "date": "2024-12-16T19:00:00.000Z",
    "formattedDate": "2024-Dec-16 8PM",
    "allAppsRank": 84,
    "financeAppsRank": 8
  },
  {
    "date": "2024-12-17T07:00:00.000Z",
    "formattedDate": "2024-Dec-17 8AM",
    "allAppsRank": 72,
    "financeAppsRank": 7
  },
  {
    "date": "2024-12-17T19:00:00.000Z",
    "formattedDate": "2024-Dec-17 8PM",
    "allAppsRank": 67,
    "financeAppsRank": 8
  },
  {
    "date": "2024-12-18T07:00:00.000Z",
    "formattedDate": "2024-Dec-18 8AM",
    "allAppsRank": 62,
    "financeAppsRank": 6
  },
  {
    "date": "2024-12-18T19:00:00.000Z",
    "formattedDate": "2024-Dec-18 8PM",
    "allAppsRank": 68,
    "financeAppsRank": 8
  },
  {
    "date": "2024-12-19T07:00:00.000Z",
    "formattedDate": "2024-Dec-19 8AM",
    "allAppsRank": 67,
    "financeAppsRank": 7
  },
  {
    "date": "2024-12-19T19:00:00.000Z",
    "formattedDate": "2024-Dec-19 8PM",
    "allAppsRank": 74,
    "financeAppsRank": 8
  },
  {
    "date": "2024-12-20T07:00:00.000Z",
    "formattedDate": "2024-Dec-20 8AM",
    "allAppsRank": 77,
    "financeAppsRank": 8
  },
  {
    "date": "2024-12-20T19:00:00.000Z",
    "formattedDate": "2024-Dec-20 8PM",
    "allAppsRank": 88,
    "financeAppsRank": 10
  },
  {
    "date": "2024-12-21T07:00:00.000Z",
    "formattedDate": "2024-Dec-21 8AM",
    "allAppsRank": 98,
    "financeAppsRank": 10
  },
  {
    "date": "2024-12-21T19:00:00.000Z",
    "formattedDate": "2024-Dec-21 8PM",
    "allAppsRank": 124,
    "financeAppsRank": 12
  },
  {
    "date": "2024-12-22T07:00:00.000Z",
    "formattedDate": "2024-Dec-22 8AM",
    "allAppsRank": 132,
    "financeAppsRank": 9
  },
  {
    "date": "2024-12-22T19:00:00.000Z",
    "formattedDate": "2024-Dec-22 8PM",
    "allAppsRank": 141,
    "financeAppsRank": 10
  },
  {
    "date": "2024-12-23T07:00:00.000Z",
    "formattedDate": "2024-Dec-23 8AM",
    "allAppsRank": 132,
    "financeAppsRank": 9
  },
  {
    "date": "2024-12-23T19:00:00.000Z",
    "formattedDate": "2024-Dec-23 8PM",
    "allAppsRank": 156,
    "financeAppsRank": 14
  },
  {
    "date": "2024-12-24T07:00:00.000Z",
    "formattedDate": "2024-Dec-24 8AM",
    "allAppsRank": 149,
    "financeAppsRank": 13
  },
  {
    "date": "2024-12-24T19:00:00.000Z",
    "formattedDate": "2024-Dec-24 8PM",
    "allAppsRank": 151,
    "financeAppsRank": 13
  },
  {
    "date": "2024-12-25T07:00:00.000Z",
    "formattedDate": "2024-Dec-25 8AM",
    "allAppsRank": 142,
    "financeAppsRank": 9
  },
  {
    "date": "2024-12-25T19:00:00.000Z",
    "formattedDate": "2024-Dec-25 8PM",
    "allAppsRank": 192,
    "financeAppsRank": 10
  },
  {
    "date": "2024-12-26T07:00:00.000Z",
    "formattedDate": "2024-Dec-26 8AM",
    "allAppsRank": 174,
    "financeAppsRank": 9
  },
  {
    "date": "2024-12-26T19:00:00.000Z",
    "formattedDate": "2024-Dec-26 8PM",
    "allAppsRank": 192,
    "financeAppsRank": 12
  },
  {
    "date": "2024-12-27T07:00:00.000Z",
    "formattedDate": "2024-Dec-27 8AM",
    "allAppsRank": 174,
    "financeAppsRank": 11
  },
  {
    "date": "2024-12-27T19:00:00.000Z",
    "formattedDate": "2024-Dec-27 8PM",
    "allAppsRank": 184,
    "financeAppsRank": 13
  },
  {
    "date": "2024-12-28T07:00:00.000Z",
    "formattedDate": "2024-Dec-28 8AM",
    "allAppsRank": 178,
    "financeAppsRank": 14
  },
  {
    "date": "2024-12-28T19:00:00.000Z",
    "formattedDate": "2024-Dec-28 8PM",
    "allAppsRank": 190,
    "financeAppsRank": 14
  },
  {
    "date": "2024-12-29T07:00:00.000Z",
    "formattedDate": "2024-Dec-29 8AM",
    "allAppsRank": 179,
    "financeAppsRank": 12
  },
  {
    "date": "2024-12-29T19:00:00.000Z",
    "formattedDate": "2024-Dec-29 8PM",
    "allAppsRank": 199,
    "financeAppsRank": 14
  },
  {
    "date": "2024-12-30T07:00:00.000Z",
    "formattedDate": "2024-Dec-30 8AM",
    "allAppsRank": 177,
    "financeAppsRank": 11
  },
  {
    "date": "2024-12-30T19:00:00.000Z",
    "formattedDate": "2024-Dec-30 8PM",
    "allAppsRank": 193,
    "financeAppsRank": 14
  },
  {
    "date": "2024-12-31T07:00:00.000Z",
    "formattedDate": "2024-Dec-31 8AM",
    "allAppsRank": 189,
    "financeAppsRank": 15
  },
  {
    "date": "2024-12-31T19:00:00.000Z",
    "formattedDate": "2024-Dec-31 8PM",
    "allAppsRank": 205,
    "financeAppsRank": 16
  },
  {
    "date": "2025-01-01T07:00:00.000Z",
    "formattedDate": "2025-Jan-1 8AM",
    "allAppsRank": 192,
    "financeAppsRank": 14
  },
  {
    "date": "2025-01-01T19:00:00.000Z",
    "formattedDate": "2025-Jan-1 8PM",
    "allAppsRank": 193,
    "financeAppsRank": 14
  },
  {
    "date": "2025-01-02T07:00:00.000Z",
    "formattedDate": "2025-Jan-2 8AM",
    "allAppsRank": 149,
    "financeAppsRank": 12
  },
  {
    "date": "2025-01-02T19:00:00.000Z",
    "formattedDate": "2025-Jan-2 8PM",
    "allAppsRank": 160,
    "financeAppsRank": 15
  },
  {
    "date": "2025-01-03T07:00:00.000Z",
    "formattedDate": "2025-Jan-3 8AM",
    "allAppsRank": 157,
    "financeAppsRank": 14
  },
  {
    "date": "2025-01-03T19:00:00.000Z",
    "formattedDate": "2025-Jan-3 8PM",
    "allAppsRank": 148,
    "financeAppsRank": 15
  },
  {
    "date": "2025-01-04T07:00:00.000Z",
    "formattedDate": "2025-Jan-4 8AM",
    "allAppsRank": 139,
    "financeAppsRank": 14
  },
  {
    "date": "2025-01-04T19:00:00.000Z",
    "formattedDate": "2025-Jan-4 8PM",
    "allAppsRank": 153,
    "financeAppsRank": 15
  },
  {
    "date": "2025-01-05T07:00:00.000Z",
    "formattedDate": "2025-Jan-5 8AM",
    "allAppsRank": 157,
    "financeAppsRank": 12
  },
  {
    "date": "2025-01-05T19:00:00.000Z",
    "formattedDate": "2025-Jan-5 8PM",
    "allAppsRank": 168,
    "financeAppsRank": 13
  },
  {
    "date": "2025-01-06T07:00:00.000Z",
    "formattedDate": "2025-Jan-6 8AM",
    "allAppsRank": 163,
    "financeAppsRank": 11
  },
  {
    "date": "2025-01-06T19:00:00.000Z",
    "formattedDate": "2025-Jan-6 8PM",
    "allAppsRank": 173,
    "financeAppsRank": 14
  },
  {
    "date": "2025-01-07T07:00:00.000Z",
    "formattedDate": "2025-Jan-7 8AM",
    "allAppsRank": 157,
    "financeAppsRank": 14
  },
  {
    "date": "2025-01-07T19:00:00.000Z",
    "formattedDate": "2025-Jan-7 8PM",
    "allAppsRank": 160,
    "financeAppsRank": 15
  },
  {
    "date": "2025-01-08T07:00:00.000Z",
    "formattedDate": "2025-Jan-8 8AM",
    "allAppsRank": 161,
    "financeAppsRank": 15
  },
  {
    "date": "2025-01-08T19:00:00.000Z",
    "formattedDate": "2025-Jan-8 8PM",
    "allAppsRank": 173,
    "financeAppsRank": 16
  },
  {
    "date": "2025-01-09T07:00:00.000Z",
    "formattedDate": "2025-Jan-9 8AM",
    "allAppsRank": 163,
    "financeAppsRank": 14
  },
  {
    "date": "2025-01-09T19:00:00.000Z",
    "formattedDate": "2025-Jan-9 8PM",
    "allAppsRank": 180,
    "financeAppsRank": 16
  },
  {
    "date": "2025-01-10T07:00:00.000Z",
    "formattedDate": "2025-Jan-10 8AM",
    "allAppsRank": 179,
    "financeAppsRank": 15
  },
  {
    "date": "2025-01-10T19:00:00.000Z",
    "formattedDate": "2025-Jan-10 8PM",
    "allAppsRank": 189,
    "financeAppsRank": 18
  },
  {
    "date": "2025-01-11T07:00:00.000Z",
    "formattedDate": "2025-Jan-11 8AM",
    "allAppsRank": 193,
    "financeAppsRank": 16
  },
  {
    "date": "2025-01-11T19:00:00.000Z",
    "formattedDate": "2025-Jan-11 8PM",
    "allAppsRank": 209,
    "financeAppsRank": 18
  },
  {
    "date": "2025-01-12T07:00:00.000Z",
    "formattedDate": "2025-Jan-12 8AM",
    "allAppsRank": 188,
    "financeAppsRank": 14
  },
  {
    "date": "2025-01-12T19:00:00.000Z",
    "formattedDate": "2025-Jan-12 8PM",
    "allAppsRank": 191,
    "financeAppsRank": 14
  },
  {
    "date": "2025-01-13T07:00:00.000Z",
    "formattedDate": "2025-Jan-13 8AM",
    "allAppsRank": 176,
    "financeAppsRank": 12
  },
  {
    "date": "2025-01-13T19:00:00.000Z",
    "formattedDate": "2025-Jan-13 8PM",
    "allAppsRank": 154,
    "financeAppsRank": 14
  },
  {
    "date": "2025-01-14T07:00:00.000Z",
    "formattedDate": "2025-Jan-14 8AM",
    "allAppsRank": 137,
    "financeAppsRank": 13
  },
  {
    "date": "2025-01-14T19:00:00.000Z",
    "formattedDate": "2025-Jan-14 8PM",
    "allAppsRank": 124,
    "financeAppsRank": 13
  },
  {
    "date": "2025-01-15T07:00:00.000Z",
    "formattedDate": "2025-Jan-15 8AM",
    "allAppsRank": 97,
    "financeAppsRank": 9
  },
  {
    "date": "2025-01-15T19:00:00.000Z",
    "formattedDate": "2025-Jan-15 8PM",
    "allAppsRank": 77,
    "financeAppsRank": 7
  },
  {
    "date": "2025-01-16T07:00:00.000Z",
    "formattedDate": "2025-Jan-16 8AM",
    "allAppsRank": 52,
    "financeAppsRank": 4
  },
  {
    "date": "2025-01-16T19:00:00.000Z",
    "formattedDate": "2025-Jan-16 8PM",
    "allAppsRank": 34,
    "financeAppsRank": 2
  },
  {
    "date": "2025-01-17T07:00:00.000Z",
    "formattedDate": "2025-Jan-17 8AM",
    "allAppsRank": 31,
    "financeAppsRank": 3
  },
  {
    "date": "2025-01-17T19:00:00.000Z",
    "formattedDate": "2025-Jan-17 8PM",
    "allAppsRank": 30,
    "financeAppsRank": 4
  },
  {
    "date": "2025-01-18T07:00:00.000Z",
    "formattedDate": "2025-Jan-18 8AM",
    "allAppsRank": 39,
    "financeAppsRank": 6
  },
  {
    "date": "2025-01-18T19:00:00.000Z",
    "formattedDate": "2025-Jan-18 8PM",
    "allAppsRank": 32,
    "financeAppsRank": 4
  },
  {
    "date": "2025-01-19T07:00:00.000Z",
    "formattedDate": "2025-Jan-19 8AM",
    "allAppsRank": 42,
    "financeAppsRank": 2
  },
  {
    "date": "2025-01-19T19:00:00.000Z",
    "formattedDate": "2025-Jan-19 8PM",
    "allAppsRank": 30,
    "financeAppsRank": 4
  },
  {
    "date": "2025-01-20T07:00:00.000Z",
    "formattedDate": "2025-Jan-20 8AM",
    "allAppsRank": 19,
    "financeAppsRank": 4
  },
  {
    "date": "2025-01-20T19:00:00.000Z",
    "formattedDate": "2025-Jan-20 8PM",
    "allAppsRank": 19,
    "financeAppsRank": 4
  },
  {
    "date": "2025-01-21T07:00:00.000Z",
    "formattedDate": "2025-Jan-21 8AM",
    "allAppsRank": 15,
    "financeAppsRank": 3
  },
  {
    "date": "2025-01-21T19:00:00.000Z",
    "formattedDate": "2025-Jan-21 8PM",
    "allAppsRank": 17,
    "financeAppsRank": 3
  },
  {
    "date": "2025-01-22T07:00:00.000Z",
    "formattedDate": "2025-Jan-22 8AM",
    "allAppsRank": 18,
    "financeAppsRank": 2
  },
  {
    "date": "2025-01-22T19:00:00.000Z",
    "formattedDate": "2025-Jan-22 8PM",
    "allAppsRank": 22,
    "financeAppsRank": 2
  },
  {
    "date": "2025-01-23T07:00:00.000Z",
    "formattedDate": "2025-Jan-23 8AM",
    "allAppsRank": 25,
    "financeAppsRank": 3
  },
  {
    "date": "2025-01-23T19:00:00.000Z",
    "formattedDate": "2025-Jan-23 8PM",
    "allAppsRank": 28,
    "financeAppsRank": 3
  },
  {
    "date": "2025-01-24T07:00:00.000Z",
    "formattedDate": "2025-Jan-24 8AM",
    "allAppsRank": 30,
    "financeAppsRank": 3
  },
  {
    "date": "2025-01-24T19:00:00.000Z",
    "formattedDate": "2025-Jan-24 8PM",
    "allAppsRank": 35,
    "financeAppsRank": 4
  },
  {
    "date": "2025-01-25T07:00:00.000Z",
    "formattedDate": "2025-Jan-25 8AM",
    "allAppsRank": 53,
    "financeAppsRank": 6
  },
  {
    "date": "2025-01-25T19:00:00.000Z",
    "formattedDate": "2025-Jan-25 8PM",
    "allAppsRank": 59,
    "financeAppsRank": 6
  },
  {
    "date": "2025-01-26T07:00:00.000Z",
    "formattedDate": "2025-Jan-26 8AM",
    "allAppsRank": 64,
    "financeAppsRank": 6
  },
  {
    "date": "2025-01-26T19:00:00.000Z",
    "formattedDate": "2025-Jan-26 8PM",
    "allAppsRank": 69,
    "financeAppsRank": 6
  },
  {
    "date": "2025-01-27T07:00:00.000Z",
    "formattedDate": "2025-Jan-27 8AM",
    "allAppsRank": 70,
    "financeAppsRank": 6
  },
  {
    "date": "2025-01-27T19:00:00.000Z",
    "formattedDate": "2025-Jan-27 8PM",
    "allAppsRank": 68,
    "financeAppsRank": 6
  },
  {
    "date": "2025-01-28T07:00:00.000Z",
    "formattedDate": "2025-Jan-28 8AM",
    "allAppsRank": 73,
    "financeAppsRank": 8
  },
  {
    "date": "2025-01-28T19:00:00.000Z",
    "formattedDate": "2025-Jan-28 8PM",
    "allAppsRank": 83,
    "financeAppsRank": 8
  },
  {
    "date": "2025-01-29T07:00:00.000Z",
    "formattedDate": "2025-Jan-29 8AM",
    "allAppsRank": 88,
    "financeAppsRank": 9
  },
  {
    "date": "2025-01-29T19:00:00.000Z",
    "formattedDate": "2025-Jan-29 8PM",
    "allAppsRank": 96,
    "financeAppsRank": 10
  },
  {
    "date": "2025-01-30T07:00:00.000Z",
    "formattedDate": "2025-Jan-30 8AM",
    "allAppsRank": 105,
    "financeAppsRank": 11
  },
  {
    "date": "2025-01-30T19:00:00.000Z",
    "formattedDate": "2025-Jan-30 8PM",
    "allAppsRank": 109,
    "financeAppsRank": 13
  },
  {
    "date": "2025-01-31T07:00:00.000Z",
    "formattedDate": "2025-Jan-31 8AM",
    "allAppsRank": 115,
    "financeAppsRank": 11
  },
  {
    "date": "2025-01-31T19:00:00.000Z",
    "formattedDate": "2025-Jan-31 8PM",
    "allAppsRank": 117,
    "financeAppsRank": 13
  },
  {
    "date": "2025-02-01T07:00:00.000Z",
    "formattedDate": "2025-Feb-1 8AM",
    "allAppsRank": 122,
    "financeAppsRank": 12
  },
  {
    "date": "2025-02-01T19:00:00.000Z",
    "formattedDate": "2025-Feb-1 8PM",
    "allAppsRank": 136,
    "financeAppsRank": 13
  },
  {
    "date": "2025-02-02T07:00:00.000Z",
    "formattedDate": "2025-Feb-2 8AM",
    "allAppsRank": 145,
    "financeAppsRank": 12
  },
  {
    "date": "2025-02-02T19:00:00.000Z",
    "formattedDate": "2025-Feb-2 8PM",
    "allAppsRank": 140,
    "financeAppsRank": 12
  },
  {
    "date": "2025-02-03T07:00:00.000Z",
    "formattedDate": "2025-Feb-3 8AM",
    "allAppsRank": 99,
    "financeAppsRank": 9
  },
  {
    "date": "2025-02-03T19:00:00.000Z",
    "formattedDate": "2025-Feb-3 8PM",
    "allAppsRank": 96,
    "financeAppsRank": 9
  },
  {
    "date": "2025-02-04T07:00:00.000Z",
    "formattedDate": "2025-Feb-4 8AM",
    "allAppsRank": 103,
    "financeAppsRank": 10
  },
  {
    "date": "2025-02-04T19:00:00.000Z",
    "formattedDate": "2025-Feb-4 8PM",
    "allAppsRank": 110,
    "financeAppsRank": 11
  },
  {
    "date": "2025-02-05T07:00:00.000Z",
    "formattedDate": "2025-Feb-5 8AM",
    "allAppsRank": 124,
    "financeAppsRank": 12
  },
  {
    "date": "2025-02-05T19:00:00.000Z",
    "formattedDate": "2025-Feb-5 8PM",
    "allAppsRank": 137,
    "financeAppsRank": 14
  },
  {
    "date": "2025-02-06T07:00:00.000Z",
    "formattedDate": "2025-Feb-6 8AM",
    "allAppsRank": 144,
    "financeAppsRank": 13
  },
  {
    "date": "2025-02-06T19:00:00.000Z",
    "formattedDate": "2025-Feb-6 8PM",
    "allAppsRank": 152,
    "financeAppsRank": 15
  },
  {
    "date": "2025-02-07T07:00:00.000Z",
    "formattedDate": "2025-Feb-7 8AM",
    "allAppsRank": 157,
    "financeAppsRank": 14
  },
  {
    "date": "2025-02-07T19:00:00.000Z",
    "formattedDate": "2025-Feb-7 8PM",
    "allAppsRank": 165,
    "financeAppsRank": 15
  },
  {
    "date": "2025-02-08T07:00:00.000Z",
    "formattedDate": "2025-Feb-8 8AM",
    "allAppsRank": 162,
    "financeAppsRank": 13
  },
  {
    "date": "2025-02-08T19:00:00.000Z",
    "formattedDate": "2025-Feb-8 8PM",
    "allAppsRank": 179,
    "financeAppsRank": 17
  },
  {
    "date": "2025-02-09T07:00:00.000Z",
    "formattedDate": "2025-Feb-9 8AM",
    "allAppsRank": 170,
    "financeAppsRank": 12
  },
  {
    "date": "2025-02-09T19:00:00.000Z",
    "formattedDate": "2025-Feb-9 8PM",
    "allAppsRank": 174,
    "financeAppsRank": 14
  },
  {
    "date": "2025-02-10T07:00:00.000Z",
    "formattedDate": "2025-Feb-10 8AM",
    "allAppsRank": 177,
    "financeAppsRank": 11
  },
  {
    "date": "2025-02-10T19:00:00.000Z",
    "formattedDate": "2025-Feb-10 8PM",
    "allAppsRank": 196,
    "financeAppsRank": 18
  },
  {
    "date": "2025-02-11T07:00:00.000Z",
    "formattedDate": "2025-Feb-11 8AM",
    "allAppsRank": 190,
    "financeAppsRank": 16
  },
  {
    "date": "2025-02-11T19:00:00.000Z",
    "formattedDate": "2025-Feb-11 8PM",
    "allAppsRank": 194,
    "financeAppsRank": 18
  },
  {
    "date": "2025-02-12T07:00:00.000Z",
    "formattedDate": "2025-Feb-12 8AM",
    "allAppsRank": 186,
    "financeAppsRank": 16
  },
  {
    "date": "2025-02-12T19:00:00.000Z",
    "formattedDate": "2025-Feb-12 8PM",
    "allAppsRank": 193,
    "financeAppsRank": 18
  },
  {
    "date": "2025-02-13T07:00:00.000Z",
    "formattedDate": "2025-Feb-13 8AM",
    "allAppsRank": 184,
    "financeAppsRank": 17
  },
  {
    "date": "2025-02-13T19:00:00.000Z",
    "formattedDate": "2025-Feb-13 8PM",
    "allAppsRank": 190,
    "financeAppsRank": 19
  },
  {
    "date": "2025-02-14T07:00:00.000Z",
    "formattedDate": "2025-Feb-14 8AM",
    "allAppsRank": 188,
    "financeAppsRank": 16
  },
  {
    "date": "2025-02-14T19:00:00.000Z",
    "formattedDate": "2025-Feb-14 8PM",
    "allAppsRank": 177,
    "financeAppsRank": 17
  },
  {
    "date": "2025-02-15T07:00:00.000Z",
    "formattedDate": "2025-Feb-15 8AM",
    "allAppsRank": 180,
    "financeAppsRank": 14
  },
  {
    "date": "2025-02-15T19:00:00.000Z",
    "formattedDate": "2025-Feb-15 8PM",
    "allAppsRank": 183,
    "financeAppsRank": 16
  },
  {
    "date": "2025-02-16T07:00:00.000Z",
    "formattedDate": "2025-Feb-16 8AM",
    "allAppsRank": 182,
    "financeAppsRank": 14
  },
  {
    "date": "2025-02-16T19:00:00.000Z",
    "formattedDate": "2025-Feb-16 8PM",
    "allAppsRank": 187,
    "financeAppsRank": 14
  },
  {
    "date": "2025-02-17T07:00:00.000Z",
    "formattedDate": "2025-Feb-17 8AM",
    "allAppsRank": 162,
    "financeAppsRank": 12
  },
  {
    "date": "2025-02-17T19:00:00.000Z",
    "formattedDate": "2025-Feb-17 8PM",
    "allAppsRank": 173,
    "financeAppsRank": 14
  },
  {
    "date": "2025-02-18T07:00:00.000Z",
    "formattedDate": "2025-Feb-18 8AM",
    "allAppsRank": 168,
    "financeAppsRank": 12
  },
  {
    "date": "2025-02-18T19:00:00.000Z",
    "formattedDate": "2025-Feb-18 8PM",
    "allAppsRank": 163,
    "financeAppsRank": 15
  },
  {
    "date": "2025-02-19T07:00:00.000Z",
    "formattedDate": "2025-Feb-19 8AM",
    "allAppsRank": 163,
    "financeAppsRank": 15
  },
  {
    "date": "2025-02-19T19:00:00.000Z",
    "formattedDate": "2025-Feb-19 8PM",
    "allAppsRank": 163,
    "financeAppsRank": 15
  },
  {
    "date": "2025-02-20T07:00:00.000Z",
    "formattedDate": "2025-Feb-20 8AM",
    "allAppsRank": 152,
    "financeAppsRank": 13
  },
  {
    "date": "2025-02-20T19:00:00.000Z",
    "formattedDate": "2025-Feb-20 8PM",
    "allAppsRank": 150,
    "financeAppsRank": 16
  },
  {
    "date": "2025-02-21T07:00:00.000Z",
    "formattedDate": "2025-Feb-21 8AM",
    "allAppsRank": 152,
    "financeAppsRank": 13
  },
  {
    "date": "2025-02-21T19:00:00.000Z",
    "formattedDate": "2025-Feb-21 8PM",
    "allAppsRank": 154,
    "financeAppsRank": 16
  },
  {
    "date": "2025-02-22T07:00:00.000Z",
    "formattedDate": "2025-Feb-22 8AM",
    "allAppsRank": 149,
    "financeAppsRank": 12
  },
  {
    "date": "2025-02-22T19:00:00.000Z",
    "formattedDate": "2025-Feb-22 8PM",
    "allAppsRank": 159,
    "financeAppsRank": 16
  },
  {
    "date": "2025-02-23T07:00:00.000Z",
    "formattedDate": "2025-Feb-23 8AM",
    "allAppsRank": 159,
    "financeAppsRank": 13
  },
  {
    "date": "2025-02-23T19:00:00.000Z",
    "formattedDate": "2025-Feb-23 8PM",
    "allAppsRank": 180,
    "financeAppsRank": 15
  },
  {
    "date": "2025-02-24T07:00:00.000Z",
    "formattedDate": "2025-Feb-24 8AM",
    "allAppsRank": 166,
    "financeAppsRank": 12
  },
  {
    "date": "2025-02-24T19:00:00.000Z",
    "formattedDate": "2025-Feb-24 8PM",
    "allAppsRank": 182,
    "financeAppsRank": 16
  },
  {
    "date": "2025-02-25T07:00:00.000Z",
    "formattedDate": "2025-Feb-25 8AM",
    "allAppsRank": 169,
    "financeAppsRank": 14
  },
  {
    "date": "2025-02-25T19:00:00.000Z",
    "formattedDate": "2025-Feb-25 8PM",
    "allAppsRank": 167,
    "financeAppsRank": 16
  },
  {
    "date": "2025-02-26T07:00:00.000Z",
    "formattedDate": "2025-Feb-26 8AM",
    "allAppsRank": 171,
    "financeAppsRank": 15
  },
  {
    "date": "2025-02-26T19:00:00.000Z",
    "formattedDate": "2025-Feb-26 8PM",
    "allAppsRank": 180,
    "financeAppsRank": 19
  },
  {
    "date": "2025-02-27T07:00:00.000Z",
    "formattedDate": "2025-Feb-27 8AM",
    "allAppsRank": 175,
    "financeAppsRank": 16
  },
  {
    "date": "2025-02-27T19:00:00.000Z",
    "formattedDate": "2025-Feb-27 8PM",
    "allAppsRank": 193,
    "financeAppsRank": 20
  },
  {
    "date": "2025-02-28T07:00:00.000Z",
    "formattedDate": "2025-Feb-28 8AM",
    "allAppsRank": 179,
    "financeAppsRank": 17
  },
  {
    "date": "2025-02-28T19:00:00.000Z",
    "formattedDate": "2025-Feb-28 8PM",
    "allAppsRank": 186,
    "financeAppsRank": 20
  },
  {
    "date": "2025-03-01T07:00:00.000Z",
    "formattedDate": "2025-Mar-1 8AM",
    "allAppsRank": 203,
    "financeAppsRank": 17
  },
  {
    "date": "2025-03-01T19:00:00.000Z",
    "formattedDate": "2025-Mar-1 8PM",
    "allAppsRank": 242,
    "financeAppsRank": 20
  },
  {
    "date": "2025-03-02T07:00:00.000Z",
    "formattedDate": "2025-Mar-2 8AM",
    "allAppsRank": 266,
    "financeAppsRank": 18
  },
  {
    "date": "2025-03-02T19:00:00.000Z",
    "formattedDate": "2025-Mar-2 8PM",
    "allAppsRank": 156,
    "financeAppsRank": 11
  },
  {
    "date": "2025-03-03T07:00:00.000Z",
    "formattedDate": "2025-Mar-3 8AM",
    "allAppsRank": 112,
    "financeAppsRank": 8
  },
  {
    "date": "2025-03-03T19:00:00.000Z",
    "formattedDate": "2025-Mar-3 8PM",
    "allAppsRank": 119,
    "financeAppsRank": 10
  },
  {
    "date": "2025-03-04T07:00:00.000Z",
    "formattedDate": "2025-Mar-4 8AM",
    "allAppsRank": 124,
    "financeAppsRank": 11
  },
  {
    "date": "2025-03-04T19:00:00.000Z",
    "formattedDate": "2025-Mar-4 8PM",
    "allAppsRank": 138,
    "financeAppsRank": 12
  },
  {
    "date": "2025-03-05T07:00:00.000Z",
    "formattedDate": "2025-Mar-5 8AM",
    "allAppsRank": 146,
    "financeAppsRank": 11
  },
  {
    "date": "2025-03-05T19:00:00.000Z",
    "formattedDate": "2025-Mar-5 8PM",
    "allAppsRank": 161,
    "financeAppsRank": 14
  },
  {
    "date": "2025-03-06T07:00:00.000Z",
    "formattedDate": "2025-Mar-6 8AM",
    "allAppsRank": 162,
    "financeAppsRank": 15
  },
  {
    "date": "2025-03-06T19:00:00.000Z",
    "formattedDate": "2025-Mar-6 8PM",
    "allAppsRank": 174,
    "financeAppsRank": 16
  },
  {
    "date": "2025-03-07T07:00:00.000Z",
    "formattedDate": "2025-Mar-7 8AM",
    "allAppsRank": 152,
    "financeAppsRank": 12
  },
  {
    "date": "2025-03-07T19:00:00.000Z",
    "formattedDate": "2025-Mar-7 8PM",
    "allAppsRank": 157,
    "financeAppsRank": 13
  },
  {
    "date": "2025-03-08T07:00:00.000Z",
    "formattedDate": "2025-Mar-8 8AM",
    "allAppsRank": 168,
    "financeAppsRank": 12
  },
  {
    "date": "2025-03-08T19:00:00.000Z",
    "formattedDate": "2025-Mar-8 8PM",
    "allAppsRank": 195,
    "financeAppsRank": 16
  },
  {
    "date": "2025-03-09T07:00:00.000Z",
    "formattedDate": "2025-Mar-9 8AM",
    "allAppsRank": 214,
    "financeAppsRank": 13
  },
  {
    "date": "2025-03-09T19:00:00.000Z",
    "formattedDate": "2025-Mar-9 8PM",
    "allAppsRank": 214,
    "financeAppsRank": 13
  },
  {
    "date": "2025-03-10T07:00:00.000Z",
    "formattedDate": "2025-Mar-10 8AM",
    "allAppsRank": 187,
    "financeAppsRank": 12
  },
  {
    "date": "2025-03-10T19:00:00.000Z",
    "formattedDate": "2025-Mar-10 8PM",
    "allAppsRank": 189,
    "financeAppsRank": 15
  },
  {
    "date": "2025-03-11T07:00:00.000Z",
    "formattedDate": "2025-Mar-11 8AM",
    "allAppsRank": 161,
    "financeAppsRank": 12
  },
  {
    "date": "2025-03-11T19:00:00.000Z",
    "formattedDate": "2025-Mar-11 8PM",
    "allAppsRank": 166,
    "financeAppsRank": 17
  },
  {
    "date": "2025-03-12T07:00:00.000Z",
    "formattedDate": "2025-Mar-12 8AM",
    "allAppsRank": 163,
    "financeAppsRank": 14
  },
  {
    "date": "2025-03-12T19:00:00.000Z",
    "formattedDate": "2025-Mar-12 8PM",
    "allAppsRank": 177,
    "financeAppsRank": 18
  },
  {
    "date": "2025-03-13T07:00:00.000Z",
    "formattedDate": "2025-Mar-13 8AM",
    "allAppsRank": 176,
    "financeAppsRank": 15
  },
  {
    "date": "2025-03-13T19:00:00.000Z",
    "formattedDate": "2025-Mar-13 8PM",
    "allAppsRank": 189,
    "financeAppsRank": 20
  },
  {
    "date": "2025-03-14T07:00:00.000Z",
    "formattedDate": "2025-Mar-14 8AM",
    "allAppsRank": 181,
    "financeAppsRank": 14
  },
  {
    "date": "2025-03-14T19:00:00.000Z",
    "formattedDate": "2025-Mar-14 8PM",
    "allAppsRank": 198,
    "financeAppsRank": 19
  },
  {
    "date": "2025-03-15T07:00:00.000Z",
    "formattedDate": "2025-Mar-15 8AM",
    "allAppsRank": 192,
    "financeAppsRank": 12
  },
  {
    "date": "2025-03-15T19:00:00.000Z",
    "formattedDate": "2025-Mar-15 8PM",
    "allAppsRank": 216,
    "financeAppsRank": 15
  },
  {
    "date": "2025-03-16T07:00:00.000Z",
    "formattedDate": "2025-Mar-16 8AM",
    "allAppsRank": 104,
    "financeAppsRank": 7
  },
  {
    "date": "2025-03-16T19:00:00.000Z",
    "formattedDate": "2025-Mar-16 8PM",
    "allAppsRank": 122,
    "financeAppsRank": 8
  },
  {
    "date": "2025-03-17T07:00:00.000Z",
    "formattedDate": "2025-Mar-17 8AM",
    "allAppsRank": 153,
    "financeAppsRank": 8
  },
  {
    "date": "2025-03-17T19:00:00.000Z",
    "formattedDate": "2025-Mar-17 8PM",
    "allAppsRank": 176,
    "financeAppsRank": 13
  },
  {
    "date": "2025-03-18T07:00:00.000Z",
    "formattedDate": "2025-Mar-18 8AM",
    "allAppsRank": 196,
    "financeAppsRank": 14
  },
  {
    "date": "2025-03-18T19:00:00.000Z",
    "formattedDate": "2025-Mar-18 8PM",
    "allAppsRank": 233,
    "financeAppsRank": 20
  },
  {
    "date": "2025-03-19T07:00:00.000Z",
    "formattedDate": "2025-Mar-19 8AM",
    "allAppsRank": 235,
    "financeAppsRank": 18
  },
  {
    "date": "2025-03-19T19:00:00.000Z",
    "formattedDate": "2025-Mar-19 8PM",
    "allAppsRank": 217,
    "financeAppsRank": 20
  },
  {
    "date": "2025-03-20T07:00:00.000Z",
    "formattedDate": "2025-Mar-20 8AM",
    "allAppsRank": 209,
    "financeAppsRank": 16
  },
  {
    "date": "2025-03-20T19:00:00.000Z",
    "formattedDate": "2025-Mar-20 8PM",
    "allAppsRank": 242,
    "financeAppsRank": 21
  },
  {
    "date": "2025-03-21T07:00:00.000Z",
    "formattedDate": "2025-Mar-21 8AM",
    "allAppsRank": 262,
    "financeAppsRank": 21
  },
  {
    "date": "2025-03-21T19:00:00.000Z",
    "formattedDate": "2025-Mar-21 8PM",
    "allAppsRank": 283,
    "financeAppsRank": 22
  },
  {
    "date": "2025-03-22T07:00:00.000Z",
    "formattedDate": "2025-Mar-22 8AM",
    "allAppsRank": 290,
    "financeAppsRank": 21
  },
  {
    "date": "2025-03-22T19:00:00.000Z",
    "formattedDate": "2025-Mar-22 8PM",
    "allAppsRank": 320,
    "financeAppsRank": 23
  },
  {
    "date": "2025-03-23T07:00:00.000Z",
    "formattedDate": "2025-Mar-23 8AM",
    "allAppsRank": 330,
    "financeAppsRank": 22
  },
  {
    "date": "2025-03-23T19:00:00.000Z",
    "formattedDate": "2025-Mar-23 8PM",
    "allAppsRank": 345,
    "financeAppsRank": 23
  },
  {
    "date": "2025-03-24T07:00:00.000Z",
    "formattedDate": "2025-Mar-24 8AM",
    "allAppsRank": 318,
    "financeAppsRank": 17
  }
];
    
    loadingDiv.style.display = 'none';
    
    originalData = embeddedData;
    
    processData(embeddedData);
    populateYearSelector(embeddedData);
}

function getLastNDaysData(data, days) {
    if (data.length === 0) return [];
    
    const dates = data.map(d => new Date(d.date));
    const maxDate = new Date(Math.max(...dates));
    
    const cutoffDate = new Date(maxDate);
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return data.filter(d => new Date(d.date) >= cutoffDate);
}

function getYearData(data, year) {
    if (data.length === 0 || year === 'all') return data;
    return data.filter(d => new Date(d.date).getFullYear() === parseInt(year));
}

function getMonthData(data, month) {
    if (data.length === 0 || month === 'all') return data;
    return data.filter(d => new Date(d.date).getMonth() === parseInt(month));
}

function readCSV(file) {
    loadingDiv.style.display = 'block';
    
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const csvText = e.target.result;
        processCsvText(csvText);
    };
    
    reader.onerror = function(e) {
        console.error('Error reading file:', e);
        loadingDiv.style.display = 'none';
        statsDiv.innerHTML = `<p class="error">Error reading file: ${e}</p>`;
    };
    
    reader.readAsText(file);
}

function populateYearSelector(data) {
    while (yearSelector.options.length > 1) {
        yearSelector.remove(1);
    }
    
    const years = new Set();
    data.forEach(row => {
        if (row.date) {
            const year = new Date(row.date).getFullYear();
            years.add(year);
        }
    });
    
    Array.from(years).sort((a, b) => b - a).forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelector.appendChild(option);
    });
}

function processData(data, filterYear = 'all', filterMonth = 'all') {
    
    let filteredData = data;
    
    if (filterYear !== 'all') {
        filteredData = getYearData(filteredData, filterYear);
    }
    
    if (filterMonth !== 'all') {
        filteredData = getMonthData(filteredData, filterMonth);
    }
    
    const cleanData = filteredData.filter(row => 
        row.date && 
        (row.allAppsRank !== undefined || row.financeAppsRank !== undefined) && 
        !isNaN(new Date(row.date).getTime())
    );
    
    if (cleanData.length === 0) {
        statsDiv.innerHTML = '<p class="error">No valid data found after filtering.</p>';
        return;
    }
    
    cleanData.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    const dates = cleanData.map(d => new Date(d.date));
    const allAppsRanks = cleanData.map(d => d.allAppsRank);
    const financeAppsRanks = cleanData.map(d => d.financeAppsRank);
    
    const validAllAppsRanks = allAppsRanks.filter(r => r !== null && r !== undefined && !isNaN(r));
    const validFinanceAppsRanks = financeAppsRanks.filter(r => r !== null && r !== undefined && !isNaN(r));
    
    let maxAllAppsRank = 0;
    let maxFinanceAppsRank = 0;
    let minAllAppsRank = Infinity;
    let minFinanceAppsRank = Infinity;
    
    if (validAllAppsRanks.length > 0) {
        maxAllAppsRank = Math.max(...validAllAppsRanks) * 1.1;
        minAllAppsRank = Math.min(...validAllAppsRanks);
    }
    
    if (validFinanceAppsRanks.length > 0) {
        maxFinanceAppsRank = Math.max(...validFinanceAppsRanks) * 1.1;
        minFinanceAppsRank = Math.min(...validFinanceAppsRanks);
    }
    
    updateStats(cleanData, minAllAppsRank, maxAllAppsRank, minFinanceAppsRank, maxFinanceAppsRank);
    
    const traceMode = smoothLines ? 'lines' : 'lines+markers';
    
    const allAppsTrace = {
        x: dates,
        y: allAppsRanks,
        name: 'Overall App Ranking',
        type: 'scatter',
        mode: traceMode,
        line: {
            color: '#1DA1F2',
            width: 3,
            shape: smoothLines ? 'spline' : 'linear'
        },
        marker: {
            size: 6,
            color: '#1DA1F2'
        },
        yaxis: 'y',
        hovertemplate: 'Date: %{x|%b %d %Y}<br>Overall Rank: %{y}<extra></extra>'
    };
    
    const financeAppsTrace = {
        x: dates,
        y: financeAppsRanks,
        name: 'Finance App Ranking',
        type: 'scatter',
        mode: traceMode,
        line: {
            color: '#17BF63',
            width: 3,
            shape: smoothLines ? 'spline' : 'linear'
        },
        marker: {
            size: 6,
            color: '#17BF63'
        },
        yaxis: 'y2',
        hovertemplate: 'Date: %{x|%b %d %Y}<br>Finance Rank: %{y}<extra></extra>'
    };
    
    plotData = [allAppsTrace, financeAppsTrace];
    
    let yaxis2Range = [maxFinanceAppsRank, 1];
    
    if (normalizedScales && maxAllAppsRank > 0 && maxFinanceAppsRank > 0) {
        const scaleFactor = maxAllAppsRank / maxFinanceAppsRank;
        yaxis2Range = [maxAllAppsRank, 1];
        
        financeAppsTrace.y = financeAppsRanks.map(r => 
            r !== null && r !== undefined ? r * scaleFactor : null
        );
    }
    
    const minDate = dates.length > 0 ? dates[0] : new Date();
    const maxDate = dates.length > 0 ? dates[dates.length - 1] : new Date();
    
    const dateRange = maxDate - minDate;
    const buffer = dateRange * 0.05;
    const startDate = new Date(minDate.getTime() - buffer);
    const endDate = new Date(maxDate.getTime() + buffer);
    
    layout = {
        title: {
            text: 'Coinbase App Rankings Over Time',
            font: {
                color: '#e0e0e0',
                size: 24
            }
        },
        paper_bgcolor: 'rgba(30, 30, 47, 0.5)',
        plot_bgcolor: 'rgba(30, 30, 47, 0.2)',
        xaxis: {
            title: {
                text: 'Date',
                font: {
                    color: '#e0e0e0'
                }
            },
            tickformat: '%b %d %Y',
            gridcolor: 'rgba(255, 255, 255, 0.1)',
            tickfont: {
                color: '#e0e0e0'
            },
            range: [startDate, endDate], 
            showspikes: showCrosshair,
            spikecolor: 'rgba(255,255,255,0.3)',
            spikesnap: 'cursor',
            spikemode: 'across+marker',
            spikethickness: 0.5,
            spikedash: 'solid'
        },
        yaxis: {
            title: {
                text: 'Overall App Ranking',
                font: {
                    color: '#1DA1F2'
                }
            },
            range: [maxAllAppsRank, 1],
            side: 'left',
            tickmode: 'auto',
            nticks: 10,
            gridcolor: 'rgba(255, 255, 255, 0.1)',
            tickfont: {
                color: '#e0e0e0'
            },
            zerolinecolor: 'rgba(255, 255, 255, 0.2)',
            showspikes: showCrosshair,
            spikecolor: 'rgba(255,255,255,0.3)',
            spikesnap: 'cursor',
            spikemode: 'across+marker',
            spikethickness: 0.5,
            spikedash: 'solid'
        },
        yaxis2: {
            title: {
                text: 'Finance App Ranking',
                font: {
                    color: '#17BF63'
                }
            },
            range: yaxis2Range,
            side: 'right',
            overlaying: 'y',
            tickmode: 'auto',
            nticks: 10,
            gridcolor: 'rgba(0,0,0,0)',
            tickfont: {
                color: '#e0e0e0'
            },
            showspikes: showCrosshair,
            spikecolor: 'rgba(255,255,255,0.3)',
            spikesnap: 'cursor',
            spikemode: 'across+marker',
            spikethickness: 0.5,
            spikedash: 'solid'
        },
        hovermode: 'closest',
        legend: {
            x: 0.5,
            y: 1.1,
            xanchor: 'center',
            orientation: 'h',
            font: {
                color: '#e0e0e0'
            },
            bgcolor: 'rgba(30, 30, 47, 0.7)',
            bordercolor: 'rgba(255, 255, 255, 0.2)'
        },
        margin: {
            l: 70,
            r: 70,
            t: 80,
            b: 80
        },
        shapes: [{
            type: 'line',
            x0: startDate, 
            y0: 1,
            x1: endDate, 
            y1: 1,
            yref: 'y',
            line: {
                color: 'rgba(255, 107, 107, 0.5)',
                width: 1,
                dash: 'dash'
            }
        }],
        annotations: [{
            x: startDate, 
            y: 1,
            xref: 'x',
            yref: 'y',
            text: 'Top Rank (#1)',
            showarrow: false,
            font: {
                color: '#ff6b6b'
            },
            xanchor: 'left',
            yanchor: 'bottom'
        }]
    };
    
    const config = {
        responsive: true,
        displayModeBar: true,
        modeBarButtonsToRemove: ['lasso2d', 'select2d'],
        displaylogo: false
    };
    
    Plotly.newPlot('chart', plotData, layout, config);
}

function updateStats(data, minAllAppsRank, maxAllAppsRank, minFinanceAppsRank, maxFinanceAppsRank) {
    const trends = calculateTrends(data);
    
    let statsHtml = `
        <div class="grid">
            <div class="metric-card">
                <div class="metric-value">${data.length}</div>
                <div class="metric-label">Total Data Points</div>
            </div>
        </div>
        
        <h3>Overall App Ranking</h3>
        <div class="grid">
            <div class="metric-card">
                <div class="metric-value">${formatTrend(trends.allApps.day1)}</div>
                <div class="metric-label">1-Day Trend</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${formatTrend(trends.allApps.day7)}</div>
                <div class="metric-label">7-Day Trend</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${formatTrend(trends.allApps.day30)}</div>
                <div class="metric-label">30-Day Trend</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${formatTrend(trends.allApps.day90)}</div>
                <div class="metric-label">90-Day Trend</div>
            </div>
        </div>
        
        <h3>Finance App Ranking</h3>
        <div class="grid">
            <div class="metric-card">
                <div class="metric-value">${formatTrend(trends.finance.day1)}</div>
                <div class="metric-label">1-Day Trend</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${formatTrend(trends.finance.day7)}</div>
                <div class="metric-label">7-Day Trend</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${formatTrend(trends.finance.day30)}</div>
                <div class="metric-label">30-Day Trend</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${formatTrend(trends.finance.day90)}</div>
                <div class="metric-label">90-Day Trend</div>
            </div>
        </div>
    `;
    
    statsDiv.innerHTML = statsHtml;
}

function calculateTrends(data) {
    data.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    const latestData = data[data.length - 1];
    
    const trends = {
        allApps: { day1: null, day7: null, day30: null, day90: null },
        finance: { day1: null, day7: null, day30: null, day90: null }
    };
    
    calculateTrendForPeriod(data, 1, trends);
    calculateTrendForPeriod(data, 7, trends);
    calculateTrendForPeriod(data, 30, trends);
    calculateTrendForPeriod(data, 90, trends);
    
    return trends;
}

function calculateTrendForPeriod(data, days, trends) {
    if (data.length < 2) return;
    
    const now = new Date(data[data.length - 1].date);
    const cutoffDate = new Date(now);
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    let compareData = null;
    for (let i = data.length - 1; i >= 0; i--) {
        const itemDate = new Date(data[i].date);
        if (itemDate <= cutoffDate) {
            compareData = data[i];
            break;
        }
    }
    
    if (!compareData) {
        if (days === 1 && data.length >= 2) {
            compareData = data[data.length - 2];
        } else {
            compareData = data[0];
        }
    }
    
    const current = data[data.length - 1];
    
    if (current.allAppsRank !== undefined && compareData.allAppsRank !== undefined) {
        trends.allApps[`day${days}`] = compareData.allAppsRank - current.allAppsRank;
    }
    
    if (current.financeAppsRank !== undefined && compareData.financeAppsRank !== undefined) {
        trends.finance[`day${days}`] = compareData.financeAppsRank - current.financeAppsRank;
    }
}

function formatTrend(change) {
    if (change === null || change === undefined) {
        return '<span class="no-trend">-</span>';
    }
    
    if (change > 0) {
        return `<span class="trend-up">▲ ${Math.abs(change)}</span>`;
    } else if (change < 0) {
        return `<span class="trend-down">▼ ${Math.abs(change)}</span>`;
    } else {
        return '<span class="trend-none">◆ 0</span>';
    }
}

document.getElementById('fullscreenBtn').addEventListener('click', function() {
    if (chartDiv.requestFullscreen) {
        chartDiv.requestFullscreen();
    } else if (chartDiv.webkitRequestFullscreen) {
        chartDiv.webkitRequestFullscreen();
    } else if (chartDiv.msRequestFullscreen) {
        chartDiv.msRequestFullscreen();
    }
});

chartStyleToggle.addEventListener('change', function() {
    smoothLines = this.checked;
    processData(originalData, yearSelector.value, monthSelector.value);
});

crosshairToggle.addEventListener('change', function() {
    showCrosshair = this.checked;
    processData(originalData, yearSelector.value, monthSelector.value);
});

document.getElementById('zoomOut').addEventListener('click', function() {
    Plotly.relayout('chart', {
        'xaxis.autorange': true,
        'yaxis.autorange': false,
        'yaxis2.autorange': false
    });
});

document.getElementById('allData').addEventListener('click', function() {
    if (!originalData || originalData.length === 0) return;
    processData(originalData);
});

document.getElementById('last7Days').addEventListener('click', function() {
    if (!originalData || originalData.length === 0) return;
    
    const lastWeekData = getLastNDaysData(originalData, 7);
    if (lastWeekData.length > 0) {
        processData(lastWeekData);
    } else {
        alert("Not enough data for 7-day view");
    }
});

document.getElementById('last30Days').addEventListener('click', function() {
    if (!originalData || originalData.length === 0) return;
    
    const lastMonthData = getLastNDaysData(originalData, 30);
    if (lastMonthData.length > 0) {
        processData(lastMonthData);
    } else {
        alert("Not enough data for 30-day view");
    }
});

document.getElementById('last90Days').addEventListener('click', function() {
    if (!originalData || originalData.length === 0) return;
    
    const last90DaysData = getLastNDaysData(originalData, 90);
    if (last90DaysData.length > 0) {
        processData(last90DaysData);
    } else {
        alert("Not enough data for 90-day view");
    }
});

document.getElementById('year2024').addEventListener('click', function() {
    if (!originalData || originalData.length === 0) return;
    
    const data2024 = getYearData(originalData, '2024');
    if (data2024.length > 0) {
        processData(data2024);
    } else {
        alert("No data available for 2024");
    }
});

document.getElementById('year2025').addEventListener('click', function() {
    if (!originalData || originalData.length === 0) return;
    
    const data2025 = getYearData(originalData, '2025');
    if (data2025.length > 0) {
        processData(data2025);
    } else {
        alert("No data available for 2025");
    }
});

document.getElementById('toggleFinanceVisible').addEventListener('click', function() {
    financeVisible = !financeVisible;
    const visibility = financeVisible ? true : 'legendonly';
    Plotly.restyle('chart', {'visible': visibility}, [1]);
});

document.getElementById('toggleAllAppsVisible').addEventListener('click', function() {
    allAppsVisible = !allAppsVisible;
    const visibility = allAppsVisible ? true : 'legendonly';
    Plotly.restyle('chart', {'visible': visibility}, [0]);
});

document.getElementById('toggleNormalize').addEventListener('click', function() {
    normalizedScales = !normalizedScales;
    processData(originalData, yearSelector.value, monthSelector.value);
});

document.getElementById('applyFilter').addEventListener('click', function() {
    if (!originalData || originalData.length === 0) return;
    
    const selectedYear = yearSelector.value;
    const selectedMonth = monthSelector.value;
    
    let filteredData = originalData;
    
    if (selectedYear !== 'all') {
        filteredData = getYearData(filteredData, selectedYear);
    }
    
    if (selectedMonth !== 'all') {
        filteredData = getMonthData(filteredData, selectedMonth);
    }
    
    if (filteredData.length > 0) {
        processData(filteredData);
    } else {
        alert("No data matches the selected filters");
    }
});

fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        readCSV(file);
    }
});

window.addEventListener('resize', function() {
    Plotly.Plots.resize('chart');
});

Plotly.newPlot('chart', [], {
    title: {
        text: 'Loading Coinbase App Rankings...',
        font: {
            color: '#e0e0e0',
            size: 24
        }
    },
    paper_bgcolor: 'rgba(30, 30, 47, 0.5)',
    plot_bgcolor: 'rgba(30, 30, 47, 0.2)',
    annotations: [{
        x: 0.5,
        y: 0.5,
        xref: 'paper',
        yref: 'paper',
        text: 'Loading data...',
        showarrow: false,
        font: {
            size: 20,
            color: '#a991ff'
        }
    }]
});

if (document.getElementById('draw-line')) {
    document.getElementById('draw-line').addEventListener('click', function() {
        toggleDrawingMode('line');
    });
}

if (document.getElementById('draw-horizontal')) {
    document.getElementById('draw-horizontal').addEventListener('click', function() {
        toggleDrawingMode('horizontal');
    });
}

if (document.getElementById('clear-drawings')) {
    document.getElementById('clear-drawings').addEventListener('click', function() {
        clearDrawings();
    });
}

function toggleDrawingMode(mode) {
    const buttons = document.querySelectorAll('.drawing-tools button');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    if (drawingMode === mode) {
        drawingMode = null;
        chartDiv.style.cursor = 'crosshair';
    } else {
        drawingMode = mode;
        document.querySelector(`#draw-${mode}`).classList.add('active');
        chartDiv.style.cursor = 'crosshair';
    }
    
    drawingPoints = [];
}

function clearDrawings() {
    drawings = [];
    drawingMode = null;
    drawingPoints = [];
    const buttons = document.querySelectorAll('.drawing-tools button');
    buttons.forEach(btn => btn.classList.remove('active'));
    updateChart();
}

if (chartDiv) {
    chartDiv.addEventListener('click', function(e) {
        if (!drawingMode) return;
        
        const rect = chartDiv.querySelector('.main-svg').getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xaxis = Plotly.d3.select(chartDiv).select('.xaxislayer-above').selectAll('.xtick');
        const yaxis = Plotly.d3.select(chartDiv).select('.yaxislayer-above').selectAll('.ytick');
        
        if (!xaxis.size() || !yaxis.size()) return;
        
        const xRange = layout.xaxis.range || [0, 1];
        const yRange = layout.yaxis.range || [0, 1];
        
        const xPixelRange = rect.width;
        const yPixelRange = rect.height - 100;
        
        const xPercentage = (x - 60) / xPixelRange;
        const xValue = xRange[0] + (xRange[1] - xRange[0]) * xPercentage;
        
        const yPercentage = (y - 50) / yPixelRange;
        const yValue = yRange[0] + (yRange[1] - yRange[0]) * yPercentage;
        
        if (drawingMode === 'line') {
            drawingPoints.push({ x: xValue, y: yValue });
            
            if (drawingPoints.length === 2) {
                const line = {
                    type: 'line',
                    points: [...drawingPoints],
                    color: '#bf9aff'
                };
                
                drawings.push(line);
                drawingPoints = [];
                updateChart();
            }
        } else if (drawingMode === 'horizontal') {
            const line = {
                type: 'horizontal',
                y: yValue,
                color: '#f092ff'
            };
            
            drawings.push(line);
            updateChart();
        }
    });
}

function updateChart() {
    if (!layout || !layout.shapes) return;
    
    const shapes = [...layout.shapes.filter(s => s.yref !== 'drawing')];
    
drawings.forEach(drawing => {
        if (drawing.type === 'line' && drawing.points.length === 2) {
            shapes.push({
                type: 'line',
                x0: drawing.points[0].x,
                y0: drawing.points[0].y,
                x1: drawing.points[1].x,
                y1: drawing.points[1].y,
                line: {
                    color: drawing.color,
                    width: 2,
                    dash: 'solid'
                },
                yref: 'drawing'
            });
        } else if (drawing.type === 'horizontal') {
            shapes.push({
                type: 'line',
                x0: layout.xaxis.range[0],
                y0: drawing.y,
                x1: layout.xaxis.range[1],
                y1: drawing.y,
                line: {
                    color: drawing.color,
                    width: 2,
                    dash: 'dashdot'
                },
                yref: 'drawing'
            });
        }
    });
    
    Plotly.relayout(chartDiv, { shapes: shapes });
}

document.addEventListener("DOMContentLoaded", (event) => {
  document.querySelector("[id^='modebar-'] > div:nth-child(3) > a:nth-child(3) > svg > path").click();
});


