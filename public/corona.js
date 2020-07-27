console.log("Responsive version")
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


// graphSizeAdjust = () => {
//   //document.querySelector("#myChart").style.width = window.innerWidth;
//   //document.querySelector("#myChart").style.height = window.innerHeight * 0.65;
//   console.log("W: " + document.querySelector("#myChart").width)
//   console.log("H: " + document.querySelector("#myChart").height)
//   document.querySelector("#myChart").style.height = 400;
//   console.log(document.querySelector("#myChart").height)
// }

// window.addEventListener("resize", () => {
//   console.log("resized");
//   //graphSizeAdjust();
// })


// graphSizeAdjust();

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
    console.log(ctx);
    //ctx.height = 100;
    //ctx.width = 100;

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
            events: ['click'],
            responsive: true, maintainAspectRatio: false 
        }
    })
}

let datesO = ["2020-02-15", "2020-02-16", "2020-02-17", "2020-02-18", "2020-02-19", "2020-02-20", "2020-02-21", "2020-02-22", "2020-02-23", "2020-02-24", "2020-02-25", "2020-02-26", "2020-02-27", "2020-02-28", "2020-02-29", "2020-03-01", "2020-03-02", "2020-03-03", "2020-03-04", "2020-03-05", "2020-03-06", "2020-03-07", "2020-03-08", "2020-03-09", "2020-03-10", "2020-03-11", "2020-03-12", "2020-03-13", "2020-03-14", "2020-03-15", "2020-03-16", "2020-03-17", "2020-03-18", "2020-03-19", "2020-03-20", "2020-03-21", "2020-03-22", "2020-03-23", "2020-03-24", "2020-03-25", "2020-03-26", "2020-03-27", "2020-03-28", "2020-03-29", "2020-03-30", "2020-03-31", "2020-04-01", "2020-04-02", "2020-04-03", "2020-04-04", "2020-04-05", "2020-04-06", "2020-04-07", "2020-04-08", "2020-04-09", "2020-04-10", "2020-04-11", "2020-04-12", "2020-04-13", "2020-04-14", "2020-04-15", "2020-04-16", "2020-04-17", "2020-04-18", "2020-04-19", "2020-04-20", "2020-04-21", "2020-04-22", "2020-04-23", "2020-04-24", "2020-04-25", "2020-04-26", "2020-04-27", "2020-04-28", "2020-04-29", "2020-04-30", "2020-05-01", "2020-05-02", "2020-05-03", "2020-05-04", "2020-05-05", "2020-05-06", "2020-05-07", "2020-05-08", "2020-05-09", "2020-05-10", "2020-05-11", "2020-05-12", "2020-05-13", "2020-05-14", "2020-05-15", "2020-05-16", "2020-05-17", "2020-05-18", "2020-05-19", "2020-05-20", "2020-05-21", "2020-05-22", "2020-05-23", "2020-05-24"];

let visitsO = ["-4", "6", "9", "7", "9", "7", "-1", "-6", "1", "-7", "1", "3", "4", "4", "6", "-1", "4", "11", "6", "4", "1", "4", "30", "2", "-1", "-1", "-5", "-9", "-16", "-14", "-14", "-27", "-33", "-36", "-46", "-64", "-66", "-61", "-78", "-80", "-83", "-84", "-87", "-86", "-81", "-82", "-82", "-83", "-84", "-87", "-86", "-81", "-82", "-82", "-82", "-84", "-86", "-88", "-84", "-81", "-81", "-83", "-84", "-86", "-85", "-80", "-81", "-82", "-81", "-82", "-85", "-83", "-79", "-80", "-82", "-81", "-81", "-83", "-83", "-78", "-78", "-78", "-78", "-80", "-83", "-83", "-77", "-79", "-78", "-78", "-80", "-83", "-82", "-76", "-77", "-76", "-77", "-79", "-83", "-80"];

//charter(datesO, visitsO);