Feature: Retiro de dinero de una cuenta
  Como cliente del banco
  Quiero retirar dinero de mi cuenta
  Para disponer de efectivo

  Scenario: Retiro exitoso descuenta el monto del saldo
    Given un cliente registrado con una cuenta activa
    When retira 50 dólares de su cuenta
    Then el servicio confirma el retiro
    And el saldo de la cuenta disminuye en 50 dólares