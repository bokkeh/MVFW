import { sendDiscordNotification } from "src/api/discord_api";

// Send discord notification of transferring tip amount
export function transferringTipNotificationDiscord(amount: any, address: string) {
    let message = `${getCurrentUtcEpochTime()}Tip of ${amount} MANA transferring to ${address}`;
    let params = {
        content: message
    };
    sendDiscordNotification(params)
}

// Send discord notification of successfully transaction completion
export function transferTipCompletionNotificationDiscord(address: string) {
    let message = `${getCurrentUtcEpochTime()}Tip successfully transferred to ${address}`;
    let params = {
        content: message
    };
    sendDiscordNotification(params)
}

// Send discord notification
export function generalNotificationDiscord(message: any) {
    message = getCurrentUtcEpochTime().concat(message);
    let params = {
        content: message
    };
    sendDiscordNotification(params)
}

// get current date and time
function getCurrentUtcEpochTime() {
    let currentTimeStamp = Math.round(Date.now() / 1000);
    // Here discord message syntax <t: epochtime :f>
    // t = define for time zone
    // f = define for format  [format can be = f,F,R,D,d,T,t]
    return `<t:${currentTimeStamp}:D><t:${currentTimeStamp}:T> | `;
}
