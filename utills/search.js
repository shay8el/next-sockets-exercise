import { BROKERS } from "../utills/brokers"
import { formatRequestQuery } from '../utills/server'
import axios from 'axios'

const MAX_PEOPLE_COUNT_TO_SEARCH = 4

export const search = async (data, callback) => {
    const results = []
        const { destination, people, startDate, endDate } = formatRequestQuery(data)
        for (let countPermotation = people; countPermotation <= MAX_PEOPLE_COUNT_TO_SEARCH; countPermotation++){
            for (const broker of BROKERS){
              const destinationKey = broker.getDestinationId(destination)
              const requestBody = broker.requestBuilder(destinationKey, countPermotation, startDate, endDate)
              const response = await axios.post(broker.url, requestBody)
              results.push(...broker.parseResponseIfValid(response.data))
              callback(results)
            }
          }
    return results
}