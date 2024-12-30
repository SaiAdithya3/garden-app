import axiosInstance from "@/host/api"

const getNonce = async () => {
    return axiosInstance.get('/auth/nonce');
}

const verifyUser = async (singature: string, nonce: string) => {
    return axiosInstance.post('/auth/verify', {
        singature,
        nonce
    })
}

export {
    getNonce,
    verifyUser
}