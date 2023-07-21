import { axiosConfig } from "../utils/axiosConfig"

const MEMBERSHIP = {
    getByID: (id) => `/membership/get-by-id/${id}`,
    extend: (id) => `/membership/extend/${id}`
}

export const MembershipServices = {
    getByID: (id) => axiosConfig.get(MEMBERSHIP.getByID(id)),
    extendRegister: (id) => axiosConfig.post(MEMBERSHIP.extend(id))
}