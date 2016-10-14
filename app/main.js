require.config({
  baseUrl: "app/lib",
  paths: {
    "react": "react-with-addons",
    "JSXTransformer": "JSXTransformer",
    "Tools": "Tools",
    "com":'../components/jsx',
    "db":'../db'
  },
  jsx: {
    fileExtension: '.jsx',
    harmony: true,
    stripTypes: true
  }
});

require(['react', 'jsx!com/Main'], function(React,Main) {
  Main = React.createFactory(Main);
  React.render(Main(),document.getElementById('app'));
});
