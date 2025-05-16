export interface User {
  id: number;
  username: string;
  email: string;
  // This property is private or protected, in a real application it should not be exposed.
  _password: string;
  firstName?: string;
  lastName?: string;
}
