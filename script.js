// ==========================
// AI CHAT
// ==========================

const chatInput = document.querySelector(".chat-input input");
const sendButton = document.querySelector(".chat-input button");
const chatWindow = document.querySelector(".chat-window");

function addMessage(text, type) {
    const msg = document.createElement("div");
    msg.className = type === "user" ? "user-message" : "ai-message";
    msg.innerText = text;
    chatWindow.appendChild(msg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

async function sendMessage() {

    const message = chatInput.value.trim();

    if (!message) return;

    addMessage(message, "user");

    chatInput.value = "";

    addMessage("🤖 Synvora AI is thinking...", "ai");

    try {

        const response = await fetch("/api/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message
            })

        });

        const data = await response.json();

        chatWindow.removeChild(chatWindow.lastChild);

        addMessage(data.reply, "ai");

    } catch (err) {

        chatWindow.removeChild(chatWindow.lastChild);

        addMessage("❌ Unable to connect with AI.", "ai");

    }

}

if (sendButton) {

    sendButton.addEventListener("click", sendMessage);

    chatInput.addEventListener("keypress", function (e) {

        if (e.key === "Enter") {

            sendMessage();

        }

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
