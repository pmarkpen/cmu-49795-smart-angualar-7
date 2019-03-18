export default interface FetchStoreResponse {
    status: string;
    result: {
        requests: [{
            storeName: string,
            storeID: string,
            storeDescription: string
        }]
    }
}