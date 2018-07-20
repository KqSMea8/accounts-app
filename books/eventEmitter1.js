class EventEmitter {
    constructor() {
        this._event = {}
    }

    on(eventName, handler) {
        let events = this._event[eventName];
        if (events) {
            events.push(handler)
        } else {
            this._event[eventName] = [handler]
        }
    }

    off(eventName, handler) {
        let events = this._event[eventName];
        if (events) {
            this._event[eventName] = events.filter(event => event !== handler)
        }
    }

    once(eventName, handler) {
        let that = this;
        function func() {
            var args = Array.prototype.slice.call(arguments, 0);
            handler.apply(that, args);
            this.off(eventName, func)
        }
        this.on(eventName, func);
    }

    emit(eventName) {
        var events = this._event[eventName];
        var otherArgs = Array.prototype.slice.call(arguments, 1);
        var that = this;
        if (events) {
            events.forEach(event => event.apply(that, otherArgs))
        }
    }

    emit(eventName, ...args) {
        const events = this._event[eventName];
        if (events && events.length) {
            for (const event of events) {
                event(...args)
            }
        }
    }
}

class EventEmitter {
    constructor() {
        this._event = {}
    }

    on(eventName, handler) {
        let events = this._event[eventName];
        if (events) {
            events.push(handler)
        } else {
            this._event[eventName] = [handler]
        }
    }

    off(eventName, handler) {
        let events = this._event[eventName];
        if (events) {
            this._event[eventName] = events.filter(event => event !== handler)
        }
    }

    once(eventName, handler) {
        const that = this;
        function func() {
            const args = Array.prototype.slice.call(arguments, 0);
            handler.apply(that, args);
            this.off(eventName, func)
        }
        this.on(eventName, func)
    }

    emit(eventName) {
        const events = this._event[eventName];
        const otherArgs = Array.prototype.slice.call(arguments, 1);
        const that = this;
        if (events && events.length) {
            events.forEach(event => event.apply(that, otherArgs));
        }
    }

    emit(eventName, ...args) {
        const events = this._event[eventName];
        if (events && events.length) {
            for (const event of events) {
                event(...args)
            }
        }
    }
}