import {usernames} from "../data/usernames.data";
import {images} from "../data/images.data";

export function setRandomUsername() {
  return usernames[Math.floor(Math.random() * usernames.length)];
}

export function setRandomImage() {
  return images[Math.floor(Math.random() * images.length)];
}

export function setRandomUser() {
  return {}
}
