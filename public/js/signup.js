window.onload = initSignupPage

function initSignupPage() {
    let signupFormElem = document.querySelector('#signup-form')
    let loginFormElem = document.querySelector('#login-form')
    let signupResultElem = document.querySelector('#signup-result')
    // let loginFormResultElem = document.querySelector('#login-result')
    // let logoutElem = document.querySelector('#logout')

    // let signupFormActionBtnElem = document.querySelector('#action-btn')

    // signupFormElem.addEventListener('submit', (e) => {
    //     e.preventDefault()
    //     register()
    //     login()
    // })

    async function register() {
        // console.log('1234');
        let signupResultElem = document.querySelector('#signup-result')
        let signupFormObj = {
            username: signupFormElem.username.value,
            password: signupFormElem.password.value,
            mobileNo: signupFormElem.mobileNO.value,
            email: signupFormElem.email.value,
            address: signupFormElem.address.value,
            age: signupFormElem.age.value,
            gender: signupFormElem.Gender.value
        }
        console.log(signupFormObj)

        // Fetch
        let res = await fetch('/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupFormObj)
        })

        // After fetch handling
        let result = await res.json()
        console.log('result =', result);
        signupResultElem.innerHTML = result.message
        if (res.ok) {
            setTimeout(() => {
                window.location = '/index.html'
                console.log('success')
            }, 1500)
        } else {
            console.log('not success')
        }
    }


    async function login() {
        let loginFormElemObj = {
            username: loginFormElem.username.value,
            password: loginFormElem.password.value,


        }
        let res = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginFormElemObj)
        })

        console.log(loginFormElemObj)
        console.log("123");
        let result = await res.json()
        console.log('result =', result);
        // loginFormElemObj.innerHTML = result.message
        if (res.ok) {
            setTimeout(() => {
                window.location = '/index.html'
            }, 1500)
            console.log('login success');
        } else {
            console.log("login not success");
        }
    }

    if (loginFormElem) {

        loginFormElem.addEventListener('submit', async (e) => {


            console.log('login form is submiting now');
            e.preventDefault();
            login()
            // console.log(signupFormActionBtnElem.value);
            // if (signupFormActionBtnElem.value == 'Register') {

            //     console.log(signupFormActionBtnElem);
            //     register()
            // }
            // if (signupFormActionBtnElem.value == 'Register') {

            //     console.log(signupFormActionBtnElem);
            //     register()
            // }






        })
        // signinHereBtnElem.addEventListener('click', () => {
        //     if (signinHereBtnElem.innerText.trim() === 'Signin Here') {
        //         signinHereBtnElem.innerText = 'Signup Now'
        //         signupFormActionBtnElem.value = 'Login'
        //         emailContainer.classList.add("hidden")
        //     } else {
        //         signinHereBtnElem.innerText = 'Signin Here'
        //         signupFormActionBtnElem.value = 'Register'
        //         emailContainer.classList.remove("hidden")

        //     }


        // })
        console.log('login page is loaded');
    }
    if (signupFormElem) {

        signupFormElem.addEventListener('submit', async (e) => {


            console.log('singal form is submiting now');
            e.preventDefault();
            register()
            // console.log(signupFormActionBtnElem.value);
            // if (signupFormActionBtnElem.value == 'Register') {

            //     console.log(signupFormActionBtnElem);
            //     register()
            // }
            // if (signupFormActionBtnElem.value == 'Register') {

            //     console.log(signupFormActionBtnElem);
            //     register()
            // }






        })
        // signinHereBtnElem.addEventListener('click', () => {
        //     if (signinHereBtnElem.innerText.trim() === 'Signin Here') {
        //         signinHereBtnElem.innerText = 'Signup Now'
        //         signupFormActionBtnElem.value = 'Login'
        //         emailContainer.classList.add("hidden")
        //     } else {
        //         signinHereBtnElem.innerText = 'Signin Here'
        //         signupFormActionBtnElem.value = 'Register'
        //         emailContainer.classList.remove("hidden")

        //     }


        // })
    }
    console.log('signup page is loaded');
}