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

// cacscading middleware pattern

// log middleware
app.use(
    async (ctx, next) => {
        // pass to next middleare
        await next();

        const responseTime = ctx.response.get('X-Response-Time');
        console.log(`${ctx.request.method} ${ctx.request.url} - ${responseTime} `);
    }
);

app.use(
    async (ctx, next) => {
        const responseTime = ctx.response.get('X-Response-Time');
        const start = Date.now();

        // pass to next middleare
        await next();

        const duration = Date.now() - start;
        ctx.set('X-Response-Time', `${duration}ms`);

        console.log(`${ctx.request.method} ${ctx.request.url} - ${responseTime} `);
    }
);

app.use(
    async (ctx) => {
        ctx.response.body = await ctx.userData;
    }
);




app.listen(PORT, () => {
    console.log(`Koa is up and running on port ${PORT}`)
}
);