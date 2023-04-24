export interface MenuIpfsItem {

  key:string,
  name: string,
  path: string
  articles: string[],
  children?: MenuIpfsItem[],

}

