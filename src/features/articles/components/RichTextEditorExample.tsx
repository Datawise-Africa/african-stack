import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import RichTextEditor from './RichTextEditor'

// Define the form schema with Zod
const formSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
  content: z.string().min(10, { message: 'Content must be at least 10 characters' }),
})

// Infer the type from the schema
type FormValues = z.infer<typeof formSchema>

/**
 * Example component demonstrating how to use RichTextEditor with React Hook Form
 * 
 * This example shows two different ways to integrate the RichTextEditor:
 * 1. Using FormField from shadcn/ui (recommended)
 * 2. Using Controller from react-hook-form directly
 */
const RichTextEditorExample = () => {
  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: `
        <h2>Rich Text Editor with Advanced Table Features</h2>
        <p>This example demonstrates the enhanced table functionality in our rich text editor.</p>
        <h3>Table Features:</h3>
        <ul>
          <li>Insert and delete tables</li>
          <li>Add and remove rows and columns</li>
          <li>Merge and split cells</li>
          <li>Toggle header rows and columns</li>
        </ul>
        <p>Try creating a table using the table button in the toolbar:</p>
        <table>
          <tr>
            <th>Feature</th>
            <th>Description</th>
            <th>How to Use</th>
          </tr>
          <tr>
            <td>Add Row</td>
            <td>Adds a new row to the table</td>
            <td>Click the table button and select "Add Row Before" or "Add Row After"</td>
          </tr>
          <tr>
            <td>Add Column</td>
            <td>Adds a new column to the table</td>
            <td>Click the table button and select "Add Column Before" or "Add Column After"</td>
          </tr>
          <tr>
            <td>Merge Cells</td>
            <td>Combines selected cells</td>
            <td>Select multiple cells, click the table button and select "Merge Cells"</td>
          </tr>
        </table>
        <p>Select a cell, row, or column in the table above to see the available options.</p>
      `,
    },
  })

  // Handle form submission
  const onSubmit = (data: FormValues) => {
    console.log('Form submitted:', data)
    // In a real app, you would send this data to an API
    alert(JSON.stringify(data, null, 2))
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>RichTextEditor Example</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Regular input field */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Method 1: Using FormField (recommended with shadcn/ui) */}
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content (Method 1: Using FormField)</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        placeholder="Write your content here..."
                        error={form.formState.errors.content?.message}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Method 2: Using Controller directly */}
              <div className="space-y-2">
                <FormLabel>Alternative Content (Method 2: Using Controller)</FormLabel>
                <Controller
                  name="content"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <>
                      <RichTextEditor
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        placeholder="Write your content here..."
                        error={fieldState.error?.message}
                        showPreviewTab={true}
                      />
                      {fieldState.error && (
                        <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>
                      )}
                    </>
                  )}
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Display form values for debugging */}
      <div className="mt-8">
        <h3 className="text-lg font-medium">Current Form Values:</h3>
        <pre className="bg-gray-100 p-4 rounded-md mt-2 overflow-auto max-h-60">
          {JSON.stringify(form.watch(), null, 2)}
        </pre>
      </div>
      
      {/* Instructions for using table features */}
      <div className="mt-8 p-4 border rounded-md bg-blue-50">
        <h3 className="text-lg font-medium mb-2">How to Use Table Features:</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            <strong>Create a table:</strong> Click the table icon in the toolbar and select "Insert Table"
          </li>
          <li>
            <strong>Add/remove rows and columns:</strong> Click the table icon when a table is selected to see row and column options
          </li>
          <li>
            <strong>Merge cells:</strong> Select multiple cells, then click the table icon and select "Merge Cells"
          </li>
          <li>
            <strong>Split cells:</strong> Select a merged cell, then click the table icon and select "Split Cell"
          </li>
          <li>
            <strong>Toggle header rows/columns:</strong> Select a row or column, then click the table icon and select the appropriate header option
          </li>
        </ol>
      </div>
    </div>
  )
}

export default RichTextEditorExample