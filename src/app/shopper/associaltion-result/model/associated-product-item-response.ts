export default class AssociatedProductItemResponse {
    status: string;
    result: {
        requests: [{
            support: number,
            itemsets: string[],
            length: number
        }]
    }
}