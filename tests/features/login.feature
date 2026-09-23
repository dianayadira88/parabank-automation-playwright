Feature: Inicio de sesión en ParaBank
  Como usuario registrado
  Quiero iniciar sesión en el sistema
  Para acceder a mi cuenta bancaria

  Scenario: Login exitoso con un usuario recién registrado
    Given un usuario registrado en ParaBank que cerró sesión
    When ingresa su usuario y contraseña
    And hace clic en el botón de iniciar sesión
    Then debería ver la página de resumen de cuentas