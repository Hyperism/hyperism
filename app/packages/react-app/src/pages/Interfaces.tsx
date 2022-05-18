export interface UserInfo {
  id: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  username: string;
}

export interface UserLoginInfo {
  exp: number;
  token: string;
  user: UserInfo;
}

export interface MetadataInfo {
    _id: string,
    owner: string,
    price: number,
    minter: string,
    title: string,
    description: string,
    mintdate: string
}

export interface MetadataQueryInfo {
    data: null | MetadataInfo,
    last_page: number,
    limit: number,
    page: number,
    total: number
}

export interface MetadataAddInfo {
    owner: string,
    price: number,
    minter: string,
    title: string,
    description: string
}
