# Guide to Contributing

## Team Norms

### Team Values

- Our team understands how life and work can sometimes get in the way of expected deadlines. We agree to show reasonable empathy and understanding when situations like this occur. With fluctuating schedules, we will try to work at the same time but in cases where that cannot happen, the team will remain in constant contact with one another, updating on their progress approximately twice a week. If a message is directed at someone, they should respond within 24 hours.
- If we need help, we will not hesitate to contact one another. Typically, those working in the backend will request for help from those also working in the backend. The same policy applies for frontend work. If that doesn't work, we will expand our resources to the other developers and tutors. In cases of personal, not technical difficulties, we will consult the Scrum Master during our 'daily' standup or earlier. We all have a mutual respect for each other and will try our utmost to communicate honestly and freely.
- In cases of significant conflict, like if a member fails to consistently deliver on tasks with little/no failed communication, we will follow a spiral of communication. First, we will try to resolve the problem internally, either during a sprint, or if the case becomes significant, at a Scrum Meeting. If that fails, we will turn to outside sources such as graders, tutors, the TAs or even the professor himself.

### Sprint Cadence & Standups

- Our sprints will last for approximately 2 weeks as stated by the professor
- Standups will occur approximately twice a week, one Saturday night at 8pm and one Tuesday night at 8pm. With proper notification, they can be changed with team consensus.
- There is an agreement that members will not cover for other members who do not participate.
- There is an agreement that a member who makes no progress on a task for two standups or more in a row will be reported to management.

### Coding Standards

- The team will agree to not over-engineer. We will try to write minimum code to get things working end to end, only then iterate to improve.
- The team agrees that code for each task and spike must be peer-reviewed before merging into the main branch of code. As such, the team agrees to not push directly to master. Rather, they will create a branch and pull request for future changes.
- The team agrees to provide descriptive commit messages.

### Git Workflow

- When making changes, please follow this format:
  - First, pull the repo to get the most recent changes
  - Create a new branch with a brief name that describes the change
  - Make the changes and test vigorously
  - Pull once more (makes merging easier)
  - Push and create a pull request with a descriptive title and detail. Link the appropriate issue.
  - Request reviews from at least two other people before merging into making

### Rules of Contributing & Considerations

- Please fork when appropriate
- Look at our issues pages to see what a good contribution would be
- Open an issue if you would like to propose a feature before you begin working on it (there may be a reason why it has not been implemented)
- Make a pull request when changes are deemed adequate. Request reviews from at least two other people.
- Consider the size of your contribution – is it too big for one pull request? is it essential to functionality? does it match with the team vision?

### Instructions for Building and Testing the Project

Run the program:

1. Clone the repo

   `git clone git@github.com:software-students-fall2021/project-setup-sneaky-seven.git`

2. Make sure you have node and npm installed: learn [more](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)!
3. Download dependencies:

   `npm install`

4. Run program

   `npm run start`

5. Application should pop up [here](http://localhost:3000/)!
