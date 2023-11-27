
export class MathUtils {
    static currencyFormat(num?: number) {
        const number = num ? num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0
        return number.toString()
    }
}
