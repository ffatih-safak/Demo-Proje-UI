
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 

import { loginReducer } from './slices/loginSlice';
import { toastrReducer } from './slices/toastrSlice';

// redux-persist özelliği ile localde tutuyor güvenlik sorunu oluşturur mu
const rootReducer = combineReducers({
  logins: loginReducer,
  toastrs: toastrReducer
});

//Bu kısımda sadece kalıcı olarak tutmak istediğimiz store tutuyoruz
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['logins'] 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    });
  }
});


export const persistor = persistStore(store);

export default store;
