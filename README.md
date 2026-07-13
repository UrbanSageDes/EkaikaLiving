# Ekaika Living

A static, no-build website for Ekaika Living — hand block-printed home linens (bedsheets, quilted bedcovers, cushion covers).

Plain HTML, CSS and vanilla JavaScript throughout. No framework, no npm dependencies, no build step.

## Project structure

```
index.html              Homepage
collection.html         Full product listing, with filter tabs + sort
product.html            Product detail page (reads ?slug=... and pulls data from assets/products.js)
bag.html                Shopping bag / cart
checkout.html           Checkout confirmation placeholder
wishlist.html           Saved / wishlist page

about.html, contact.html, faq.html, sizing-guide.html,
care-instructions.html, shipping-returns.html, track-order.html,
privacy-policy.html, terms-of-use.html                  Content pages

assets/products.js      Single source of truth for the product catalog
assets/store.js         Shared cart / wishlist / search logic (uses localStorage)
assets/base.css         Shared styles for header, footer and content pages
assets/shared.css       Additional shared styles

bs-*/                    Bedsheet product photos
cc-*/                    Cushion cover product photos
```

Every page is self-contained HTML with its own `<style>` block for page-specific layout. Anything shared across pages (cart, wishlist, search, product data, header/footer styling) lives in `assets/`.

## Getting it running on your own machine

### 1. Clone the repo

```bash
git clone https://github.com/akshat12kapoor-rgb/EKAIKA.git
cd EKAIKA
```

### 2. Serve it locally

This is a static site with no build step, but it should be served over `http://`, not opened directly as a `file://` URL. Pick whichever you have installed:

```bash
# Python (usually already installed on macOS/Linux)
python3 -m http.server 8000

# or Node
npx serve .
```

Then open `http://localhost:8000` in your browser.

### 3. Make changes

- **Edit a page directly** — every `.html` file is self-contained; there's no templating layer.
- **Add, edit or remove a product** in `assets/products.js`. Each product is one object in the `PRODUCTS` array (slug, category, price, sizes, description, image list, etc.). Every page that shows products (home, collection, product detail, bag, wishlist) reads from this one file, so you only ever need to edit it in one place.
- **Product photos** live in folders named `bs-<name>` (bedsheets) or `cc-<name>` (cushion covers) — point a product's `folder` field at the matching directory.
- **Cart / wishlist / search behavior** lives in `assets/store.js`.
- **Shared styling** (header, footer, buttons, etc. used across content pages) lives in `assets/base.css` and `assets/shared.css`.

### 4. Push your changes to GitHub

```bash
git status                          # see what changed
git add <files-you-changed>         # stage them
git commit -m "Describe what changed"
git push
```

If you're working on a feature or fix you don't want to land on `main` directly, branch off first:

```bash
git checkout -b my-change
git push -u origin my-change
```

then open a pull request on GitHub.
