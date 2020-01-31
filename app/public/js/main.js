const CT_ORIG_URL_PARAM_NAME = "CT_ORIG_URL";
const CT_ORIG_URL = findGetParameter(CT_ORIG_URL_PARAM_NAME);
const SSO_COOKIE_NAME = "AMV_SSO_COOKIE";

if (!CT_ORIG_URL) {
  console.warn(
    "URL must contain '" + CT_ORIG_URL_PARAM_NAME + "' query parameter!"
  );
}

const onLogin = () => {
  const usernameElement = document.getElementById("username");
  const passwordElement = document.getElementById("password");

  const username = usernameElement.value;
  const password = passwordElement.value;

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/AuthenticationDispatcher/Dispatch", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.addEventListener("error", function(event) {
    console.error("There was a problem communicating with the server");
    alert("There was a problem communicating with the server");
  });
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      switch (xhr.status) {
        case 200:
          const json = JSON.parse(xhr.response);
          let cookie = SSO_COOKIE_NAME + "=" + json.sso + ";path=/";
          if (json.ssoDomain !== undefined) {
            cookie += ";domain=." + json.ssoDomain;
          } else {
            const split = location.hostname.split(".");
            const sld = split.slice(split.length - 2).join(".");
            cookie += ";domain=." + sld;
          }
          document.cookie = cookie;

          if (CT_ORIG_URL) {
            window.location.href = CT_ORIG_URL;
          }
          break;
        case 401:
          console.warn("Invalid login credentials");
          alert("Invalid login credentials");
          break;
        default:
          console.error("Unexpected error", xhr);
          break;
      }
    }
  };

  try {
    xhr.send(JSON.stringify({ username, password }));
  } catch (err) {
    console.error("There was a problem communicating with the server");
    alert("There was a problem communicating with the server");
  }
};

function findGetParameter(parameterName) {
  let result = null,
    tmp = [];
  let items = location.search.substr(1).split("&");
  for (let index = 0; index < items.length; index++) {
    var split = items[index].split("=");
    var key = split[0];
    var val = split.slice(1).join("=");

    if (key === parameterName) {
      result = decodeURIComponent(val);
    }
  }
  return result;
}
