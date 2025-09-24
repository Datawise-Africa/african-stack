import { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import {
  useEditor,
  EditorContent,
  findParentNode,
  posToDOMRect,
} from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import { Heading } from '@tiptap/extension-heading'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import { Link } from '@tiptap/extension-link'
import { Image } from '@tiptap/extension-image'
import { Underline } from '@tiptap/extension-underline'
import { BulletList } from '@tiptap/extension-bullet-list'
import { OrderedList } from '@tiptap/extension-ordered-list'
import { ListItem } from '@tiptap/extension-list-item'
import { Bold } from '@tiptap/extension-bold'
import { Italic } from '@tiptap/extension-italic'
import { Strike } from '@tiptap/extension-strike'
import { Code } from '@tiptap/extension-code'
import { CodeBlock } from '@tiptap/extension-code-block'
import { Blockquote } from '@tiptap/extension-blockquote'
import { HorizontalRule } from '@tiptap/extension-horizontal-rule'
import Placeholder from '@tiptap/extension-placeholder'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Underline as UnderlineIcon,
  Strikethrough as StrikethroughIcon,
  Link as LinkIcon,
  List as ListIcon,
  ListOrdered as ListOrderedIcon,
  Heading1,
  Heading2,
  Heading3,
  Quote as QuoteIcon,
  Code as CodeIcon,
  Table as TableIcon,
  Image as ImageIcon,
  Minus as MinusIcon,
  Eye as EyeIcon,
  Pencil as PencilIcon,
  RowsIcon,
  ColumnsIcon,
  Trash2,
  ArrowDown,
  ArrowUp,
  ArrowLeft,
  ArrowRight,
  Merge,
  Split,
} from 'lucide-react'
import TableMenu from './TableMenu'

export interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  minHeight?: string;
  showToolbar?: boolean;
  showPreviewTab?: boolean;
  name?: string;
}

export type RichTextEditorRef = {
  setContent: (content: string) => void;
  getContent: () => string;
  focus: () => void;
  clear: () => void;
};

