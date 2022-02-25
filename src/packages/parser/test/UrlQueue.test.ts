// import {UrlQueue} from '../UrlQueue'
// import {DI} from '../../di'

// let createQueue = () => new UrlQueue(DI.parsedUris)
//
// describe('Queue tests', () => {
//     test('empty', () => {
//         let queue = createQueue();
//         expect(queue.count()).toBe(0)
//     });
//
//     test('add', () => {
//         let queue = createQueue();
//         queue.add('https://auto.ru/moskva/cars/kia/sorento/21993009/all/')
//
//         expect(queue.count()).toBe(1)
//     });
//
//     test('addBatch', () => {
//         let queue = createQueue();
//         queue.addBatch([
//             'https://auto.ru/cars/new/group/kia/sorento/22532657/23076832/1104846468-e469693e/',
//             'https://auto.ru/cars/new/group/kia/sorento/22532657/23076846/1105009531-7436950d/',
//             'https://auto.ru/cars/used/sale/kia/sorento/1105904167-053bd7de/'
//         ])
//
//         expect(queue.count()).toBe(3)
//     })
//
//     test('getBatch', () => {
//         let queue = createQueue();
//         queue.addBatch([
//             'https://auto.ru/cars/new/group/kia/sorento/22532657/23076832/1104846468-e469693e/',
//             'https://auto.ru/cars/new/group/kia/sorento/22532657/23076846/1105009531-7436950d/',
//             'https://auto.ru/cars/used/sale/kia/sorento/1105904167-053bd7de/'
//         ])
//
//         let batch = queue.getBatch(2);
//         expect(batch).toEqual([
//             'https://auto.ru/cars/new/group/kia/sorento/22532657/23076846/1105009531-7436950d/',
//             'https://auto.ru/cars/used/sale/kia/sorento/1105904167-053bd7de/'
//         ])
//         expect(queue.count()).toBe(1)
//     })
// });
