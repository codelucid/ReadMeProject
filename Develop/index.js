const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
const axios = require("axios");
const dotenv = require("dotenv");

const writeFileAsync = util.promisify(fs.writeFile);

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
                type: "confirm",
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
            },
        ])
}
// questions about this section. Should I reference activity 33?
async function getGitHub() {
    try {
        const {github} = await inquirer.prompt({
            message: "What is your Github username?",
            name: "github"
        });
        const {data} = await axios.get(`https://api.github.com/users/${github}`);
        const userNames = res.data.map(function(data){
            return data.email;
        })
        const userNameStr = userNames.join("\n");
        console.log(data);
    }
    catch (err) {
        console.log(err);
    }
}
getGitHub();

// do we use a markdown syntax, instead of HTML?
function generateREADME(fileName, data) {
    return `
    # ${fileName}  

    // place shields.io badge here

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

    Picture Here
    If you have questions about the repo, contact ${data.github} directly at ${emailfromAxios}:
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
