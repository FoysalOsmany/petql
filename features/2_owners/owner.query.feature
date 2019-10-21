Feature: Get Owners registered in PetQL

  Scenario Outline: List Owners
    Given I am trying to get all the owners
    When I am requesting to get all owners
    Then I should get all owners in the response with status code <statusCode>

    Examples:
      | statusCode |
      | 200        |


  Scenario Outline: Retrieve an Owner and their Pets
    Given I am trying to retrieve and owner their pets
    When I am requesting with a valid owner id <id>
    Then I should get the specific owner and owned pets in response with status code <statusCode>

    Examples:
      | id  | statusCode |
      | '2' | 200        |
      | '3' | 200        |
