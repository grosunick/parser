import {IJob, PromiseId, PromiseJob, PromiseMap} from './Interfaces'

export class PromisePool {
    private readonly promiseMap: PromiseMap
    private promiseJobs: PromiseJob[]

    constructor() {
        this.promiseMap = {};
        this.promiseJobs = [];
    }

    add(id: PromiseId, job: IJob) {
        this.promiseMap[id] = job.run()
        this.rebuild()
    }

    delete(id: PromiseId) {
        delete this.promiseMap[id]
        this.rebuild()
    }

    private rebuild() {
        this.promiseJobs = [];
        for (const key in this.promiseMap)
            this.promiseJobs.push(this.promiseMap[key])
    }

    length() {
        return this.promiseJobs.length
    }

    getJobs() {
        return this.promiseJobs
    }
}