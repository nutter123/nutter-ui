// import VueCookie from 'vue-cookie'
const authButtonFunc = {
    methods: {
        authButton() {
            return true;
            // let authArr = JSON.parse(VueCookie.get("AUTH_CODE"));
            // if (authArr) {
            //     if (authArr.includes(codeKey)) {
            //         return true;
            //     } else {
            //         return false;
            //     }
            // } else {
            //     return false;
            // }
        }
    }
}

export default authButtonFunc