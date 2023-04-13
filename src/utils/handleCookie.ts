export function getCookie(name: string) {
  let arr: any;
  const reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if ((arr = document.cookie.match(reg))) {
    return unescape(arr[2]);
  } else {
    return null;
  }
}
export function setCookie(name: string, value: string, time: number) {
  const exp = new Date();
  exp.setTime(exp.getTime() + time);
  document.cookie =
    name + "=" + escape(value) + ";expires=" + exp.toUTCString();
}
export function delCookie(name: string) {
  const exp = new Date();
  exp.setTime(exp.getTime() - 1);
  const cval = getCookie(name);
  if (cval != null) {
    document.cookie = name + "=" + cval + ";expires=" + exp.toUTCString();
  }
}
export function clearCookie() {
  const keys = document.cookie.match(/[^ =;]+(?==)/g);
  if (keys) {
    for (let i = keys.length; i--; ) {
      document.cookie = keys[i] + "=0;expires=" + new Date(0).toUTCString();
    }
  }
}
