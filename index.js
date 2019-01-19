const Koa = require('koa');
const app = new Koa();
const PORT = 3210;

// add a field to the the context object
app.context.linuxDate = Date.now();
app.context.humanReadableDate = Date();
app.context.userData = {
    firstname: 'Florian',
    lastname: 'GOTO',
    get fullname() {
        return `${this.firstname} ${this.lastname}`
    }

}

// response handler
app.use(
    // ctx = main object containing req and res objects
    ctx => {
        const { state, request } = ctx;
        // use state
        state.user = 'Florian';

        // using request object
        const method = request.method;
        let from = request.origin;
        
        console.log(`${method} ${from}`)

        // print to browser, body is alias for ctx.response.body
        ctx.body = `Welcone to Koa, ${ctx.userData.fullname}! 
        It is ${ctx.linuxDate} aka ${ctx.humanReadableDate}`;
    }

);


app.listen(PORT, () => {
    console.log(`Koa is up and running on port ${PORT}`)
}
);