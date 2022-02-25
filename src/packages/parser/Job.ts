import {IFetcher, IParser, IParserResult} from "./Interfaces";
import {PromisePool} from "../worker/PromisePool";
import {UrlQueue} from "./UrlQueue";
import {IJob} from "../worker/Interfaces"
import * as DI from "../di";

let queue = DI.urlQueue()

export class Job implements IJob
{
    private readonly parser: IParser
    private urlQueue: UrlQueue
    private fetcher: IFetcher

    constructor(parser: IParser, urlQueue: UrlQueue, fetcher: IFetcher) {
        this.parser = parser;
        this.urlQueue = urlQueue;
        this.fetcher = fetcher;
    }

    run(): Promise<string>  {
        let url = this.parser.getUrl()

        return this.fetcher.fetch(url)
            .then(str => {
                return this.parser.parse(str)
            })
            .then((res: IParserResult) => {
                let [parsers, []] = res
                this.urlQueue.addBatch(parsers)
                return url
            })
            .catch(() => {
                this.urlQueue.add(this.parser)
                return url
            });
    }
}

export function nextJob(promisePool: PromisePool): boolean {
    if (queue.isEmpty())
        return false

    let parser = queue.pop()
    let job = new Job(
        parser, queue, DI.httpFetcher
    )

    promisePool.add(parser.getUrl(), job)
    return true
}