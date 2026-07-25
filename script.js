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

// ==========================
// AI WRITER
// ==========================

const writerBtn = document.getElementById("generateWriter");
const writerPrompt = document.getElementById("writerPrompt");
const writerType = document.getElementById("writerType");
const writerResult = document.getElementById("writerResult");

if (writerBtn) {

    writerBtn.addEventListener("click", async () => {

        const prompt = writerPrompt.value.trim();

        if (!prompt) {

            alert("Please enter your content request.");

            return;

        }

        writerResult.innerHTML = "✍️ Synvora AI is writing...";

        try {

            const response = await fetch("/api/writer", {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    type: writerType.value,

                    prompt: prompt

                })

            });

            const data = await response.json();

            if (!response.ok) {

                writerResult.innerHTML = "❌ " + (data.error || "Something went wrong.");

                return;

            }

            writerResult.innerHTML = `
                <pre style="white-space:pre-wrap;font-family:inherit;">
${data.content}
                </pre>
            `;

        }

        catch (err) {

            writerResult.innerHTML = "❌ " + err.message;

        }

    });

}

// ==========================
// AI CODE GENERATOR
// ==========================

const codeBtn = document.getElementById("generateCode");
const codePrompt = document.getElementById("codePrompt");
const codeLanguage = document.getElementById("codeLanguage");
const codeResult = document.getElementById("codeResult");
const copyCodeBtn = document.getElementById("copyCode");

if (codeBtn) {

    codeBtn.addEventListener("click", async () => {

        const prompt = codePrompt.value.trim();

        if (!prompt) {

            alert("Please enter your coding request.");

            return;

        }

        codeResult.textContent = "💻 Synvora AI is generating code...";

        try {

            const response = await fetch("/api/code", {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    language: codeLanguage.value,

                    prompt: prompt

                })

            });

            const data = await response.json();

            if (!response.ok) {

                codeResult.textContent = "❌ " + (data.error || "Something went wrong.");

                return;

            }

            codeResult.textContent = data.code;

        }

        catch (err) {

            codeResult.textContent = "❌ " + err.message;

        }

    });

}

if (copyCodeBtn) {

    copyCodeBtn.addEventListener("click", () => {

        navigator.clipboard.writeText(codeResult.textContent);

        alert("✅ Code copied successfully!");

    });

}