const RichTextEditor = forwardRef<RichTextEditorRef, RichTextEditorProps>(
  (
    {
      value = '',
      onChange,
      onBlur,
      placeholder = 'Start writing...',
      label,
      error,
      disabled = false,
      className = '',
      minHeight = '300px',
      showToolbar = true,
      showPreviewTab = true,
      name,
    },
    ref
  ) => {
    const [editorContent, setEditorContent] = useState(value)
    const [previewMode, setPreviewMode] = useState(false)
    const [linkUrl, setLinkUrl] = useState('')
    const [linkPopoverOpen, setLinkPopoverOpen] = useState(false)
    const [imageUrl, setImageUrl] = useState('')
    const [imagePopoverOpen, setImagePopoverOpen] = useState(false)

    const editor = useEditor({
      extensions: [
        StarterKit.configure({
          heading: false, // disable to use our custom heading
        }),
        Heading.configure({
          levels: [1, 2, 3],
        }),
        Placeholder.configure({
          placeholder,
        }),
        Bold,
        Italic,
        Underline,
        Strike,
        Link.configure({
          openOnClick: true,
          linkOnPaste: true,
        }),
        BulletList,
        OrderedList,
        ListItem,
        Table.configure({
          resizable: true,
          allowTableNodeSelection: true,
        }),
        TableRow,
        TableHeader,
        TableCell,
        Image,
        Code,
        CodeBlock,
        Blockquote,
        HorizontalRule,
       // BubbleMenu is imported separately, not needed in extensions
      ],
      content: value,
      editable: !disabled,
      editorProps: {
        attributes: {
          class: 'tiptap focus:outline-none',
        },
      },
      onUpdate: ({ editor }) => {
        const html = editor.getHTML()
        setEditorContent(html)
        onChange?.(html)
      },
      onBlur: () => {
        onBlur?.()
      },
    })

    // Update content when value prop changes
    useEffect(() => {
      if (editor && value !== editorContent) {
        editor.commands.setContent(value)
        setEditorContent(value)
      }
    }, [value, editor])

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      setContent: (content: string) => {
        if (editor) {
          editor.commands.setContent(content)
          setEditorContent(content)
        }
      },
      getContent: () => {
        return editorContent
      },
      focus: () => {
        if (editor) {
          editor.commands.focus()
        }
      },
      clear: () => {
        if (editor) {
          editor.commands.clearContent()
          setEditorContent('')
        }
      },
    }))

    return (
      <div className={`space-y-2 ${className}`}>
        {label && <Label htmlFor={name}>{label}</Label>}
        
        <Tabs defaultValue="edit" className="w-full">
          {showPreviewTab && (
            <div className="flex justify-between items-center mb-2">
              <TabsList>
                <TabsTrigger value="edit" onClick={() => setPreviewMode(false)} className="flex items-center">
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Edit
                </TabsTrigger>
                <TabsTrigger value="preview" onClick={() => setPreviewMode(true)} className="flex items-center">
                  <EyeIcon className="h-4 w-4 mr-2" />
                  Preview
                </TabsTrigger>
              </TabsList>
            </div>
          )}
          
          <TabsContent value="edit" className="mt-0">
            {/* Editor Toolbar */}
            {editor && showToolbar && (
              <div className="border-b border-t rounded-t-md bg-gray-50 p-1 flex flex-wrap gap-1">
                {/* Text Formatting */}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={editor.isActive('bold') ? 'bg-gray-200' : ''}
                  disabled={disabled}
                >
                  <BoldIcon className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={editor.isActive('italic') ? 'bg-gray-200' : ''}
                  disabled={disabled}
                >
                  <ItalicIcon className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                  className={editor.isActive('underline') ? 'bg-gray-200' : ''}
                  disabled={disabled}
                >
                  <UnderlineIcon className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                  className={editor.isActive('strike') ? 'bg-gray-200' : ''}
                  disabled={disabled}
                >
                  <StrikethroughIcon className="h-4 w-4" />
                </Button>
                
                <div className="w-px h-6 bg-gray-300 mx-1"></div>
                
                {/* Headings */}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                  className={editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''}
                  disabled={disabled}
                >
                  <Heading1 className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                  className={editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}
                  disabled={disabled}
                >
                  <Heading2 className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                  className={editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : ''}
                  disabled={disabled}
                >
                  <Heading3 className="h-4 w-4" />
                </Button>
                
                <div className="w-px h-6 bg-gray-300 mx-1"></div>
                
                {/* Lists */}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleBulletList().run()}
                  className={editor.isActive('bulletList') ? 'bg-gray-200' : ''}
                  disabled={disabled}
                >
                  <ListIcon className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleOrderedList().run()}
                  className={editor.isActive('orderedList') ? 'bg-gray-200' : ''}
                  disabled={disabled}
                >
                  <ListOrderedIcon className="h-4 w-4" />
                </Button>
                
                <div className="w-px h-6 bg-gray-300 mx-1"></div>
                
                {/* Link */}
                <Popover open={linkPopoverOpen} onOpenChange={setLinkPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className={editor.isActive('link') ? 'bg-gray-200' : ''}
                      disabled={disabled}
                    >
                      <LinkIcon className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="link-url">URL</Label>
                      <div className="flex gap-2">
                        <Input
                          id="link-url"
                          value={linkUrl}
                          onChange={(e) => setLinkUrl(e.target.value)}
                          placeholder="https://example.com"
                        />
                        <Button
                          onClick={() => {
                            if (linkUrl) {
                              editor.chain().focus().setLink({ href: linkUrl }).run()
                            } else {
                              editor.chain().focus().unsetLink().run()
                            }
                            setLinkPopoverOpen(false)
                          }}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                
                {/* Quote, Code, HR */}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleBlockquote().run()}
                  className={editor.isActive('blockquote') ? 'bg-gray-200' : ''}
                  disabled={disabled}
                >
                  <QuoteIcon className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                  className={editor.isActive('codeBlock') ? 'bg-gray-200' : ''}
                  disabled={disabled}
                >
                  <CodeIcon className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().setHorizontalRule().run()}
                  disabled={disabled}
                >
                  <MinusIcon className="h-4 w-4" />
                </Button>
                
                <div className="w-px h-6 bg-gray-300 mx-1"></div>
                
                {/* Table */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className={editor.isActive('table') ? 'bg-gray-200' : ''}
                      disabled={disabled}
                    >
                      <TableIcon className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-2">
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
                          disabled={editor.isActive('table')}
                        >
                          <TableIcon className="h-4 w-4 mr-2" />
                          Insert Table
                        </Button>
                        
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => editor.chain().focus().deleteTable().run()}
                          disabled={!editor.isActive('table')}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Table
                        </Button>
                      </div>
                      
                      {editor.isActive('table') && (
                        <>
                          <div className="w-full h-px bg-gray-200 my-1"></div>
                          
                          <div className="grid grid-cols-2 gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => editor.chain().focus().addColumnBefore().run()}
                            >
                              <ArrowLeft className="h-4 w-4 mr-2" />
                              Add Column Before
                            </Button>
                            
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => editor.chain().focus().addColumnAfter().run()}
                            >
                              <ArrowRight className="h-4 w-4 mr-2" />
                              Add Column After
                            </Button>
                            
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => editor.chain().focus().deleteColumn().run()}
                            >
                              <ColumnsIcon className="h-4 w-4 mr-2" />
                              Delete Column
                            </Button>
                            
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => editor.chain().focus().addRowBefore().run()}
                            >
                              <ArrowUp className="h-4 w-4 mr-2" />
                              Add Row Before
                            </Button>
                            
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => editor.chain().focus().addRowAfter().run()}
                            >
                              <ArrowDown className="h-4 w-4 mr-2" />
                              Add Row After
                            </Button>
                            
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => editor.chain().focus().deleteRow().run()}
                            >
                              <RowsIcon className="h-4 w-4 mr-2" />
                              Delete Row
                            </Button>
                            
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => editor.chain().focus().mergeCells().run()}
                            >
                              <Merge className="h-4 w-4 mr-2" />
                              Merge Cells
                            </Button>
                            
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => editor.chain().focus().splitCell().run()}
                            >
                              <Split className="h-4 w-4 mr-2" />
                              Split Cell
                            </Button>
                            
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => editor.chain().focus().toggleHeaderRow().run()}
                              className={editor.isActive({ row: true }) ? 'bg-gray-200' : ''}
                            >
                              <span className="mr-2 text-xs font-bold">HR</span>
                              Toggle Header Row
                            </Button>
                            
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => editor.chain().focus().toggleHeaderColumn().run()}
                              className={editor.isActive({ column: true }) ? 'bg-gray-200' : ''}
                            >
                              <span className="mr-2 text-xs font-bold">HC</span>
                              Toggle Header Column
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
                
                {/* Image */}
                <Popover open={imagePopoverOpen} onOpenChange={setImagePopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      disabled={disabled}
                    >
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="image-url">Image URL</Label>
                      <div className="flex gap-2">
                        <Input
                          id="image-url"
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                          placeholder="https://example.com/image.jpg"
                        />
                        <Button
                          onClick={() => {
                            if (imageUrl) {
                              editor.chain().focus().setImage({ src: imageUrl }).run()
                            }
                            setImagePopoverOpen(false)
                          }}
                        >
                          Insert
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            )}
            
            {/* Editor Content */}
            <div className={`border ${showToolbar ? 'border-t-0' : ''} rounded-b-md`}>
              <EditorContent
                editor={editor}
                className={`${minHeight ? `min-h-[${minHeight}]` : 'min-h-[300px]'} p-4 focus:outline-none prose max-w-none ${disabled ? 'opacity-70 cursor-not-allowed' : ''}`}
              />

              {/* Selection Bubble Menu */}
              {showToolbar && editor && (
                <BubbleMenu
                  editor={editor}
                  shouldShow={({ editor, state }) => {
                    if (!editor.isEditable) return false
                    if (editor.isActive('table')) return false
                    return !state.selection.empty
                  }}
                  options={{ placement: 'top', offset: 8 }}
                >
                  <div className="flex items-center gap-1 rounded-md border bg-white p-1 shadow-sm">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => editor.chain().focus().toggleBold().run()}
                      className={`h-8 w-8 ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
                    >
                      <BoldIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => editor.chain().focus().toggleItalic().run()}
                      className={`h-8 w-8 ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
                    >
                      <ItalicIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => editor.chain().focus().toggleUnderline().run()}
                      className={`h-8 w-8 ${editor.isActive('underline') ? 'bg-gray-200' : ''}`}
                    >
                      <UnderlineIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => editor.chain().focus().toggleStrike().run()}
                      className={`h-8 w-8 ${editor.isActive('strike') ? 'bg-gray-200' : ''}`}
                    >
                      <StrikethroughIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => editor.chain().focus().toggleCode().run()}
                      className={`h-8 w-8 ${editor.isActive('code') ? 'bg-gray-200' : ''}`}
                    >
                      <CodeIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </BubbleMenu>
              )}

              {showToolbar && editor && (
                <BubbleMenu
                  editor={editor}
                  shouldShow={({ editor }) =>
                    editor.isActive('bulletList') || editor.isActive('orderedList')
                  }
                  getReferencedVirtualElement={() => {
                    const parentNode = findParentNode(
                      (node) => node.type.name === 'bulletList' || node.type.name === 'orderedList'
                    )(editor.state.selection)

                    if (!parentNode) {
                      return null
                    }

                    const domRect = posToDOMRect(
                      editor.view,
                      parentNode.start,
                      parentNode.start + parentNode.node.nodeSize
                    )

                    return {
                      getBoundingClientRect: () => domRect,
                      getClientRects: () => [domRect],
                    }
                  }}
                  options={{ placement: 'top-start', offset: 8 }}
                >
                  <div className="flex items-center gap-1 rounded-md border bg-white p-1 shadow-sm">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const chain = editor.chain().focus()
                        if (editor.isActive('bulletList')) {
                          chain.toggleOrderedList()
                        } else {
                          chain.toggleBulletList()
                        }
                        chain.run()
                      }}
                      className={`h-8 w-8 ${
                        editor.isActive('bulletList') || editor.isActive('orderedList')
                          ? 'bg-gray-200'
                          : ''
                      }`}
                    >
                      {editor.isActive('bulletList') ? (
                        <ListOrderedIcon className="h-4 w-4" />
                      ) : (
                        <ListIcon className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </BubbleMenu>
              )}

              {/* Table Bubble Menu */}
              {showToolbar && editor && (
                <BubbleMenu
                  editor={editor}
                  shouldShow={({ editor }) => editor.isActive('table')}
                  options={{ placement: 'top', offset: 4 }}
                >
                  <TableMenu editor={editor} />
                </BubbleMenu>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="preview" className="mt-0">
            <div className="border rounded-md p-4 min-h-[300px] prose max-w-none">
              {previewMode && (
                <div dangerouslySetInnerHTML={{ __html: editorContent }} />
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      </div>
    )
  }
)

RichTextEditor.displayName = 'RichTextEditor'

export default RichTextEditor
