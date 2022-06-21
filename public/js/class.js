let classElem = document.querySelector('#portfolio-grid')

async function fetchClass() {
    let res = await fetch('/classes')
    let classes = await res.json()

    document.querySelector('#portfolio-grid').innerHTML = ''
    for (let cls of classes) {
        let classHTML = `
<div class="item col-sm-6 col-md-4 col-lg-4 mb-4">
<a href="03a-program-class-details.html?id=${cls.id}" class="item-wrap fancybox">
<div class="work-info">
<h3>${cls.name}</h3>
</div>
<img class="img-fluid" src="../photos/${cls.image}">
</a>
</div>
`
        classElem.innerHTML += classHTML
    }

}

fetchClass()