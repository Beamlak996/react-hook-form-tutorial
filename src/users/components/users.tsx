import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MultiSelect } from "@/components/general/multi-select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import { Schema, schema, schemaDefaultValues } from "../types/schema"
import { useLanguages, useStates } from "../services/queries"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"


export const Users = () => {
    const stateQuery = useStates()
    const languageQuery = useLanguages()


    const form = useForm<Schema>({
        mode: "all",
        resolver: zodResolver(schema),
        defaultValues: schemaDefaultValues
    })

    const onSubmit = (values: Schema) => {
        console.log(values)
    }

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 max-w-[500px]"
        >
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
            <FormField
              name="states"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>States</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={stateQuery.data || []}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      placeholder="Select options"
                      showAllSelected={true}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="languagesSpoken"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Languages Spoken</FormLabel>
                  <FormControl>
                    <ToggleGroup
                      type="multiple"
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                      variant="default"
                    >
                      {languageQuery.data?.map((language) => (
                        <ToggleGroupItem key={language.value} value={language.value}>
                          {language.label}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button>Submit</Button>
        </form>
      </Form>
    );
}