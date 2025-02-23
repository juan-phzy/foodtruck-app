import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

type StorageValue = string | null;

/**
 * Saves a value to SecureStore (for mobile) or localStorage (for web).
 *
 * This function ensures that only valid string values are stored.
 * If a falsy value (null, empty string, undefined) is passed, it prevents storage.
 *
 * @param key - The storage key under which the value will be saved.
 * @param value - The value to store (must be a string or null).
 */
export async function setStorageItemAsync(key: string, value: StorageValue): Promise<void> {
  try {
    if (!value) {
      console.warn(`Warning: Attempted to store a falsy value for key "${key}"`);
      return;
    }

    console.log(`Saving Key: "${key}" | Value: "${value}"`);

    if (Platform.OS === "web") {
      localStorage.setItem(key, value);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  } catch (error) {
    console.error(`Error saving key "${key}":`, error);
  }
}

/**
 * Retrieves a stored value from SecureStore (for mobile) or localStorage (for web).
 *
 * If the key does not exist, the function returns `null`.
 *
 * @param key - The storage key to retrieve the value from.
 * @returns The stored value as a string, or null if not found.
 */
export async function getStorageItemAsync(key: string): Promise<StorageValue> {
  try {
    console.log(`Retrieving Key: "${key}"`);

    if (Platform.OS === "web") {
      const item = localStorage.getItem(key);
      console.log(`Retrieved from localStorage: "${item}"`);
      return item ?? null;
    } else {
      const value = await SecureStore.getItemAsync(key);
      console.log(`Retrieved from SecureStore: "${value}"`);
      return value ?? null;
    }
  } catch (error) {
    console.error(`Error reading key "${key}":`, error);
    return null;
  }
}

/**
 * Deletes a specific key from storage in SecureStore (for mobile) or localStorage (for web).
 *
 * This ensures complete removal of the stored value.
 *
 * @param key - The key to remove from storage.
 */
export async function removeStorageItemAsync(key: string): Promise<void> {
  try {
    console.log(`Removing Key: "${key}"`);

    if (Platform.OS === "web") {
      localStorage.removeItem(key);
    } else {
      await SecureStore.deleteItemAsync(key);
    }

    console.log(`Successfully removed key: "${key}"`);
  } catch (error) {
    console.error(`Error removing key "${key}":`, error);
  }
}
