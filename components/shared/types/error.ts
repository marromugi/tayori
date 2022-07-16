import { TayoriMessageType } from "./message"

export type TayoriError = {
    code: string,
    type: Exclude<TayoriMessageType, 'success'>
    message: string
}