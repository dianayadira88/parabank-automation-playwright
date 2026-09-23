Feature: Transferencia de dinero entre cuentas
  Como cliente del banco
  Quiero transferir dinero entre mis cuentas
  Para distribuir mis fondos según mis necesidades

  Scenario: Transferencia exitosa entre dos cuentas propias
    Given un cliente registrado con dos cuentas
    When transfiere 25 dólares de su primera cuenta a su segunda cuenta
    Then se muestra la confirmación "Transfer Complete!"
        And el comprobante muestra 25 dólares y las cuentas utilizadas