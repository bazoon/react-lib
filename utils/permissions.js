
function getPermissions(permissions) {
    const keys = Object.keys(permissions);
    return keys.reduce((acc, k) => {
        const name = k.slice(k.lastIndexOf('.') + 1);
        acc[name] = permissions[k];
        return acc;
    }, {});
}

export default {
    getPermissions: getPermissions
};