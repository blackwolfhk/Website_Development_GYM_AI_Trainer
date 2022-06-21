let search = new URLSearchParams(window.location.search);
let id = search.get("id");
let classDetailsElem = document.querySelector(".container")

console.log('Before id', id);

async function fetchClassById(id) {
    console.log('id', id);
    let res = await fetch(`/class/${id}`)
    let clsData = await res.json();
    let cls = clsData[0]

    classDetailsElem.innerHTML = ''
    classDetailsElem.innerHTML = `
<div class="section-title" data-aos="fade-up">
<h1>${cls.name}</h1>
</div>
<div class="row">
<div class="col-lg-6" data-aos="fade-right">
<div class="image">
<img src="../photos/${cls.image}" class="img-fluid" alt="">
</div>
</div>
<div class="col-lg-6" data-aos="fade-left">
<div class="content pt-4 pt-lg-0 pl-0 pl-lg-3 ">
<h3>Description : <span class="classDetailsAns"> ${cls.description} </span></h3>
<br>
<h3>Responsible trainer : <span class="classDetailsAns"> ${cls.username} </span></h3>
<br>
<h3>Price per class : <span class="classDetailsAns"> HK$ ${cls.price} </span></h3>
</div>
</div>
</div>
`
}

fetchClassById(id)