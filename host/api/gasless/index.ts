import axiosInstance from "@/host/api"

const createOrder = async () => {
    const requestBody = {
        "source_chain": "bitcoin",
        "destination_chain": "ethereum",
        "source_asset": "primary",
        "destination_asset": "0xd8a6e3fca403d79b6ad6216b60527f51cc967d39",
        "initiator_source_address": "0x5A4b7eD8c2a1F1e34C8e9...6A3C5D2B1f8E7A9C",
        "initiator_destination_address": "0x5A4b7eD8c2a1F1e34C8e9...6A3C5D2B1f8E7A9C",
        "source_amount": "1",
        "destination_amount": "0.97",
        "fee": "1",
        "nonce": "b8bc718d6af38a0d2cac5085c53f617a52e590b0ff4ad2c4abb0825e9cc39079",
        "min_destination_confirmations": 0,
        "timelock": 288,
        "secret_hash": "f4a3b8d16e58cd30b8a0e9f504b1c7f9f24d1c70eaf2a3794b3c7e5bb7c90f5d",
        "additional_data": {
            "strategy_id": "bre112",
            "bitcoin_optional_recipient": "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
        }
    }
    return axiosInstance.post('/gasless/order', requestBody)
}

const initiateSwap = async (signature: string) => {
    const requestBody = {
        "order_id": "12345",
        "signature": "6fe3d5d62b9b0137b1747b2a9dbb227b09d547c1a10f0455efb2584b459f9b24",
        "perform_on": "Source"
    }
    return axiosInstance.post('/gasless/order/initiate', requestBody)
}

const redeemToken = async (signature: string) => {
    const requestBody = {
        "order_id": "12345",
        "secret": "6fe3d5d62b9b0137b1747b2a9dbb227b09d547c1a10f0455efb2584b459f9b24",
        "perform_on": "Source"
    }
    return axiosInstance.post('/gasless/order/settlement',)
}
