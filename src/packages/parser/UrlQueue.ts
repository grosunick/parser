import {IParser} from "./Interfaces";
import {UriStatus} from "./ParsedUris";
import {ParsedUris} from "./ParsedUris";

export class UrlQueue
{
    private parsedUris: ParsedUris
    private readonly parsers: IParser[]

    constructor(parsedUris: ParsedUris, parsers: IParser[] = []) {
        this.parsers = parsers;
        this.parsedUris = parsedUris
    }

    add(parser: IParser) {
        let url = parser.getUrl()

        if (!this.parsedUris.getByUri(url)) {
            this.parsedUris.add(url)
            this.parsers.push(parser);
        }
    }

    addBatch(parsers: IParser[], ) {
        parsers.forEach((parser: IParser) => {
            this.add(parser)
        });
    }

    getBatch(limit: number): IParser[] {
        return this.parsers.splice(this.parsers.length - limit);
    }

    pop(): IParser {
        let parser = this.parsers.pop()
        if (parser === undefined) {
            throw new Error('url queue is empty');
        }

        return parser
    }

    info() {
        return this.parsers;
    }

    count(): number {
        return this.parsers.length
    }

    isEmpty(): boolean {
        return this.count() == 0
    }

    isFull() {
        return !this.isEmpty()
    }

    getParsedUrlsCount() {
        return this.parsedUris.count()
    }
}