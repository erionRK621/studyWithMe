export const getCookie = (name) => {
    const value = ";" + document.cookie;
    const parts = value.split(`;${name}=`);

    if (parts.length === 2) {
        return parts.pop().split(";").shift();
    }
};

export const setCookie = (name, value, exp = 5) => {
    const date = new Date();
    date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);

    document.cookie = `${name}= ${value}; expires= ${date.toUTCString()}`;
};

export const deleteCookie = (name) => {
    const date = new Date("2020-01-01").toUTCString();

    document.cookie = name + "=; expires=" + date;
};
