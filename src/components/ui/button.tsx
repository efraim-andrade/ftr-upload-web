import type { ComponentProps } from 'react'
import { type VariantProps, tv } from 'tailwind-variants'

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants>

const buttonVariants = tv({
  base: 'text-zinc-400 rounded-lg hover:text-zinc-100 hover:bg-zinc-800 disabled:opacity-50 disabled:pointer-events-none',

  variants: {
    size: {
      default: 'px-3 py-2',
      icon: 'p-2',
      'icon-sm': 'p-1',
    },
  },

  defaultVariants: {
    size: 'default',
  },
})

export function Button({ size, className, ...props }: ButtonProps) {
  return <button className={buttonVariants({ size, className })} {...props} />
}
