export interface IFetcher {
    fetch(uri: string): Promise<string>
}

export interface IStatus {
    getAttempts(): number
    isSuccess(): boolean
}

export interface ICommand {
    execute(): boolean
}

export interface IParser
{
    getUrl(): string
    parse(str: string): IParserResult
}

export type IParserResult = [IParser[], ICommand[]]

class Status implements IStatus
{
    attempt: number = 0
    error: string = ''

    constructor(attempt: number = 0, error: string = '') {
        this.attempt = attempt;
        this.error = error;
    }

    getAttempts(): number {
        return this.attempt;
    }

    isSuccess(): boolean {
        return this.error == '';
    }
}

export abstract class AbstractParser implements IParser {
    private readonly url: string

    status: Status = new Status()

    constructor(url: string) {
        this.url = url
    }

    getUrl(): string {
        return this.url;
    }

    parse(str: string): IParserResult {
        this.status.attempt++
        return this.run(str);
    }

    abstract run(str: string): IParserResult
}