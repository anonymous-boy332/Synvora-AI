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


alert("Account Created Successfully!");


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


alert("Login Successful!");


window.location.href = "dashboard.html";


}



});


}