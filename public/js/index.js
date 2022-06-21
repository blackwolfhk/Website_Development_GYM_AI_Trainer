let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.header .navbar');
let logoutElem = document.querySelector('#logout')

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
};

window.onscroll = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
};


var swiper = new Swiper(".home-slider", {
    spaceBetween: 20,
    effect: "fade",
    grabCursor: true,
    loop: true,
    centeredSlides: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

var swiper = new Swiper(".review-slider", {
    spaceBetween: 20,
    grabCursor: true,
    loop: true,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        600: {
            slidesPerView: 2,
        },
    },
});

var swiper = new Swiper(".blogs-slider", {
    spaceBetween: 20,
    grabCursor: true,
    loop: true,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        991: {
            slidesPerView: 3,
        },
    },
});


//BMI Calculator start//

let btn = document.getElementById("BMIcalculator");

btn.addEventListener("click", function () {
    let height = document.querySelector("#height").value;
    let weight = document.querySelector("#weight").value;

    if (height == "" || weight == "") {
        alert("Please fill out the input fields!");
        return;
    }

    // BMI = weight in KG / (height in m * height in m)

    height = height / 100;

    let BMI = weight / (height * height);

    BMI = BMI.toFixed(2);

    document.querySelector(".BMI").innerHTML = BMI;

    let status = "";

    if (BMI < 18.5) {
        status = "Underweight";
    }
    if (BMI >= 18.5 && BMI < 25) {
        status = "Healthy";
    }
    if (BMI >= 25 && BMI < 30) {
        status = "Overweight";
    }
    if (BMI >= 30) {
        status = "Obese";
    }
    document.querySelector(
        ".BMIcomment"
    ).innerHTML = `Comment: you are <span id="BMIcomment">${status}</span>`;
});

//BMI Calculator End//


//BMR Calculator start//

const calories = document.getElementById('BMR');
const calculateBtn = document.getElementById('BMRcalculator');
const errorMessage = document.querySelector(
    ".BMRbox .BMRresult .BMRErrorMsg"
);


const calculateBMR = (weight, height, age, gender) => {

    let result = 0
    if (gender == "male") {
        result = 66.5 + (13.75 * weight) + (5.003 * height) - (6.755 * age);
    } else {
        result = 655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age);
    }

    console.log(result)
    return Math.floor(result)
};

calculateBtn.addEventListener("click", () => {

    let genderValue = document.querySelector(
        "input[name='gender']:checked"
    ).value;

    const age = document.getElementById('age').value;
    const weight = document.getElementById('BMRweight').value;
    const height = document.getElementById('BMRheight').value;

    let BMR = calculateBMR(weight, height, age, genderValue);

    document.querySelector(".BMR").innerHTML = BMR;
});

async function getMe() {
    let res = await fetch('/me')
    let data = await res.json()
    console.log("data[0] =",data[0]);
    
    
    // console.log('username =',username);
    console.log('meData =',data);
    let user = document.querySelector('#login-button')
    if (!data) {
        user.innerHTML = "Register/Sign in"
        logoutElem.classList.add("hidden")
        console.log('not success');
    } else {
        console.log('success login');
        user.innerHTML = ` ${data[0].username}`
        
        logoutElem.classList.remove("hidden")
    }
}
getMe()

    async function logout(){
        const res = 
        await fetch('/logout')
        console.log('hi');
        if(res.ok){
            
           window.location.reload()
        }
    
}
logoutElem.addEventListener('onclick'), () => {
    logout()
}
//BMR Calculator end//

