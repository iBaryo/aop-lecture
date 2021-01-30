import {execTime} from "utils-decorators";
import {adminPermissions, defaultOnError, notNull, registerInstances, showLoading} from "./decorators";
import {MyComponent} from "../intro";

@registerInstances
class MyAOPComponent extends MyComponent {
    @execTime()
    @adminPermissions()
    @defaultOnError(0)
    @showLoading()
    public async work(@notNull() value: number) {
        return new Promise<number>(r => setTimeout(() => r(value + 1), 1000));
    }
}
