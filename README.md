# pm-keeper

A simple way to force package-manager in your project.

# usage

Add a `preinstall` script in your project's `package.json`, like this:

```json
{
  "scripts": {
    "preinstall": "npx pm-keeper npm"
  }
}
```

And force the package-manager's version

```json
{
  "scripts": {
    "preinstall": "npx pm-keeper npm@6.14.11"
  }
}
```

or

```json
{
  "scripts": {
    "preinstall": "npx pm-keeper npm 6.14.11"
  }
}
```

Of course, you can set a options in your `package.json`, like this:

```json
{
  "scripts": {
    "preinstall": "npx pm-keeper"
  },
  "pmKeeper": {
    "name": "npm",
    "version": "6.14.1" // optional
  }
}
```

have fun
