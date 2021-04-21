import { checkForUrl } from "."

describe("url checker test", () => {
    test("test url checker", () => {
        const wrongUrl = 'hello;y'
        const rightUrl = 'https://helloy.com'

        expect(checkForUrl(wrongUrl)).toBeFalsy()
        expect(checkForUrl(rightUrl)).toBeTruthy()
    })
})