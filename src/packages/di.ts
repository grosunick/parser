import {UrlQueue} from "./parser/UrlQueue";
import {ParsedUris} from "./parser/ParsedUris";
import {HttpFetcher} from "./parser/fetcher/HttpFetcher";

export let parsedUris = new ParsedUris();
export let httpFetcher: HttpFetcher = new HttpFetcher();

let queue: UrlQueue = new UrlQueue(parsedUris);
export function urlQueue(): UrlQueue {
    return queue
}
