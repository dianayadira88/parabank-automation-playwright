Feature: Registro de usuarios en ParaBank
  Como visitante del portal bancario
  Quiero registrarme en el sistema
  Para acceder a los servicios de banca en línea

  Scenario: Registro exitoso con datos válidos
    Given el visitante está en la página de registro
    When completa el formulario con datos válidos y envía el registro
    Then debería ver el mensaje de bienvenida con su nombre de usuario
    And debería ver el mensaje "Your account was created successfully. You are now logged in."