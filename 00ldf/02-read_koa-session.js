const CONTEXT_SESSION = Symbol('context#contextSession');
const _CONTEXT_SESSION = Symbol('context#_contextSession');

class ContextSession {

    constructor(ctx) {
        this.ctx = ctx
    }

    get() {
        console.log("[_CONTEXT_SESSION] get ")
        console.log("this.session ",this.session)
        if(this.session == null){
            this.session = {}
        }
        return this.session
    }

    set(val) {
        console.log(`1111${this.externalKey}:${val}`)
        console.log("[_CONTEXT_SESSION] set ")
    }
}


let context = {
    say(){
        console.log("hello worod")
    }
}
Object.defineProperties(context, {
    [CONTEXT_SESSION]: {
        get() {
            console.log("[CONTEXT_SESSION] get ")
            if (this[_CONTEXT_SESSION]) return this[_CONTEXT_SESSION];
            this[_CONTEXT_SESSION] = new ContextSession(this);
            return this[_CONTEXT_SESSION];
        },
    },
    session: {
        get() {
            console.log("session get ")
            return this[CONTEXT_SESSION].get();
        },
        set(val) {
            console.log("session set ")
            this[CONTEXT_SESSION].set(val);
        },
        configurable: true,
    },
    sessionOptions: {
        get() {
            return this[CONTEXT_SESSION].opts;
        },
    },
});



context.say(); //ljx say hello



// console.log(context.session);
context.session.name = "ldf"

// console.log(context.session);