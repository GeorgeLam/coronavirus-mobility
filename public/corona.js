let type = 0;
let chosenArea = "Greater London"
dataFetch(type, chosenArea);

cleanTypeName = ["Retail and Recreation", "Groceries and Pharmacies", "Parks", "Transit Stations", "Workplaces", "Residential"]; //differs from below 'typeNames' as this is a clean version of the type naming. Below variable typeNames uses the specific naming that is held in the DB.

async function dataFetch(){
    console.log(`Data fetch called! You input type: ${type} and ${chosenArea}`)
    dates = [];
    visits = [];

    let data = { type, chosenArea };
    let fetchOpt = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const fetching = await fetch("posts/api/", fetchOpt);
    const resp = await fetching.json();
    //console.log(resp);

    resp.forEach((item) => {
      dates.push(item.date);
    });
    //console.log(dates);

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
    //console.log(visits);

    charter(dates, visits);
}

document.querySelector("#type").addEventListener("change", async(e) => {
    type = e.target.value;
    dataFetch(type);
})

document.querySelector("#chosenArea").addEventListener("change", async (e) => {
    chosenArea = e.target.value;
    dataFetch(chosenArea);
    })


async function charter(dates, visits){
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: `${chosenArea} - % Decrease in Visits to ${cleanTypeName[type]}`,
                data: visits,
                backgroundColor: [
                    'rgba(44, 226, 66, 0.5)'],
                borderColor: [
                    'rgba(255, 99, 132, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            events: ['click']
        }
    })
}