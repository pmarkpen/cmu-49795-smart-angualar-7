export default interface FetchStoreResponse {
    status: string;
    result: {
        requests: [{
            name: string,
            id: string,
            description: string
        }]
    }
}