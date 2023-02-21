import { sendSlackNotification } from "src/api/slack_api";
const slackNotificationFlagValue = 'integration_status'

// Send slack notification of transferring tip amount
export function transferringTipNotification(amount: any, address: string) {
    let message = `Tip of ${amount} MANA transferring to ${address}`;
    let params = {
        flag: slackNotificationFlagValue,
        message: message
    };
    sendSlackNotification(params)
}

// Send slack notification of successfully transaction completion
export function transferTipCompletionNotification(address: string) {
    let message = `Tip successfully transferred to ${address}`;
    let params = {
        flag: slackNotificationFlagValue,
        message: message
    };
    sendSlackNotification(params)
}
