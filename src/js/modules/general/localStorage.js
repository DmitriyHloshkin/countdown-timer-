const setStorage = (stateStorage) => {
  
  for (let key in stateStorage) {
    const value = typeof stateStorage[key] === 'object' || Array.isArray(stateStorage[key]) ? JSON.stringify(stateStorage[key]) : 
                                                                                              stateStorage[key];
    localStorage.setItem(key, value);
  }

};

const getStorageProp = (prop) => {
  switch (prop) {
    case 'theme':
      return localStorage.getItem(prop);
    
    case 'dateList':
      return JSON.parse(localStorage.getItem(prop));
  }

};

export { setStorage, getStorageProp };