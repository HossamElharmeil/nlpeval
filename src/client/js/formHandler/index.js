import { checkForUrl } from '../urlChecker'

function handleSubmit(event) {
    event.preventDefault()

    let url = document.getElementById('url').value

    if (!checkForUrl(url)) {
        return document.getElementById('results').innerHTML = "Invalid url"
    }

    fetch('http://localhost:8081/analyse', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: url })
    })
        .then(res => {
            return res.json()
        })
        .then(res => {
            document.getElementById('results').innerHTML = res.agreement
            document.getElementById('results-div').classList.add('active')
            document.getElementById('form').classList.add('hidden')

        })
        .catch(error => {
            console.error(error)
        }) 
}

export { handleSubmit }
