import {AbstractParser, IParser, IParserResult} from "../../parser/Interfaces";
import cheerio from 'cheerio';

export class Model {
    url: string = ''
    id: number = 0
    previewImg: string[] = []
    name: string = ''
    transmission: string = ''
    driveType: string = ''
    volume: number = 0
    power: number = 0
    fuel: string = ''
    price: number = 0
    year: number = 0
    mileage: number = 0
    color: string = ''
}

export class AutoRuModelParser extends AbstractParser
{
    run(str: string): IParserResult {
        let parsers: IParser[] = [];

        let $ = cheerio.load(str);


        let model = new Model();
        model.url = this.getUrl()

        let name = $('h1.CardHead__title').text()
        if (name)
            model.name = name

        let price = $('span.OfferPriceCaption__price').text()
        if (price) {
            price = price.replace(/\s|₽/g, '')
            model.price = Number(price)
        }

        let year = $('li.CardInfoRow_year a.Link').text()
        if (year)
            model.year = Number(year)

        $('div.ImageGalleryDesktop__itemContainer img').each((i, el) => {
            let url = $(el).attr('src')
            if (url)
                model.previewImg.push('https:' + url)
        });

        let mileage = $('li.CardInfoRow_kmAge span.CardInfoRow__cell').eq(1).text()
        if (mileage) {
            mileage = mileage.replace(/\s/g, '')
            mileage = mileage.replace(/км/g, '')
            model.mileage = Number(mileage)
        }

        let transmission = $('li.CardInfoRow_transmission span.CardInfoRow__cell').eq(1).text()
        if (transmission) {
            model.transmission = transmission
        }

        let driveType = $('li.CardInfoRow_drive span.CardInfoRow__cell').eq(1).text()
        if (driveType) {
            model.driveType = driveType
        }

        let color = $('li.CardInfoRow_color span.CardInfoRow__cell').eq(1).text()
        if (color) {
            model.color = color
        }

        let fuelStr = $('li.CardInfoRow_engine span.CardInfoRow__cell').eq(1).text()
        if (fuelStr) {
            let fuel = fuelStr.split('/')
            if (fuel.length) {
                model.volume = Number(fuel[0].replace(/\s/g, '').replace(/л/g, ''))
                model.power = Number(fuel[1].replace(/(\s|л.с.)/g, ''))
                model.fuel = fuel[2].replace(/\s/g, '')
            }
        }

        console.log(model)

        return [parsers, []];
    }
}
