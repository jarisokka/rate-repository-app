import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const accessTokens = await AsyncStorage.getItem(
      `${this.namespace}:accessToken`,
    );

    return accessTokens ? JSON.parse(accessTokens) : [];
  }

  async setAccessToken(accessToken) {
    const currentTokens = await this.getAccessToken();
    const newTokens = [...currentTokens, accessToken];

    await AsyncStorage.setItem(
      `${this.namespace}:accessToken`,
      JSON.stringify(newTokens),
    );
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:accessToken`);
  }
}

export default AuthStorage;