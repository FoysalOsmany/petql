Feature: Create a Pet in PetQL

  Scenario Outline: create a pet when data is valid
    Given I am trying to create a pet with valid data
    When I enter valid name <name>, color <color>, age <age> and breed <breed>
    Then I can create a pet and get a response with status code <statusCode>

    Examples:
      | name     | color   | age | breed | statusCode |
      | 'Max'    | 'black' | 10  | 'dog' | 200        |
      | 'Flurry' | 'brown' | 4   | 'cat' | 200        |


  Scenario Outline: can not create a Pet with invalid data
    Given I am trying to create a Pet with invalid data
    When I enter invalid name <name>, color <color>, age <age> and breed <breed>
    Then I can't create a pet and get an error response with status code <statusCode>

    Examples:
      | name   | color | age | breed | statusCode |
      | 'Fifi' |       | 3   |       | 400        |


  Scenario Outline: update a pet information
    Given I am trying to update a pet information with valid data
    When I enter valid id <id> and data for name <name>, color <color>, age <age> and breed <breed>
    Then I can update a pet information and get a response with status code <statusCode>

    Examples:
      | id | name     | color  | age | breed | statusCode |
      | '2'  | 'MaxDoo' | 'grey' | 11  | 'dog' | 200        |
