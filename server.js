import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Hello from './src/components/hello';
import Transmit from 'react-transmit';

const port = 3000;
function handleRender(req, res) {
  // 把 Hello 组件渲染成 HTML 字符串
  const html = ReactDOMServer.renderToString(<Hello />);
  
  Transmit.renderToString(Hello).then(({reactString, reactData}) => {
    fs.readFile('./src/helpers/index.html', 'utf8', function (err, data) {
      if (err) throw err;

      const document = data.replace(/<div id="app"><\/div>/, `<div id="app"><section role="main" class="react-container"><div>${reactString}</div></section></div>`);
      const output = Transmit.injectIntoMarkup(document, reactData, ['/static/dist/client.js']);

      res.send(document);
    });
  });
}

const app = express();

// Serve built files with static files middleware
app.use('/dist', express.static(path.join(__dirname, 'static/dist')));

// Serve requests with our handleRender function
app.get('*', handleRender);

// Start server
app.listen(port);
console.log('===> Open http://%s:%s', 'localhost', port);