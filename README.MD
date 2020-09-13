This is a TODO Application built using angular.

Dev Environment setup:

- Clone the repository locally.
- In the root folder, run npm install
- In one terminal navigate to db folder and run json-server db.json
- In other termianl in root folder run npm serve
- The application will start. Open browser and hit the url http://localhost:4200 to access the application.

Running E2E tests using cypress


# TodoApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.22.

# Production URL:
This application is deployed in Production using Heroku and it can be accessed via:
https://sa-ng-todo.herokuapp.com/


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running end-to-end tests

- Find the path of cypress in node_modules bin folder (like:  /TodoApp/node_modules/.bin ) and run the command
   node_modules/.bin/cypress open
- This will run all the basic E2E tests.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
