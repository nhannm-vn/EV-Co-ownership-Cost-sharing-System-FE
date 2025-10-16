import { autoUpdate, offset, shift, useFloating, type Placement } from '@floating-ui/react'

export default function useCustomFloating({
  open,
  setOpen,
  placement
}: {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  placement: Placement | undefined
}) {
  const floating = useFloating({
    // trạng thái đóng mở notification
    open: open,
    onOpenChange: setOpen,
    placement: placement,
    middleware: [offset(8), shift()],
    whileElementsMounted: autoUpdate
  })
  return floating
}
