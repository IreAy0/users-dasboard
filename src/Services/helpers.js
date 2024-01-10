import moment from "moment";
/* eslint-disable no-prototype-builtins */
export const getToken = () => {
  const tokenString = sessionStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  return userToken;
};

export const timeFormat = (time) => {
  if (time) {
    return moment(time).fromNow();
  }
};

export const dateFormat = (date) => {
  if (date) {
    return moment(date).format("Do MMMM YYYY");
  }
}

export const mask = (cc, num = 4, mask = '*') =>
  ('' + cc).slice(0, -num).replace(/./g, mask) + ('' + cc).slice(-num);


export const saveToken = (userToken) => {
  sessionStorage.setItem("token", JSON.stringify(userToken));
  // setToken(userToken.token);
};

export const removeToken = () => {

  sessionStorage.removeItem("token");
  window.location.reload(false);
};
export const platformInitiated = () => {
  let mobilePlatforms = [
    "iPhone",
    "iPod",
    "iPad",
    "Android",
    "BlackBerry",
    "Opera",
  ];
  let typeOfOS = window.navigator.platform;
  if (mobilePlatforms.includes(typeOfOS)) {
    return "Mobile";
  } else {
    return "Web";
  }
};

export const randomId = (leng) => {
  if (!leng) {
    return;
  }
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < leng; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const getFirstLetters = (str) => {
	const firstLetters = str
		.split(' ')
		.map((word) => word[0])
		.join('');

	return firstLetters;
};
// export const getToken = () => {
//   const authHash = getCookie("token");
//   if (authHash) {
//     return authHash;
//   }
//   return '';
// };
