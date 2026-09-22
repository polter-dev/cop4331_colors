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


## Assumptions

- There is no security to this page so assume that breaches can occur
- Passwords are in plain text
- `urlbase` and `code.js` is hardcoded so change for each deployment
- The program does not account for new accounts

## LICENSE

This project is licensed under MIT, see [LICENSE](LICENSE)

