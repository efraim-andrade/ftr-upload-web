import * as Collapsible from '@radix-ui/react-collapsible'
import { motion, useCycle } from 'motion/react'

import { UploadWidgetDropzone } from './dropzone'
import { UploadWidgetHeader } from './header'
import { UploadWidgetMinimizeButton } from './minimize-button'
import { UploadWidgetList } from './upload-list'

export function UploadWidget() {
  const isThereAnyPendingUpload = true

  const [isWidgetOpen, toggleWidgetOpen] = useCycle(false, true)

  return (
    <Collapsible.Root onOpenChange={() => toggleWidgetOpen()} asChild>
      <motion.div
        data-progress={isThereAnyPendingUpload}
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
        className="
          border 
          rounded-xl 
          max-w-[360px] 
          animate-border 
          border-transparent 
          
          bg-zinc-900 
          overflow-hidden 

          data-[state=open]:shadow-shape 
          
          data-[state=closed]:rounded-3xl 
          data-[state=closed]:data-[progress=false]:shadow-shape 
          data-[state=closed]:data-[progress=true]:[background:linear-gradient(45deg,#09090B,theme(colors.zinc.900)_50%,#09090B)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.zinc.700/.48)_80%,_theme(colors.indigo.500)_86%,_theme(colors.indigo.300)_90%,_theme(colors.indigo.500)_94%,_theme(colors.zinc.600/.48))_border-box]
        "
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
