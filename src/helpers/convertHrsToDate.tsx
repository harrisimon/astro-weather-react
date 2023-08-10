export const addHours = ( hours: number) => {
    const time = new Date()
    const newTime = new Date(
        time.getTime() + hours * 60 * 60 * 1000
    ).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    const newDate = new Date(time.getTime() + hours * 3600000)

    const month = newDate.getMonth() + 1
    const day = newDate.getDate()

    return month + "/" + day + " " + newTime
}