export function compare(data) {
    let res = {};
    const current = generator(Object.values(data))
    const next = generator(Object.values(data))
    //Shift the array by one element
    next.next()
    const counter_increment = 6;
    let counter = 0;
    let end = counter_increment;
    let heightsOfCurrent = {}
    let heightsOfNext = {}
    for (const hour in data) {
        heightsOfCurrent = current.next()
        heightsOfNext = next.next()
        for (const height in data[hour]) {
            let c = (heightsOfNext.value[height].avg - heightsOfCurrent.value[height].avg) / counter_increment;
            let step = 0;
            for (let i = counter; i < end; i++) {
                let avg = (parseFloat(heightsOfCurrent.value[height].avg) + (c * step)).toFixed(4)
                res[i] = {
                    ...res[i],
                    [height]: parseFloat(avg)
                };
                step++;
            }
        }
        counter += counter_increment
        end += counter_increment
    }
    return res;
}

export function filterWindsByTime(rawWinds) {
    let byHeight = filterWindsByHeight(rawWinds);

    let byTime = {};
    for (const height in byHeight) {
        for (const time in byHeight[height]) {
            if (!byTime[time]) byTime[time] = {};
            byTime[time][height] = {
                avg: (
                    byHeight[height][time].reduce((a, b) => {
                        return (
                            (a.wind_speed || a) + b.wind_speed
                        );
                    }) / byHeight[height][time].length
                ).toFixed(4),
            };
        }
    }
    return byTime
}

function filterWindsByHeight(rawWinds) {
    let byHeight = [];
    for (let i = 0; i < rawWinds.data.length; i++) {
        const altitude = rawWinds.data[i].altitude;
        const time = rawWinds.data[i].time;
        if (!byHeight[altitude]) {
            byHeight[altitude] = [];
        }
        if (!byHeight[altitude][time]) {
            byHeight[altitude][time] = [];
        }
        byHeight[altitude][time].push(rawWinds.data[i]);
    }
    return byHeight;
}

// Needed for circular traversal of the array
function* generator(array) {
    let i = 0
    let length = array.length
    while (true) {
        yield array[i]
        i++
        if (i === length) i = 0
    }
}
//Divides wind hourly intervals
//Takes the wind filtered by time by the filterWindsByTime function
export function splitWindsHourly(data) {
    let res = {};
    const current = generator(Object.values(data))
    const next = generator(Object.values(data))
    //Shift the array by one element
    next.next()
    const counter_increment = 6;
    let counter = 0;
    let end = counter_increment;
    let heightsOfCurrent = {}
    let heightsOfNext = {}
    for (const hour in data) {
        heightsOfCurrent = current.next()
        heightsOfNext = next.next()
        for (const height in data[hour]) {
            let c = (heightsOfNext.value[height].avg - heightsOfCurrent.value[height].avg) / counter_increment;
            for (let i = counter; i < end; i++) {
                res[i] = {
                    ...res[i],
                    [height]: {
                        c
                    }
                };
            }
        }
        counter += counter_increment
        end += counter_increment
    }
    return res;
}


export function dataToArray(data, height, hours) {
    let x = [],
        y = [],
        y2 = [];
    if (JSON.stringify(hours) == JSON.stringify(["24", "24"])) hours = [0, 0];

    if (hours[0] != hours[1]) hours[1] = parseInt(hours[1]) - 1;

    let b = data.filter((item) => {
        let time = parseInt(item.time.split(":")[0]);
        return (
            item.altitude == height &&
            time >= parseInt(hours[0]) &&
            time <= parseInt(hours[1])
        );
    });

    for (let i = 0; i <= 31; i++) {
        x.push(i);
        let d = b.filter((item) => {
            let time = parseInt(item.time.split(":")[0]);
            return (
                parseFloat(item.wind_speed) > i &&
                item.altitude == height &&
                time >= parseInt(hours[0]) &&
                time <= parseInt(hours[1])
            );
        });
        y.push(d.length);
    }
    for (let i = 0; i < y.length - 1; i++) {
        y2.push(Math.abs(y[i] - y[i + 1]));
    }

    return y2;
}