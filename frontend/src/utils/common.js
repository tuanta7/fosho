// Formatting

function formatISODate(isoDate) {
  const date = new Date(isoDate);
  const formatter = new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  return formatter.format(date);
}

function formatPrice(price, delimiter = ".") {
  if (typeof price !== "number") {
    throw new TypeError("The price should be a number");
  }
  let parts = price.toFixed(0).split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);

  return parts.join(".");
}

function isOpen(isActive, openTime, closeTime) {
  if (!isActive) return false;
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();

  const nowFloat = parseFloat(`${hour}.${minute}`);
  const openTimeFloat = parseFloat(openTime.replace(":", "."));
  const closeTimeFloat = parseFloat(closeTime.replace(":", "."));

  // console.log({ nowFloat, openTimeFloat, closeTimeFloat });
  return nowFloat > openTimeFloat && nowFloat < closeTimeFloat;
}

// Image processing
function crop(url, width, height) {
  if (!url) return "/no-img.png";
  const parts = url.split("/upload/");
  return `${parts[0]}/upload/c_crop,h_${height},w_${width}/${parts[1]}`;
}

function fill(url, width, height) {
  if (!url) return "/no-img.png";
  const parts = url.split("/upload/");
  return `${parts[0]}/upload/c_fill,w_${width},h_${height}/${parts[1]}`;
}

export { formatISODate, formatPrice, isOpen, crop, fill };
