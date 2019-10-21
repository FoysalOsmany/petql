const { Given, When, Then } = require("cucumber");
const { expect } = require("chai");
const url = 'http://localhost:3000';
const request = require('supertest')(url);

// Create a Pet in PetQL
/**
 * create a pet when data is valid
 */
let createValidResponse = {};

Given("I am trying to create a pet with valid data", function(callback) {
  callback();
});

When("I enter valid name {string}, color {}, age {int} and breed {string}", function(name, color, age, breed, callback) {
  let variables = {input: {name, color, age, breed}};
  request.post('/graphql')
    .send({query: `mutation AddPet($input: PetDataInput!) {
      addPet(petData: $input) { _id name color age breed } }`,
      variables: JSON.stringify(variables)
    })
    .end((err, res) => {
      if (err) callback(new Error(err));

      createValidResponse.status = res.statusCode;
      createValidResponse.data = res.body && res.body.data ? res.body.data : res.body;

      callback();
    });
});

Then("I can create a pet and get a response with status code {int}", function(statusCode, callback) {
  expect(createValidResponse.status).to.eql(statusCode);
  expect(createValidResponse.data).to.have.property('addPet');
  expect(createValidResponse.data.addPet).to.have.property('_id');
  expect(createValidResponse.data.addPet).to.have.property('name');
  expect(createValidResponse.data.addPet).to.have.property('age');
  expect(createValidResponse.data.addPet).to.have.property('breed');

  callback();
});


/**
 * can not create a Pet with invalid data
 */
Given("I am trying to create a Pet with invalid data", function(callback) {
  callback();
});

When("I enter invalid name {string}, color {}, age {int} and breed {}", function(name, color, age, breed, callback) {
  // expect(name).to.eql(name);
  // expect(phone).to.eql(phone);
  // expect(email).to.eql(email);
  callback();
});

Then("I can't create a pet and get an error response with status code {int}", function(statusCode, callback) {
  expect(statusCode).to.eql(400);
  callback();
});

/**
 * update a pet information
 */
let updateResponse = {};

Given("I am trying to update a pet information with valid data", function(callback) {
  callback();
});

When("I enter valid id {string} and data for name {string}, color {}, age {int} and breed {string}", function(id, name, color, age, breed, callback) {
  let variables = {id, input: {name, color, age, breed}};
  request.post('/graphql')
    .send({query: `mutation UpdatePet($id: String!, $input: PetDataInput!) {
      updatePet(id: $id, petData: $input) { _id name color age breed } }`,
      variables: JSON.stringify(variables)
    })
    .end((err, res) => {
      if (err) callback(new Error(err));

      console.log(res.body.data);

      updateResponse.status = res.statusCode;
      updateResponse.data = res.body && res.body.data ? res.body.data : res.body;

      callback();
    });
});

Then("I can update a pet information and get a response with status code {int}", function(statusCode, callback) {
  console.log(updateResponse.data.errors)
  expect(updateResponse.status).to.eql(statusCode);
  expect(updateResponse.data).to.have.property('updatePet');
  expect(updateResponse.data.updatePet).to.have.property('_id');
  expect(updateResponse.data.updatePet).to.have.property('name');
  expect(updateResponse.data.updatePet).to.have.property('age');
  expect(updateResponse.data.updatePet).to.have.property('breed');

  callback();
});


//Get all Pets registered in PetQL
/**
 * get all pets
 */
let allPetsResponse = {};

Given("I am trying to get all the pets", function(callback) {
  callback();
});

When("I am requesting to get all pets", function(callback) {
  request.post('/graphql')
    .send({ query: '{ pets { _id name color age breed } }' })
    .end((err, res) => {
      if (err) callback(err);

      allPetsResponse.status = res.statusCode;
      allPetsResponse.data = res.body && res.body.data ? res.body.data : res.body;

      callback();
    });
});

Then("I should get all pets in the response with status code {int}", function(statusCode, callback) {
  expect(allPetsResponse.status).to.eql(statusCode);
  expect(allPetsResponse.data).to.have.property('pets');
  expect(allPetsResponse.data.pets).with.length.greaterThan(0);

  callback();
});
