import { fetchData } from './index'

global.fetch = jest.fn((url, OPTIONS) => {
    return Promise.resolve('{"model": "general_en", "score_tag": "P", "agreement": "DISAGREEMENT", "subjectivity": "SUBJECTIVE", "confidence": "76", "irony": "IRONIC"}')
})

const showData = jest.fn()
const checkForUrl = jest.fn()

describe('Test fetching the data from the api', () => {
    test('Should get the data from the api', () => {
        fetchData('https://www.france24.com/en/tv-shows/the-interview/20210415')
            .then(data => {
                expect(data)
                    .toEqual({
                        "model": "general_en",
                        "score_tag": "P",
                        "agreement": "DISAGREEMENT",
                        "subjectivity": "SUBJECTIVE",
                        "confidence": "76",
                        "irony": "IRONIC",
                    }
                )
                expect(fetch).toBeCalled()
                expect(showData).toBeCalled()
                expect(checkForUrl).toBeCalled()
        })
    })
})