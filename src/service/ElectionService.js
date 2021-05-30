class ElectionService {

    constructor(allPositionsApi, token) {
        this.allElectionsApi = allPositionsApi;
        this.token = token;
    }

    viewAllElections() {
        return fetch(`${this.allElectionsApi}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
    }

}

export default ElectionService;