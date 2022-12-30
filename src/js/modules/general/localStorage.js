const setStorage = (stateStorage) => {

  for (let key in stateStorage) {
    let value = stateStorage[key];

    if (typeof stateStorage[key] === 'object' || Array.isArray(stateStorage[key])) {
      value = JSON.stringify(stateStorage[key]);
    }

    localStorage.setItem(key, value);
  } 
};

const getStorageProp = (prop) => {
  switch (prop) {
    case 'theme':
      return localStorage.getItem(prop);
  }

};

export { setStorage, getStorageProp };