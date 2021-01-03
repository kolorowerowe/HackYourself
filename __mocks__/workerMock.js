class Worker {
    constructor() {
        this.onmessage = () => {};
    }

    postMessage(msg) {
        this.onmessage(msg);
    }

    addEventListener(){

    }
}

module.exports = Worker;
