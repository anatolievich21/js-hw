//TrafficLight

const delay = ms => new Promise(ok => setTimeout(ok, ms));
// const div = document.getElementById('traffic-light');
//
// async function trafficLight(container = div, redTime = 2000, yellowTime = 1000, greenTime = 3000) {
//
//     const redLight = document.createElement("container");
//     const yellowLight = document.createElement("container");
//     const greenLight = document.createElement("container");
//
//     redLight.className = "light";
//     yellowLight.className = "light";
//     greenLight.className = "light";
//
//     container.appendChild(redLight);
//     container.appendChild(yellowLight);
//     container.appendChild(greenLight);
//
//     while (true) {
//         redLight.style.backgroundColor = "red";
//         yellowLight.style.backgroundColor = "transparent";
//         greenLight.style.backgroundColor = "transparent";
//         await delay(redTime);
//
//         redLight.style.backgroundColor = "transparent";
//         yellowLight.style.backgroundColor = "yellow";
//         await delay(yellowTime);
//
//         yellowLight.style.backgroundColor = "transparent";
//         greenLight.style.backgroundColor = "green";
//         await delay(greenTime);
//     }
// }
//
// trafficLight();



// //PedestrianTrafficLight

// async function pedestrianLight() {
//     const div = document.getElementById('pedestrian-light');
//
//     const redLight = document.createElement("div");
//     const greenLight = document.createElement("div");
//     const button = document.createElement('button');
//
//     redLight.className = "light";
//     greenLight.className = "light";
//
//     button.style.cssText = `
//         width: 20px;
//         height: 20px;
//         margin: 0px auto 10px;
//         border-radius: 50%
//     `;
//
//     div.appendChild(redLight);
//     div.appendChild(greenLight);
//     div.appendChild(button);
//
//     while (true) {
//         redLight.style.backgroundColor = "red";
//         greenLight.style.backgroundColor = "transparent";
//         await delay(3000);
//
//         redLight.style.backgroundColor = "transparent";
//         greenLight.style.backgroundColor = "green";
//         await delay(3000);
//     }
// }
//
// pedestrianLight();



//speedtest

// async function speedtest(getPromise, count, parallel = 1) {
//   const start = Date.now();
//   const promises = [];
//
//   for (let i = 0; i < count; i++) {
//     for (let j = 0; j < parallel; j++) {
//       promises.push(getPromise());
//     }
//
//     await Promise.all(promises);
//   }
//
//   const end = Date.now();
//   const duration = end - start;
//   const queryDuration = duration / count;
//   const querySpeed = count / duration;
//   const parallelDuration = duration / (count * parallel);
//   const parallelSpeed = (count * parallel) / duration;
//
//   return {
//     duration,
//     querySpeed,
//     queryDuration,
//     parallelSpeed,
//     parallelDuration,
//   };
// }
//
// speedtest(() => delay(1000), 10, 10 ).then(result => console.log(result))
// // {duration: 10000,
// // querySpeed: 0.001, //1 тисячна запита за мілісекунду
// // queryDuration: 1000, //1000 мілісекунд на один реальний запит у середньому
// // parallelSpeed: 0.01  // 100 запитів за 10000 мілісекунд
// // parallelDuration: 100 // 100 запитів за 10000 мілісекунд
// speedtest(() => fetch('http://swapi.dev/api/people/1').then(res => res.json()), 10, 5).then(result => console.log(result))



//gql

async function gql (endpoint, query, variables){
    const request = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({
            query: query,
            variables: variables,
        }),
    });

    return await request.json();
}



//jwtDecode

async function jwtDecode (token) {
    try {
        const arr = token.split('.')
        const encodedData = arr[1];
        const decodedData = atob(encodedData);
        const data = JSON.parse(decodedData);
        console.log(data)
        return data;
    } catch (error){
        return undefined;
    }
}


