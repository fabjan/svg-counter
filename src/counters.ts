export default function counters(ns: KVNamespace) {
    return {
        async inc(name: string, amount: number = 1): Promise<number> {
            const before = await this.get(name);
            const after = before + amount;
            await this.set(name, after);
            return after;
        },

        async get(name: string): Promise<number> {
            return await ns.get<number>(name, 'json') || 0;
        },

        async set(name: string, value: number): Promise<void> {
            return await ns.put(name, '' + value);
        },
    }
}
