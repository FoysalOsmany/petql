export interface IOwner {
  _id: string,
  name: string,
  address: string,
  phone: number,
  email: string
  owns?: any[]
}
