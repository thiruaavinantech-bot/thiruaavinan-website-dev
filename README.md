# Thiru Aavinan Technologies — Website (development version)

Business website for **Thiru Aavinan Technologies**, Palani, Tamil Nadu —
Gen AI Academy, Financial Solutions, Business Solutions and Common E-Services.

This is the **development version**: a static site made with plain HTML, CSS and JavaScript
(no frameworks, no build tools).

## Folder layout

```
index.html                  ← page content (English + Tamil text)
assets/
  css/style.css             ← all design: colours, layout, animations, mobile view
  js/main.js                ← behaviour: menu, language switch, terminal, countdown, effects
  images/
    logo-full-transparent.png  ← header/footer logo (see-through background)
    logo-icon.png              ← favicon / phone home-screen icon
content/logo/               ← original logo files (keep untouched)
```

## Run it on your computer

Open `index.html` in a browser, or start a small local server in this folder:

```
python -m http.server 5500
```

then visit http://localhost:5500

## Still to do before going live

- Replace placeholder phone number, email, address and WhatsApp number (`+91 XXXXX XXXXX`, `info@yourdomain.in`, `wa.me/91XXXXXXXXXX`).
- Have a Tamil speaker review the Tamil translations.
- Connect the enquiry form to a real destination (WhatsApp, Google Form or email).
