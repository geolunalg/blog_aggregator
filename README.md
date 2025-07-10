# Blog Aggregator

The Blog Aggregator allows users to track blog feeds from the internet. Users can register to follow feed(s), retrieve their content, and store it locally to read at their convenience later.

## Requirements:
- [Node Version Manager (NVM)](#node-version-manager)
- [NodeJS](#nodejs)
- [PostgreSQL Database](#postgres-database)
- [Database Setup](#database-setup)

### Node Version Manager

Node Version Manager (NVM) is a Node.js version manager. It allows users to install different versions of Node.js. The current Node.js version for this project is specified in the `.nvmrc` file in the root directory.

To install NVM, follow the instructions for your operating system: 
- [Windows NVM](https://github.com/coreybutler/nvm-windows)
- [Linux/Mac NVM](https://github.com/nvm-sh/nvm)

Once you have installed NVM, run the following commands to install and activate the Node.js version for this project:

```

nvm install
nvm use
node --version # should return the active version

```

### NodeJS

After installing NVM and activating the correct version of Node.js, install the required modules by running:

```

npm install

```

### PostgreSQL Database

PostgreSQL is used to store data regarding the user's registered feeds. Install PostgreSQL using the appropriate command for your operating system:

**Mac with Homebrew:**
```

brew install postgresql\@16

```

**Linux/WSL:**
```

sudo apt update
sudo apt install postgresql postgresql-contrib

```

> **Windows**: You’ll need an installer. You can get one [here](https://www.postgresql.org/download/windows/). The remaining instructions focus on Linux systems.

Set the Postgres password:
```

sudo passwd postgres

```

You will be prompted to enter a password. Set something memorable (e.g., `password`).

Start the server:
```

sudo service postgresql start

```

### Database Setup

Once PostgreSQL is installed and running, you need to create the database schema and set the database configuration file.

Copy and paste the following into a file called `.gatorconfig.json` located in your home directory (e.g., `/home/username/.gatorconfig.json` or `~/.gatorconfig.json`):

```

{
"db\_url": "postgres\://<username>:<password>@localhost:5432/gator?sslmode=disable",
"current\_user\_name": "current\_user"
}

```

Replace `<username>` and `<password>` accordingly.

From the root of the project, run the following commands:

```

npm run generate
npm run migrate

```

This will create your database schema, and you should be ready to use the app.

## Using the App:

- Register a User: `npm run start register <username>`
- Login: `npm run start login <username>`
- List All Users: `npm run start users`
- List All Blog Feeds: `npm run start feeds`
- Follow a Blog Feed: `npm run start follow <url_to_blog_feed>`
- Unfollow a Feed: `npm run start unfollow <url_to_blog_feed>`
- Add a Blog Feed: `npm run start addfeed "<feed_name>" "<url_to_blog_feed>"`
- View Followed Feeds (Logged-In User): `npm run start following`
- Store Blog Feeds: `npm run start agg <timeframe>`
- Display Blog Feeds: `npm run start browse <number>`

> `timeframe` must be a number with a unit: `ms`, `s`, `m`, or `h` (e.g., `1m`)
