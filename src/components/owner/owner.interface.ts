export interface IOwner {
  _id?: string,
  name: string,
  address?: string,
  phone: string,
  email: string
  owns?: any[]
}
