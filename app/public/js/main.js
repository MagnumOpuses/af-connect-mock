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
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      switch (xhr.status) {
        case 200:
          const json = JSON.parse(xhr.response);
          document.cookie = SSO_COOKIE_NAME + "=" + json.sso + ";path=/";
          console.log("CT_ORIG_URL: ", CT_ORIG_URL);
          if (CT_ORIG_URL) {
            window.location.href = CT_ORIG_URL;
          }
          break;
        case 401:
          console.warn("Invalid login credentials");
          break;
        default:
          console.error("Unexpected error");
          break;
      }
    }
  };
  xhr.send(JSON.stringify({ username, password }));
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