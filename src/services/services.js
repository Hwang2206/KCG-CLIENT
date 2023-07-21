import { axiosConfig } from "../utils/axiosConfig"


const SERVICE = {
  getAll: '/service/get-all'
}

export const ServiceService = {
  getAll: () => axiosConfig.get(SERVICE.getAll)
}
