import axios from 'axios'
import { BROKERS, formatRequestQuery } from '../../server/utills'
const MAX_PEOPLE_COUNT_TO_SEARCH = 5
export default async function handler(req, res) {
  const results = []
  const { destination, people, startDate, endDate } = formatRequestQuery(req.query)
  for (let countPermotation = people; countPermotation <= MAX_PEOPLE_COUNT_TO_SEARCH; countPermotation++){
    for (const broker of BROKERS){
      const destinationKey = broker.getDestinationId(destination)
      const requestBody = broker.requestBuilder(destinationKey, countPermotation, startDate, endDate)
      const response = await axios.post(broker.url, requestBody)
      results.push(...broker.parseResponseIfValid(response.data))
    }
  }
  console.log(JSON.stringify(results))
  res.status(200).json({ results })
}