
import React from 'react'
import { FieldError } from '../generated/graphql'


export const toErrorMap=(er:FieldError[])=>{
    const errorMap: Record<string, string>= {}
    er.forEach(({field,message})=>{
        errorMap[field] = message
    })
    return errorMap
}

