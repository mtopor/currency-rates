# currency-rates app
The following application is an attempt to implement the server side rendering for faster page loads from scratch utilizing React, TypeScript, Express.  

## Available Scripts

In the project directory, you can run:

### `npm install`
Installs all the required dependencies.

### `npm run build`
Builds the app for the production to the dist folder.

### `npm run build:watch`
In addition to the previous command, rebuilds the app after edit.

### `npm run start`
Launches the app on port 8000. Open http://localhost:8000 to view it in the browser.

### `npm run test` 
Launches the test runner.
For server related tests, the server should be stopped as it uses the hardcoded 8000 port.

### `npm run lint` 
Runs EsLint check on the app.

### `npm run format` 
Applies prettier rules and edits the app code. 

### Things to improve:   
* Add redux to server and store the url with date query param in server's state in order to share or reuse it.  
* Create a static component for error banner  
* Revisit app.tsx test
* Add `ts-node-dev` to project in order to rebuild the project after edit.  
* Add axios instance with config.
