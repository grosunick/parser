import {AbstractParser, IParser, IParserResult} from "../../parser/Interfaces";
import cheerio from 'cheerio';
import {AutoRuModelParser} from "./AutoRuModelParser";

export class AutoRuListParser extends AbstractParser
{
    run(str: string): IParserResult {
        let parsers: IParser[] = [];

        // parsing pagination
        let $ = cheerio.load(str);
        $('a.ListingPagination__page').each((i, el) => {
            let url = $(el).attr('href')
            if (url)
                parsers.push(new AutoRuListParser(url))
        });

        // parsing models
        $('.ListingItem').each((i, el) => {
            let url = $(el).find('a.OfferThumb').attr('href')
            if (url)
                parsers.push(new AutoRuModelParser(url))
        });

        return [parsers, []];
    }
}
