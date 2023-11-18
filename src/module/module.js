class baseModule {
    constructor(data, message) {
        if (typeof data === 'string') {
            this.message = data;
            this.data = null;
        }
        if (data) {
            this.data = data;
        }
        if (message) {
            this.message = message;
        }
    }
}

class successModule extends baseModule {
    constructor(data, message) {
        super(data, message);
        this.errno = 0;
    }
}

class errnoModule extends baseModule {
    constructor(data, message) {
        super(data, message);
        this.errno = -1;
    }
}

module.exports = { successModule, errnoModule };