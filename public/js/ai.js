let exerciseElem = document.querySelector('.aivideos')

async function fetchExercise() {
    let res = await fetch('/exercises')
    let exercises = await res.json()
    console.log("exercises", exercises)

    document.querySelector('.aivideos').innerHTML = ''
    for (let exercise of exercises) {
        let exerciseHTML = `
    <div class="col-md-4">
        <div class="icon-box" data-aos="fade-up" data-aos-delay="100">
            <a href="04a-program-ai-details.html?id=${exercise.id}" class="item-wrap fancybox">
                <video autoplay loop muted>
                    <source src="../videos/${exercise.video}" type="video/mp4">
                </video>
            </a>
        </div>
    </div>
`
        exerciseElem.innerHTML += exerciseHTML
    }

}

fetchExercise()