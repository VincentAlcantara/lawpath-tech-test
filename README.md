#Lawpath Technical Test

This is the solution I submitted for the Lawpath Technical Test.  The aim of the test was to create a form which used Australia Post's Postcode/Suburb search.
https://developers.auspost.com.au/apis/pac/reference/postcode-search

Note: This is my first ReactJS project.  It was challenging especially coming from an AngularJS paradigm, but overall it was a great project to get introduced to ReactJS.

## Quick start
Clone or download this repository to your computer.  Change in to the directory that was just downloaded.
To setup the required libraries and initialise the application you must run:
```
npm install
npm start
```

Then open a browser and navigate to:
```
http://localhost:8080
```
If you would like to see a response from the Auspost GET API for the postcode/suburb search, type
http://localhost:3000/address?q={queryString} in a browser.  e.g. http://localhost:3000/address?q=Sydney.

The response is what I used to populate the typeahead for the suburb/postcode field.

## Unit Tests
Unit tests are done using mocha.  To run:
```
npm test
```
