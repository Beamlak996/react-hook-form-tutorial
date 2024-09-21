import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MultiSelect } from "@/components/general/multi-select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Schema, schema, schemaDefaultValues } from "../types/schema";
import {
  useGenders,
  useLanguages,
  useSkills,
  useStates,
} from "../services/queries";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

export const Users = () => {
  const stateQuery = useStates();
  const languageQuery = useLanguages();
  const genderQuery = useGenders();
  const skillQuery = useSkills();

  const form = useForm<Schema>({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues: schemaDefaultValues,
  });

  const onSubmit = (values: Schema) => {
    console.log(values);
  };

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
                      <ToggleGroupItem
                        key={language.value}
                        value={language.value}
                      >
                        {language.label}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="gender"
            control={form.control}
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    {genderQuery.data?.map((gender) => (
                      <FormItem
                        key={gender.value}
                        className="flex items-center space-x-3 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem value={gender.value} />
                        </FormControl>
                        <FormLabel className="font-normal hover:cursor-pointer">
                          {gender.label}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="skills"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Skills</FormLabel>
                {skillQuery.data?.map((skill) => (
                  <FormField
                    key={skill.value}
                    name="skills"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem
                        key={skill.value}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(skill.value)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, skill.value])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== skill.value
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {skill.label}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button>Submit</Button>
      </form>
    </Form>
  );
};
