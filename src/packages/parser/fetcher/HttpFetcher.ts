import fetch from "cross-fetch";
import {IFetcher} from "../Interfaces";

export class HttpFetcher implements IFetcher
{
    fetch(uri: string): Promise<string> {
        return fetch(uri, {
            method: 'get',
            headers: {
                'Accept-Encoding': 'gzip, deflate, br',
                'Cache-Control': 'no-cache',
            }
        }).then(res => res.text())
    }
}

