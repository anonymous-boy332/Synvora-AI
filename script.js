// ==========================
// AI CHAT
// ==========================

const chatInput = document.querySelector(".chat-input input");
const sendButton = document.querySelector(".chat-input button");
const chatWindow = document.querySelector(".chat-window");


if(sendButton){

sendButton.addEventListener("click", function(){

    let userText = chatInput.value;


    if(userText === ""){
        return;
    }


    let userMessage = document.createElement("div");

    userMessage.className = "user-message";

    userMessage.innerText = userText;


    chatWindow.appendChild(userMessage);


    chatInput.value = "";


    setTimeout(function(){


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

    generateBtn.addEventListener("click", async () => {

        const prompt = promptBox.value.trim();

        if (!prompt) {
            alert("Please enter your image prompt");
            return;
        }

        imageArea.innerHTML = `
            <h3>🎨 Generating AI Image...</h3>
            <p>Please wait...</p>
        `;

        try {

            const response = await fetch("/api/generate-image", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    prompt: prompt
                })

            });

            const data = await response.json();

            if (!data.success) {
                imageArea.innerHTML = `<h3>❌ Failed to generate image</h3>`;
                return;
            }

            imageArea.innerHTML = `
                <div class="preview-content">

                    <img
                        src="${data.image}"
                        alt="AI Image"
                        style="max-width:100%;border-radius:20px;">

                    <br><br>

                    <a href="${data.image}" target="_blank">

                        <button class="download-btn">
                            Download Image
                        </button>

                    </a>

                </div>
            `;

        } catch (error) {

            imageArea.innerHTML = `
                <h3>❌ Error</h3>
                <p>${error.message}</p>
            `;

        }

    });

}

