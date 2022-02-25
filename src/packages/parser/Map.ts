export class Map<V> {
    private map: {[key: string]: V} = {}

    get(key: string): V | boolean {
        if (!this.has(key))
            return false

        return this.map[key]
    }

    set(key: string, value: V): void {
        this.map[key] = value
    }

    has(key: string): boolean {
        return (typeof this.map[key] !== "undefined")
    }

    count(): Number {
        return Object.keys(this.map).length
    }
}
