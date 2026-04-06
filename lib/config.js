import Conf from 'conf';

const config = new Conf({
  projectName: 'septerional-sep',
  defaults: {
    apiKey: null,
    apiUrl: 'https://api.septerional.com',
  },
});

export function getApiKey() {
  return config.get('apiKey');
}

export function setApiKey(apiKey) {
  config.set('apiKey', apiKey);
}

export function getApiUrl() {
  return config.get('apiUrl');
}

export function hasConfig() {
  return !!getApiKey();
}

export function clearConfig() {
  config.clear();
}

export default config;
