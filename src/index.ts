import * as DI from "./packages/di";
import {AutoRuListParser} from "./packages/auto.ru/parser/AutoRuListParser";
import {AsyncPool} from "./packages/worker/AsyncPool";
import {Job, nextJob} from "./packages/parser/Job";

let queue = DI.urlQueue();
queue.add(new AutoRuListParser(
    'https://auto.ru/moskva/cars/used/?year_from=2013&catalog_filter=mark%3DKIA%2Cmodel%3DCERATO&catalog_filter=mark%3DKIA%2Cmodel%3DSORENTO'
));

(async () => {
    let threadPool = new AsyncPool();
    await threadPool.run({
        threadsCount: 10
    }, nextJob)

    console.log(queue.getParsedUrlsCount())
})()


//
// setTimeout(() => {console.log(queue)}, 3000)

// let promiseMap: {[id: number]: Promise<number>} = {
//     1: new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
//     2: new Promise((resolve, reject) => setTimeout(() => resolve(2), 500)),
//     3: new Promise((resolve, reject) => setTimeout(() => resolve(3), 100))
// };
//
// let arr: Promise<number>[] = [];
// (async () => {
//     do {
//         arr = [];
//         for (const key in promiseMap)
//             arr.push(promiseMap[key])
//
//         let promise = Promise.race(arr);
//         let val = await promise;
//
//         console.log(val)
//         arr = arr.filter(el => el != promise)
//         delete promiseMap[val]
//     } while (arr.length)
// }) ()


// try {
//     let promise = new Promise((resolve, reject) => {
//         throw new Error('Unknown error')
//     })
//         .catch((err: Error) => {
//             console.log(err.message)
//         })
//
// } catch (e) {
//     console.log(e)
// }


// type TreeNode = {
//     value: string
// }
//
// type LeafNode = TreeNode & {
//     isLeaf: true
// }
// type InnerNode = TreeNode & {
//     children: [TreeNode] | [TreeNode, TreeNode]
// }
//
// let a: TreeNode = {value: 'v1'}
// let b: LeafNode = {value: 'v2', isLeaf: true}
// let c: InnerNode = {value: 'v3', children: [a, b]}
//
// function mapNode<T extends TreeNode>(arr: T[], f: (v: string) => string): T[] {
//     let result: T[] = [];
//     for (let i = 0; i < arr.length; i++) {
//         result.push({
//             ...arr[i],
//             value: f(arr[i].value)
//         });
//     }
//
//     return result;
// }
//
// let a1 = mapNode([a], _ => _.toUpperCase());
//
// console.log('-------------------------------------------------------------------------');
// // ----------- Пример 2
//
// function myCall<T extends unknown[], R>(
//     f: (...args: T) => R,
//     ...args: T
// ): R {
//     return f(...args);
// }
//
// console.log('-------------------------------------------------------------------------');
// // ------------------- задание 1
//
// function myCallSecondStringArg<T extends unknown[], R, U>(
//     f: (arg1: U, s: string, ...args: T) => R,
//     arg1: U, s: string, ...args: T
// ): R {
//     return f(arg1, s, ...args);
// }
//
// function myLog(v: number) {
//     console.log(v)
// }
//
// function logNumber(v: number, mess: string) {
//     console.log(v, mess)
// }
//
// function logNumberWith2Mess(v: number, mess1: string, mess2: string) {
//     console.log(v, mess1, mess2)
// }
//
// myCallSecondStringArg(logNumber, 1, '1')
// myCallSecondStringArg(logNumberWith2Mess, 1, '1', '2')
//
// // ---------------- задание 2
//
// function is<T>(a: T, b: T, ...args: T[]): boolean {
//     let res: boolean = true;
//
//     args.push(a)
//     args.push(b)
//
//     for (let i = 0; i < args.length; i++) {
//         if (!_.isEqual(a, args[i])) {
//             res = false;
//         }
//     }
//
//     return  res;
// }
//
// console.log(is('string', 'otherstring'));
// console.log(is(true, false));
// console.log(is(42, 42));
// console.log(is([1], [1, 2], [1, 2, 3]));
// console.log(is([1], [1], [1]));
//
// // ----------------- задание 3
//
// type Reservation = string
//
// type Reserve = {
//     (from: Date, to?: Date, destination?: string): Reservation
//     (from: Date, destination?: string): Reservation
//     (from: Date): Reservation
// }
//
// // ------------------ эксперимент с интерфейсами
//
// interface animal {
//     eat(food: string): void
//     sleep(hours: number): void
// }
//
// class Cat implements animal {
//     private readonly _name = 'animal';
//
//     eat(food: string) {
//         console.log('Ate some', food, '. Mmm!');
//     }
//
//     sleep(hours: number) {
//         console.log('Slept for', hours, 'hours');
//     }
//
//     get name(): string {
//         return this._name;
//     }
// }
//
// // ---------------------- эксперимент с примесями
// type ClassConstructor<T> = new(...args: any[]) => T
// function DebugMixin<C extends ClassConstructor<{info(): object}>>(Class: C) {
//     return class extends Class {
//         debug() {
//             let Name = Class.constructor.name
//             let value = this.info()
//             return Name + '(' + JSON.stringify(value) + ')'
//         }
//     }
// }



