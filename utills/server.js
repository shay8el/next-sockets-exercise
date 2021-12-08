export const formatRequestQuery = ({ destination, people, startDate, endDate }) => ({
    destination,
    people: parseInt(people),
    startDate: new Date(startDate),
    endDate: new Date(endDate)
})