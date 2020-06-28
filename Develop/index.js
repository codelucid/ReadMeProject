const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
const axios = require("axios");
const dotenv = require("dotenv");
const generateMarkdown = require("./utils/generateMarkdown");
const api = require("./utils/api");

// const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile);

// Do I need function promptUser here? Or just inquirer.prompt?
function promptUser() {
        return inquirer.prompt([
        {
            type: "input",
            message: "What is your Github username?",
            name: "username"
        },
        {
            type: "input",
            message: "What is your preferred email?",
            name: "email"
        },
        {
            type: "input",
            message: "What is your project title?",
            name: "title"
        },
        {
            type: "input",
            message: "Please write a short description of your project.",
            name: "description"
        },
        {
            type: "list",
            message: "What kind of license should your project have?",
            name: "license",
            choices: [
                "MIT",
                "APACHE2.0",
                "GPL3.0",
                "BSD3",
                "None"
            ]
        },
        {
            type: "input",
            message: "What command should be used to install dependencies?",
            name: "install"
        },
        {
            type: "input",
            message: "What command should be entered to run tests?",
            name: "test",
            default: "npm test"
        },
        {
            type: "input",
            message: "What does the user need to know about using the repo?",
            name: "usage"
        },
        {
            type: "input",
            message: "What does the user need to know about contributing to the repo?",
            name: "contribute"
        }
        
    ]);

    console.log(res);
}


   
async function init() {
    try {
        const answers = await promptUser();
        // answers.avatarPic = await api();
        const readme = generateMarkdown(answers);
        await writeFileAsync("readme.md", readme);
        console.log("Successfully wrote to readme.md");
    }
    catch (err) {
        console.log(err);
    }
}
init();    

// promptUser()   

// .then(function(data) {
//     // api call back here?  can I add +api(data) below?
//         const readme = generateMarkdown(data);
    
//         return writeFileAsync("readme.md", readme);
//     })
//     .then(function() {
//         console.log("Successfully wrote to readme.md");
//     })    
//     .catch(function(err) {
//         console.log(err);
//     });
    
