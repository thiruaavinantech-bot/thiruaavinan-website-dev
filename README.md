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

When someone presses **Send enquiry**:

1. The enquiry is **emailed to info@thiruaavinantech.com** through the free FormSubmit
   service (formsubmit.co). The visitor sees "Thank you! Your enquiry has been sent."
   If sending fails, they see a message asking them to call or WhatsApp 80727 47602
   instead, and what they typed is kept.
2. Optional: it is also saved as a new row in the **Enquiries** Google Sheet (once set up below).

A hidden "honeypot" box catches spam bots: if it is filled in, the enquiry is ignored.

### One-time email activation

The **first** enquiry sent from the live website makes FormSubmit email info@thiruaavinantech.com
a message titled "Action Required: Activate FormSubmit". Open it and click **Activate Form**.
Enquiries start arriving after that (check the Spam folder the first time).
Until it is activated, visitors see the "couldn't be sent" message, so activate it before sharing the site.
To change the address, edit `ENQUIRY_EMAIL` in `assets/js/main.js`.

### Optional: one-time setup of the Google Sheet

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
- Send one test enquiry and click **Activate Form** in the FormSubmit email (see "Enquiry form").
- Optional: set up the enquiries Google Sheet and paste its URL into `SHEET_URL` (see "Enquiry form").
