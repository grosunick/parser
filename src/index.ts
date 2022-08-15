import * as DI from "./packages/di";
import {AutoRuListParser} from "./packages/auto.ru/parser/AutoRuListParser";
import {AsyncPool} from "./packages/worker/AsyncPool";
import {nextJob} from "./packages/parser/Job";

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
