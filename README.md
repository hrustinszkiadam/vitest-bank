# BankProject

Vitest használatát bemutató projekt.

## Projekt létrehozás lépései

- Projekt létrehozása (ha még nincs package.json állomány)

```sh
npm init
```

- [vitest](https://vitest.dev/) telepítése

```sh
npm i -D vitest
```

## Klónozás után telepítés lépései

- node modulok telepítése

```sh
npm i
```

- Teszt script elkészítése (package.json)

```json
{
  "scripts": {
    "test": "vitest"
  },
}
```

- Tesztek futtatása

```sh
npm run test
```

## Opcionális

- vitest.config file létrehozása

> A globals opció beállítása után a fileokban nem lesz szükség a vitest modulok importálására

```javascript
import { defineConfig, defaultExclude } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    exclude: [...defaultExclude],
  },
});
```

## Javasolt vscode bővítmények

- [vitest](https://marketplace.visualstudio.com/items?itemName=vitest.explorer)
  - A bővítmény megfelelő működéséhez szükséges lehet vite / vitest config fájl létrehozására
- [vitest snippets](https://marketplace.visualstudio.com/items?itemName=deinsoftware.vitest-snippets)

## Teszt fájl létrehozása

- Teszt fájloknak az alábbi reguláros kifejezésnek kell megfelelnie: `**/__tests__/**/*.[jt]s?(x), **/?(*.)+(spec|test).[tj]s?(x)`
- Reguláris kifejezés jelentése
  - Bármilyen javascriptnek megfelelő fájl, ami:
    - Bárhol egy `__tests__` nevű mappában vagy annak almappáiban van vagy
    - A fájl neve `.spec`-el vagy `.test`-el végződik
    - Fájlok kiterjesztése az alábbi lehet:
      - js: hagyományos javascript fájl
      - ts: typescript fájl
      - jsx: react javascript fájl
      - tsx: react typescript fájl
