import { prod } from "@/host/api";
import axios from "axios";

const baseURL = prod ? 'https://quote-knrp.onrender.com/quote' : 'https://quote-knrp.onrender.com/quote'

const getFiat = async (orderPair: string) => {
    orderPair = "bitcoin_testnet:primary::base_sepolia:0xB391CA6D0A76CD2A927bC314856E8a374a225CFc";

}

const getStrategies = async () => {
    return axios.get(`${baseURL}/strategies`)
}

export {
    getStrategies,
    getFiat
}