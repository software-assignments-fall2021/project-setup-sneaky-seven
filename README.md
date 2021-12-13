# Budget Web App

## Description of Project

### Product Vision Statement

Aimed towards consumers who strive for budget management, the Budget Web App wants to elevate understanding of income and spending, resulting in a higher control over finance. Unlike other apps which often automatically and arbitrarily categorize purchases, we allow users to define their budget and how they want to view their spending. This will allow for both the presence of "intelligent" suggestions per say, as well as user-defined categories in the event that more accuracy is required/desired.

### Deployment

View our deployed website here: http://167.172.252.106/

Extra Credit Notes:

- Extra credit is given to teams that have deployed to a Docker container, although a non-containerized deployment to a Droplet is fine.
  - We have a non-containerized deployment to a droplet.
- Extra credit is given to teams that have a Continuous Deployment setup, although a manual deployment is fine.
  - We have Continuous Deployment set up. We have updated the CircleCI script to kick off a deploy job each time when new changes are merged into the master branch. In this script, CircleCI will SSH into our deployment server and run another script to pull the latest changes and deploy on deployment server.
  - [CircleCI script](./circleci/config.yml) `deploy` workflow and `deploy-prod` job
  - [deploy script on deployment server](./deploy_project.sh)
  - Check [here](https://app.circleci.com/pipelines/github/software-students-fall2021/project-setup-sneaky-seven/253/workflows/7be4d36d-70c8-4d8a-8869-68a5c8bd7355/jobs/830) for Continuous Deployment in action

## Core Members

- [Alan Chen](https://github.com/azc242)
- [Jennifer Zeng](https://github.com/Jennifercheukyin)
- [Michelle Tang](https://github.com/tangym27)
- [Sebastian Lopez](https://github.com/sdl433)
- [Tomer Ben-Yaakov](https://github.com/TomerBenya)

## Short History

The Budget Web App came to fruition when team member Jennifer Zeng mentioned how most popular budget apps fail to allow you to customized your categorizes when giving statistics towards your spending. This can often lead to an inaccurate portrayal of your spending. If you buy food and drinks from CVS, budget apps are likely to categorize this as a purchase under health because CVS is a pharmacy. Jennifer suggested we create a new app that would allow users to personalize their categorizes, giving a more accurate and personal reflection of someone's finances. This idea was later expanded to involve concepts of how we could use ML to predict future spending patterns and use known APIs to sync banking information.

### How to Contribute

View our [contributing page](./CONTRIBUTING.md) on how to contribute!

## Instructions for Building and testing

Run the program:

1. Clone the repo

   `git clone git@github.com:software-students-fall2021/project-setup-sneaky-seven.git`

2. Make sure you have node and npm installed: learn [more](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)!

3. Run the front-end:
   Go to that directory:
   `cd front-end/`
   Download dependencies:
   `npm install`
   Run the program
   `npm run start`

4. Run the back-end (separate terminal):

   Go to that directory:

   `cd back-end/`

   Download dependencies:

   `npm install`

   Add the `.env` file:

   `(Please contact any member for this as we don't want this on version control)`

   Run the program

   `npm start`

5. Application should pop up [here](http://localhost:3000/)!

Test the program:

1. Download the necessary dependencies:

   Unit Testing:

   `npm install --save-dev mocha chai sinon mocha-sinon chai-http`

   Code Coverage:

   `npm i -D nyc`

2. Run the following command in the back-end folder:

   Go to backend:

   `cd back-end/`

   Run for unit test and code coverage:

   `npm test`

## References

- [JWT](https://www.npmjs.com/package/jsonwebtoken)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [React DOM](https://reactjs.org/docs/react-dom.html)
- [React FAQ Component](https://www.npmjs.com/package/react-faq-component)
- [Material UI](https://mui.com/getting-started/usage/)
- [EmailJS](https://www.npmjs.com/package/emailjs)
- [React Infinite Scroll](https://www.npmjs.com/package/react-infinite-scroll-component)
- [React Google Charts](https://react-google-charts.com/)
- [Mongoose Starting Docs](https://mongoosejs.com/docs/index.html)
- [Plaid API](https://plaid.com/docs/)
- [Mocha](https://mochajs.org/) & [Chai](https://www.chaijs.com/)
- [Istanbul NYC](https://github.com/istanbuljs/nyc)
- [Prof. Bloomberg Slides](https://knowledge.kitchen/Agile_Software_Engineering_Course_Schedule)
- [Tutors](https://media.istockphoto.com/photos/paint-splatter-thank-you-picture-id1132817705?b=1&k=20&m=1132817705&s=170667a&w=0&h=fAlE3Lb0PPIySZ_otp-vv92H7F-e1lu4VjrFg4bJAUk=)
