import * as DI from "./packages/di";
import {AutoRuListParser} from "./packages/auto.ru/parser/AutoRuListParser";
import {AsyncPool} from "./lib/worker/AsyncPool";
import {ParserFetcher} from "./packages/parser/Job";

let queue = DI.urlQueue();
queue.add(new AutoRuListParser(
    'https://auto.ru/moskva/cars/used/?year_from=2013&catalog_filter=mark%3DKIA%2Cmodel%3DCERATO&catalog_filter=mark%3DKIA%2Cmodel%3DSORENTO'
));

(async () => {
    let threadPool = new AsyncPool();
    await threadPool.run({
        threadsCount: 10
    }, new ParserFetcher())

    console.log(queue.getParsedUrlsCount())
})()
