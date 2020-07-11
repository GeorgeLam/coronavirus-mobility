let type = 7;
let chosenArea = "Greater London"
corona(type);

typeName = ["Retail and Recreation", "Groceries and Pharmacies", "Parks", "Transit Stations", "Workplaces", "Residential"];

document.querySelector("#type").addEventListener("change", (e) => {
    type = e.target.value;
    corona(type);
    charter();
})

document.querySelector("#chosenArea").addEventListener("change", (e) => {
    chosenArea = e.target.value;
    corona(chosenArea);
    console.log(chosenArea);
    charter();
})

console.log(type)

async function corona(){
    let response = await fetch("loc-fulltime.csv");
    let data = await response.text();
    let output = data.split('\n').slice(1)
    //console.log(output);

    newO = output.filter(item => (item.split(',')[2] == chosenArea));
    //console.log(newO[1].split(',')[6])

    visits = []; dates = [];
    newO.forEach(item =>{
        visits.push(item.split(',')[type])
        
        dates.push(item.split(',')[6])
        //console.log(item.split(',')[2], item.split(',')[6], item.split(',')[7]);
    })

    //console.log(visits)
    //console.log(dates);
    return(visits);
};

charter();

async function charter(){
    await corona();
    var ctx = document.getElementById('myChart').getContext('2d');
    console.log(typeName);
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: `${chosenArea} - % Decrease in Visits to ${typeName[type-7]}`,
                data: visits,
                backgroundColor: [
                    'rgba(44, 226, 66, 0.5)'],
                borderColor: [
                    'rgba(255, 99, 132, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        max: 5,
                        min: 0,
                        stepSize: 0.5
                    //    suggestedMin: -100,
                    //    suggestedMax: 50
                    }
                }]
            }
        }
    })
}

