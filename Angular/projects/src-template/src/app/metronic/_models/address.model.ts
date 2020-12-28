export class AddressModel {
  addressLine: string;
  city: string;
  state: string;
  postCode: string;
  clear() {
    this.addressLine = '';
    this.city = '';
    this.state = '';
    this.postCode = '';
}
}
