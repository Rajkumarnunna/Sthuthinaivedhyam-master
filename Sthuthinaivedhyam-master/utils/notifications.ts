import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTIFICATION_STORAGE_KEY = '@notifications_configured';

// Configure notifications to show when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function setupDailyNotifications() {
  try {
    // Check if notifications are already configured
    const isConfigured = await AsyncStorage.getItem(NOTIFICATION_STORAGE_KEY);
    if (isConfigured) return;

    // Request permissions
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!');
        return;
      }
    }

    // Cancel any existing notifications
    await Notifications.cancelAllScheduledNotificationsAsync();

    // Schedule morning notification (6:00 AM)
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "ఉదయ స్తుతి సమయం",
        body: "ప్రభువును స్తుతించడానికి సమయం వచ్చింది",
      },
      trigger: {
        hour: 6,
        minute: 0,
        repeats: true,
      },
    });

    // Schedule evening notification (7:00 PM)
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "సాయంత్రం స్తుతి సమయం",
        body: "ప్రభువును స్తుతించడానికి సమయం వచ్చింది",
      },
      trigger: {
        hour: 19,
        minute: 0,
        repeats: true,
      },
    });

    // Mark notifications as configured
    await AsyncStorage.setItem(NOTIFICATION_STORAGE_KEY, 'true');
  } catch (error) {
    console.error('Error setting up notifications:', error);
  }
}

export async function toggleNotifications(enabled: boolean) {
  try {
    if (enabled) {
      await setupDailyNotifications();
    } else {
      await Notifications.cancelAllScheduledNotificationsAsync();
      await AsyncStorage.removeItem(NOTIFICATION_STORAGE_KEY);
    }
  } catch (error) {
    console.error('Error toggling notifications:', error);
  }
}

export async function areNotificationsEnabled() {
  try {
    const isConfigured = await AsyncStorage.getItem(NOTIFICATION_STORAGE_KEY);
    return !!isConfigured;
  } catch (error) {
    console.error('Error checking notification status:', error);
    return false;
  }
} 