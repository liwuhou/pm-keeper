# pm-keeper

A keeper of package manager. Make sure a specific version and package manager to be used in project.

# usage

Add a `preinstall` script in your project's `package.json`.

```json
{
  "scripts": {
    "preinstall": "npx pm-keeper"
  }
}
```

And Add a `pmKeeper` options in ypur `package.json`.

```json
{
  "pmKeeper": {
    "name": "npm", // package manager name
    // "version": "6.14.1" // package manager version
  }
}
```

enjoy