# React Material UI Generator

> Yeoman generator for React Material UI - lets you quickly set up a project with sensible defaults and best practices.

## Usage

install `generator-react-material-ui`

```shell
npm install -g generator-react-material-ui
```

Make a new directory, and cd into it:

```shell
mkdir my-new-project && cd $_
```

Run `yo react-material-ui`:

```
yo react-material-ui $APP_TITLE
```

**Replace `$APP_TITLE`, with an actual string that represents your app's title!**

Run `gulp` to preview your app

## Generators

Available generators:

- react-material-ui
- react-material-ui:page
- react-material-ui:view
- react-material-ui:store

**Note: Generators are to be run from the root directory of your app.**

### react-material-ui

Generates an entire React application.

### react-material-ui:page

Generates a page, that you can navigate by clicking on the navigation sidebar.

This sub generator expects a name small case. If the name of the page is multi-word, use spaces to separate the words.

### react-material-ui:view

Generates a view that you can use in your page, or in other views.

### react-material-ui:store

Generates a data store class.

## Testing

Running `npm test` will run the unit tests with Jest.
