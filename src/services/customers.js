import { axiosConfig } from "../utils/axiosConfig"

const CUSTOMER = {
    getAll: '/user/get-all',
    getByID: (id) => `/user/get-by-id/${id}`,
    updateByID: (id) => `/user/update-by-id/${id}`,
    updatePWByID: (id) => `/user/update-password-by-id/${id}`,
    deleteByID: (id) => `/user/delete-by-id/${id}`
}

export const CustomerServices = {
    getAll: () => axiosConfig.get(CUSTOMER.getAll),
    getByID: (id) => axiosConfig.get(CUSTOMER.getByID(id)),
    updateByID: (id, data) => axiosConfig.patch(CUSTOMER.updateByID(id), data),
    updatePWByID: (id, data) => axiosConfig.patch(CUSTOMER.updatePWByID(id), data),
    deleteByID: (id) => axiosConfig.delete(CUSTOMER.deleteByID(id))
}