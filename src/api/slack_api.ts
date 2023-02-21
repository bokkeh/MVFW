// Functional URL
const airtableAPIUrl = 'https://api-dev-swivel.com/functional';
const query = 'post_slack_event';

export function sendSlackNotification(requestData: any) {
    return new Promise((resolve) => {
        executeTask(async () => {
            try {
                const payload = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestData)
                }
                const response = await fetch(`${airtableAPIUrl}/${query}`, payload)
                let result = null;
                if (response) {
                    const jsonData = await response.json();
                    if (jsonData?.data?.listAsset) {
                        result = jsonData.data.listAsset;
                    }
                }
                resolve(result)
            } catch {
                log('Failed to reach URL', error)
            }
        }).catch((error) => log(error))
    })
}

