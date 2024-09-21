import { useState } from "react"
import { useForm } from "react-hook-form"
import { Schema, schema, schemaDefaultValues } from "../types/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MultiSelect } from "@/components/general/multi-select"
import { statesOptions } from "@/lib/data"


export const Users = () => {
    const [selectedStates, setSelectedStates] = useState<string[]>([]);

    const form = useForm<Schema>({
        mode: "all",
        resolver: zodResolver(schema),
        defaultValues: schemaDefaultValues
    })

    const onSubmit = (values: Schema) => {
        console.log(values)
    }

    return (
      <Form {...form}  >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-[500px]">
          <div className="space-y-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter the name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter the email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="age"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter the name"
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <MultiSelect
              options={statesOptions}
              defaultValue={[]}
              onValueChange={setSelectedStates}
              placeholder="Select states"
              modalPopover={true}
              showAllSelected={true}
            />
          </div>
          <Button>Submit</Button>
        </form>
      </Form>
    );
}