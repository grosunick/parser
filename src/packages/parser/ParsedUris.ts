import {Uri} from "./Uri";
import {Map} from "./Map";

export enum UriStatus {
    added = 1,
    parsed = 2
}

export class ParsedItem {
    private readonly _uri: Uri
    status: UriStatus

    constructor(uri: string) {
        this._uri = new Uri(uri);
        this.status = UriStatus.added;
    }

    get uri(): Uri {
        return this._uri;
    }

    get id(): string {
        return this._uri.id
    }
}

export class ParsedUris extends Map<ParsedItem>
{
    add(uri: string) {
        let item = new ParsedItem(uri)
        super.set(item.id, item);
    }

    getByUri(uri: string): ParsedItem | boolean {
        let item = new ParsedItem(uri)
        return super.get(item.id);
    }
}
