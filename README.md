# Artist-Events

It is a take-home assignment. Having following features.

## Features
1. Animated Search bar.
2. Search Artist By Name.
3. Select Artist.
4. Events Listing.
5. Persist the last entered artist and events across browser reloads/refreshes
6. Test Cases using JEST and RTL.
7. Events searching by Title, Description, Venue, City, Country.
8. Events filtering by Start Date and End Date.
9. Dynamic Event count text.
10. State Management using Redux toolkit.

### Libraries Used
-  [React/Redux Toolkit](https://redux-toolkit.js.org/)
-  [React Hook Form](https://react-hook-form.com/)
-  [Tailwind CSS](https://tailwindcss.com/)

## Installation
Use the package manager [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/) to run the project.
To install all package dependencies
```bash
npm install
```

## Quick Start
To run the project
```bash
npm run start
or
set "REACT_APP_BASE_URL=https://rest.bandsintown.com/" && npm run start
```
## Run Test Cases
To run the project
```bash
npm run test
```

## To Deploy
Create production build using the below command and place it in AWS S3 public bucket.
```bash
npm run build
```


## Thanks