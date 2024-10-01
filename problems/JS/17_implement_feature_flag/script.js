/**
 * Read FAQs section on the left for more information on how to use the editor
 **/
const SAMPLE_FEATURES = {
  show_dialog_box: true,
  enable_new_pricing: true,
};

// returns the state of *all* features for the current user
function fetchAllFeatures() {
  console.log('call to backend');
  // mocking the fetch API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(SAMPLE_FEATURES), 100);
  });
}

// For caching value
const Cache = {
  featureFlags: {},
  timeStamp: null,
};

const MAX_TTL = 5000;

// Case when simultaneous calls made to getFeatureState without setTimeout. Then all the calls will make backend API call
// Need to minimise these backend API calls
let fetchInstance = null;

// DO NOT CHANGE THE FUNCTION NAME
function getFeatureState(featureName, defaultValue) {
  // write your solution here

  const isCacheDataFresh = Date.now() - Cache.timeStamp < MAX_TTL;
  const isCacheDataPresent = Object.keys(Cache.featureFlags).length;

  // if value present in Cache, fetch from Cache
  if (isCacheDataFresh && isCacheDataPresent) {
    console.log('value from cache');
    const flagValue = Object.hasOwnProperty.call(
      Cache.featureFlags,
      featureName
    )
      ? Cache.featureFlags[featureName]
      : defaultValue;

    return Promise.resolve(flagValue);
  }
  // else call backend for fresh value
  else {
    console.log('fresh fetch');

    // instead of creating new Promises we are queing then callbacks

    // This prevents multiple call to backend if simultanous getFeatureState is called
    if (fetchInstance instanceof Promise) {
      return fetchInstance.then((featureFlags) => {
        return Object.hasOwnProperty.call(featureFlags, featureName)
          ? featureFlags[featureName]
          : defaultValue;
      });
    }

    fetchInstance = fetchAllFeatures()
      .then((featureFlags) => {
        // storing in Cache
        Cache.featureFlags = featureFlags;
        Cache.timeStamp = Date.now();
        console.log(featureFlags[featureName]);

        return Object.hasOwnProperty.call(featureFlags, featureName)
          ? featureFlags[featureName]
          : defaultValue;
      })
      .catch(defaultValue)
      .finally(() => {
        fetchInstance = null;
      });
    return fetchInstance;
  }
}

getFeatureState('show_dialog_box', false).then(function (isEnabled) {
  if (isEnabled) {
    console.log('Show dialog box enabled');
  } else {
    console.log('Show dialog box disabled');
  }
});

getFeatureState('enable_new_pricing', false).then(function (isEnabled) {
  if (isEnabled) {
    console.log('new_pricing enabled');
  } else {
    console.log('new_pricing disabled');
  }
});

setTimeout(() => {
  getFeatureState('show_dialog_box', false).then(function (isEnabled) {
    if (isEnabled) {
      console.log('Show dialog box enabled');
    } else {
      console.log('Show dialog box disabled');
    }
  });
}, 2000);
