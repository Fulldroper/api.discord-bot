const types = {
  ".js":"text/javascript",
  ".txt":"text/plain",
  ".css":"text/css",
  ".json":"application/json",
  ".png":"image/png",
  ".jpg":"image/jpg",
  ".ico":"image/x-icon",
  ".wav":"audio/wav",
  ".mp4":"video/mp4",
  ".zip":"application/zip",
  ".rar":"application/x-rar-compressed",
  ".iso":"application/octet-stream",
  ".exe":"application/octet-stream",
  ".jar":"application/java-archive",
  ".dat":"application/dat",
  ".html": "text/html"
}

module.exports = string => {
  for (const key in types) {
    if (string.endsWith(key)) {
      return types[key]
    }
  }

  return "text/plain"
}