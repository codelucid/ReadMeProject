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
        ])       
        .then(function({ github }) {
            const queryUrl = `https://api.github.com/users/${github}`;
                
            axios
            .get(queryUrl)
            .then(function(res) {
                console.log(res.data);
                
                const {gitAvatar} = res.data.avatar_url
                const {gitEmail} = res.data.email
                
                const profileAvatar = gitAvatar.map(JSON.parse);
                const profileEmail = gitEmail.map(JSON.parse);
                    return profileAvatar, profileEmail;
                // const profilePic = [gitAvatar, gitEmail].map(function() {
                //     return profilePic;
                // })
            })
            .catch(function(err) {
                console.log(err);
            });
        });
} 

// do we use a markdown syntax, instead of HTML?
    function generateREADME(data) {
        return `
        # ${fileName}  

        ![GitHub license](https://img.shields.io/badge/license-${license}-brightgreen)

        ## Description  

        ${data.description}  

        ## Table of Contents
        - Installation 
        - Usage
        - License
        - Contributing
        - Tests
        - Questions  

        ## Installation  

        To install necessary dependencies, run the following command:
        >${data.install}  

        ## Usage  

        This is what the user needs to know about using the repo:
        ${data.usage}  

        ## License  

        The license for this project:
        ${data.license}  

        ## Contributing  

        This is how the use can contribute to the project:
        ${data.contribute}  

        ## Tests  

        This is the command to initiate testing:
        >${data.test}  

        ## Questions  

        ${profileAvatar}  

        If you have questions about the repo, contact ${data.github} directly at ${profileEmail}:
        `
    }

async function init() {
    try {
        const answers = await promptUser();
        const readme = generateREADME(answers);
        await writeFileAsync("readme.md", readme);
        console.log("Successfully wrote to readme.md");
    }
    catch(err) {
    console.log(err);
    }
}   

init();
