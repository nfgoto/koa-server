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
    async (ctx) => {
        const { state, request, response, userData } = ctx;

        try {
            return response.body = await userData;
        } catch (error) {
            ctx.throw(404, 'No user found\n' + error.message);
        }

    }

);


app.listen(PORT, () => {
    console.log(`Koa is up and running on port ${PORT}`)
}
);