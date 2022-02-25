import {Md5} from "ts-md5";

export class Uri {
    private readonly _id: string // md5 from uri
    private readonly _val: string // uri value

    constructor(val: string) {
        this._id = Md5.hashStr(val);
        this._val = val;
    }

    get id(): string {
        return this._id;
    }

    get val(): string {
        return this._val;
    }
}
