const express = require('express');
const app = express();

app.use(express.static('./dist/TodoApp'));

app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/TodoApp/'});
});

app.listen(process.env.PORT || 8081);