// oauth redirects here
import { LilyPad } from "@/components/lilypad/lilyPad"

const LilypadPage = (context) => {
    const user_input = context.searchParams["input"];
    const fs = require('fs');
    const { exec } = require('child_process');
   console.log("this is user input",user_input);

    console.log("Lilypad Starting...");
    const web3PrivateKey = process.env.WEB3_PRIVATE_KEY;
    if (!web3PrivateKey) {
        console.error('WEB3_PRIVATE_KEY is not set in the environment variables.');
    }
    // const command = `export WEB3_PRIVATE_KEY=${web3PrivateKey} && lilypad run mistral-7b-instruct:v0.1-lilypad3 -i PromptEnv="PROMPT=${user_input}"`;
    const command = `export WEB3_PRIVATE_KEY=${web3PrivateKey} && lilypad run sdxl-pipeline:v0.9-base-lilypad3 -i Prompt="${user_input}"`;
    let file_path = null;
    // This is a callback function to handle any errors when calling runCliCommand function.
    exec(command, async (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
        }

        // When Lilypad runs successfully, it returns the relative path to the files it generated, and the IPFS url. Here we are grabbing the relative path in local storage to serve the image to our front end.
        const lines = stdout.trim().split('\n');
        const path = lines[lines.length - 4].trim(); // Trim any extra whitespace
        // const filePath = path.replace('open ', '')+'outputs/output_00001_.png';
        const filePath = path.replace('open ', '')+'/outputs/output_00001_.png';
        file_path = filePath;
        // This console log will confirm that Lilypad ran successfully.
        console.log(filePath);
        
        // Serve file content directly
        // return (
        //     <div className="flex-flex-col w-screen">
        //         <LilyPad file_path={file_path} />
        //     </div>
        // )
        // fs.readFile(filePath, 'utf8', (err, data) => {
        //     if (err) {
        //         console.error("Error reading the file:", err);
        //         return res.status(500).json({ error: err.message });
        //     }
        //     res.setHeader('Content-Type', 'text/plain');
        //     res.send(data); // Send the data to the client
        // });

    });


    return (
        <div className="flex-flex-col w-screen">
            <LilyPad file_path={file_path} />
        </div>
    )
}

export default LilypadPage;