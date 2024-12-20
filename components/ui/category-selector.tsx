'use client';

import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

import { Category } from '@/sanity.types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface CategorySelectorProps {
    categories: Category[];
}

export function CategorySelectorComponent({
    categories,
}: CategorySelectorProps) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string>('');
    const router = useRouter();

    console.log('🚀 ~ categories:', categories);
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="relative flex w-full max-w-full items-center justify-center space-x-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 hover:text-white sm:flex-none sm:justify-start"
                >
                    {value
                        ? categories.find((category) => category._id === value)?.title
                        : 'Filter By Category...'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput
                        placeholder="Search category..."
                        className="h-9"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                const selectedCategory = categories.find((c) =>
                                    c.title
                                        ?.toLowerCase()
                                        .includes(e.currentTarget.value.toLowerCase())
                                );
                                if (selectedCategory?.slug?.current) {
                                    setValue(selectedCategory._id);
                                    router.push(`/categories/${selectedCategory.slug?.current}`);
                                    setOpen(false);
                                }
                            }
                        }}
                    />
                    <CommandList>
                        <CommandEmpty>No Category Found.</CommandEmpty>
                        <CommandGroup>
                            {categories.map((category) => (
                                <CommandItem
                                    key={category._id}
                                    value={category.title}
                                    onSelect={() => {
                                        setValue(value === category._id ? '' : category._id);
                                        router.push(`/categories/${category.slug?.current}`);
                                        setOpen(false);
                                    }}
                                >
                                    {category.title}
                                    <Check
                                        className={cn(
                                            'ml-auto h-4 w-4',
                                            value === category._id ? 'opacity-100' : 'opacity-0'
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}