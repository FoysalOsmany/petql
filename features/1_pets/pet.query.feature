Feature: Get all Pets registered in PetQL

  Scenario Outline: get all pets
    Given I am trying to get all the pets
    When I am requesting to get all pets
    Then I should get all pets in the response with status code <statusCode>

    Examples:
      | statusCode |
      | 200        |
