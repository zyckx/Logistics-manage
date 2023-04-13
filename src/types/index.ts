export interface IRegisterForm {
  username: string;
  password: string;
  email: string;
}
export interface ITagList {
  title: string;
  path: string;
}
export interface ITagsItem {
  title: string;
  path: string;
}
export interface IItem {
  icon?: string;
  index: string;
  title: string;
  subs?: IItem[];
}
