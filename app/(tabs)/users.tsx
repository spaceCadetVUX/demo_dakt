// users.tsx

// Define a TypeScript interface for the User type.
export interface User {
    id: string;
    name: string;
  }
  
  // Initial array of stored users.
  export const storedUsers: User[] = [
    { id: '1', name: 'Alice' },
    { id: '2', name: 'Bob' }
  ];
  
  // Function to add a new user to the storedUsers array.
  export const addUserToStorage = (newUser: User) => {
    storedUsers.push(newUser);
    console.log('Updated storedUsers:', storedUsers); 
  };
  