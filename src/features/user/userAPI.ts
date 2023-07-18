import { UserRow } from "./userSlice";


// A mock function to mimic making an async request for data
export function putUser(user: UserRow) {
    
    return new Promise<{ data: UserRow }>((resolve) =>
      setTimeout(() => resolve({ data: user }), 500)
    );
  }