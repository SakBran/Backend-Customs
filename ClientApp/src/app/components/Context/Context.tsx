import { createContext } from 'react';
export type Payload = {
  data?: UserPayload;
  updateData?: (newData: UserPayload) => void;
};
export type UserPayload = {
  role?: string;
  userId?: string;
  isSignedIn?: boolean;
};
const AppContext = createContext<Payload>({});
export default AppContext;
