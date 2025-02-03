import * as Collapsible from '@radix-ui/react-collapsible'
import { motion, useCycle } from 'motion/react'

import { UploadWidgetDropzone } from './dropzone'
import { UploadWidgetHeader } from './header'
import { UploadWidgetMinimizeButton } from './minimize-button'
import { UploadWidgetList } from './upload-list'

export function UploadWidget() {
  const [isWidgetOpen, toggleWidgetOpen] = useCycle(false, true)

  return (
    <Collapsible.Root onOpenChange={() => toggleWidgetOpen()}>
      <motion.div
        animate={isWidgetOpen ? 'open' : 'closed'}
        variants={{
          open: {
            width: 360,
            height: 'auto',
            transition: {
              duration: 0.1,
            },
          },

          closed: {
            width: 'max-content',
            height: 44,
            transition: {
              type: 'inertia',
            },
          },
        }}
        className="bg-zinc-900 overflow-hidden max-w-[360px] rounded-xl shadow-shape"
      >
        {!isWidgetOpen && <UploadWidgetMinimizeButton />}

        <Collapsible.Content>
          <UploadWidgetHeader />

          <div className="flex flex-col gap-4 py-3">
            <UploadWidgetDropzone />

            <div className="h-px bg-zinc-800 border-black/50 border-t box-content" />

            <UploadWidgetList />
          </div>
        </Collapsible.Content>
      </motion.div>
    </Collapsible.Root>
  )
}
