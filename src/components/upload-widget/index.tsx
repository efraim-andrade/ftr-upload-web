import * as Collapsible from '@radix-ui/react-collapsible'
import { motion, useCycle } from 'motion/react'
import { useRef, useLayoutEffect, useState } from 'react'

import { UploadWidgetDropzone } from './dropzone'
import { UploadWidgetHeader } from './header'
import { UploadWidgetMinimizeButton } from './minimize-button'
import { UploadWidgetList } from './upload-list'
import { usePendingUploads, useUploads } from '../../store/uploads'

export function UploadWidget() {
  const contentRef = useRef<HTMLDivElement>(null)

  const { isThereAnyPendingUploads } = usePendingUploads()

  const [contentHeight, setContentHeight] = useState(0)

  const upload = useUploads(state => state.uploads)
  const [isWidgetOpen, toggleWidgetOpen] = useCycle(false, true)

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useLayoutEffect(() => {
    if (contentRef.current && isWidgetOpen) {
      setContentHeight(contentRef.current.offsetHeight)
    }
  }, [isWidgetOpen, upload])

  return (
    <Collapsible.Root onOpenChange={() => toggleWidgetOpen()} asChild>
      <motion.div
        data-progress={isThereAnyPendingUploads}
        animate={isWidgetOpen ? 'open' : 'closed'}
        variants={{
          open: {
            width: 360,
            height: contentHeight,
            transition: {
              duration: 0.15,
            },
          },

          closed: {
            width: 'max-content',
            height: 44,
            transition: {
              type: 'keyframes',
              duration: 0.125,
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

        <Collapsible.Content ref={contentRef}>
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
