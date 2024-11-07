import i18n from 'i18n/i18n'
import * as z from 'zod'
export const serviceFormSchema = z.object({
  serviceName: z.string().min(1, { message: i18n.t('validation.fieldRequired') }),
  serviceDescription: z
    .string()
    .optional(),
  servicePrice: z.union([
    z.number({ invalid_type_error: i18n.t('validation.mustBeNumber') }).positive({ message: i18n.t('validation.mustBePositiveNumber') }),
    z
      .string()
      .regex(/^\d+([.,]\d{1,2})?$/, { message: i18n.t('validation.mustBePositiveNumber') })
      .transform((val) => parseFloat(val.replace(',', '.'))),
  ]),
  serviceDuration: z.union([
    z
      .number({ invalid_type_error: i18n.t('validation.mustBeInteger') })
      .positive({ message: i18n.t('validation.mustBePositiveNumber') })
      .refine((data) => data % 15 === 0, { message: i18n.t('validation.multipleBy15') }),
    z
      .string()
      .regex(/^\d+$/, { message: i18n.t('validation.mustBeInteger') })
      .transform(Number)
      .refine((data) => data % 15 === 0, { message: i18n.t('validation.mutlitleBy15') }),
  ]),
})

export const get15stepValue = (text: string) => {
  const input = parseInt(text, 10)
  if (!isNaN(input)) {
    const rounded = Math.round(input / 15) * 15
    return rounded.toString()
  } else {
    return ''
  }
}
