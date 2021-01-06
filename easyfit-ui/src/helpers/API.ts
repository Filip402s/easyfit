export const fetchLastWorkout = (async () => {
    const endpoint = `https://mazaq.dev/lastWourkout`;
    // const data = await (await (fetch(endpoint))).json();

//     Axios.get(fetchLastWorkout().then((res : AxiosResponse) => {
//         const fetchedWorkout = res.data;
//         setLastWorkout(fetchedWorkout));
// })

    const data = {
        data: {
            exercises: [
                {name: "Bench press"},
                {name: "Squat"}
            ]
        }
    };
    return data;

});