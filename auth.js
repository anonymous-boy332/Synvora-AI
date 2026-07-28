import { supabase } from "./supabase.js";


// ======================
// REGISTER SYSTEM
// ======================

const registerForm = document.getElementById("registerForm");


if(registerForm){


registerForm.addEventListener("submit", async (e)=>{


e.preventDefault();



const name = document.getElementById("fullName").value;

const email = document.getElementById("email").value;

const password = document.getElementById("password").value;



const { data, error } = await supabase.auth.signUp({

    email: email,

    password: password,


    options: {

        data: {

            full_name:name

        }

    }

});



if(error){


alert(error.message);


}

else{


const registerMessage = document.getElementById("registerMessage");

if(registerMessage){
    registerMessage.style.display = "block";
    registerMessage.textContent = "✓ Account Created Successfully";
}


window.location.href = "dashboard.html";


}



});


}




// ======================
// LOGIN SYSTEM
// ======================


const loginForm = document.getElementById("loginForm");


if(loginForm){


loginForm.addEventListener("submit", async (e)=>{


e.preventDefault();



const email = document.getElementById("email").value;


const password = document.getElementById("password").value;




const { data, error } = await supabase.auth.signInWithPassword({


    email: email,

    password: password


});



if(error){


alert(error.message);


}

else{


const loginMessage = document.getElementById("loginMessage");

if(loginMessage){
    loginMessage.style.display = "block";
    loginMessage.textContent = "✓ Login Successful";
}


window.location.href = "dashboard.html";


}



});


}

// ======================
// CHECK LOGIN
// ======================

const { data } = await supabase.auth.getSession();

const currentPage = window.location.pathname;

if (
  (currentPage.includes("dashboard.html") ||
   currentPage.includes("ai-image.html")) &&
  !data.session
) {
  window.location.href = "login.html";
}

// ======================
// LOGOUT
// ======================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", async () => {

        await supabase.auth.signOut();

        window.location.href = "login.html";

    });

}

// ======================
// SHOW USER NAME
// ======================

const welcomeUser = document.getElementById("welcomeUser");

if (welcomeUser) {

    const { data: sessionData } = await supabase.auth.getSession();

    if (sessionData.session) {

        const user = sessionData.session.user;

        const name =
            user.user_metadata?.full_name ||
            user.email ||
            "User";

        welcomeUser.innerText = `Welcome, ${name} 👋`;

    }

}