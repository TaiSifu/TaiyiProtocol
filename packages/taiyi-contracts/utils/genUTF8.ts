
export function String2UTF8(str :string) {
  const encoder = new TextEncoder()
  let str_utf8 = encoder.encode(str);
  let data = "0x"
  for (let i = 0; i < str_utf8.length; i++) {
      let tmp_data = str_utf8[i].toString(16).toUpperCase();
      if (tmp_data.length == 1) {
          data += "0"
      }
      data += tmp_data;
  }
  return data;
}

export function String2UTF8X(str :string) {
  const encoder = new TextEncoder()
  let str_utf8 = encoder.encode(str);
  let data = "";
  for (let i = 0; i < str_utf8.length; i++) {
      let tmp_data = str_utf8[i].toString(16).toUpperCase();
      if (tmp_data.length == 1) {
          data += "0"
      }
      data += "\\x" + tmp_data;
  }
  return data;
}
