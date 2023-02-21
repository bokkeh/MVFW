// Flag - prod/dev
const isProd = true;


// Discord Hook Url
let discordHookUrl = 'https://discordapp.com/api/webhooks/966583188673683516/068-ssAGDzEoBKu1H9NAmFS1jDnOQsej7aJDoQgBzDWhzAIGLRdn7PG0Xom1cuVDdNuN'; // DEV

if (isProd) {
    discordHookUrl = 'https://discord.com/api/webhooks/972221255807823882/dQ92R81K_DBFXY58aUMtjJZx98QEWHOhFwh1RSlhqU-ZBu0o6mNaZ6TFQ4PpSDwARo-e'; // PROD
}


// Send discord notification
export function sendDiscordNotification(requestData: any) {
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
                await fetch(discordHookUrl, payload);
                resolve('sent');
            } catch (error) {
                log('sendDiscordNotification :: Failed to reach URL ::', error)
            }
        }).catch((error) => {
            log('sendDiscordNotification :: Error ::', error)
        })
    })
}
