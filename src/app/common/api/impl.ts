export class Impl {
    protected static printAPIDetail(target: Function, key: string, value: any) {
        return {
            value: function (...args: any[]) {
                let result = value.value.apply(this, args);
                let r = JSON.stringify(result);
                console.log(`API ${args[0].constructor.name}::${key} => `, args[0]);
                return result;
            }
        };
    }
}
