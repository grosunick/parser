import {Config} from "./Config";
import {PromisePool} from "./PromisePool";

export type JobFetcher = (pool: PromisePool) => boolean

export class AsyncPool
{
    private readonly pool: PromisePool

    constructor() {
        this.pool = new PromisePool()
    }

    async run(config: Config, nextJob: JobFetcher) {
        do {
            // try to add jobs to pool map
            while (this.pool.length() < config.threadsCount) {
                if (!nextJob(this.pool))
                    break
            }

            // waiting while the first job is finished
            let id = await Promise.race(this.pool.getJobs())
            this.pool.delete(id) // delete finished job from pool

            nextJob(this.pool) // add next job
        } while (this.pool.length())
    }
}
