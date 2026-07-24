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


if(generateBtn){

    generateBtn.addEventListener("click", function(){

        let prompt = promptBox.value.trim();


        if(prompt === ""){

            alert("Please enter your image prompt");
            return;

        }


        imageArea.innerHTML = `

            <h3>
                Creating AI Image...
            </h3>

            <p>
                Prompt: ${prompt}
            </p>

        `;


    });

}

/* Image Preview Upgrade */


.preview-content{

    text-align:center;
    color:white;

}


.image-icon{

    font-size:60px;
    margin-bottom:20px;

}


.download-btn{

    margin-top:20px;
    padding:12px 30px;
    border:none;
    border-radius:30px;
    cursor:pointer;

}