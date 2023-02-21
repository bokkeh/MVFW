import { sendUserDetailsNotification } from 'src/services/user_data_service';

// Create user dashboard
export function addUserActivitiesListener(): void {
    // Event when avatar enters scene
    onEnterSceneObservable.add(async (avatar) => {
        // User detail notification
        sendUserDetailsNotification("**Entered into scene**", avatar.userId);
    })

    // Event when avatar leaves scene
    onLeaveSceneObservable.add(async (avatar) => {
        // User detail notification
        sendUserDetailsNotification("Left scene", avatar.userId);
    })

    // Event when avatar connects
    onPlayerConnectedObservable.add((avatar) => {
        // log("new avatar connected :: ", avatar.userId);
    })

    // Event when avatar disconnects -- other connected players got this event
    onPlayerDisconnectedObservable.add((avatar) => {
        // log("avatar disconnected: ", avatar.userId)
        sendUserDetailsNotification("Disconnected", avatar.userId);
    })
}
