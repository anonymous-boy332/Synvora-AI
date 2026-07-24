export default async function handler(req, res) {


    if(req.method !== "POST"){

        return res.status(405).json({
            error: "Method not allowed"
        });

    }



    const { prompt } = req.body;



    if(!prompt){

        return res.status(400).json({
            error: "Prompt is required"
        });

    }



    try {


        // AI API connection yahan add hoga


        return res.status(200).json({

            message: "AI Image request received",

            prompt: prompt

        });



    } catch(error){


        return res.status(500).json({

            error: error.message

        });


    }


}
