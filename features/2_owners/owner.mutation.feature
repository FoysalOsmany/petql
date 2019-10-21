Feature: Create an Owner so that he can subscribe to PetQL

  Scenario Outline: create an owner when data is valid
    Given I am trying to create an owner with valid data
    When I enter valid name <name>, phone <phone> and email <email>
    Then I can create an owner and get a response with status code <statusCode>

    Examples:
      | name    | phone      | email       | statusCode |
      | 'Peter' | '01324112' | 'pt@me.com' | 200        |
      | 'Jagan' | '09234234' | 'jg@me.com' | 200        |


  Scenario Outline: should get an error when required data is missing
    Given I am trying to create an user with invalid data
    When I enter an invalid name <name>, phone <phone> or email <email>
    Then I should get an error response with status code <statusCode>

    Examples:
      | name     | phone      | email       | statusCode |
      | 'Foysal' | ''         | 'fo@me.com' | 200        |
      | 'Osmany' | '09234234' | ''          | 200        |


  Scenario Outline: Own A Pet
    Given As an owner I am trying to own a pet
    When I enter valid owner <id> and pet <pid>
    Then I should own a pet and get response with status code <statusCode>

    Examples:
      | id  | pid | statusCode |
      | '2' | '2' | 200        |
      | '3' | '3' | 200        |
