# RAC — Investor site (`rac-website`)

Vue 3 + [Quasar v2](https://quasar.dev/) SPA used as an investor-facing microsite (project, invest, roadmap pages).

## Requirements

Versions are enforced in `package.json` under `engines`. Use a matching **Node** runtime before installing dependencies.

| Tool   | Supported versions |
|--------|--------------------|
| **Node.js** | **22.12+** (22.x), or **24.x**, **26.x**, **28.x** |
| **npm** | **≥ 6.13.4** (ships with Node; use current LTS npm when possible) |
| **pnpm** | **≥ 10.0.0** (optional) |
| **Yarn** | **≥ 1.21.1** (optional) |

Examples that satisfy the engine range: **22.20**, **24.x**, **26.x**, **28.x**.  
Node **22.0–22.11** is **not** listed in `engines` and may fail `npm install` if strict engine checks are enabled.

Check your versions:

```bash
node -v   # e.g. v22.20.0 or v24.x.x
npm -v
```

## Quasar CLI — do I need to install it?

**No global install is required** for normal work on this repo.

After dependencies are installed, the Quasar CLI from **`@quasar/app-vite`** (devDependency) is available as:

- **`npm run dev`** — development server  
- **`npm run build`** — production build  

Those scripts run the local `quasar` binary from `node_modules/.bin`.

**Optional:** install the global CLI if you want the `quasar` command everywhere in your shell:

```bash
npm install -g @quasar/cli
```

Then you can run `quasar dev` / `quasar build` from the project root instead of `npm run …`. Functionally it is the same as using the npm scripts after `npm install`.

## Install dependencies

```bash
npm install
```

Or, if you use pnpm / Yarn and meet the `engines` versions:

```bash
pnpm install
# or
yarn
```

`postinstall` runs `quasar prepare` (Quasar project setup).

## Development

```bash
npm run dev
```

Opens the Quasar dev server (see `quasar.config.js` → `devServer`).

## Production build

```bash
npm run build
```

Output is written under `dist/spa/` by default.

## Configuration

- **Quasar / Vite:** [quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js) in the project root  
- **Site copy / contact:** `src/constants/site.js`  
- **Routes:** `src/router/routes.js`

## More documentation

- [Quasar Framework v2](https://v2.quasar.dev/)  
- [Vue 3](https://vuejs.org/)
