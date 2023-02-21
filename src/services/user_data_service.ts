import { getUserData } from "@decentraland/Identity"
import { generalNotificationDiscord } from "./discord_notification_service";

// Send user details notification
export async function sendUserDetailsNotification(operationType: any, userId: any) {
    let userData: any = await getUserData();
    let message: any;
    // If entered and left user's id same as current logged In user's id then only send notification
    if (userData && userData.userId === userId) {
        message = `${userData.displayName}`;
        if (userData.publicKey) {
            message = message.concat(` (${userData.publicKey})`);
        }

        message = message.concat(` ${operationType} `);
        if (message) {
            generalNotificationDiscord(message)
        }
    }
}
