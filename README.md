# Interview Scheduler

Using the latest tools and techniques, this single page React application allows users to book and cancel interviews. It combines a concise API with a WebSocket server to build a realtime experience.

Important Note: 

This web application retrieves it's interview data from the the scheduler API server which can be forked and cloned (in a new directory) at the following link. Please follow the instructions in the project read me in order to get the api server up and running. You will need to run the scheduler client (this project) in one termminal and the scheduler API server in another at the same time: 

https://github.com/lighthouse-labs/scheduler-api

## Final Product:

### Interview Scheduler - Main page

!["Landing page for Interview Scheduler"](https://github.com/jordangm94/scheduler-/blob/master/docs/scheduler-full-page%20view.png?raw=true)

### Interview Scheduler - Create a new appointment

!["Create a new appointment"](https://github.com/jordangm94/scheduler-/blob/master/docs/scheduler-create-new-app.png?raw=true)

### Interview Scheduler - Edit an existing appointment

!["Edit existing appointment"](https://github.com/jordangm94/scheduler-/blob/master/docs/scheduler-edit-existiing-app.png?raw=true)

----
### `The following instructions pertain to getting the scheduler client up and started:` 

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Dependencies: 
* axios
* @testing-library/react-hooks
* react-test-renderer
* classNames
* react-dom
