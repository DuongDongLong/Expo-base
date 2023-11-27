import moment from 'moment'

export class TimeHelper {
    static format(value: any, format?: string) {
        return moment(value).format(format || 'MM/DD/YYYY')
    }

    static formatToUtc(value: any) {
        return moment.utc(value, true).format()
    }

    static formatToISO(value: any) {
        return moment(value).toISOString()
    }

    static formatGMT(value: any) {
        return moment(value).format()
    }

    static initFormat = (value: any, format?: string) => {
        return moment(value, format || 'DD-MM-YYYY')
    }

    static plusDays = (value: Date, days?: number) => {
        return value.setDate(value.getDate() + (days || 1))
    }

    static subtractionDays = (value: Date, days?: number) => {
        return value.setDate(value.getDate() - (days || 1))
    }

    static formatDayOfBirth = (value: string) => {
        if (!value) return ''

        const [month, day, year] = value.split('/')

        return `${day}/${month}/${year}`
    }

    static fromNow(value: any) {
        return moment(value).fromNow()
    }

    static timeAgoSinceDate(value: any) {
        const date = moment(value)
        const now = moment.now()
        const difference = moment(now).diff(date)
        const oneDay = 24 * 60 * 60 * 1000
        const inDay = difference / oneDay <= 1

        return inDay ? moment(value).fromNow() : TimeHelper.format(value)
    }
}
