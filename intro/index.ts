export interface SharedComponent {
    work(value: number): Promise<number>;
}

export class MyComponent implements SharedComponent {
    public async work(value: number) {
        return new Promise<number>(r => setTimeout(() => r(value + 1), 1000));
    }
}




(async () => {
    console.log(
        await new MyComponent().work(41)
    );
})();

/*
add:
 1. register component in shared-components runtime
 2. log the return value
 3. default when exception
 4. validate argument not null
 5. enter loading state
 6. validate permissions
 7. measure performance
*/

export function registerSharedComponent(cmp: SharedComponent) {}

export function hasPermissions(role: 'admin' | 'guest'): boolean {
    return true;
}

export function setLoading(isLoading: boolean): void {
    console.log(isLoading ? `start loading` : `stop loading`);
}





class MyFullComponent extends MyComponent{
    constructor() {
        super();
        registerSharedComponent(this);
    }

    public async work(value: number) {
        if (isNaN(value))
            throw `invalid value: ${value}`;

        if (!hasPermissions('admin'))
            throw `invalid permissions`;

        const startTime = new Date();
        setLoading(true);
        let res: number = 0;
        try {
            res = await new Promise<number>(r => setTimeout(() => r(value + 1), 1000));
        } catch (e) {
            console.error(`error:`, e);
        }
        console.log(`the result is `, res);

        console.log(`it took: `, Date.now() - startTime.getTime());
        setLoading(false);
        return res;
    }
}
