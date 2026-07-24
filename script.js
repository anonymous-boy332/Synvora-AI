// ==========================
// AI CHAT
// ==========================

const chatInput = document.querySelector(".chat-input input");
const sendButton = document.querySelector(".chat-input button");
const chatWindow = document.querySelector(".chat-window");


if (sendButton) {

    sendButton.addEventListener("click", function () {

        let userText = chatInput.value.trim();

        if (userText === "") {
            return;
        }


        let userMessage = document.createElement("div");

        userMessage.className = "user-message";

        userMessage.innerText = userText;


        chatWindow.appendChild(userMessage);


        chatInput.value = "";


        setTimeout(function () {

            let aiMessage = document.createElement("div");

            aiMessage.className = "ai-message";

            aiMessage.innerText =
            "I received your request. Synvora AI is processing your idea...";


            chatWindow.appendChild(aiMessage);


        }, 800);


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


                imageArea.innerHTML = `

                <h3>❌ Failed to generate image</h3>

                `;


                return;


            }



            imageArea.innerHTML = `


            <div class="preview-content">


                <img

                src="${data.image}"

                alt="Synvora AI Generated Image"

                class="generated-image"


                onload="this.style.opacity='1'"

                style="
                max-width:100%;
                border-radius:20px;
                opacity:0;
                transition:0.5s;
                "

                >


                <br><br>


                <button

                class="download-btn"

                onclick="downloadImage('${data.image}')"

                >

                Download Image

                </button>



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



// ==========================
// DOWNLOAD IMAGE
// ==========================


async function downloadImage(url) {


    try {


        const response = await fetch(url);


        const blob = await response.blob();


        const link = document.createElement("a");


        link.href = URL.createObjectURL(blob);


        link.download = "Synvora-AI-Image.png";


        document.body.appendChild(link);


        link.click();


        document.body.removeChild(link);



    } catch(error) {


        alert("Download failed. Please try again.");


    }


}
