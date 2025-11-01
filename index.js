async function exerciseAPIcall() {   
    var muscleElem = document.getElementById("muscleHit");
    const muscleGroup = muscleElem.value;
    const response = await fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${encodeURIComponent(muscleGroup)}`, {
        method: 'GET',
        headers: { 'X-Api-Key': 'xxxxxxxxxxxxxxxxxxxxx' }
    });
    const convertToJSON = await response.json();
    getOptionsForNewExercise(convertToJSON);
}

function getOptionsForNewExercise(exerciseChoices) {
    // Find the correct select elemen
    const exerciseChoice = exerciseChoices;
    const select = document.getElementById("exercise");
    // Clear previous optionsz\
    select.innerHTML = "";
    // Add new options from API data
    exerciseChoice.forEach(entry => {
        const option = document.createElement("option");
        console.log(entry.name);
        option.value = entry.name;
        option.text = entry.name;
        select.appendChild(option);
        document.getElementById("workoutSubmit").addEventListener("click", logWorkout);
    });
}

function logWorkout() {
    const exercise = document.getElementById("exercise").value;
    const sets = document.getElementById("sets").value;
    const reps = document.getElementById("reps").value;
    const weight = document.getElementById("weight").value;
    workoutArray = [];
    workoutArray.push({exercise: exercise, sets: sets, reps: reps, weight: weight});
    displayWorkoutHistory(workoutArray);
    updateStorage(workoutArray);
    console.log(workoutArray[0].exercise);
}

function displayWorkoutHistory(workoutArray) {
    const historyDiv = document.getElementById("historyTable");
    const workout = document.createElement("tr");
    const exerciseCell = document.createElement("td");
    const setsCell = document.createElement("td");
    const repsCell = document.createElement("td");
    const weightCell = document.createElement("td");
    historyDiv.appendChild(workout);
    workout.appendChild(exerciseCell);
    workout.appendChild(setsCell);
    workout.appendChild(repsCell);
    workout.appendChild(weightCell);
    exerciseCell.innerText = workoutArray[0].exercise;
    setsCell.innerText = workoutArray[0].sets;
    repsCell.innerText = workoutArray[0].reps;
    weightCell.innerText = workoutArray[0].weight;

}
function checkStorage() {
    if (localStorage.getItem("workoutHistory")) {
        displayWorkoutHistory(localStorage.getItem("workoutHistory"));
        exerciseAPIcall();
    }
    else {
        exerciseAPIcall();
    }
}

function updateStorage(workoutArray) {
    localStorage.setItem("workoutHistory", JSON.stringify(workoutArray));
}

window.onload = function() {
    console.log("Page loaded");
    const muscleSelect = document.getElementById("muscleHit");
    muscleSelect.addEventListener("change", checkStorage);
};
