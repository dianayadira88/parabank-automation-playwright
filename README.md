# Reto Técnico – Automatización de pruebas sobre ParaBank

Automatización de pruebas del portal bancario **ParaBank** (https://parabank.parasoft.com/parabank/index.htm)
con **Playwright + TypeScript + BDD (Gherkin)**.

## Funcionalidades cubiertas

1. Registrarse en el sistema
2. Loguearse en el sistema
3. Realizar un retiro
4. Transferir dinero entre dos cuentas

## Tecnologías y versiones

| Herramienta        | Versión                        |
|--------------------|--------------------------------|
| Node.js            | v24.21.0                       |
| @playwright/test   | 1.63.0                         |
| playwright-bdd     | 9.2.1                          |
| @types/node        | 26.6.2                         |
| Navegador          | Google Chrome (instalado en el equipo) |

## Requisitos previos

- Node.js instalado (comprobar con `node -v`)
- Google Chrome instalado (la configuración usa `channel: 'chrome'`)
- Conexión a internet (el sistema bajo prueba es un sitio público)

## Instalación y ejecución paso a paso

1. Clonar el repositorio y entrar a la carpeta:

```powershell
git clone <URL_DEL_REPOSITORIO>
cd RetoSofka
```

2. Instalar las dependencias:

```powershell
npm install
```

3. Ejecutar todas las pruebas:

```powershell
npm test
```

Este comando primero convierte los archivos `.feature` en tests (`bddgen`) y luego los ejecuta con Playwright.

### Otros comandos

| Comando                | Qué hace                                          |
|------------------------|---------------------------------------------------|
| `npm test`             | Ejecuta todos los escenarios                      |
| `npm run test:headed`  | Ejecuta con el navegador visible                  |
| `npm run report`       | Abre el reporte HTML en el navegador              |
| `npm run bddgen`       | Solo genera los tests a partir de los `.feature`  |

Para ejecutar un solo escenario:

```powershell
npx playwright test --grep "Retiro exitoso"
```

Si no tienes Google Chrome, puedes instalarlo desde Playwright con `npx playwright install chrome`.

## Reportes

Después de cada ejecución se generan:

| Reporte | Ubicación                | Cómo abrirlo                  |
|---------|--------------------------|-------------------------------|
| HTML    | `reports/html/index.html`| `npm run report`              |
| JSON    | `reports/results.json`   | Abrir el archivo directamente |

Si una prueba falla, se guarda una captura de pantalla en la carpeta `test-results/`.

## Arquitectura

Se usa **BDD** (casos de prueba en Gherkin) junto con el patrón **Page Object Model**:

```text
Feature (Gherkin)  ->  Steps  ->  Pages / API  ->  ParaBank
   qué se prueba     qué hace     cómo se
                     cada frase   interactúa
```

- **features**: los casos de prueba escritos en lenguaje natural (Given / When / Then).
- **steps**: conectan cada frase del feature con su código.
- **pages**: un objeto por cada pantalla de ParaBank; ahí están los selectores y las acciones.
- **api**: cliente del servicio REST de ParaBank, usado para el retiro.
- **fixtures**: entrega a cada escenario las páginas y la API que necesita.

## Estructura del proyecto

```text
RetoSofka/
├── playwright.config.ts        # Configuración de Playwright y reportes
├── package.json
└── tests/
    ├── features/               # Casos de prueba en Gherkin
    │   ├── register.feature
    │   ├── login.feature
    │   ├── withdraw.feature
    │   └── transfer.feature
    ├── steps/                  # Definición de los pasos
    │   ├── register.steps.ts
    │   ├── login.steps.ts
    │   ├── withdraw.steps.ts
    │   └── transfer.steps.ts
    ├── pages/                  # Page Objects
    │   ├── RegisterPage.ts
    │   ├── LoginPage.ts
    │   ├── OpenAccountPage.ts
    │   └── TransferPage.ts
    ├── api/
    │   └── BankApi.ts          # Cliente del servicio REST de ParaBank
    └── fixtures/
        └── pages.fixture.ts
```

## Casos de prueba

| Funcionalidad | Escenario                                        | Cómo se prueba |
|---------------|--------------------------------------------------|----------------|
| Registro      | Registro exitoso con datos válidos               | Interfaz web   |
| Login         | Login exitoso con un usuario recién registrado   | Interfaz web   |
| Retiro        | Retiro exitoso descuenta el monto del saldo      | API REST       |
| Transferencia | Transferencia exitosa entre dos cuentas propias  | Interfaz web   |

## Decisiones de diseño

- **Usuario nuevo en cada escenario.** ParaBank no permite repetir nombres de usuario, por lo que
  cada escenario registra el suyo (`sofka_` + fecha y hora + caracteres al azar). Así los escenarios
  son independientes y se pueden ejecutar varias veces sin conflictos.
- **El retiro se prueba por API.** El portal no ofrece una pantalla de retiro; "Withdraw Funds" está
  publicado como servicio. Se usa el servicio REST `POST /services/bank/withdraw` y se verifica que el
  saldo disminuya exactamente el monto retirado, consultándolo antes y después.
- **La transferencia se prueba por interfaz.** Se registra un usuario, se abre una segunda cuenta de
  ahorros, se transfiere y se verifica la confirmación y el comprobante.
- **Rutas relativas.** Las URL no empiezan con `/` para conservar `/parabank/` de la `baseURL`.

## Nota

ParaBank es un sitio de demostración público y compartido, por lo que ocasionalmente puede responder
con lentitud. Si una prueba falla por tiempo de espera, se puede volver a ejecutar.