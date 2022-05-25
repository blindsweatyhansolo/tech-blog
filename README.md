# Technically Speaking: A Tech Blog

## Table of Contents

* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [Tests](#tests)
* [Contributions](#contributions)
* [Additional Information](#additional-information)


## [Description:](#table-of-contents)
**Technically Speaking** is a CMS-style blog site where a user can publish articles, blog posts, and general thoughts and opinions. All visitors can access the homepage featuring all posts from signed up users. Signing up on the site allows the user to access further features such as post creation, editing, and commenting.

## [Installation:](#table-of-contents)
To work with the code base, follow these instructions:

1. Clone this repository onto your machine with `git clone`
2. To install the required dependencies, from the root directory run command `npm install`
3. Tech Blog uses the [dotenv](https://www.npmjs.com/package/dotenv) package to use environment variables. Once cloned and dependencies installed, make a copy of the `.env.EXAMPLE` file, rename it `.env`, and fill in the required fields with your MySQL username and password. The `.env` file has been included in the `.gitignore` file for security purposes.
4. In the command line, use `npm start` to kickstart the server and SQL connection.

*Developer Note: Please make sure you have MySQL installed on your machine. For information on how to install MySQL, please click [here](https://coding-boot-camp.github.io/full-stack/mysql/mysql-installation-guide)*

## [Usage:](#table-of-contents)
**Technically Speaking** is fully deployed [here on Heroku](https://bshs-tech-blog.herokuapp.com/). You must sign-up in order to create and/or edit posts, or to comment on existing posts. Non-logged in users may still access the homepage that will display all posts, but will be redirected to login/signup if trying to access the Dashboard. 

![Live demo for Technically Speaking](./assets/demoTECHBLOG.gif)

## [Tests:](#table-of-contents)
Testing can be replicated using Jest, and API endpoint testing can be replicated using any REST Clients such as Insomnia or PostMan

## [Contributions:](#table-of-contents)
Contributions and feedback always welcome!

## [Additional Information:](#table-of-contents)
**Technically Speaking** was created as a bootcamp project focusing on MVC architectural best practices, using template engines such as Handlebars.js, session authentication, and ORM utilization. It is fully deployed on Heroku, and available for educational purposes.

Technologies Used:

* Node.js
* [Express.js](https://www.npmjs.com/package/express)
* [Sequelize](https://www.npmjs.com/package/sequelize)
* [Express Handlebars.js](https://www.npmjs.com/package/express-handlebars)
* [bcrypt](https://www.npmjs.com/package/bcrypt)
* [express-session](https://www.npmjs.com/package/express-session)
* [connect-session-sequelize](https://www.npmjs.com/package/connect-session-sequelize)
* [mysql2](https://www.npmjs.com/package/mysql2)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [nodemon](https://www.npmjs.com/package/nodemon)


Deployed URL (Heroku):
[Technically Speaking: A Tech Blog](https://bshs-tech-blog.herokuapp.com/)


_If you have any questions about the application, or would like to become a contributor, please contact me using the information below:_

[GitHub](https://github.com/blindsweatyhansolo)
