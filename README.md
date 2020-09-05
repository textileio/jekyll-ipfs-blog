Jekyll Blog published with IPFS (PR)
===============================

This repo provides an example setup to publish your Jekyll project on IPFS and mirror those changes over a freely provided or custom domain name.

# Install the Textile CLI

You'll need to install Textile on your local machine. To do so, download the binary for your computer here, [https://github.com/textileio/textile/releases/latest](https://github.com/textileio/textile/releases/latest).

_Apple users: Textile is not signing the build with Apple developer keys, you'll need to authorize the app to run in your security settings. Download the Darwin build and go through the install steps (untar, cd, `./install`). Next, run a Textile command once, e.g. `textile --help`. This will fail due to permissions. Go to System Preferences -> Security. In the bottom right, click to allow Textile to run anyway. Run `textile --help` again, confirm your decision, and you'll not be prompted again._

# Create a Textile login and team

Textile uses passwordless login for all users, giving them remote IPFS pinning for their projects.

`textile login`

Follow the instructions.

`textile whoami`

Should now show you your account. If you think you'll want to collaborate with others, you should create a team and then enter you team before creating projects and buckets.

`textile team add <NAME>`

Followed by

`textile switch`

# Initialize a Textile Project

All Buckets are part of Projects. To make Project management easy, you can initialize a Project in the any directory. Then, each time you are working in that directory with Textile, it will know which project it is working with.

`cd <JEKYLL PROJECT DIRECTORY>`

`textile project init <UNIQUE PROJECT NAME>`

This will create a file `./.textile/config.yml`. If you are using Git, you should commit this file to your code history.

# Push your Jekyll build to a Bucket

First, you should build your Jekyll for production.

`jekyll build`

By default, this will build your site in the `_site` directory. This is the directory you will push to a Bucket. 

`textile bucket push _site/* <UNIQUE BUCKET NAME>`

That's it! You now have the contents of your `_site` folder pinned to a remote IPFS node. You can explore the data using the data explorer. Your Bucket URL can be found using,

`https://cloud.textile.io/dashboard/<PROJECT NAME>/<BUCKET NAME>`

Your site will be rendered on the Gateway. You can view your live site using the URL,

`https://<BUCKET NAME>.textile.cafe/`

# Add Continuous Integration

If you are using GitHub, you can use GitHub Actions to update your Bucket automatically now. Here's how you can do it. 

### Setup your Textile permissions

1. Get your Auth token. You're account auth token can be found at `$HOME/.textile/auth.yml`. That file will contain the string `token:<YOUR_PRIVATE_TOKEN>. Copy that value. 
2. Add a Secret to your GitHub project. Go to your GitHub project. Click Settings. Click Secret. Add a secret named, `TEXTILE_AUTH_TOKEN`. For the value, enter the string from `YOUR_PRIVATE_TOKEN` above.
3. Be sure you've committed and pushed the `.textile/config.yml` folder and file to your GitHub project. 

### Add GitHub Actions

Textile curates a few Actions in the GitHub Marketplace. If your site uses the default Jekyll build settings, this step should be easy. 

1. Download this repo.
2. Copy the contents of `.github/` into your own GitHub repo in the same location (i.e. `.github/` -> `.github/`).
3. In each of the four YML files created above, change the value `BUCKET_NAME: 'jekyll-ipfs-blog'` from `jekyll-ipfs-blog` to the Bucket name you created above.
4. Add and commit these new files to your repo. Push the changes to GitHub.

Now, all new changes to your Master branch will udpate your primary Bucket. In addition, you can use ephemeral Buckets created for each of your PRs so you can view and review your website changes before pushing them live.

If you want to update your custom domain using your new IFPS content, follow the [Cloudflare DNSLink setup instructions here](https://blog.textile.io/ethden-using-ci-to-publish-your-webpage-using-ipfs-and-textile-buckets/).

