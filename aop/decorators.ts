import {hasPermissions, registerSharedComponent, setLoading, SharedComponent} from "../intro";

// class decorator
export function registerInstances(target: new(...args) => SharedComponent) {
    return class extends target {
        constructor() {
            super();
            registerSharedComponent(this);
        }
    }
}

// method decorator factory
export function defaultOnError<T>(value: T): MethodDecorator {
    return (target, propertyKey) => {
        const original = target[propertyKey] as Function;
        target[propertyKey] = async (...args) => {
            try {
                return await original(...args);
            } catch {
                return value;
            }
        };
    };
}

// parameter decorator factory
export function notNull(): ParameterDecorator {
    return (target, propertyKey, parameterIndex) => {

    };
}

export function showLoading(): MethodDecorator {
    return (target, propertyKey) => {
        const original = target[propertyKey] as Function;
        target[propertyKey] = async (...args) => {
            setLoading(true)
            const res = await original(...args);
            setLoading(false);
            return res;
        };
    };
}

export function adminPermissions(): MethodDecorator {
    return (target, propertyKey) => {
        const original = target[propertyKey] as Function;
        target[propertyKey] = (...args) => {
            if (!hasPermissions('admin'))
                throw 'no permissions';

            return original(...args);
        };
    };
}
