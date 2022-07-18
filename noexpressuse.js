const http=require('http')
const {readFileSync}=require('fs')

const theform=readFileSync('./htmlcssthings/index.html')
const thestyle=readFileSync('./htmlcssthings/style.css')

const server=http.createServer((req,res)=>{
    let urlParams = req.url.split('/');
    let alias = urlParams[1];
    console.log(urlParams);
    switch (alias) {
        case '':
            res.end('Welcome to our homepage');
            break;
        case 'form':
            res.writeHead(200, { 'content-type': 'text/html' })
            res.write(theform)
            res.end()
            break;
        case 'style.css':
            res.writeHead(200, { 'content-type': 'text/css' })
            res.write(thestyle)
            res.end()
            break;
        default:
            res.end(`
                <h1>oops</h1>
                <p>this page - ${alias} does not exist</p>
                <a href="/">back home</a>
            `);
            // res.end(alias);
            break;
    }

})

server.listen(5000)