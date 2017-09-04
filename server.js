var express = require('express');
var morgan = require('morgan');
var path = require('path');

var Pool=require('pg').Pool;

var config={
    user:'kondlechandrahas',
    database:'kondlechandrahas',
    host:'db.imad.hasura.io',
    port:'5432',
    password:process.env.DB_PASSWORD,
};
var app = express();
app.use(morgan('combined'));

var articles={
    'article-one':{
    title: 'Article-one | chandu',
    heading:'Article one',
    date:'aug 4,2017',
    content:`<p>
             this is my first article.this is my first article.this is my first article.this is my first article.this is my first article
             .this is my first article.this is my first article.this is my first article.this is my first article.this is my first article.
            </p>
            <p>
             this is my first article.this is my first article.this is my first article.this is my first article.this is my first article
             .this is my first article.this is my first article.this is my first article.this is my first article.this is my first article.
            </p>
            <p>
             this is my first article.this is my first article.this is my first article.this is my first article.this is my first article
             .this is my first article.this is my first article.this is my first article.this is my first article.this is my first article.
            </p>`,
},
    'article-two':{
    title: 'Article-two | chandu',
    heading:'Article two',
    date:'aug 5,2017',
    content:`<p>
                this is my second article.this is my second article.this is my second article.this is my second article.this is my second article    .this is my second article.this is my second article.this is my second article.
            </p>
            <p>
                this is my second article.this is my second article.this is my second article.this is my second article.this is my second article    .this is my second article.this is my second article.this is my second article.
            </p>`,
},
    'article-three':{
    title: 'Article-three | chandu',
    heading:'Article three',
    date:'aug 6,2017',
    content:`<p>
                this is my third article.this is my third article.this is my third article.this is my third article.this is my third article.this is my third article.this is my third article.this is my third article.this is my third article.
            </p>`,
},
};

function createTemplate(data){
    var title=data.title;
    var date=data.date;
    var content=data.content;
    var heading=data.heading;
var htmlTemplate=`
    <html>
    <head>
       <title>
            ${title}
        </title>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <link href="/ui/style.css" rel="stylesheet" /> 
    </head>
    <body>
        <div class="container">
            <div>
                <a href="/">Home</a>
            </div>
            <hr/> 
            <h3>
                ${heading}
            </h3>
            <div>
                <p>
                    ${date}
                </p>
            </div>
            <div>
                    ${content}
            </div>        
        </div>
    </body>
</html>
`;
return htmlTemplate;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter=0;
app.get('/counter', function(req, res) {
    counter=counter + 1;
    res.send(counter.toString());
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

var pool=new Pool(config);
app.get('/test-db', function(req,res){
    pool.query('SELECT * FROM test',function(err,result){
        if(err)
        res.status(500).send(err.toString());
        else
        res.send(JSON.toString(result));
    });
});
app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/:articleName', function (req, res) {
    var articleName=req.params.articleName;
  res.send(createTemplate(articles[articleName]));
});




// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
