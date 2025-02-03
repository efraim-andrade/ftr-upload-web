import * as Collapsible from '@radix-ui/react-collapsible'
import { useState } from 'react'

import { UploadWidgetDropzone } from './dropzone'
import { UploadWidgetHeader } from './header'
import { UploadWidgetMinimizeButton } from './minimize-button'
import { UploadWidgetList } from './upload-list'

export function UploadWidget() {
  const [isWidgetOpen, setIsWidgetOpen] = useState(false)

  return (
    <Collapsible.Root onOpenChange={setIsWidgetOpen}>
      <div className="bg-zinc-900 overflow-hidden w-[360px] rounded-xl shadow-shape">
        {!isWidgetOpen && <UploadWidgetMinimizeButton />}

        <Collapsible.Content>
          <UploadWidgetHeader />

          <div className="flex flex-col gap-4 py-3">
            <UploadWidgetDropzone />

            <div className="h-px bg-zinc-800 border-black/50 border-t box-content" />

            <UploadWidgetList />
          </div>
        </Collapsible.Content>
      </div>
    </Collapsible.Root>
  )
}
