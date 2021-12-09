export const BROKERS = [{
    name: 'HotelsSimulator',
    url: 'https://gya7b1xubh.execute-api.eu-west-2.amazonaws.com/default/HotelsSimulator',
    getDestinationId: (destination) => {
        const destinationsList = [{
            id: 1,
            name: 'Val Thorens'
        },
        {
            id: 2,
            name: 'Courchevel'
        },
        {
            id: 3,
            name: 'Tignes'
        },
        {
            id: 4,
            name: 'La Plagne'
        },
        {
            id: 5,
            name: 'Chamonix'
        },
        {
            id: 6,
            name: 'Les Menuires'
        },
        {
            id: 7,
            name: "L'alpes D'huez"
        },
        {
            id: 8,
            name: 'Les Deux Alpes'
        }
        ]
        for (const des of destinationsList){
            if(des.name === destination) return des.id
        }
        return -1
    },
    requestBuilder: (destinationKey, people, startDate, endDate) => {
        return {
            "query": {
                "ski_site": destinationKey,
                "from_date": startDate.toLocaleDateString("en-US"),
                "to_date": endDate.toLocaleDateString("en-US"),
                "group_size": people
            }
        }
    },
    parseResponseIfValid: (resposeData) => {
        const resultsList = []
        const {success, accommodations} = resposeData.body
        if (success && accommodations.length > 0){
            for (const resultItem of accommodations){
                resultsList.push({
                    name: resultItem?.HotelName,
                    images: resultItem?.HotelDescriptiveContent?.Images || [],
                    rating: resultItem?.HotelInfo?.Rating,
                    people: resultItem?.HotelInfo?.Beds,
                    price: resultItem?.PricesInfo?.AmountAfterTax,
                    currency: 'EUR',
                })
            }
        }
        return resultsList
    }
}]