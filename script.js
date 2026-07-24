// ==========================
// AI CHAT
// ==========================

const chatInput = document.querySelector(".chat-input input");
const sendButton = document.querySelector(".chat-input button");
const chatWindow = document.querySelector(".chat-window");


if (sendButton) {

    sendButton.addEventListener("click", function () {

        let userText = chatInput.value.trim();

        if (userText === "") return;


        let userMessage = document.createElement("div");

        userMessage.className = "user-message";

        userMessage.innerText = userText;


        chatWindow.appendChild(userMessage);

        chatInput.value = "";


        setTimeout(() => {

            let aiMessage = document.createElement("div");

            aiMessage.className = "ai-message";

            aiMessage.innerText =
            "I received your request. Synvora AI is processing your idea...";


            chatWindow.appendChild(aiMessage);


        },800);


    });

}



// ==========================
// AI IMAGE GENERATOR
// ==========================


const generateBtn = document.querySelector(".generate-btn");
const promptBox = document.querySelector("#imagePrompt");
const imageArea = document.querySelector(".image-placeholder");


if (generateBtn) {


generateBtn.addEventListener("click", async()=>{


const prompt = promptBox.value.trim();


if(!prompt){

alert("Please enter your image prompt");

return;

}


imageArea.innerHTML = `

<h3>🎨 Generating AI Image...</h3>
<p>Please wait...</p>

`;



try{


const response = await fetch("/api/generate-image",{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

prompt:prompt

})

});



const data = await response.json();



if(data.error){

imageArea.innerHTML=`

<h3>⚠️ AI Server Busy</h3>

<p>${data.message}</p>

`;

return;

}




if(!data.success){

imageArea.innerHTML=`

<h3>❌ Image generation failed</h3>

`;

return;

}




imageArea.innerHTML=`

<div class="preview-content">


<img

src="${data.image}"

alt="Synvora AI Image"

class="generated-image"

style="
width:100%;
border-radius:20px;
"

onerror="imageError(this)"

>


<br><br>


<button class="download-btn"
onclick="openImage('${data.image}')">

Download Image

</button>


</div>

`;



}

catch(error){


imageArea.innerHTML=`

<h3>❌ Error</h3>

<p>${error.message}</p>

`;


}



});


}



// ==========================
// IMAGE ERROR
// ==========================


function imageError(img){

img.style.display="none";


imageArea.innerHTML += `

<h3>⚠️ Image failed to load</h3>

<p>AI server did not return image.</p>

`;

}



// ==========================
// DOWNLOAD / OPEN IMAGE
// ==========================


function openImage(url){


window.open(url,"_blank");


}
