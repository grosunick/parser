import {IFetcher, IParser, IParserResult} from "./Interfaces";
import {PromisePool} from "../../lib/worker/PromisePool";
import {UrlQueue} from "./UrlQueue";
import {Job} from "../../lib/worker/Interfaces";
import * as DI from "../di";

let queue = DI.urlQueue()

function parse(parser: IParser, urlQueue: UrlQueue, fetcher: IFetcher): Promise<string> {
    let url = parser.getUrl()

    return fetcher.fetch(url)
        .then(str => {
            return parser.parse(str)
        })
        .then((res: IParserResult) => {
            let [parsers, []] = res
            urlQueue.addBatch(parsers)
            return url
        })
        .catch(() => {
            urlQueue.add(parser)
            return url
        });
}

export class ParserFetcher
{
    nextJob(promisePool: PromisePool): boolean {
        if (queue.isEmpty())
            return false

        let parser = queue.pop()

        promisePool.add(parser.getUrl(), () => {
            return parse(
                parser, queue, DI.httpFetcher
            )
        });

        return true
    }
}

