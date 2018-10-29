export default class CryptoRandom {
    static getRandomInt(min, max) {
        const range = max - min + 1;
        const ulim = Math.floor(256 / range) * range;
        const byteArray = new Uint8Array(1);
        do {
            window.crypto.getRandomValues(byteArray);
        } while (byteArray[0] >= ulim);
        return min + (byteArray[0] % range);
    }
}