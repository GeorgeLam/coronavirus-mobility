let type = 0;
let chosenArea = "Greater London";
let cName = "United Kingdom";
dataFetch(type, chosenArea);
countryList = [];
let nationwideSearch;
regionList = [];
let parsed;
// secondTime = false;
// let type2, visits2, chosenArea2;

console.log("Js loaded")

cleanTypeName = ["Retail and Recreation", "Groceries and Pharmacies", "Parks", "Transit Stations", "Workplaces", "Residences"]; //differs from below 'typeNames' as this is a clean version of the type naming. Below variable typeNames uses the specific naming that is held in the DB.

//Autofill for countrynames
var options = {
  url: "./regions_by_country3.json",
  getValue: "country",
  list: {
    match: {
      enabled: true
    },

    onClickEvent: function () {
      cName = $("#countryName").val()
      console.log(cName)
      locGet(cName)
    }	
  }
};
$("#countryName").easyAutocomplete(options);

activat();

async function locGet(cName) {
  let response = await fetch('./regions_by_country3.json');
  let data = await response.text();
  parsed = JSON.parse(data);
  console.log(parsed);
  verr = parsed.filter(item => (item["country"] == cName))[0]["regions"]
  console.log(verr)
  console.log("Calling listchg up")

  listChg();
};

//locGet();

console.log(countryList);
let inpu;

function listChg(){
  dropd = document.querySelector("#chosenArea");
  while (dropd.firstChild) {
    console.log("removing")
    dropd.removeChild(dropd.lastChild);
  }
  verr.forEach(region => {
    console.log("Adding " + region);
    newO = document.createElement("option");
    newO.textContent = region;
    newO.value = region;
    dropd.appendChild(newO);
  })
  chosenArea = document.querySelector("#chosenArea").value;
  console.log(chosenArea);
  dataFetch(chosenArea);
}


showData = document.querySelector("#showData").addEventListener("click", (e) => {
  e.preventDefault();
  console.log(document.querySelector("#country").value)
  cName = document.querySelector("#country").value;
})

async function dataFetch(){
    console.log(`Data fetch called! You input type: ${type} and ${chosenArea}`)
    dates = [];
    visits = [];

    let data = { type, chosenArea, cName };
    let fetchOpt = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const fetching = await fetch("posts/api/", fetchOpt);
    const resp = await fetching.json();
    console.log(resp);

    resp.forEach((item) => {
      dates.push(item.date);
    });
    console.log(dates);

    let DBTypeNames = [
      "retail_and_recreation_percent_change_from_baseline",
      "grocery_and_pharmacy_percent_change_from_baseline",
      "parks_percent_change_from_baseline",
      "transit_stations_percent_change_from_baseline",
      "workplaces_percent_change_from_baseline",
      "residential_percent_change_from_baseline",
    ]; //these are the column names used in the database!

    resp.forEach((item) => {
      visits.push(item[DBTypeNames[type]]);
    });
    console.log(visits);

    charter(dates, visits);
  //activat();

}



function activat(){
    document.querySelector("#chosenArea").addEventListener("change", async (e) => {
      console.log("CA changed")
      chosenArea = e.target.value;
      // if (chosenArea == "Nationwide"){
      //   chosenArea = cName;
      //   nationwideSearch = true;
      //   console.log("Nationwide, so switched to: " + chosenArea)
      // }
      // else{
      //   nationwideSearch = false;
      // }
      dataFetch(chosenArea);
      })

    document.querySelector("#type").addEventListener("change", async (e) => {
      console.log("type change")
      // if(secondTime){
      //   type2 = e.target.value;
      //   dataFetch(type);
      // }
      type = e.target.value;
      dataFetch(type);
      // secondTime = true;
    })

  // document.querySelector("#compare").addEventListener("click", () => {
  //   console.log("comparing")
  //   console.log(dates);
  //   console.log(visits);
  //   dates2 = dates;
  //   visits2 = visits;
  //   chosenArea2 = chosenArea;
  //   type2 = cleanTypeName[type];
  // })
}

// document.querySelector("#countryName").addEventListener("onfocusout", (e) => {
//   //chosenArea = e.target.value;
//   //dataFetch(chosenArea);
//   console.log(e.target.value);
// })


async function charter(dates, visits){
  console.log("charting!")
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: `${chosenArea} - % Change in Activity in ${cleanTypeName[type]}`,
                data: visits,
                backgroundColor: [
                    'rgba(44, 226, 66, 0.5)'],
                borderColor: [
                    'rgba(255, 99, 132, 1)'],
                borderWidth: 1
            }
        //       {
        //         label: `${chosenArea2} - % Change in Activity in ${type2}`,
        //         data: visits2,
        //         backgroundColor: [
        //           'rgba(14, 6, 26, 0.5)'],
        //         borderColor: [
        //           'rgba(255, 99, 132, 1)'],
        //         borderWidth: 1
        //       }
        ]
        },
        options: {
            events: ['click']
        }
    })
}