# Lumen Store

Lumen is a responsive storefront demo built with React and Vite. It includes a
product catalog, shopping and checkout flow, customer account screens, and an
admin dashboard. The application uses seeded sample data and a mock API; it
does not connect to a production backend or payment provider.

## Features

- Browse a generated catalog of products and explore featured products from the
  home page.
- Search and filter products, including by category and rating.
- View product details, select available options, and check estimated delivery
  by ZIP code.
- Add products to a cart, change quantities, apply supported coupons, and walk
  through a simulated checkout.
- Use the demo sign-in and sign-up forms, view sample orders, and manage a
  wishlist in the account area.
- Explore the admin dashboard, review sample catalog and order data, and add
  products during the current session.

## Requirements

- Node.js and npm
- An internet connection to load Tailwind CSS from its CDN and to display
  externally hosted product images

This is a JavaScript/TypeScript frontend project and has no Python dependencies.
`requirements.txt` lists the npm packages for reference only; it is not a
pip-installable file. Use `npm install` to install dependencies. The
authoritative dependency manifests are `package.json` and `package-lock.json`.

## Getting started

From the project directory, install the npm dependencies and start the Vite
development server:

```sh
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser (the
default Vite development URL). If that port is in use, Vite prints the
alternate URL in the terminal. The development server supports hot module
replacement as you edit the source files.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local Vite development server. |
| `npm run build` | Create a production build in `dist/`. |
| `npm run preview` | Serve the production build locally for preview. Run `npm run build` first. |

## Production build

Build and preview the app locally:

```sh
npm run build
npm run preview
```

The generated `dist/` directory can be deployed to a static web host. Configure
the host to serve `index.html` for application routes if you add client-side
routing.

## Project structure

```text
.
|-- index.html          # HTML shell and Tailwind CDN script
|-- src/
|   |-- main.tsx        # React entry point
|   `-- App.tsx         # Storefront, account, checkout, and admin UI
|-- package.json        # npm scripts and dependencies
|-- package-lock.json   # Locked npm dependency versions
`-- requirements.txt    # Reference list of npm dependencies (not pip-installable)
```

## Demo behavior and limitations

- Product, order, and coupon data are sample data provided by the frontend.
- The mock API and checkout simulate interactions only. No real orders,
  payments, or customer accounts are created.
- App data is held in client-side React state; changes such as adding a product
  are not persisted across page reloads.
- Tailwind CSS is loaded from `https://cdn.tailwindcss.com`, so styling requires
  an internet connection. Product imagery is also hosted externally.
- Do not enter real passwords, payment details, or other sensitive information.

## Technology

- React 18
- Vite 6
- TypeScript JSX (`.tsx`)
- Lucide React icons
- Tailwind CSS via CDN
