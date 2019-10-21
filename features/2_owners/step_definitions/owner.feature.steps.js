const { Given, When, Then } = require("cucumber");
const { expect } = require("chai");
const url = 'http://localhost:3000';
const request = require('supertest')(url);

let createValidResponse = {};

Given("I am trying to create an owner with valid data", function(callback) {
  callback();
});

When("I enter valid name {string}, phone {string} and email {string}", function(name, phone, email, callback) {
  let variables = {input: {name, phone, email}};
  request.post('/graphql')
    .send({query: `mutation AddOwner($input: OwnerDataInput!) {
      addOwner(ownerData: $input) { _id name phone email } }`,
      variables: JSON.stringify(variables)
    })
    .end((err, res) => {
      if (err) callback(new Error(err));

      createValidResponse.status = res.statusCode;
      createValidResponse.data = res.body && res.body.data ? res.body.data : res.body;

      callback();
    });
});

Then("I can create an owner and get a response with status code {int}", function(statusCode, callback) {
  expect(createValidResponse.status).to.eql(statusCode);
  expect(createValidResponse.data).to.have.property('addOwner');
  expect(createValidResponse.data.addOwner).to.have.property('_id');
  expect(createValidResponse.data.addOwner).to.have.property('name');
  expect(createValidResponse.data.addOwner).to.have.property('phone');
  expect(createValidResponse.data.addOwner).to.have.property('email');

  callback();
});


let createInvalidResponse = {};

Given("I am trying to create an user with invalid data", function(callback) {
  callback();
});

When("I enter an invalid name {string}, phone {} or email {}", function(name, phone, email, callback) {
  let variables = {input: {name, phone, email}};
  request.post('/graphql')
    .send({query: `mutation AddOwner($input: OwnerDataInput!) {
      addOwner(ownerData: $input) { _id name phone email } }`,
      variables: JSON.stringify(variables)
    })
    .end((err, res) => {
      if (err) callback(new Error(err));

      createInvalidResponse.status = res.statusCode;
      createInvalidResponse.body = res.body;

      callback();
    });
});

Then("I should get an error response with status code {int}", function(statusCode, callback) {
  expect(createInvalidResponse.status).to.eql(statusCode);
  expect(createInvalidResponse.body).to.have.property('errors');
  expect(createInvalidResponse.body.data).to.be.null;
  expect(createInvalidResponse.body.errors).length.greaterThan(0);

  callback();
});

/**
 * Own A Pet
 */
let ownPetResponse = {};

Given("As an owner I am trying to own a pet", function(callback) {
  callback();
});

When("I enter valid owner {string} and pet {string}", function(id, pid, callback) {
  let variables = {id, pid};
  request.post('/graphql')
    .send({query: `mutation OwnAPet {
      ownPet(id: ${JSON.stringify(id)}, pid: ${JSON.stringify(pid)}) { _id name phone email owns { _id, name, age, breed} } }`
    })
    .end((err, res) => {
      if (err) callback(new Error(err));

      ownPetResponse.status = res.statusCode;
      console.log(res.body);
      ownPetResponse.data = res.body && res.body.data ? res.body.data : res.body;

      callback();
    });
});

Then("I should own a pet and get response with status code {int}", function(statusCode, callback) {
  expect(ownPetResponse.status).to.eql(statusCode);
  expect(ownPetResponse.data).to.have.property('ownPet');
  expect(ownPetResponse.data.ownPet).to.have.property('_id');
  expect(ownPetResponse.data.ownPet).to.have.property('name');
  expect(ownPetResponse.data.ownPet).to.have.property('phone');
  expect(ownPetResponse.data.ownPet).to.have.property('email');
  expect(ownPetResponse.data.ownPet).to.have.property('owns');
  expect(ownPetResponse.data.ownPet.owns).length.greaterThan(0);

  callback();
});

//Get all Owners registered in PetQL
/**
 * get all owners
 */
let allOwnersResponse = {};

Given("I am trying to get all the owners", function(callback) {
  callback();
});

When("I am requesting to get all owners", function(callback) {
  request.post('/graphql')
    .send({ query: '{ owners { _id name phone email } }' })
    .end((err, res) => {
      if (err) callback(err);

      allOwnersResponse.status = res.statusCode;
      allOwnersResponse.data = res.body && res.body.data ? res.body.data : res.body;

      callback();
    });
});

Then("I should get all owners in the response with status code {int}", function(statusCode, callback) {
  expect(allOwnersResponse.status).to.eql(statusCode);
  expect(allOwnersResponse.data).to.have.property('owners');
  expect(allOwnersResponse.data.owners).with.length.greaterThan(0);

  callback();
});


/**
 * Retrieve an Owner and their Pets
 */
let ownerResponse = {};

Given("I am trying to retrieve and owner their pets", function(callback) {
  callback();
});

When("I am requesting with a valid owner id {string}", function(id, callback) {
  request.post('/graphql')
    .send({
      query: `{ owner(id: ${JSON.stringify(id)}) { _id name phone email owns { _id name breed age } } }`
    })
    .end((err, res) => {
      if (err) callback(err);

      ownerResponse.status = res.statusCode;
      ownerResponse.data = res.body && res.body.data ? res.body.data : res.body;

      callback();
    });
});

Then("I should get the specific owner and owned pets in response with status code {int}", function(statusCode, callback) {
  expect(ownerResponse.status).to.eql(statusCode);
  expect(ownerResponse.data).to.have.property('owner');
  expect(ownerResponse.data.owner).to.have.property('_id');
  expect(ownerResponse.data.owner).to.have.property('name');
  expect(ownerResponse.data.owner).to.have.property('phone');
  expect(ownerResponse.data.owner).to.have.property('email');
  expect(ownerResponse.data.owner).to.have.property('owns');
  expect(ownerResponse.data.owner.owns).length.greaterThan(0);

  callback();
});

