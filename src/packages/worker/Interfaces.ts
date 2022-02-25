export type PromiseId = number | string
export type PromiseJob = Promise<string> | Promise<number>
export type PromiseMap = {[id: PromiseId]: PromiseJob}

export interface IJob {
    run(): Promise<string> | Promise <number>
}