let adminApp = null;
let adminModule = null;

/**
 * Build Firebase service account object from env variables.
 * @returns {object|null}
 */
function resolveServiceAccount() {
    const rawJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
    if (!rawJson) {
        return null;
    }

    try {
        return JSON.parse(rawJson);
    } catch (error) {
        return null;
    }
}

/**
 * Initialize firebase-admin lazily so backend can run without FCM credentials.
 * @returns {Promise<boolean>}
 */
async function ensureFirebaseReady() {
    if (adminApp) {
        return true;
    }

    try {
        adminModule = await import('firebase-admin');
    } catch (error) {
        return false;
    }

    const serviceAccount = resolveServiceAccount();
    if (!serviceAccount) {
        return false;
    }

    if (!adminModule.getApps().length) {
        adminApp = adminModule.initializeApp({
            credential: adminModule.credential.cert(serviceAccount),
        });
    } else {
        adminApp = adminModule.getApps()[0];
    }

    return true;
}

/**
 * Send push notification by FCM token.
 * @param {{token: string, title: string, body: string, data?: object}} payload
 */
export async function sendPushToToken({ token, title, body, data = {} }) {
    const ready = await ensureFirebaseReady();
    if (!ready) {
        return { sent: false, reason: 'FCM_NOT_CONFIGURED' };
    }

    try {
        const response = await adminModule.messaging().send({
            token,
            notification: { title, body },
            data: Object.entries(data).reduce((acc, [key, value]) => {
                acc[key] = String(value);
                return acc;
            }, {}),
        });

        return { sent: true, messageId: response };
    } catch (error) {
        const code = String(error?.code || '');
        const message = String(error?.message || 'FCM_SEND_FAILED');
        const invalidToken =
            code.includes('registration-token-not-registered') ||
            code.includes('invalid-registration-token') ||
            message.toLowerCase().includes('registration token is not a valid');

        return { sent: false, reason: message, invalidToken };
    }
}
