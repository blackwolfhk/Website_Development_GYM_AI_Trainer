// const videoElement = document.getElementsByClassName('input_video')[0];

let search = new URLSearchParams(window.location.search);
let id = search.get("id");
let exerciseDetailsElem = document.querySelector('.aiDemo')
// let aiCamara = null;

async function fetchExerciseById(id) {
    // console.log('id', id);
    let res = await fetch(`/exercise/${id}`)
    let exerciseData = await res.json()
    let exercise = exerciseData[0]

    exerciseDetailsElem.innerHTML = ''
    exerciseDetailsElem.innerHTML = `
    <h3>${exercise.name}</h3>
    <div id="demo"> Workout Demo </div>
    <video controls class="aiVideo">
        <source src="../videos/${exercise.video}" type="video/mp4">
    </video>
    <br>
    <div class="description word sub-title"> Description : </div>
    <br>
    <p class="word">
        ${exercise.description}
    </p>
        <div class="type-of-exercise word "> 
            <span class="sub-title"> Type : </span> 
            ${exercise.typename} 
        </div>
    <br>
        <div class="level word ">
            <span class="sub-title">Level : </span> 
            ${exercise.levelname} 
        </div>
    <br>
    
`
}
fetchExerciseById(id)