export type PromiseId = number | string
export type PromiseJob = Promise<PromiseId>
export type PromiseMap = {[id: PromiseId]: PromiseJob}

export interface IJob {
    run(): PromiseJob
}