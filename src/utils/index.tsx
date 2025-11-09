import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const BASE_URL = 'http://localhost:5143';
//export const BASE_URL = 'https://kodegee.pythonanywhere.com';

export const isLoggedIn = async () => {
  const cookie = getCookie("jwt-token")
  let isLoggedIn_ = true

  if (!cookie) {
    isLoggedIn_ = false;
  }

  await axios.post(BASE_URL + "/users/sync", {}, {
    headers: { 
      Authorization: "Bearer " + cookie 
    }
  })
  .then(() => {
    
  })
  .catch(() => {
    isLoggedIn_ = false;
  })

  return isLoggedIn_
}

export const formatNumber = (num: number): string => {
  if (num < 1000) return num.toString();

  if (num < 10000) {
    return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 2).replace(/\.?0+$/, '') + 'k';
  } else {
    return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1).replace(/\.?0+$/, '') + 'k';
  }
};

export const isURL = (url: string) => {
  return url.startsWith("http://") || url.startsWith("https://") && url.split(".").length > 1 
}

export const isEmail = (email: string) => {
  const pattern = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
  return !!pattern.test(email)
}

export const getUser = async () => {
  const cookie: string | undefined = getCookie("jwt-token")
  let user = {}
  if (cookie !== undefined) {
    const userId = jwtDecode<any>(cookie).sub.user_id
    await axios.get(BASE_URL + "/users/" + userId, { headers: { Authorization: 'Bearer ' + getCookie("jwt-token") } })
    .then(res => {
      user = res.data.param
    })
    .catch(() => {
      
    })
  }
  return user
}

export const DEFAULT_AVATAR_URL = "https://sb.kaleidousercontent.com/67418/1920x1100/15a1437b21/checkered-bg.png"

export const getFormatDate = (d: string) => {
  const newDate = (d + "+00:00").replace("T", " ").replace("Z", "")
  try {
    const date = new Date(newDate)
    if (isNaN(date.getTime())) {
      return 'Invalid date'
    }
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    };
    const formatted = date.toLocaleString("en-US", options);
    return formatted.replace(',', '');
  } catch (error) {
    return 'Invalid date'
  }
}

export const getGreeting = (): string => {
  const hour = new Date().getHours()

  if (hour < 12) {
    return "Good Morning"
  } else if (hour < 18) {
    return "Good Afternoon"
  } else {
    return "Good Evening"
  }
}

export const getDaysSince = (oldDateStr: string): string => {
  const oldDate = new Date(oldDateStr);
  const today = new Date();

  oldDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffInMs = today.getTime() - oldDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Yesterday";
  return `${diffInDays} days ago`;
};

export const setCookie = (cookie: string, cValue: string, expDays: number) => {
  let date = new Date();
  date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = cookie + "=" + cValue + "; " + expires + "; path=/";
}

export const getCookie = (cookie: string) => {
  const name = cookie + "=";
  const cDecoded = decodeURIComponent(document.cookie); //to be careful
  const cArr = cDecoded .split('; ');
  let res;
  cArr.forEach(val => {
      if (val.indexOf(name) === 0) res = val.substring(name.length);
  })
  return res;
}

export const eraseCookie = (cookie: string) => {   
  document.cookie = cookie+'=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';  
}

export const getMainColorFromImage = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = url;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject('Canvas not supported');

      // Resize the canvas for faster processing
      const width = (canvas.width = 50);
      const height = (canvas.height = 50);

      ctx.drawImage(img, 0, 0, width, height);
      const imageData = ctx.getImageData(0, 0, width, height).data;

      const colorCount: { [key: string]: number } = {};
      let maxCount = 0;
      let dominantColor = '';

      for (let i = 0; i < imageData.length; i += 4) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        const color = `${r},${g},${b}`;

        colorCount[color] = (colorCount[color] || 0) + 1;
        if (colorCount[color] > maxCount) {
          maxCount = colorCount[color];
          dominantColor = color;
        }
      }

      resolve(`rgb(${dominantColor})`);
    };

    img.onerror = (err) => reject(err);
  });
}

export const hexToRgba = (hex: string, alpha: number): string => {
  const sanitizedHex = hex.replace('#', '');
  const bigint = parseInt(sanitizedHex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export const goToSignin = () => {
  window.location.href = "https://github.com/login/oauth/authorize?client_id=Ov23li7ALlUjizyZF9fT&scope=read:user"
}