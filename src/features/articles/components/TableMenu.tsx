import { Editor } from '@tiptap/react'
import {
  Minus,
  ArrowDown,
  ArrowUp,
  ArrowLeft,
  ArrowRight,
  Merge,
  Split,
  Trash2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface TableMenuProps {
  editor: Editor
}

const TableMenu = ({ editor }: TableMenuProps) => {
  if (!editor) {
    return null
  }

  const isTableSelected = editor.isActive('table')

  if (!isTableSelected) {
    return null
  }

  const addColumnBefore = () => {
    editor.chain().focus().addColumnBefore().run()
  }

  const addColumnAfter = () => {
    editor.chain().focus().addColumnAfter().run()
  }

  const deleteColumn = () => {
    editor.chain().focus().deleteColumn().run()
  }

  const addRowBefore = () => {
    editor.chain().focus().addRowBefore().run()
  }

  const addRowAfter = () => {
    editor.chain().focus().addRowAfter().run()
  }

  const deleteRow = () => {
    editor.chain().focus().deleteRow().run()
  }

  const deleteTable = () => {
    editor.chain().focus().deleteTable().run()
  }

  const mergeCells = () => {
    editor.chain().focus().mergeCells().run()
  }

  const splitCell = () => {
    editor.chain().focus().splitCell().run()
  }

  const toggleHeaderColumn = () => {
    editor.chain().focus().toggleHeaderColumn().run()
  }

  const toggleHeaderRow = () => {
    editor.chain().focus().toggleHeaderRow().run()
  }

  const toggleHeaderCell = () => {
    editor.chain().focus().toggleHeaderCell().run()
  }

  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-1 p-1 bg-white border rounded-md shadow-sm">
        <div className="flex gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={addColumnBefore}
                className="h-8 w-8 p-0"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add column before</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={addColumnAfter}
                className="h-8 w-8 p-0"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add column after</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={deleteColumn}
                className="h-8 w-8 p-0"
              >
                <Minus className="h-4 w-4 rotate-90" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete column</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        <div className="flex gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={addRowBefore}
                className="h-8 w-8 p-0"
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add row before</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={addRowAfter}
                className="h-8 w-8 p-0"
              >
                <ArrowDown className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add row after</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={deleteRow}
                className="h-8 w-8 p-0"
              >
                <Minus className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete row</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        <div className="flex gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={mergeCells}
                className="h-8 w-8 p-0"
              >
                <Merge className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Merge cells</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={splitCell}
                className="h-8 w-8 p-0"
              >
                <Split className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Split cell</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        <div className="flex gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={toggleHeaderRow}
                className={`h-8 w-8 p-0 ${editor.isActive({ row: true }) ? 'bg-gray-200' : ''}`}
              >
                <span className="text-xs font-bold">HR</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle header row</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={toggleHeaderColumn}
                className={`h-8 w-8 p-0 ${editor.isActive({ column: true }) ? 'bg-gray-200' : ''}`}
              >
                <span className="text-xs font-bold">HC</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle header column</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={toggleHeaderCell}
                className={`h-8 w-8 p-0 ${editor.isActive('tableHeader') ? 'bg-gray-200' : ''}`}
              >
                <span className="text-xs font-bold">H</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle header cell</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={deleteTable}
              className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete table</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}

export default TableMenu