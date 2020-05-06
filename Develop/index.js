const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
const axios = require("axios");
const dotenv = require("dotenv");

// I don't think I need readFileAsync, because we can destructure the returned object?
// const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile);

// Do I need function promptUser here? Or just inquirer.prompt?
function promptUser() {
        return inquirer.prompt([
        {
            type: "input",
            message: "What is your Github username?",
            name: "github"
        },
        {
            type: "input",
            message: "What is your project title?",
            name: "fileName"
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
                "APACHE 2.0",
                "GPL 3.0",
                "BSD 3",
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
    
// do we use a markdown syntax, instead of HTML?
    function generateReadMe(res) {
        return `
        # ${res.fileName}  

        ![GitHub license](https://img.shields.io/badge/license-${res.license}-brightgreen)

        ## Description  

        ${res.description}  

        ## Table of Contents
        - Installation 
        - Usage
        - License
        - Contributing
        - Tests
        - Questions  

        ## Installation  

        To install necessary dependencies, run the following command:
        >${res.install}  

        ## Usage  

        This is what the user needs to know about using the repo:
        ${res.usage}  

        ## License  

        The license for this project:
        ${res.license}  

        ## Contributing  

        This is how the user can contribute to the project:
        ${res.contribute}  

        ## Tests  

        This is the command to initiate testing:
        >${res.test}  

        ## Questions  

        If you have questions about the repo, contact ${res.github} directly.
        `;
    
    }
// async function init() {
//     try {
//         const res = await promptUser();
//         const readme = generateReadMe(res);
//         await writeFileAsync("readme.md", readme);
//         console.log("Successfully wrote to readme.md");
//     }
//     catch (err) {
//         console.log(err);
//     }
// }
// init();    
promptUser()   
.then(function(res) {
        const readme = generateReadMe(res);
    
        return writeFileAsync("readme.md", readme);
    })
    .then(function() {
        console.log("Successfully wrote to readme.md");
    })    
    .catch(function(err) {
        console.log(err);
    });
    
