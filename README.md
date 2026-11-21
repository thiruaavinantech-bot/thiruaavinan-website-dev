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
  js/main.js                ← behaviour: menu, language switch, terminal, enquiry form, effects
  images/
    logo-full-transparent.png  ← header/footer logo (see-through background)
    logo-icon.png              ← favicon / phone home-screen icon
content/logo/               ← original logo files (keep untouched)
google-apps-script/enquiries.gs ← saves enquiries to a Google Sheet (see below)
```

## Run it on your computer

Open `index.html` in a browser, or start a small local server in this folder:

```
python -m http.server 5500
```

then visit http://localhost:5500

## Enquiry form

When someone presses **Send on WhatsApp**:

1. The enquiry is saved as a new row in the **Enquiries** Google Sheet (once set up below),
   so it is kept even if the visitor never sends the WhatsApp message.
2. WhatsApp opens with the enquiry typed in, addressed to 80727 47602. The visitor taps Send.

### One-time setup of the Google Sheet

1. Go to https://sheets.new and name the sheet "Website enquiries".
2. Click **Extensions → Apps Script**. Delete the sample code and paste in the whole of
   `google-apps-script/enquiries.gs`. Click **Save**.
3. Click **Deploy → New deployment**. Under "Select type" choose **Web app**.
   Set **Execute as: Me** and **Who has access: Anyone**. Click **Deploy**
   and allow access with your Google account.
4. Copy the **Web app URL** (it ends in `/exec`).
5. In `assets/js/main.js`, paste it between the quotes of `const SHEET_URL = '';`
6. Send a test enquiry from the website — a new row appears in the "Enquiries" tab.

If you change the script later, use **Deploy → Manage deployments → Edit → New version**
so the same URL keeps working.

## Still to do before going live

- Have a Tamil speaker review the Tamil translations.
- Set up the enquiries Google Sheet and paste its URL into `SHEET_URL` (see "Enquiry form").
