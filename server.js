import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Hello from './src/components/hello';
import Transmit from 'react-transmit';

const port = 8002;

function handleRender(req, res) {
  const html = ReactDOMServer.renderToString(<Hello />);
  Transmit.renderToString(Hello).then(({ reactString, reactData }) => {
    fs.readFile('./src/helpers/index.html', 'utf8', function (err, data) {
      if (err) throw err;
      // 把渲染后的 React HTML 插入到 div 中 
      const document = data.replace(/<div id="app"><\/div>/, `<div id="app"><section role="main" class="react-container"><div>${reactString}</div></section></div>`);
      const output = Transmit.injectIntoMarkup(document, reactData, ['/static/dist/client.js']);

      // 把响应传回给客户端
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