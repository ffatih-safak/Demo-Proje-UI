
import { useSelector } from 'react-redux';

export const useSession = () => { 
  const session = useSelector(state => state.logins.token.tokenValue);
  return session;
}

export const useSessionLoginStatus= () => { 
  const session = useSelector(state => state.logins.loginStatus);
  return session;
}

export const useSessionToastrOpen = () => { 
  const session = useSelector(state => state.toastrs.open);
  return session;
}

export const useSessionToastrMessage= () => { 
  const session = useSelector(state => state.toastrs.mesaj);
  return session;
}

export const useSessionToastrColor = () => { 
  const session = useSelector(state => state.toastrs.color);
  return session;
}
