export default class FetchProductResponse {
    status: boolean;
    result: {
        requests: [
            {
                id: string,
                storeID: string,
                products: string[]
            }
        ]
    }
}