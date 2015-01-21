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

Run `yo react-material-ui` with a project name:

```shell
yo react-material-ui <projectName>
```

Run `gulp` to build your app

Run `gulp develop` to **build** your app, **serve** it up in your web browser, and **watch** it for changes.

## Generators

Available generators:

- react-material-ui
- react-material-ui:page
- react-material-ui:view
- react-material-ui:store

**Note: Generators are to be run from the root directory of your app.**

### react-material-ui

```shell
yo react-material-ui <appName>
```
Generates an entire React application.

### react-material-ui:page

```shell
yo react-material-ui:page <pageName> '<Page Title>'
```

Generates a page, that you can navigate by clicking on the navigation sidebar.

This sub generator expects a page name with no spaces. 
***If the title of the page uses spaces to separate the words, enclose the title in quotes***.

### react-material-ui:view

```shell
yo react-material-ui:view <viewName>
```

Generates a view that you can use in your page, or in other views.

### react-material-ui:store

```shell
yo react-material-ui:store <storeName>
```
Generates a data store class.

## Testing

Running `npm test` will run the unit tests with Jest.
