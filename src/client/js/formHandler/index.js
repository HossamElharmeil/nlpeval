import { checkForUrl } from '../urlChecker'

const fetchData = async (url) => {
    const res = await fetch('http://localhost:8081/analyse', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: url })
    })
    return await res.json()
}

const showData = (data) => {
    document.getElementById('results').innerHTML = `
        Model: ${data.model}<br/>
        Score Tag: ${data.score_tag}<br/>
        Agreement: ${data.agreement}<br/>
        Subjectivity: ${data.subjectivity}<br/>
        Confidence: ${data.confidence}<br/>
        Irony: ${data.irony}<br/>
    `
    document.getElementById('results-div').classList.add('active')
    document.getElementById('form').classList.add('hidden')
}

const showError = (error) => {
    document.getElementById('error').innerHTML = error
    document.getElementById('error').classList.add('active')
}

function handleSubmit(event) {
    event.preventDefault()

    document.getElementById('error').classList.remove('active')

    document.getElementById('submit').value = '...'

    let url = document.getElementById('url').value
    if (!checkForUrl(url)) {
        document.getElementById('submit').value = 'Submit'
        return showError('Invalid url')
    }

    fetchData(url)
        .then(data => {
            document.getElementById('submit').value = 'Submit'
            showData(data)
        })
        .catch( _ => {
            document.getElementById('submit').value = 'Submit'
            showError('Something went wrong')
        }) 
}

export {
    handleSubmit,
    fetchData
}
