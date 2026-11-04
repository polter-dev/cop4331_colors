# Colors Lab

A small LAMP project for my course COP 4331, creating a GitHub repo to manage the contents of this folder.

This project was hosted on droplet (since replaced for another project for this course) and I had a domain from GoDaddy. 

The core of this project is a user is able to create an account or login, add names colors to a personal list and fetch results by full or partial names.

This project uses the following stack:

- **Linux:** Ubuntu server
- **Apache:** Serves as the static frontend
- **MYSQL:** Database for users and colors for each individual user.
- **PHP:** API handling
- **HTML/CSS/JS:** For front end / back end development.

## Project structure

```
cop4331_colors/
  api/
    Login.php          authenticate a user
    AddColor.php       add a color for a user
    SearchColors.php   search a user's colors
  public/
    index.html         login page
    color.html         add / search page
    css/styles.css
    js/code.js         frontend logic and API calls
    js/md5.js          hashing library (included, not currently used)
    images/background.png
  README.md
  LICENSE.md
  .gitignore
```

## Setup

1. Linux server and install Apache, SQL and PHP on the server.
2. Create the database using SQL using the two tables in this repo.
3. Create a SQL user with access to the database and put the credentials at the top of each file in `./api/`
4. Copy `./public/` to apache document
5. Copy `./api/` to `/var/www/html/LAMPAPI`
6. In `/public/js/code.js` set `urlbase` to `https://<enter-domain-here>/LAMPAPI`

## Running the application

Open `https://<enter-domain-here>/LAMPAPI` in a browser and log in with a user that exists.
Once in the color page you can do the following:

- **Add a color:** Type a name and click add color
- **Search:** for a color using a full or partial name
- **Log out:** Logout button for switching users.


## Local lint checks

Node.js is used only for development linting tools. The application still runs
on Apache, PHP, and MySQL. Use Node.js 22.22.2 or newer in the 22.x line, or
Node.js 24.15.0 or newer in the 24.x line.

Install the tools using the committed lockfile:

```bash
npm ci
```

Run all HTML, CSS, and JavaScript checks:

```bash
npm run lint
```

You can also run `npm run lint:html`, `npm run lint:css`, or `npm run lint:js`
individually. Review any automatic changes made with `npm run lint:html -- --fix`
or `npm run lint:css -- --fix`, then rerun the checks for remaining issues.

Commit `package.json`, `package-lock.json`, and the lint configuration files.
Do not commit `node_modules/` or generated lint reports.

## Assumptions

- There is no security to this page so assume that breaches can occur
- Passwords are in plain text
- `urlbase` and `code.js` is hardcoded so change for each deployment
- The program does not account for new accounts

## LICENSE

This project is licensed under MIT, see [LICENSE](license)

