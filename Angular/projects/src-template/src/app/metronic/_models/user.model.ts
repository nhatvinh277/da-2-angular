import { AuthModel } from './auth.model';
import { AddressModel } from './address.model';
import { SocialNetworksModel } from './social-networks.model';

export class UserModel extends AuthModel {
  id: number;
  username: string;
  password: string;
  fullname: string;
  email: string;
  pic: string;
  roles: number[];
  occupation: string;
  companyName: string;
  phone: string;
  isLogin: boolean;
  address?: AddressModel;
  socialNetworks?: SocialNetworksModel;

  setUser(user: any) {
    this.id = user.id;
    this.username = user.username || '';
    this.password = user.password || '';
    this.fullname = user.fullname || '';
    this.email = user.email || '';
    this.pic = user.pic || './assets/media/users/default.jpg';
    this.roles = user.roles || [];
    this.occupation = user.occupation || '';
    this.companyName = user.companyName || '';
    this.phone = user.phone || '';
    this.address = user.address;
    this.socialNetworks = user.socialNetworks;
  }
  clear(): void {
    this.id = undefined;
    this.username = '';
    this.password = '';
    this.email = '';
    this.roles = [];
    this.isLogin = false;
    this.fullname = '';
    this.accessToken = 'access-token-' + Math.random();
    this.refreshToken = 'access-token-' + Math.random();
    this.pic = './assets/media/users/default.jpg';
    this.occupation = '';
    this.companyName = '';
    this.phone = '';
    this.address = new AddressModel();
    this.address.clear();
    this.socialNetworks = new SocialNetworksModel();
    this.socialNetworks.clear();
  }
}
