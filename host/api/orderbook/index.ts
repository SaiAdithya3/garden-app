import axiosInstance from "@/host/api"

const getUnmatched = async (page: string, perPage: string) => {
    return axiosInstance.get('/orders/unmatched', {
        params: {
            page: Number(page),
            per_page: Number(perPage)
        }
    })
}

const getMatched = async (page: string, perPage: string) => {
    return axiosInstance.get('/orders/unmatched', {
        params: {
            page: Number(page),
            per_page: Number(perPage)
        }
    })
}

const getUnmatchedByOrderId = async (orderId: string) => {
    return axiosInstance.get(`/orders/id/${orderId}/unmatched`);
}


const getMatchedByOrderId = async (orderId: string) => {
    return axiosInstance.get(`/orders/id/${orderId}/matched`);
}

const getUnmatchedByUser = async (userAddress: string) => {
    return axiosInstance.get(`/orders/user/${userAddress}/unmatched`)
}

const getMatchedByUser = async (userAddress: string) => {
    return axiosInstance.get(`/orders/user/${userAddress}/matched`)
}

const getOrderCount = async (userAddress: string) => {
    return axiosInstance.get(`/orders/user/${userAddress}/count`)
}

export {
    getUnmatched,
    getMatched,
    getUnmatchedByOrderId,
    getMatchedByOrderId,
    getUnmatchedByUser,
    getMatchedByUser,
    getOrderCount
}