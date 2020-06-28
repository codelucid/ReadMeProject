function generateMarkdown(data) {
  return `
# ${data.title}  

![GitHub license](https://img.shields.io/badge/license-${data.license}-brightgreen)

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

This is how the user can contribute to the project:
${data.contribute}  

## Tests  

This is the command to initiate testing:
>${data.test}  

## Questions  

If you have questions about the repo, contact ${data.username} directly, at ${data.email}.

[![My Profile Picture](/profilePic.png)](https://github.com/codelucid "My Profile Picture")

[My Portfolio](https://codelucid.github.io/Portfolio/ "My Portfolio")

`;

}
module.exports = generateMarkdown;
