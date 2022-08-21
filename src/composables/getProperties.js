export default async function (object, ...params) {
    let properties = [];
    let o = new object(params);
    for (var i in o) {
      if (o.hasOwnProperty(i)) {
        if (typeof o[i] == 'object')
          properties.push(await o[i]);
        if (typeof o[i] == 'function') 
          await o[i]();
      }
    }
    return properties;
}