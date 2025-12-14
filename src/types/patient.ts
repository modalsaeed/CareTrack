export type Gender = 'male' | 'female' | 'other'

export interface Patient {
    id: string
    name: string
    age: number
    gender: Gender
    medicalId: string
    contactNumber?: string
    email?: string
    address?: string
}